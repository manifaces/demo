import { Badge } from 'components/Badge';
import s from './AreaTooltip.module.scss';

export const AreaTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={s.AreaTooltip}>
        <div className={s.AreaTooltip__title}>{payload[0].payload.tooltipValue}</div>
        <div className={s.AreaTooltip__wrapper}>
          <div
            className={s.AreaTooltip__color}
            style={{ '--color': `${payload[0].color}` } as React.CSSProperties}></div>
          <div className={s.AreaTooltip__name}>{`${payload[0].payload.name}:`}</div>
          <div className={s.AreaTooltip__value}>{payload[0].payload.value}</div>
          {payload[0].payload.change !== undefined && (
            <Badge content={payload[0].payload.change} className={s.AreaTooltip__change} />
          )}
        </div>
      </div>
    );
  }

  return null;
};
