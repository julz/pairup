import React from "react";
import styled, { keyframes } from "styled-components";
import { tada } from "react-animations";

const shuffleAnimation = keyframes`${tada}`;

const ShuffleAnimation = styled.div`
  ${props => props.animate && `animation: 0.5s ${shuffleAnimation};`};
`;

export default function withShuffleAnimation(WrappedComponent, condition) {
  return class extends React.Component {
    render() {
      return (
        <ShuffleAnimation animate={condition(this.props)}>
          <WrappedComponent {...this.props} />
        </ShuffleAnimation>
      );
    }
  };
}
