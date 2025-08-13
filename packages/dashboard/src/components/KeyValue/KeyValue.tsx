import { ReactNode } from 'react';
import s from './KeyValue.module.scss';

export function KeyValue({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={s.KeyValue}>
      <div className={s.KeyValue__label}>{label}</div>
      {children}
    </div>
  );
}
