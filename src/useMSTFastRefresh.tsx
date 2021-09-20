import { MutableRefObject, useRef } from "react";
import { DevSettings, ToastAndroid } from "react-native";
import { RootStoreInstance } from "./mobx/RootStore";

export function useMSTFastRefresh(
  rootStore: MutableRefObject<RootStoreInstance | undefined>
) {
  if (!__DEV__) return;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const prevStore = useRef(rootStore.current);

  if (
    prevStore.current &&
    rootStore.current &&
    rootStore.current !== prevStore.current
  ) {
    ToastAndroid?.show(
      "Store updated - Triggering app reload",
      ToastAndroid.SHORT
    );

    DevSettings.reload();
  }

  prevStore.current = rootStore.current;
}
