import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";

export interface PersonInstance extends Instance<typeof Person> {}
export interface PersonSnapshotIn extends SnapshotIn<typeof Person> {}
export interface PersonSnapshotOut extends SnapshotOut<typeof Person> {}

const { string, identifier } = types;

export const Person = types.model("Person", {
  url: identifier,
  name: string,
  height: string,
  mass: string,
  hair_color: string,
  skin_color: string,
  eye_color: string,
  birth_year: string,
  gender: string,
});
