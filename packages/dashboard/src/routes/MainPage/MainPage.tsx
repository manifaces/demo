import { BarDiagram } from 'features/_diagrams/BarDiagram';
import s from './MainPage.module.scss';
import { dataA, dataB, dataC, dataD } from 'store/mockData';

export function MainPage() {
  return (
    <main className={s.MainPage}>
      <BarDiagram data={dataA} />
      <BarDiagram data={dataB} minmax={[0, 600000]} height={184} />
      <BarDiagram data={dataC} minmax={[0, 750000]} width={740} height={273} />
      <BarDiagram data={dataD} minmax={[0, 450]} width={740} height={241} gap={50} />
    </main>
  );
}
