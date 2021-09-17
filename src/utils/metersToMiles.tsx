export const metersToMiles = (meters: number, decimals = 2) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(decimals);
};
