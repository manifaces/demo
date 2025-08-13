import clsx from 'clsx';
import s from './Divider.module.scss';

export function Divider({
  vertical,
  color: backgroundColor,
  className
}: {
  vertical?: boolean;
  color?: string;
  className?: string;
}) {
  return <div className={clsx(s.Divider, vertical && s.Divider_vertical, className)} style={{ backgroundColor }} />;
}
