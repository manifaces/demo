import { clusterData, dataA, dataB, dataC, diagramsData } from 'store/mockData';
import { PieWrapper } from 'features/_diagrams/PieWrapper';
import { AreaDiagram } from 'features/_diagrams/AreaDiagram';
import { LineBarWrapper } from 'features/_diagrams/LineBarWrapper';
import { BarWrapper } from 'features/_diagrams/BarWrapper';
import s from './MainPage.module.scss';
import { CardChart } from 'components/CardChart';
import { Badge } from 'components/Badge';
import { Divider } from 'components/Divider';
import { KeyValue, MoneyValue } from 'components/KeyValue';
import { getDynamicPercent } from 'utils/getDynamicPercent';
import { SoldTicket } from './_sections/SoldTicket';

export function MainPage() {
  return (
    <main className={s.MainPage}>
      <h1 className={s.MainPage__title}>Дашборд</h1>

      <CardChart title="Посещаемость">
        <div className={s.MainPage__diagram}>
          <BarWrapper data={dataA} height={194} labels={['1кв.', '2кв.', '3кв.', '4кв.']} />
          <Divider />
          <div className={s.MainPage__dynamics}>
            <div className={s.MainPage__change}>Динамика относительного предыдущего отчетного периода</div>
            <Badge content={'+5.11%'} />
          </div>
        </div>
      </CardChart>

      <CardChart title="Удовлетворенность услугами">
        <div className={s.MainPage__diagram}>
          <AreaDiagram data={dataB} minmax={[0, 9]} />
          <Divider />
          <div className={s.MainPage__dynamics}>
            <div className={s.MainPage__change}>Динамика относительного предыдущего отчетного периода</div>
            <Badge content={'+9.10%'} />
          </div>
        </div>
      </CardChart>

      <CardChart title="Средняя зарплата в учреждении">
        <div className={s.MainPage__diagram}>
          <LineBarWrapper
            data={dataC}
            labels={['2022', '2023', 'Динамика зарплаты']}
            minmax={[0, 180000]}
            width={1176}
            height={241}
            colors={['#9E99FF', '#5F58DE', '#FC9935']}
            formatNames={true}
            tooltip={true}
          />
          <Divider />
          <KeyValue label={'Средняя зарплата в учреждении в текущем (прошлом) году'}>
            <MoneyValue prevValue={72062} dynamicPercent={getDynamicPercent(92062, 72062)}>
              {92062}
            </MoneyValue>
          </KeyValue>
        </div>
      </CardChart>

      {diagramsData.map((item, index) => (
        <CardChart key={index} title={item.title}>
          <div className={s.MainPage__diagram}>
            <PieWrapper data={item.data} gap={24} label={item.label} />
            <Divider />
            <div className={s.MainPage__dynamics}>
              <div className={s.MainPage__change}>{item.dynamicText}</div>
              <Badge content={item.dynamicValue} />
            </div>
          </div>
        </CardChart>
      ))}

      <SoldTicket />

      <CardChart title="Кинокластер">
        <div className={s.MainPage__graphs}>
          {clusterData.map((item, index) => (
            <CardChart key={index} title={item.title}>
              <div className={s.MainPage__diagram}>
                <BarWrapper
                  data={item.data}
                  width={340}
                  height={184}
                  labels={item.labels}
                  gap={4}
                  getMonthNumber={true}
                  minmax={item.minmax || [0, 340]}
                />
                <Divider />
                <div className={s.MainPage__dynamics}>
                  <div className={s.MainPage__change}>{item.dynamicText}</div>
                  <Badge content={item.dynamicValue} />
                </div>
              </div>
            </CardChart>
          ))}
        </div>
      </CardChart>
    </main>
  );
}
