import { LineBarDiagram, LineBarDiagramProps } from 'features/_diagrams/LineBarDiagram';
import s from './LineBarWrapper.module.scss';

export const LineBarWrapper = ({ data, colors, labels, ...props }: LineBarDiagramProps & { labels: string[] }) => {
  return (
    <div className={s.LineBarWrapper}>
      <LineBarDiagram data={data} colors={colors} labels={labels} {...props} />
      <div className={s.LineBarWrapper__labels}>
        {labels.map((label, index) => (
          <div
            className={s.LineBarWrapper__label}
            key={index}
            style={{ '--color': `${colors[index]}` } as React.CSSProperties}>
            <div className={s.LineBarWrapper__color}></div>
            <div className={s.LineBarWrapper__name}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
