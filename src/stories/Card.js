import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

import Card from "../Card";

const stories = storiesOf("Card", module);
stories.addDecorator(withKnobs);
stories.add("basic", () => (
  <Card
    name="julz"
    photo="https://avatars2.githubusercontent.com/u/354013?v=3&s=72"
    onClick={action("clicked")}
  />
));
stories.add("no name, no photo", () => <Card onClick={action("clicked")} />);
stories.add("locked", () => (
  <Card onClick={action("clicked")} locked name="tom" />
));
stories.add("ghost", () => (
  <Card onClick={action("clicked")} ghost name="claudia" />
));
stories.add("edit mode", () => (
  <Card onClick={action("clicked")} editMode name="julia" />
));
stories.add("edit mode, with existing photo", () => (
  <Card
    onClick={action("clicked")}
    editMode
    name="julia"
    photo="https://avatars2.githubusercontent.com/u/354013?v=3&s=72"
  />
));
