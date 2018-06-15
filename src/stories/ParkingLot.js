import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ParkingLot from "../ParkingLot";

function withBackground(c) {
  return (
    <div
      style={{
        background: "gray",
        width: 500,
        height: 500,
        border: "1px solid #ccc"
      }}
    >
      {c}
    </div>
  );
}

const stories = storiesOf("Parking Lot", module);
stories.add("Empty", () => {
  return withBackground(<ParkingLot />);
});

stories.add("Items", () => {
  return withBackground(
    <ParkingLot items={[{ value: "Item One" }, { value: "Item Two" }]} />
  );
});

stories.add("Checked", () => {
  return withBackground(
    <ParkingLot
      items={[{ value: "Item One", complete: true }, { value: "Item Two" }]}
    />
  );
});
