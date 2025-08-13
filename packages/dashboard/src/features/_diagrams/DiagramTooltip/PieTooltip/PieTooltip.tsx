import { Badge } from 'components/Badge';
import { CSSProperties } from 'react';
import s from './PieTooltip.module.scss';

export interface PieTooltipProps {
  color: string;
  title: string;
  value: number;
  valuePercent?: string;
  change: string;
}

export const PieTooltip = ({ color, title, value, valuePercent, change }: PieTooltipProps) => {
  return (
    <div className={s.PieTooltip}>
      <div className={s.PieTooltip__color} style={{ '--color': `${color}` } as CSSProperties}></div>
      <div className={s.PieTooltip__title}>{title}</div>
      {valuePercent && <div className={s.PieTooltip__valuePercent}>{`${valuePercent}%`}</div>}
      <div className={s.PieTooltip__value}>{`( ${value} )`}</div>
      <Badge content={change} className={s.PieTooltip__change} />
    </div>
  );
};
