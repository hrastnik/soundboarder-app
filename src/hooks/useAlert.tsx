import { useContext } from "react";

import { AlertContext } from "~/components/AlertProvider";

export function useAlert() {
  const context = useContext(AlertContext);

  if (!context) throw new Error("Missing alert context");

  return context.alert;
}
