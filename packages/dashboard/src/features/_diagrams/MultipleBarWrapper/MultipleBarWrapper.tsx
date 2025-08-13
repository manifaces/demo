import { HorizontalBarDiagram } from 'features/_diagrams/HorizontalBarDiagram';
import { MultipleBarDiagram, MultipleBarDiagramProps } from 'features/_diagrams/MultipleBarDiagram';
import s from './MultipleBarWrapper.module.scss';

export enum MultipleBarWrapperVariant {
  vertical = 'vertical',
  horizontal = 'horizontal'
}

export const MultipleBarWrapper = ({
  data,
  colors,
  labels,
  variant = MultipleBarWrapperVariant.vertical,
  ...props
}: MultipleBarDiagramProps & { variant?: MultipleBarWrapperVariant; labels: string[] }) => {
  return (
    <div className={s.MultipleBarWrapper}>
      {variant === 'vertical' ? (
        <MultipleBarDiagram data={data} colors={colors} {...props} />
      ) : (
        <HorizontalBarDiagram data={data} colors={colors} {...props} />
      )}
      <div className={s.MultipleBarWrapper__labels}>
        {labels.map((label, index) => (
          <div
            className={s.MultipleBarWrapper__label}
            key={index}
            style={{ '--color': `${colors[index]}` } as React.CSSProperties}>
            <div className={s.MultipleBarWrapper__color}></div>
            <div className={s.MultipleBarWrapper__name}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
