import { updateTrackTitle } from "./tracks.js";

it("deals with empty arrays", () => {
  expect(updateTrackTitle({index: 2, title: "hi"})).toEqual(["", "", "hi", ""])
})

it("updates the first title", () => {
  const updated = updateTrackTitle({
    state: ["", ""],
    index: 0,
    title: "new title"
  });

  expect(updated).toEqual(["new title", ""]);
});

it("updates at arbitrary positions", () => {
  const updated = updateTrackTitle({
    state: ["1", "2", "3", ""],
    index: 1,
    title: "new title"
  });

  expect(updated).toEqual(["1", "new title", "3", ""]);
});

it("updates at positions that dont exist yet", () => {
  const updated = updateTrackTitle({
    state: ["1", "2", "3", ""],
    index: 5,
    title: "new title"
  });

  expect(updated).toEqual(["1", "2", "3", "", "", "new title", ""]);
});

it("always ensures there's an empty track at the end", () => {
  const updated = updateTrackTitle({
    state: ["1", "2", ""],
    index: 2,
    title: "3"
  });

  expect(updated).toEqual(["1", "2", "3", ""]);
});

it("only allows one empty track at the end", () => {
  const updated = updateTrackTitle({
    state: ["1", "2", ""],
    index: 1,
    title: ""
  });

  expect(updated).toEqual(["1", ""]);
});

it("does not delete empty tracks in the middle", () => {
  const updated = updateTrackTitle({
    state: ["1", "", "2", "3", ""],
    index: 2,
    title: ""
  });

  expect(updated).toEqual(["1", "", "", "3", ""]);
});
