export const milesToMeters = (miles: number, decimals = 2) => {
  const meters = miles * 1609.344;
  return meters.toFixed(decimals);
};
