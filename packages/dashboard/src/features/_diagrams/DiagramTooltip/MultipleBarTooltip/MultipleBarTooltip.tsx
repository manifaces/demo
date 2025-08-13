import React from 'react';
import clsx from 'clsx';
import { Badge } from 'components/Badge';
import { formatNumber } from 'utils/formatNumber';
import s from './MultipleBarTooltip.module.scss';

export enum MultipleBarTooltipPosition {
  top = 'top',
  right = 'right'
}

export interface MultipleBarTooltipProps {
  colors: string[];
  title: string;
  values: number[];
  names: string[];
  changes: (string | null)[];
  tooltipFormat: 'simple' | 'nested';
  position?: MultipleBarTooltipPosition;
}

export const MultipleBarTooltip = ({
  colors,
  title,
  values,
  names,
  changes,
  tooltipFormat,
  position = MultipleBarTooltipPosition.top
}: MultipleBarTooltipProps) => {
  return (
    <div
      className={clsx(
        s.MultipleBarTooltip,
        s[`MultipleBarTooltip_${tooltipFormat}`],
        s[`MultipleBarTooltip_${position}`]
      )}>
      <div className={s.MultipleBarTooltip__title}>{title}</div>
      <div className={s.MultipleBarTooltip__wrapper}>
        {names.map((_, index) => (
          <React.Fragment key={index}>
            {tooltipFormat === 'nested' && index === 1 && (
              <div className={s.MultipleBarTooltip__item}>
                <div
                  className={s.MultipleBarTooltip__color}
                  style={{ '--color': `${colors[index]}` } as React.CSSProperties}></div>
                <div className={s.MultipleBarTooltip__name}>{`Реализовано:`}</div>
              </div>
            )}
            <div
              className={s.MultipleBarTooltip__item}
              style={{ marginLeft: tooltipFormat === 'nested' && (index === 1 || index === 2) ? 12 : 0 }}>
              <div
                className={s.MultipleBarTooltip__color}
                style={{ '--color': `${colors[index]}` } as React.CSSProperties}></div>
              <div className={s.MultipleBarTooltip__name}>{`${names[index]}:`}</div>
              <div className={s.MultipleBarTooltip__value}>{formatNumber(values[index], 0)}</div>
              {changes[index] && <Badge content={changes[index] as string} className={s.MultipleBarTooltip__change} />}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
