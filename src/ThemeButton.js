import React, { Fragment } from "react";
import styled from "styled-components";
import Popover from "react-popover";
import { FormatColorFill as FormatIcon } from "styled-icons/material";
import { SwatchesPicker } from "react-color";

import { bs } from "./common-styles";

const FormatButton = FormatIcon.extend`
  width: ${bs(1)};
  height: ${bs(1)};
  cursor: pointer;
`;

const Palette = styled.div`
  padding: ${bs(2)};
  width: 700px;
  height: 300px;
  background: white;
  border: 4px solid rgba(255, 255, 255, 0.4);
  border-radius: 9px;
  color: black;
  display: flex;
  align-items: center;
`;

const BorderedSwatchPicker = styled(SwatchesPicker)`
  border: 1px solid black;
`;

export default class ThemeButton extends React.Component {
  state = {
    open: false
  };

  render() {
    // hi, I'd like to perform a hack
    document.body.style.background = `radial-gradient( ${
      this.props.theme["background-1"]
    }, ${this.props.theme["background-2"]})`;

    const themePalette = (
      <Palette>
        <span>Background Gradient:</span>{" "}
        <BorderedSwatchPicker
          color={this.props.theme["background-1"]}
          onChange={color => {
            this.props.onSelectThemeColor("background-1", color);
          }}
        />
        <span style={{ margin: "12px" }}>→</span>
        <BorderedSwatchPicker
          color={this.props.theme["background-2"]}
          onChange={color => {
            this.props.onSelectThemeColor("background-2", color);
          }}
        />
      </Palette>
    );

    return (
      <div style={{ position: "relative" }}>
        <Popover
          isOpen={this.state.open}
          onOuterAction={() => this.setState({ open: false })}
          place="left"
          preferPlace="left"
          body={themePalette}
        >
          <FormatButton
            onClick={() => this.setState(s => ({ open: !s.open }))}
          />
        </Popover>
      </div>
    );
  }
}
