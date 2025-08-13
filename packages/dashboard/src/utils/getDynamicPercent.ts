export const getDynamicPercent = (currentValue: number | null, prevValue: number | null) => {
  if (currentValue === null || prevValue === null) return null;
  return (currentValue / prevValue) * 100 - 100;
};
