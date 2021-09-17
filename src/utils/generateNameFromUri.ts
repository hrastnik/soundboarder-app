export function generateNameFromUri(uri: string) {
  const baseName = uri.replace(/^.*[\\/]/, "");
  return baseName;
}
