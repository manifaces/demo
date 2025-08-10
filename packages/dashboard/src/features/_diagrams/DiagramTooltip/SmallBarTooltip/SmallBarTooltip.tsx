import { Badge } from 'components/Badge';
import { formatNumber } from 'utils/formatNumber';
import s from './SmallBarTooltip.module.scss';

export interface SmallBarTooltipProps {
  color: string;
  value: number;
  change?: string;
  tooltipValue?: number;
  additionalValue?: string;
  units?: string;
}

export const SmallBarTooltip = ({
  color,
  value,
  tooltipValue,
  change,
  additionalValue,
  units
}: SmallBarTooltipProps) => {
  return (
    <div className={s.SmallBarTooltip}>
      <div className={s.SmallBarTooltip__wrapper}>
        <div className={s.SmallBarTooltip__color} style={{ '--color': `${color}` } as React.CSSProperties}></div>
        {tooltipValue && <div className={s.SmallBarTooltip__tooltipValue}>{`${tooltipValue}:`}</div>}
        <div
          className={
            s.SmallBarTooltip__value
          }>{`${additionalValue || ''} ${formatNumber(value, 0)}${units || ''}`}</div>
        {change !== undefined && <Badge content={change} className={s.SmallBarTooltip__change} />}
      </div>
    </div>
  );
};
