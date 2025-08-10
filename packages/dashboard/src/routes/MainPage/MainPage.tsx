import { BarDiagram } from 'features/_diagrams/BarDiagram';
import s from './MainPage.module.scss';
import { dataA, dataB, dataC, dataD, dataE, dataF, dataG } from 'store/mockData';
import { PieWrapper } from 'features/_diagrams/PieWrapper';
import { AreaDiagram } from 'features/_diagrams/AreaDiagram';
import { LineBarWrapper } from 'features/_diagrams/LineBarWrapper';

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
    </main>
  );
}
