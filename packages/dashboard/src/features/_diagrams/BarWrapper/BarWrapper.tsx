import { BarDiagram, BarDiagramProps } from 'features/_diagrams/BarDiagram';
import s from './BarWrapper.module.scss';

export const BarWrapper = ({ data, labels, ...props }: BarDiagramProps & { labels?: string[] }) => {
  const COLORS = Array.from(new Set(data.map((item) => item.color)));
  return (
    <div className={s.BarWrapper}>
      <BarDiagram data={data} {...props} />
      <div className={s.BarWrapper__labels}>
        {labels &&
          labels.map((label, index) => (
            <div
              className={s.BarWrapper__label}
              key={index}
              style={{ '--color': `${COLORS[index]}` } as React.CSSProperties}>
              <div className={s.BarWrapper__color}></div>
              <div className={s.BarWrapper__name}>{label}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
