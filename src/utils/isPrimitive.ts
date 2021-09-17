export function isPrimitive(value: any): boolean {
  if (typeof value === "object") {
    return value === null;
  }
  return typeof value !== "function";
}
