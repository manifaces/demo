import { useRef, useState, useLayoutEffect } from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';
import { PieTooltip } from '../DiagramTooltip';
import s from './PieDiagram.module.scss';
export interface PieDiagramProps {
  data: {
    name: string;
    valuePercent: number;
    value: string;
    change: string;
    color: string;
  }[];
  label?: string;
  hideTooltip?: boolean;
}

export const PieDiagram = ({ data, label, hideTooltip = true }: PieDiagramProps) => {
  const COLORS = data.map((item) => item.color);

  const [showTooltip, setShowTooltip] = useState(false);
  const e = useRef<any>(null);

  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  const diagramRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const diagram = diagramRef.current;
    function updatePosition(e: any) {
      const rect = diagram?.getBoundingClientRect();
      setPosition({
        x: rect?.left ? (rect.left - e.clientX) * -1 : e.clientX,
        y: rect?.top ? e.clientY - rect.top : e.clientY
      });
    }
    diagram?.addEventListener('mousemove', updatePosition);
    return () => diagram?.removeEventListener('mousemove', updatePosition);
  }, []);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseMove = (ev: any) => {
    e.current = ev;
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const tooltipContent = (e: any) => {
    return (
      <PieTooltip
        color={e.payload.payload.color}
        title={e.name}
        value={e.payload.payload.name}
        valuePercent={e.payload.payload.valuePercent}
        change={e.change}
      />
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      {showTooltip && hideTooltip && (
        <div
          style={{
            zIndex: 200,
            position: 'absolute',
            top: position.y,
            left: position.x,
            transform: 'translate(20px, -50%)'
          }}>
          {tooltipContent(e.current)}
        </div>
      )}
      <div className={s.PieDiagram} ref={diagramRef}>
        <PieChart width={180} height={200}>
          <Pie
            data={data}
            innerRadius={55}
            outerRadius={80}
            cornerRadius={6}
            startAngle={-270}
            paddingAngle={4}
            dataKey="valuePercent"
            cursor={hideTooltip ? 'pointer' : 'default'}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            {label && (
              <Label position="center" style={{ fontSize: '16px', fontWeight: '500', fill: 'rgba(0, 0, 0, 0.87)' }}>
                {label}
              </Label>
            )}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
};
