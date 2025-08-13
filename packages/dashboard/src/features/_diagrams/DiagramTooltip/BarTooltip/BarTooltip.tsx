import { Badge } from 'components/Badge';
import s from './BarTooltip.module.scss';
import { formatNumber } from 'utils/formatNumber';

export interface BarTooltipProps {
  color: string;
  title: string;
  value: number;
  change?: string;
  tooltipValue?: number;
}

export const BarTooltip = ({ color, title, value, tooltipValue, change }: BarTooltipProps) => {
  return (
    <div className={s.BarTooltip}>
      <div className={s.BarTooltip__title}>{title}</div>
      <div className={s.BarTooltip__wrapper}>
        <div className={s.BarTooltip__color} style={{ '--color': `${color}` } as React.CSSProperties}></div>
        {tooltipValue && <div className={s.BarTooltip__tooltipValue}>{`${tooltipValue}`}</div>}
        <div className={s.BarTooltip__value}>{formatNumber(value, 0)}</div>
        {change !== undefined && <Badge content={change} className={s.BarTooltip__change} />}
      </div>
    </div>
  );
};
