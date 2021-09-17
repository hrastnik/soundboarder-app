export function getFileExtension(file: string) {
  return file.split(".").pop() || "";
}
