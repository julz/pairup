import React from "react";
import styled from "styled-components";

const PhotoInputTitle = styled.h4`
  color: black;
`;

const PhotoInputControl = styled.div`
  display: flex;
  border: 2px solid #fc0;
  border-radius: 9px;
  background: white;
  padding: 8px;
  z-index: 999;
`;

const GithubIcon = styled.div`
  width: 36px;
  height: 36px;
  background: url("https://assets-cdn.github.com/images/modules/logos_page/Octocat.png");
  background-size: cover;
`;

const PhotoInput = styled.input`
  border: none;
  font-size: larger;
  margin-left: 1em;
  width: 150px;

  &:focus {
    outline: none;
  }
`;

function GithubUserLookup({ onGithubUserSelected, onExit }) {
  return (
    <div>
      <PhotoInputTitle>Enter Github Username to find photo</PhotoInputTitle>
      <PhotoInputControl>
        <GithubIcon />
        <PhotoInput
          type="text"
          autoFocus
          placeholder="Github Username"
          onKeyPress={e => {
            if (e.key === "Enter") {
              onGithubUserSelected(e);
              onExit();
            }

            if (e.keyCode === 27) {
              onExit();
            }
          }}
        />
      </PhotoInputControl>
    </div>
  );
}

export default GithubUserLookup;
