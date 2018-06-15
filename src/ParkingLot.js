import React, { Fragment } from "react";
import styled from "styled-components";
import { bs, Checklist, ChecklistItem, Check } from "./common-styles";

const ParkingLotInput = styled.input`
  background: none;
  border: none;
  text-align: center;
  color: white;
  height: 2em;
  font-size: 12pt;

  text-align: left;
  width: 100%;
  padding: ${bs(1)};
  font-size: larger;

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${props => props.complete && ` text-decoration: line-through `};
`;

export default function ParkingLot({
  items,
  onCleanParkingLot,
  onCheck,
  onUpdate
}) {
  items = items || [];
  return (
    <Fragment>
      <Checklist style={{ gridArea: "parkinglot" }}>
        {items.map((item, i) => (
          <ChecklistItem key={i.toString()}>
            <Check onClick={() => onCheck(i)}>
              {item.complete && <span>&#10003;</span>}
            </Check>{" "}
            <ParkingLotInput
              complete={item.complete}
              onChange={e => onUpdate(e, i)}
              value={item.value || ""}
            />
          </ChecklistItem>
        ))}
      </Checklist>
    </Fragment>
  );
}
