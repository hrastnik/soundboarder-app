import { MutableRefObject, useRef } from "react";
import { applySnapshot, getSnapshot } from "mobx-state-tree";

import { RootStoreInstance } from "./mobx/RootStore";

export function useMSTFastRefresh(
  rootStore: MutableRefObject<RootStoreInstance | undefined>
) {
  if (!__DEV__) return;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const prevStore = useRef(rootStore.current);

  // If both are unset, do nothing
  if (!prevStore.current && !rootStore.current) {
    return;
  }

  // When store from props gets set first time - save it to prevStore
  if (!prevStore.current && rootStore.current) {
    prevStore.current = rootStore.current;
    return;
  }

  // When store from props is different from firstStore, sync it and update.
  if (
    rootStore.current &&
    prevStore.current &&
    rootStore.current !== prevStore.current
  ) {
    const prevSnapshot = getSnapshot(prevStore.current);

    try {
      applySnapshot(rootStore.current, prevSnapshot);
      rootStore.current.navigationStore.setNavigation(
        prevStore.current.navigationStore.navigation
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to apply previous snapshot: ${error.message}`);
      }

      console.log(error);

      throw new Error("Unknown error in MSTFastRefresh");
    }

    prevStore.current = rootStore.current;
  }
}
