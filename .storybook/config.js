import { configure } from "@storybook/react";

function loadStories() {
  require("../src/stories/Card");
  require("../src/stories/ParkingLot");
  require("../src/stories/Track");
}

configure(loadStories, module);
