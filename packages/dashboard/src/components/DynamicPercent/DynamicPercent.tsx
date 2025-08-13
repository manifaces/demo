import clsx from 'clsx';
import { formatNumber } from 'utils/formatNumber';
import s from './DynamicPercent.module.scss';

export function DynamicPercent({ children }: { children?: number | null }) {
  if (!Number.isFinite(children)) return <div className={clsx(s.DynamicPercent)}>н/д</div>;
  // тип гарантируется Number.isFinite()
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  const value = children as number;
  return (
    <div
      className={clsx(
        s.DynamicPercent,
        value > 0 && s.DynamicPercent_positive,
        value < 0 && s.DynamicPercent_negative
      )}>{`${value > 0 ? '+' : ''}${formatNumber(value)}%`}</div>
  );
}
