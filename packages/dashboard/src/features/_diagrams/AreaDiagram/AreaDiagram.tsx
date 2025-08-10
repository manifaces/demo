import { CSSProperties } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { AreaTooltip } from '../DiagramTooltip/AreaTooltip';
import s from './AreaDiagram.module.scss';

export interface AreaDiagramProps {
  // данные
  data: {
    name: string;
    value: number;
    change?: string;
    tooltipValue?: string;
  }[];
  // диапазон по оси Y
  minmax?: number[];
  // ширина диаграммы
  width?: number;
  // высота диаграммы
  height?: number;
  // заливка области
  fill?: string;
  // цвет линии
  stroke?: string;
}

export const AreaDiagram = ({ data, minmax, width, height, fill, stroke }: AreaDiagramProps) => {
  const tooltipContent = (e: any) => {
    return <AreaTooltip payload={e} />;
  };
  return (
    <div className={s.AreaDiagram}>
      <AreaChart
        width={width || 556}
        height={height || 220}
        data={data}
        style={
          {
            '--chart-width': `${width?.toString() ?? 556}px`,
            '--chart-height': `${height?.toString() ?? 140}px`
          } as CSSProperties
        }>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          dy={2}
          padding={{ left: 40, right: 40 }}
          dx={-4}
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={{ fontSize: 13, fill: '#616A7D', width: 100 }}
        />
        <YAxis
          width={40}
          dx={-4}
          axisLine={false}
          tickLine={false}
          tickCount={4}
          interval={0}
          minTickGap={0}
          domain={minmax || [0, 6]}
          tick={{ fontSize: 13, fill: '#616A7D' }}
        />
        <Tooltip content={tooltipContent(data)} />
        <Area
          type="monotone"
          dataKey="value"
          dot={{ stroke: stroke || '#2482FF', strokeWidth: 2, fill: '#fff', r: 4 }}
          stroke={stroke || '#2482FF'}
          strokeWidth={2}
          fill={fill || '#9E99FF'}
          fillOpacity="1"
          cursor={'pointer'}
        />
      </AreaChart>
    </div>
  );
};
