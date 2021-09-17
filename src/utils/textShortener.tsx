/**
 *
 * @param {string} text - text to be shortened
 * @param {number} minLength - minimum short text length, after minLength it searches for dot (.) and ends sentance there
 * Returns shortened sentance (with dot on end)
 */
function textShortener(text: string, minLength?: number, maxLength = 200) {
  if (typeof minLength !== "number") minLength = 100;
  if (typeof text !== "string") return "";
  if (text.length < minLength) return text;

  const short =
    text.substring(0, minLength) +
    text.substring(minLength, text.length).split(".")[0] +
    ".";
  if (short.length < maxLength) return short;
  return short.substr(0, maxLength) + "...";
}

export { textShortener };
