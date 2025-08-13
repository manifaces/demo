import clsx from 'clsx';
import s from './CardChart.module.scss';
import { ReactNode } from 'react';

export interface CardChartProps {
  title: string;
  headerComponent?: ReactNode;
  children: ReactNode;
  className?: string;
  spaced?: boolean;
}

export const CardChart = ({ title, children, className, headerComponent, spaced = true }: CardChartProps) => {
  return (
    <div className={clsx(s.CardChart, className, spaced && s.CardChart_spaced)}>
      <div className={s.CardChart__headline}>
        <div className={s.CardChart__title}>{title}</div>
        {typeof headerComponent !== 'string' && headerComponent}
      </div>
      <div className={s.CardChart__content}>{children}</div>
    </div>
  );
};
