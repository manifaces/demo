import { CSSProperties, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { formatChartYLabel, formatChartXLabel } from 'utils/formatChartAxisLabel';
import { MultipleBarTooltip } from '../DiagramTooltip/MultipleBarTooltip';
import s from './MultipleBarDiagram.module.scss';

export interface MultipleBarDiagramProps {
  data: {
    // имя по оси Х
    name: string;
    // массив значений по оси Y
    values: {
      [key: string]: number | null;
    };
    // массив изменений формата +/-{string}%
    changes?: (string | null)[];
  }[];
  // отображать ли MultipleBarTooltip
  tooltip?: boolean;
  // формат MultipleBarTooltip
  tooltipFormat?: 'simple' | 'nested';
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

export const MultipleBarDiagram = ({
  data,
  tooltip = false,
  tooltipFormat = 'simple',
  formatNames = false,
  colors,
  minmax,
  width,
  height,
  gap
}: MultipleBarDiagramProps) => {
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

  const values = Object.keys(data[0].values);

  const formatData = data.map((item) => {
    const valueObject: {
      [key: string]: any;
    } = {
      name: item.name,
      changes: item.changes,
      names: values,
      colors: colors
    };

    const objKeys = Object.keys(item.values);
    const objValues = Object.values(item.values);

    objValues.forEach((value, index) => {
      valueObject[objKeys[index]] = value;
    });

    return valueObject;
  });

  const tooltipContent = (e: any) => {
    const values = e.names.map((name: string) => {
      return e[name];
    });

    return (
      <MultipleBarTooltip
        colors={e.colors}
        title={e.name}
        changes={e.changes}
        names={e.names}
        values={values}
        tooltipFormat={tooltipFormat}
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
            transform: 'translate(-50%, -50px)'
          }}>
          {tooltipContent(e.current)}
        </div>
      )}
      <div className={s.MultipleBarDiagram}>
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
            tickFormatter={formatChartYLabel}
            dx={-4}
            axisLine={false}
            tickLine={false}
            tickCount={4}
            minTickGap={0}
            domain={minmax || [0, 6]}
            tick={{ fontSize: 13, fill: '#616A7D' }}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#E6EDFA" />
          {values.map((value, index) => (
            <Bar
              key={index}
              dataKey={value}
              radius={[4, 4, 0, 0]}
              fill={colors[index]}
              cursor={tooltip ? 'pointer' : 'default'}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
            />
          ))}
        </BarChart>
      </div>
    </div>
  );
};
