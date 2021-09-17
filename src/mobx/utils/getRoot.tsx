import { getRoot as MSTgetRoot, IAnyStateTreeNode } from "mobx-state-tree";
import { RootStoreInstance } from "../RootStore";

export function getRoot(target: IAnyStateTreeNode): RootStoreInstance {
  return MSTgetRoot(target);
}
