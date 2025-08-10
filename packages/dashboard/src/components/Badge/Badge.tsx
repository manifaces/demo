import clsx from 'clsx';
import { Link } from 'react-router-dom';
import s from './Badge.module.scss';

export interface BadgeProps {
  content: string;
  route?: string;
  className?: string;
}

export const Badge = ({ content, route, ...props }: BadgeProps) => {
  const changeType = content[0];
  const className = clsx(
    s.Badge,
    props.className,
    changeType === '+' ? s.Badge_up : changeType === '-' ? s.Badge_down : s.Badge_route
  );

  if (route) {
    return (
      <Link className={className} to={route}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
};
