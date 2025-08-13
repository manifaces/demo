import { Outlet, ScrollRestoration } from 'react-router-dom';
import s from './BaseLayout.module.scss';
import { ContentBox } from 'components/ContentBox';

export function BaseLayout() {
  return (
    <div className={s.BaseLayout}>
      <ScrollRestoration />
      <ContentBox className={s.UserLayout__content}>
        <Outlet />
      </ContentBox>
    </div>
  );
}
