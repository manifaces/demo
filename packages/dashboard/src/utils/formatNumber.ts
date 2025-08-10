import { EMDASH, QUARTERSP } from './UTF';

/**
 * Форматирует число в русской локали с пробелами-разделителями и запятой
 *
 * @param number - число
 * @param decimals - количество знаков после запятой
 * @param hideTrailingZeroes - убрать ли крайние правые нули
 */
export function formatNumber(number: number | null | undefined, decimals = 2, hideTrailingZeroes = false) {
  if (number === null || number === undefined) return EMDASH;
  const withTrailingZeroes = Number(number).toFixed(decimals);
  const baseNumber = hideTrailingZeroes ? String(parseFloat(withTrailingZeroes)) : withTrailingZeroes;
  const formattedNum = baseNumber.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1' + QUARTERSP).replace('.', ',');
  if (formattedNum === 'NaN') return EMDASH;
  if (formattedNum === 'Infinity') return EMDASH;
  return formattedNum;
}
