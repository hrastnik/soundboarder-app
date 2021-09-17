export function isPromise(value: any) {
  return Boolean(value && typeof value.then === "function");
}
