import React, { ReactNode } from "react";
import { RootStoreInstance } from "./RootStore";
import { MSTContext } from "./MSTContext";

export function MSTProvider({
  children,
  store,
}: {
  children: ReactNode;
  store?: RootStoreInstance;
}) {
  return <MSTContext.Provider value={store}>{children}</MSTContext.Provider>;
}
