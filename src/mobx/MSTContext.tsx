import { createContext } from "react";
import { RootStoreInstance } from "./RootStore";

export const MSTContext = createContext<RootStoreInstance | undefined>(
  undefined
);
