import { CSSProperties, useRef, useState } from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Line } from 'recharts';
import { formatChartYLabel, formatChartXLabel } from 'utils/formatChartAxisLabel';
import { LineBarTooltip } from '../DiagramTooltip/LineBarTooltip';
import s from './LineBarDiagram.module.scss';

export interface LineBarDiagramProps {
  data: {
    // имя по оси Х
    name: string;
    // значение по оси Y, используется для первого Bar
    prevValue: number;
    // значение по оси Y второго Bar, используется в тултипе
    currentValue: number;
    // значение по оси Y, используется для второго Bar, необходим для рендера дополнительной оси
    percent: number;
    // изменение формата +/-{string}%
    change: string;
    // текущее значение для линии
    lineValue: number;
  }[];
  // список лет / категорий / т.д.
  labels: string[];
  // отображать ли LineBarTooltip
  tooltip?: boolean;
  // сокращать ли name
  formatNames?: boolean;
  // массив цветов, используемых в каждой группе
  colors: string[];
  // диапазон по оси Y
  minmax?: number[];
  // ширина диаграммы
  width?: number;
  // высота диаграммы
  height?: number;
  // отступ между группами Bar
  gap?: number;
}

export const LineBarDiagram = ({
  data,
  tooltip = false,
  labels,
  formatNames = false,
  colors,
  minmax,
  width,
  height,
  gap
}: LineBarDiagramProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const e = useRef<any>(null);

  const handleMouseEnter = (ev: any) => {
    e.current = ev;
    setShowTooltip(true);
  };

  const handleMouseLeave = (ev: any) => {
    e.current = ev;
    setShowTooltip(false);
  };

  const formatData = data.map((item) => {
    const valueObject: {
      [key: string]: any;
    } = {
      name: item.name,
      prevValue: item.prevValue,
      currentValue: item.currentValue,
      change: item.change,
      percent: item.percent,
      lineValue: item.lineValue,
      colors: colors,
      labels: labels
    };

    return valueObject;
  });

  const tooltipContent = (e: any) => {
    return (
      <LineBarTooltip
        colors={e.colors}
        title={e.name}
        change={e.change}
        prevValue={e.prevValue}
        currentValue={e.currentValue}
        labels={e.labels.slice(0, -1)}
      />
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      {showTooltip && (
        <div
          style={{
            zIndex: 200,
            position: 'absolute',
            bottom: e.current.height,
            left: e.current.x + e.current.width / 2,
            transform: 'translate(-50%, -50%)'
          }}>
          {tooltipContent(e.current)}
        </div>
      )}
      <div className={s.LineBarDiagram}>
        <ComposedChart
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
            tickFormatter={formatNames ? formatChartXLabel : undefined}
            dataKey="name"
            dy={2}
            padding={{ left: 8, right: 8 }}
            dx={-4}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 13, fill: '#616A7D', width: 184 }}
            interval={0}
          />
          <YAxis
            orientation="left"
            yAxisId="left"
            tickFormatter={formatChartYLabel}
            dx={-4}
            axisLine={false}
            tickLine={false}
            tickCount={4}
            minTickGap={0}
            domain={minmax || [0, 6]}
            type="number"
            tick={{ fontSize: 13, fill: '#616A7D' }}
          />
          <YAxis
            orientation="right"
            yAxisId="right"
            axisLine={false}
            tickLine={false}
            tickCount={4}
            minTickGap={0}
            type="number"
            domain={[0, 150]}
            unit={'%'}
            tick={{ fontSize: 13, fill: '#616A7D' }}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#E6EDFA" />
          <Bar
            dataKey="prevValue"
            yAxisId="left"
            radius={[100, 100, 2, 2]}
            fill={colors[0]}
            cursor={tooltip ? 'pointer' : 'default'}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
          />
          <Bar
            dataKey="percent"
            yAxisId="right"
            radius={[100, 100, 2, 2]}
            fill={colors[1]}
            cursor={tooltip ? 'pointer' : 'default'}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
          />
          <Line
            yAxisId="left"
            dot={false}
            strokeWidth={2}
            strokeLinecap="round"
            type="monotone"
            dataKey="lineValue"
            stroke={colors[3] || '#FC9935'}
          />
        </ComposedChart>
      </div>
    </div>
  );
};
