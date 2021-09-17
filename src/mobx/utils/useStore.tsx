import React from "react";
import { RootStoreInstance } from "../RootStore";
import { MSTContext } from "~/mobx/MSTContext";

export function useStore(): RootStoreInstance {
  const store = React.useContext(MSTContext);
  if (!store) {
    throw new Error("useStore called without Provider");
  }
  return store;
}
