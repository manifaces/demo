import { CSSProperties, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { MultipleBarDiagramProps } from 'features/_diagrams/MultipleBarDiagram';
import { formatChartYLabel, formatChartXLabel } from 'utils/formatChartAxisLabel';
import { MultipleBarTooltip, MultipleBarTooltipPosition } from '../DiagramTooltip/MultipleBarTooltip';
import s from './HorizontalBarDiagram.module.scss';

export const HorizontalBarDiagram = ({
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
        position={MultipleBarTooltipPosition.right}
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
            top: e.current.y + e.current.height / 2,
            left: e.current.width + 160,
            transform: 'translate(0, -50%)'
          }}>
          {tooltipContent(e.current)}
        </div>
      )}
      <div className={s.HorizontalBarDiagram}>
        <BarChart
          layout="vertical"
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
            type="number"
            tickFormatter={formatChartYLabel}
            domain={minmax || [0, 6]}
            dy={2}
            dx={-4}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 13, fill: '#616A7D' }}
            tickCount={10}
          />
          <YAxis
            type="category"
            dataKey="name"
            tickFormatter={formatNames ? formatChartXLabel : undefined}
            dx={-4}
            width={142}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 13, fill: '#616A7D' }}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#E6EDFA" />
          {values.map((value, index) => (
            <Bar
              key={index}
              dataKey={value}
              radius={[2, 100, 100, 2]}
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
