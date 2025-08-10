import React from 'react';
import { Badge } from 'components/Badge';
import { formatNumber } from 'utils/formatNumber';
import s from './LineBarTooltip.module.scss';

export interface LineBarTooltipProps {
  colors: string[];
  title: string;
  prevValue: number;
  currentValue: number;
  change: string;
  labels: string[];
}

export const LineBarTooltip = ({ colors, title, prevValue, currentValue, change, labels }: LineBarTooltipProps) => {
  return (
    <div className={s.LineBarTooltip}>
      <div className={s.LineBarTooltip__title}>{title}</div>
      <div className={s.LineBarTooltip__wrapper}>
        {labels.map((item, index) => (
          <div className={s.LineBarTooltip__item} key={index}>
            <div
              className={s.LineBarTooltip__color}
              style={{ '--color': `${colors[index]}` } as React.CSSProperties}></div>
            <div className={s.LineBarTooltip__year}>{item}</div>
            <div className={s.LineBarTooltip__value}>
              {index === 0 ? formatNumber(prevValue, 0) : formatNumber(currentValue, 0)}
            </div>
            {index !== 0 && <Badge content={change} className={s.LineBarTooltip__change} />}
          </div>
        ))}
      </div>
    </div>
  );
};
