import _ from "lodash";
import { getIdentifier, isStateTreeNode } from "mobx-state-tree";

/**
 *
 * @param instance A list of MST instances or a single MST Instance or any other value
 * @returns If the input param is a single MST instance the return value
 * is the instance identifier. If the input param is a list of MST instances,
 * the return value is a list of identifiers. If the input param is something else
 * entirely, the function will return it unchanged.
 */
export function getInstanceId(instance: any) {
  const instanceList = _.castArray(instance);
  const mapped = instanceList.map((instance) => {
    if (isStateTreeNode(instance)) return getIdentifier(instance);
    return instance;
  });

  return Array.isArray(instance) ? mapped : mapped[0];
}
