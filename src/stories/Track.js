import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

import Track from "../Track";
import Card from "../Card";
import { DragDropContext } from "react-beautiful-dnd";

function inDragContext(c) {
  return <DragDropContext>{c}</DragDropContext>;
}

function withBackground(c) {
  return (
    <div
      style={{
        background: "gray",
        height: 500,
        border: "1px solid #ccc",
        display: "flex"
      }}
    >
      <div>{c}</div>
    </div>
  );
}

const stories = storiesOf("Track", module);
stories.addDecorator(withKnobs);
stories.add("defaults, empty", () => withBackground(inDragContext(<Track />)));

stories.add("defaults, one card", () =>
  withBackground(
    inDragContext(
      <Track>
        <Card
          name="julz"
          photo="https://avatars2.githubusercontent.com/u/354013?v=3&s=72"
          onClick={action("clicked")}
        />
      </Track>
    )
  )
);

stories.add("defaults, one card, minCards=1", () =>
  withBackground(
    inDragContext(
      <Track minCards={1}>
        <Card
          name="julz"
          photo="https://avatars2.githubusercontent.com/u/354013?v=3&s=72"
          onClick={action("clicked")}
        />
      </Track>
    )
  )
);

stories.add("defaults, two cards", () =>
  withBackground(
    inDragContext(
      <Track minCards={1}>
        <Card
          name="julz"
          photo="https://avatars2.githubusercontent.com/u/354013?v=3&s=72"
          onClick={action("clicked")}
        />
        <Card
          name="ed"
          photo="https://avatars0.githubusercontent.com/u/6475144?v=3&s=72"
          onClick={action("clicked")}
        />
      </Track>
    )
  )
);

stories.add("defaults, two cards, minCards=3", () =>
  withBackground(
    inDragContext(
      <Track minCards={3} title="defaults, 2 cards, minCards=3">
        <Card
          name="julz"
          photo="https://avatars2.githubusercontent.com/u/354013?v=3&s=72"
          onClick={action("clicked")}
        />
        <Card
          name="ed"
          photo="https://avatars0.githubusercontent.com/u/6475144?v=3&s=72"
          onClick={action("clicked")}
        />
      </Track>
    )
  )
);

stories.add("custom Title component", () =>
  withBackground(
    inDragContext(
      <Track minCards={3} title={<input type="text" value="test" />}>
        <Card
          name="julz"
          photo="https://avatars2.githubusercontent.com/u/354013?v=3&s=72"
          onClick={action("clicked")}
        />
        <Card
          name="ed"
          photo="https://avatars0.githubusercontent.com/u/6475144?v=3&s=72"
          onClick={action("clicked")}
        />
      </Track>
    )
  )
);

stories.add("badge area", () =>
  withBackground(
    inDragContext(
      <Track
        minCards={3}
        title="with badge area (covers track)"
        badges={
          <div
            style={{
              background: "rgba(255, 0, 0, 0.5)",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              position: "absolute"
            }}
          />
        }
      >
        <Card
          name="julz"
          photo="https://avatars2.githubusercontent.com/u/354013?v=3&s=72"
          onClick={action("clicked")}
        />
        <Card
          name="ed"
          photo="https://avatars0.githubusercontent.com/u/6475144?v=3&s=72"
          onClick={action("clicked")}
        />
      </Track>
    )
  )
);
