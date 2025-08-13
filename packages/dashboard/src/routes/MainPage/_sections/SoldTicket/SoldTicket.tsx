import { MultipleBarWrapper, MultipleBarWrapperVariant } from 'features/_diagrams/MultipleBarWrapper';
import s from './SoldTicket.module.scss';
import { dataD } from 'store/mockData';
import { CardChart } from 'components/CardChart';
import { useState } from 'react';

export const SoldTicket = () => {
  const [changeView, setChangeView] = useState(false);
  return (
    <div className={s.SoldTicket}>
      <CardChart
        title="Топ 5 по количеству реализованных билетов"
        headerComponent={
          <div
            className={s.SoldTicket__changeView}
            onClick={() => {
              setChangeView(!changeView);
            }}>
            Сменить вид
          </div>
        }>
        <div className={s.SoldTicket__diagram}>
          {changeView ? (
            <MultipleBarWrapper
              data={dataD}
              minmax={[0, 90000]}
              width={1176}
              height={208}
              colors={['#6FAFFF', '#0E69E2', '#4D9CFF', '#27B973', '#EFA22F']}
              gap={30}
              tooltip={true}
              tooltipFormat="nested"
              labels={['Билетов реализовано', 'Онлайн', 'Оффлайн', 'Платных', 'Бесплатных']}
            />
          ) : (
            <MultipleBarWrapper
              variant={MultipleBarWrapperVariant.horizontal}
              data={dataD}
              minmax={[0, 90000]}
              width={1176}
              height={364}
              colors={['#6FAFFF', '#0E69E2', '#4D9CFF', '#27B973', '#EFA22F']}
              gap={6}
              tooltip={true}
              labels={['Всего реализовано', 'Реализовано онлайн', 'Реализовано оффлайн', 'Платных', 'Бесплатных']}
            />
          )}
        </div>
      </CardChart>
    </div>
  );
};
