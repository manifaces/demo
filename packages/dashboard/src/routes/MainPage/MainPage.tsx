import { BarDiagram } from 'features/_diagrams/BarDiagram';
import s from './MainPage.module.scss';
import { dataA, dataB, dataC, dataD, dataE, dataF, dataG, dataH, dataI } from 'store/mockData';
import { PieWrapper } from 'features/_diagrams/PieWrapper';
import { AreaDiagram } from 'features/_diagrams/AreaDiagram';
import { LineBarWrapper } from 'features/_diagrams/LineBarWrapper';
import { MultipleBarWrapper, MultipleBarWrapperVariant } from 'features/_diagrams/MultipleBarWrapper';

export function MainPage() {
  return (
    <main className={s.MainPage}>
      <BarDiagram data={dataA} />
      <BarDiagram data={dataB} minmax={[0, 600000]} height={184} />
      <BarDiagram data={dataC} minmax={[0, 750000]} width={740} height={273} />
      <BarDiagram data={dataD} minmax={[0, 450]} width={740} height={241} gap={50} />
      <PieWrapper data={dataE} label="28%" gap={24} />
      <AreaDiagram data={dataF} minmax={[0, 9]} />
      <LineBarWrapper
        data={dataG}
        labels={['2022', '2023', 'Динамика посещаемости']}
        minmax={[0, 180000]}
        width={740}
        height={241}
        colors={['#9E99FF', '#5F58DE', '#FC9935']}
        formatNames={true}
        tooltip={true}
      />
      <MultipleBarWrapper
        data={dataH}
        labels={['2022', '2023']}
        minmax={[0, 150000]}
        width={740}
        height={241}
        colors={['#9E99FF', '#5F58DE']}
        formatNames={true}
        tooltip={true}
      />
      <MultipleBarWrapper
        data={dataI}
        minmax={[0, 90000]}
        width={1176}
        height={208}
        colors={['#6FAFFF', '#0E69E2', '#4D9CFF', '#27B973', '#EFA22F']}
        gap={30}
        tooltip={true}
        tooltipFormat="nested"
        labels={['Билетов реализовано', 'Онлайн', 'Оффлайн', 'Платных', 'Бесплатных']}
      />
      <MultipleBarWrapper
        variant={MultipleBarWrapperVariant.horizontal}
        data={dataI}
        minmax={[0, 90000]}
        width={1176}
        height={364}
        colors={['#6FAFFF', '#0E69E2', '#4D9CFF', '#27B973', '#EFA22F']}
        gap={6}
        tooltip={true}
        labels={['Всего реализовано', 'Реализовано онлайн', 'Реализовано оффлайн', 'Платных', 'Бесплатных']}
      />
    </main>
  );
}
