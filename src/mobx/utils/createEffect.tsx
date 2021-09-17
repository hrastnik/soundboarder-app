import { reaction } from "mobx";

export function createEffect<T>(
  effect: (prevDeps: T) => any,
  getDeps: () => T
) {
  let cleanup: ReturnType<typeof effect> | undefined = undefined;
  const dispose = reaction(
    getDeps,
    (_deps, prevDeps) => {
      if (typeof cleanup === "function") {
        cleanup();
      }
      cleanup = effect(prevDeps as unknown as T);
    },
    { fireImmediately: true }
  );

  return function disposeAndCleanup() {
    if (typeof cleanup === "function") {
      cleanup();
    }
    dispose();
  };
}
