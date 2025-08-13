import { DynamicPercent } from 'components/DynamicPercent';
import { formatNumber } from 'utils/formatNumber';
import { EMDASH } from 'utils/UTF';
import s from './MoneyValue.module.scss';

export function MoneyValue({
  prevValue,
  dynamicPercent,
  children,
  decimals
}: {
  prevValue?: number | null;
  dynamicPercent?: number | null;
  children?: number | null;
  decimals?: number;
}) {
  return (
    <div className={s.MoneyValue}>
      <span>{Number.isFinite(children) ? `${formatNumber(children, decimals)} ₽` : EMDASH}</span>
      {Number.isFinite(prevValue) && (
        <span className={s.MoneyValue__prev}>{`(${formatNumber(prevValue, decimals)} ₽)`}</span>
      )}

      {dynamicPercent !== undefined && <DynamicPercent>{dynamicPercent}</DynamicPercent>}
    </div>
  );
}
