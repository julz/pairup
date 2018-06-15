import React from "react";
import { generator as gradient } from "uigradients";

import styled from "styled-components";
import ReactModal from "react-modal";

import {
  Lock as LockedIcon,
  Search as SearchIcon,
  Edit as EditIcon
} from "styled-icons/fa-solid";

import { DeleteForever as DeleteIcon } from "styled-icons/material";

import withShuffleAnimation from "./withShuffleAnimation";
import GithubUserLookup from "./GithubUserLookup";

const Container = styled.div`
  border: 4px solid #fc0;
  border-radius: 9px;
  ${gradient({
    gradient: "clouds",
    type: "radial",
    shape: "ellipse"
  })} width: 95px;
  height: 115px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.4), 0px 0px 1px 1px white;
  position: relative;
  margin-left: 8px;
  padding: 0px;
  user-select: none;

  ${props => props.locked && { borderColor: "#999", cursor: "pointer" }};
  ${props => props.ghost && { borderColor: "#ccc" }};
`;

const Header = styled.div`
  padding: 8px;
  width: 82px;
  height: 76px;
  text-align: center;
`;

const Photo = styled.div`
  background: url("${props => props.photo}");
  background-color: #e1e1e1;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: relative;
  left: -2px;
  top: -2px;
  border-radius: 4px;

  ${props =>
    props.editMode &&
    `
     cursor: pointer;
     background-color: #fc0;
     &:hover{ filter: saturate(0%); background-color: #616161 }
     &:hover * { opacity: 0.8 }
    `}
`;

const Footer = styled.div`
  text-align: center;
  width: 100%;
  padding-top: 10px;
  height: 26px;
  position: absolute;
  bottom: 0px;
  color: black;
`;

const DeleteButton = styled.div`
  position: absolute;
  right: -14px;
  top: -12px;
  color: white;
  width: 26px;
  height: 26px;
  z-index: 99;
  background: red;
  border: 2px solid white;
  border-radius: 999px;
  padding: 4px;
  text-align: center;
  justify-content: center;
  align-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0;
`;

const Input = styled.input`
  border: none;
  text-align: center;
  width: 78px;
  border: 1px solid #d90;
  border-radius: 9px;
`;

const CardLockedIcon = LockedIcon.extend`
  color: #515151;
  margin: 1em;
  margin-top: 0.8em;
  position: absolute;
  top: 0px;
  right: 0px;
  width: 36px;
  height: 36px;
`;

const PhotoEditIcon = EditIcon.extend`
  color: white;
  margin: 1em;
  margin-top: 0.8em;
  opacity: 0.4;
`;

const PhotoSearchIcon = SearchIcon.extend`
  color: white;
  margin: 1em;
  margin-top: 0.8em;
  opacity: 0.4;
`;

function Card({
  name,
  photo,
  editMode,
  editPhotoMode,
  locked,
  ghost,
  onRemoveCard,
  onNameUpdated,
  onGithubUpdated,
  handleSetEditPhotoMode
}) {
  photo = photo || "";

  return (
    <Container locked={locked || editMode} ghost={ghost || editMode}>
      {editMode && (
        <DeleteButton>
          <DeleteIcon onClick={onRemoveCard} />
        </DeleteButton>
      )}
      <Header>
        <Photo
          photo={photo}
          editMode={editMode}
          onClick={() => {
            editMode && handleSetEditPhotoMode(true);
          }}
        >
          {editMode && (photo === "" ? <PhotoSearchIcon /> : <PhotoEditIcon />)}
        </Photo>
        <ReactModal
          isOpen={editMode && editPhotoMode}
          onRequestClose={() => handleSetEditPhotoMode(false)}
          style={{
            overlay: {
              zIndex: 99,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              alignContent: "center",
              alignItems: "center"
            },
            content: {
              height: 180,
              marginTop: "auto",
              marginBottom: "auto"
            }
          }}
        >
          <GithubUserLookup
            onGithubUserSelected={onGithubUpdated}
            onExit={() => handleSetEditPhotoMode(false)}
          />
        </ReactModal>
      </Header>
      <Footer>
        {editMode ? (
          <Input onBlur={onNameUpdated} type="text" defaultValue={name || ""} />
        ) : (
          <span style={name ? {} : { color: "#aaa" }}>{name || "?"}</span>
        )}
        {locked && !editMode && <CardLockedIcon />}
      </Footer>
    </Container>
  );
}

function withPhotoEditState(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        editPhotoMode: false
      };
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          editPhotoMode={this.state.editPhotoMode}
          handleSetEditPhotoMode={enter =>
            this.setState({ editPhotoMode: enter })
          }
        />
      );
    }
  };
}

export default withPhotoEditState(
  withShuffleAnimation(Card, props => props.shuffling && !props.locked)
);
