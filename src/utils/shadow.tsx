/**
 *
 * @param {number} depth - integer between 0 - 24 - creates a shadow that looks same accross platforms
 * Copied values from https://ethercreative.github.io/react-native-shadow-generator/
 */
export function shadow(depth = 0) {
  if (depth === 0) {
    return undefined;
  }

  const normalizedDepth = depth - 1;

  // prettier-ignore
  const shadowOpacity = [
    0.18, 0.20, 0.21, 0.23, 0.25, 0.27,
    0.28, 0.30, 0.32, 0.34, 0.35, 0.37,
    0.39, 0.41, 0.42, 0.44, 0.46, 0.48,
    0.49, 0.51, 0.53, 0.55, 0.56, 0.58
  ][normalizedDepth];
  // prettier-ignore
  const shadowRadius = [
     1.00,  1.41,  2.22,  2.62,  3.84,  4.65,
     4.65,  4.65,  5.46,  6.27,  6.68,  7.49,
     8.30,  9.11,  9.51, 10.32, 11.14, 11.95,
    12.35, 13.16, 13.97, 14.78, 15.19, 16.00
  ][normalizedDepth];

  // prettier-ignore
  const shadowHeight = [
    1, 1, 1, 2, 2, 3, 3,  4,  4,  5,  5,  6,
    6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12
  ][normalizedDepth];

  return {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: shadowHeight },
    shadowOpacity,
    shadowRadius,

    elevation: depth,
  };
}
