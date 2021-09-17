import { useContext } from "react";

import { AlertContext } from "~/components/AlertProvider";

export function useAlert() {
  const context = useContext(AlertContext);

  if (context === undefined) return undefined;
  return context.alert;
}
