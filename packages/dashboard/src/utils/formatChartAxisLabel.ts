// TODO: строгая типизация
export const formatChartYLabel = (value: any) => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(0) + 'M';
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(0) + 'M';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(0) + 'K';
  }
  return value.toString();
};

export const formatChartYPercent = (value: any) => {
  return `${value}%`;
};

export const formatChartXLabel = (value: any) => {
  return typeof value === 'string' ? value.slice(0, 3) : value;
};

const monthsValues = {
  Январь: 1,
  Февраль: 2,
  Март: 3,
  Апрель: 4,
  Май: 5,
  Июнь: 6,
  Июль: 7,
  Август: 8,
  Сентябрь: 9,
  Октябрь: 10,
  Ноябрь: 11,
  Декабрь: 12
};

export const formatMonthNumber = (value: any) => {
  return monthsValues[value as keyof typeof monthsValues];
};
