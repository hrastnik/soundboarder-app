import { SnapshotIn } from "mobx-state-tree";
import { $nonEmptyObject } from "mobx-state-tree/dist/internal";

// Same as Partial, but recursive
// Makes all properties of object T optional
type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type SetterArg<Self> = DeepPartial<
  Exclude<SnapshotIn<Self>, typeof $nonEmptyObject>
>;
