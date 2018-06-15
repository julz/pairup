import update from "immutability-helper";

export function updateTrackTitle({ state, index, title }) {
  const updated = [...update(state || [], { [index]: { $set: title } })].map(s => s || "");

  // only one "" at the end
  if (updated[updated.length - 2] == "" && updated[updated.length - 1] == "") {
    return updated.slice(0, updated.length - 1);
  }

  // at least one "" at the end
  return updated[updated.length - 1] != "" ? updated.concat("") : updated;
}
