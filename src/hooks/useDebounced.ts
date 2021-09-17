import { useState, useEffect } from "react";

export function useDebounced<T>(state: T, delayMs: number) {
  const [debounced, setDebounced] = useState(state);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(state);
    }, delayMs);

    return () => clearTimeout(id);
  }, [delayMs, state]);

  return debounced;
}
