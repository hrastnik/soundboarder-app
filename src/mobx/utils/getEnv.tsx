import { getEnv as MSTgetEnv, IAnyStateTreeNode } from "mobx-state-tree";

import { Environment } from "../createStore";

export function getEnv(target: IAnyStateTreeNode): Environment {
  return MSTgetEnv(target);
}
