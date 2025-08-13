import { PieDiagram, PieDiagramProps } from '../PieDiagram';
import s from './PieWrapper.module.scss';

export const PieWrapper = ({ data, label, gap }: PieDiagramProps & { gap?: number }) => {
  const labels = data.map((item) => {
    return {
      color: item.color,
      name: item.name
    };
  });

  return (
    <div className={s.PieWrapper} style={{ '--gap': gap ? `${gap}px` : '12px' } as React.CSSProperties}>
      <PieDiagram data={data} label={label || undefined} />
      <div className={s.PieWrapper__labels}>
        {labels.map((label, index) => (
          <div
            className={s.PieWrapper__label}
            key={index}
            style={{ '--color': `${label.color}` } as React.CSSProperties}>
            <div className={s.PieWrapper__color}></div>
            <div className={s.PieWrapper__name}>{label.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
