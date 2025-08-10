import { CSSProperties, useCallback, useMemo, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';
import {
  formatChartXLabel,
  formatChartYLabel,
  formatChartYPercent,
  formatMonthNumber
} from 'utils/formatChartAxisLabel';
import { BarTooltip, SmallBarTooltip } from '../DiagramTooltip';
import s from './BarDiagram.module.scss';

export interface BarDiagramProps {
  data: {
    // значение по оси Х
    name: string | number;
    // значение по оси Y
    value: number;
    // дополнительное значение
    additionalValue?: string;
    // цвет конкретного Bar
    color: string;
    // изменение формата +/-{string}%
    change?: string | null;
    // конкретизация данных для вывода в BarTooltip, можно вывести текущий квартал
    tooltipValue?: string;
  }[];
  // диапазон по оси Y
  minmax?: number[];
  // ширина диаграммы
  width?: number;
  // высота диаграммы
  height?: number;
  // отступ между соседними Bar
  gap?: number;
  // преобразовать название месяца в число
  getMonthNumber?: boolean;
  // точные значения по оси Y
  ticks?: number[];
  // процентные значения
  getPercentValue?: boolean;
  // сокращать ли name
  shortName?: boolean;
  units?: string;
  smallTooltip?: boolean;
  dataKeyY?: string;
}

export const BarDiagram = ({
  data,
  minmax,
  width,
  height,
  gap,
  getMonthNumber,
  getPercentValue,
  ticks,
  shortName,
  units,
  smallTooltip,
  dataKeyY
}: BarDiagramProps) => {
  const COLORS = data.map((item) => item.color);
  const [showTooltip, setShowTooltip] = useState(false);
  const e = useRef<any>(null);

  const formatData = data.map((item) => {
    if (item.change) {
      return {
        ...item,
        change: parseInt(item.change),
        tooltipChange: item.change
      };
    } else {
      return {
        ...item
      };
    }
  });

  const handleMouseEnter = useCallback((ev: any) => {
    e.current = ev;
    setShowTooltip(true);
  }, []);

  const handleMouseLeave = useCallback((ev: any) => {
    e.current = ev;
    setShowTooltip(false);
  }, []);

  const tooltipContent = useCallback((e: any) => {
    return (
      <>
        {smallTooltip ? (
          <SmallBarTooltip
            color={e.color}
            change={e.tooltipChange}
            value={e.payload.value}
            tooltipValue={e.name}
            additionalValue={e.additionalValue}
            units={units || undefined}
          />
        ) : (
          <BarTooltip
            color={e.color}
            title={e.name}
            change={e.tooltipChange}
            value={e.payload.value}
            tooltipValue={e.tooltipValue}
          />
        )}
      </>
    );
  }, []);

  const barChart = useMemo(() => {
    return (
      <BarChart
        width={width || 556}
        height={height || 140}
        data={formatData}
        barCategoryGap={gap || 11}
        style={
          {
            '--chart-width': `${width?.toString() ?? 556}px`,
            '--chart-height': `${height?.toString() ?? 140}px`
          } as CSSProperties
        }>
        <XAxis
          tickFormatter={getMonthNumber ? formatMonthNumber : !shortName ? formatChartXLabel : (value) => value}
          dataKey="name"
          dy={2}
          padding={{ left: 8, right: 8 }}
          dx={shortName ? 0 : -4}
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={{ fontSize: 13, fill: '#616A7D', width: 170 }}
        />
        <YAxis
          width={40}
          tickFormatter={getPercentValue ? formatChartYPercent : formatChartYLabel}
          dx={-4}
          axisLine={false}
          tickLine={false}
          tickCount={4}
          interval={0}
          minTickGap={0}
          domain={minmax || [0, 6]}
          tick={{ fontSize: 13, fill: '#616A7D' }}
          ticks={ticks || undefined}
        />
        <CartesianGrid strokeDasharray="3 3" stroke="#E6EDFA" />
        <Bar
          dataKey={dataKeyY ?? 'value'}
          radius={[8, 8, 2, 2]}
          cursor="pointer"
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}>
          {formatData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    );
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {showTooltip && (
        <div
          style={{
            zIndex: 200,
            position: 'absolute',
            width: 'max-content',
            bottom: smallTooltip ? e.current.height + 20 : e.current.height,
            left: e.current.x + e.current.width / 2,
            transform: 'translate(-50%, -50%)'
          }}>
          {tooltipContent(e.current)}
        </div>
      )}
      <div className={s.BarDiagram}>{barChart}</div>
    </div>
  );
};
