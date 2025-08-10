import React from 'react';
import clsx from 'clsx';
import s from './ContentBox.module.scss';

export function ContentBox({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={clsx(s.ContentBox, className)}>{children}</div>;
}
