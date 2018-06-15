import React from "react";
import Board from "./Board";

import firebase from "firebase/app";
import "firebase/database";

import update from "immutability-helper";
import Rebase from "re-base";

import { updateTrackTitle } from "./model/tracks";

import { conf } from "./conf";

const app = firebase.initializeApp(conf);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      tracks: ["Track 1", "Track 2", "Track 3", "Track 4"],
      avatars: {},
      locked: {},
      lockedBadges: {},
      badges: { 0: ["ci"] },
      parkingLotItems: [{ value: "" }],
      theme: {},
      assignments: {
        available: [],
        out: [],
        "track-0": [],
        "track-1": [],
        "track-2": [],
        "track-3": [],
      },
    };
  }

  componentDidMount() {
    if (this.props.enableFirebase) {
      this.sync(this.props.boardName);
    } else {
      this.setState({
        people: ["julz", "ed", "claudia"],
        assignments: { available: [0, 1], out: [2] },
      });
    }
  }

  sync(boardName) {
    const base = Rebase.createClass(firebase.database(app));
    base.syncState(`boards/${boardName}/tracks`, {
      context: this,
      state: "tracks",
      asArray: true,
      defaultValue: ["Track 1", ""],
    });

    base.syncState(`boards/${boardName}/parkingLotItems`, {
      context: this,
      state: "parkingLotItems",
      asArray: true,
      defaultValue: [{ value: "" }],
    });

    base.syncState(`boards/${boardName}/people`, {
      context: this,
      state: "people",
      asArray: true,
    });

    base.syncState(`boards/${boardName}/badges`, {
      context: this,
      state: "badges",
      defaultValue: [["ci"]],
    });

    ["avatars", "assignments", "locked", "theme"].forEach((k) => {
      base.syncState(`boards/${boardName}/${k}`, {
        context: this,
        state: k,
      });
    });
  }

  onAddCard = () => {
    this.setState((prevState) => {
      return {
        people: (prevState.people || []).concat(""),
        assignments: Object.assign(prevState.assignments, {
          available: (prevState.assignments["available"] || []).concat(
            prevState.people.length,
          ),
        }),
      };
    });
  };

  onRemoveCard = (id) => {
    this.setState((prevState) => {
      const filteredAssignments = {};
      Object.keys(prevState.assignments).forEach((k) => {
        filteredAssignments[k] = prevState.assignments[k].filter(
          (n) => n !== id,
        );
      });

      return {
        people: prevState.people.filter((j) => j !== id),
        assignments: filteredAssignments,
      };
    });
  };

  onDropCard = (card, target, targetIndex) => {
    this.setState((prevState) => {
      const cardId = parseInt(card, 10);

      const mods = {};
      Object.keys(prevState.assignments).forEach((k) => {
        mods[k] = prevState.assignments[k].filter((n) => n !== cardId);
      });

      mods[target] = mods[target] || [];
      mods[target].splice(targetIndex, 0, cardId);

      return {
        assignments: Object.assign(prevState.assignments, mods),
      };
    });
  };

  onDropBadge = (target) => {
    const b = [];
    b[target] = ["ci"];
    this.setState({ badges: b });
  };

  onGithubUpdated = (evt, i) => {
    const val = evt.target.value;
    const id = i;
    fetch("https://api.github.com/users/" + val).then((response) =>
      response.json().then((json) => {
        if (!json.avatar_url) {
          return;
        }

        const url = json.avatar_url;
        this.setState((prevState) => {
          return {
            avatars: update(prevState.avatars, {
              $set: { [id]: url },
            }),
          };
        });
      }),
    );
  };

  onNameUpdated = (evt, i) => {
    const val = evt.target.value;
    const id = i;
    this.setState((prevState) => ({
      people: update(prevState.people, { $set: { [id]: val } }),
    }));
  };

  onUpdateTrackTitle = (evt, i) => {
    const val = evt.target.value;
    const id = i;
    this.setState((s) => {
      return {
        tracks: updateTrackTitle({ state: s.tracks, index: i, title: val }),
      };
    });
  };

  onCleanParkingLot = () => {
    this.setState((prevState) => ({
      parkingLotItems: [{ value: "" }],
    }));
  };

  onParkingLotItemUpdated = (evt, i) => {
    const val = evt.target.value;
    const id = i;
    this.setState((prevState) => ({
      parkingLotItems: prevState.parkingLotItems
        .map((v, j) => (j === id ? { value: val } : v))
        .filter((item) => item.value !== "") // delete empty items except..
        .concat({ value: "" }), // empty item at end
    }));
  };

  onParkingLotItemChecked = (i) => {
    const id = i;
    this.setState((prevState) => ({
      parkingLotItems: update(prevState.parkingLotItems, {
        [i]: { complete: { $set: !prevState.parkingLotItems[id].complete } },
      }),
    }));
  };

  onToggleLocked = (i) => {
    const id = i;

    this.setState((prevState) => ({
      locked: update(prevState.locked, {
        $set: { [id]: !prevState.locked[id] },
      }),
    }));
  };

  onToggleBadgeLocked = () => {
    this.setState((prevState) => ({
      lockedBadges: { ci: !prevState.lockedBadges["ci"] },
    }));
  };

  onShuffle = () => {
    this.setState((prevState) => {
      const assignments = {
        available: (prevState.assignments.available || []).map((v) => v),
        out: prevState.assignments.out || [],
      };

      // move all the non-locked/non-out cards to available
      Object.keys(prevState.assignments)
        .filter((k) => k !== "available" && k !== "out")
        .forEach((k) => {
          assignments[k] = prevState.assignments[k].filter((n) => {
            return prevState.locked[n];
          });

          const availInTrack = prevState.assignments[k].filter(
            (n) => !prevState.locked[n],
          );

          assignments["available"].push(...availInTrack);
        });

      // keep picking at random from available until tracks are filled
      // or we run out of cards
      prevState.tracks.forEach((trackName, trackId) => {
        assignments["track-" + trackId] = assignments["track-" + trackId] || [];

        while (
          assignments["available"].length > 0 &&
          assignments["track-" + trackId].length < 2
        ) {
          const randomIdx = Math.floor(
            Math.random() * assignments["available"].length,
          );

          assignments["track-" + trackId].push(
            assignments["available"][randomIdx],
          );
          assignments["available"].splice(randomIdx, 1);
        }
      });

      // pick a CI pair slot
      const badges = [];
      const ciTrack = Math.floor(
        Math.random() * prevState.tracks.filter((track) => track !== "").length,
      );
      badges[ciTrack] = ["ci"];

      window.setTimeout(() => {
        this.setState({ shuffling: false });
      }, 700);

      return {
        assignments: assignments,
        badges: prevState.lockedBadges["ci"] ? prevState.badges : badges,
        shuffling: true,
      };
    });
  };

  onSelectThemeColor = (name, color) => {
    this.setState((s) => ({
      theme: update(s.theme, { [name]: { $set: color.hex } }),
    }));
  };

  render() {
    return (
      <Board
        people={this.state.people}
        assignments={this.state.assignments}
        tracks={this.state.tracks}
        avatars={this.state.avatars}
        badges={this.state.badges}
        locked={this.state.locked}
        lockedBadges={this.state.lockedBadges}
        parkingLotItems={this.state.parkingLotItems}
        shuffling={this.state.shuffling}
        theme={this.state.theme}
        onNameUpdated={this.onNameUpdated}
        onParkingLotItemUpdated={this.onParkingLotItemUpdated}
        onParkingLotItemChecked={this.onParkingLotItemChecked}
        onCleanParkingLot={this.onCleanParkingLot}
        onGithubUpdated={this.onGithubUpdated}
        onToggleLocked={this.onToggleLocked}
        onToggleBadgeLocked={this.onToggleBadgeLocked}
        onAddCard={this.onAddCard}
        onRemoveCard={this.onRemoveCard}
        onDropCard={this.onDropCard}
        onDropBadge={this.onDropBadge}
        onUpdateTrackTitle={this.onUpdateTrackTitle}
        onShuffle={this.onShuffle}
        onSelectThemeColor={this.onSelectThemeColor}
      />
    );
  }
}
