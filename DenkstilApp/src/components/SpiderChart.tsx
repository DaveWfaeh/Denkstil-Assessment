import React from 'react';
import { View } from 'react-native';
import Svg, { Polygon, Line, Circle, Text as SvgText, G } from 'react-native-svg';
import { Score } from '../types';

interface Props {
  scores: Score[];
  size: number;
}

// Order: A (top), B (right), C (bottom), D (left) — matches original
// Angles: i * 2π/4 - π/2 → A=-90°, B=0°, C=90°, D=180°
function getAngles(n: number): number[] {
  return Array.from({ length: n }, (_, i) => (i * 2 * Math.PI) / n - Math.PI / 2);
}

function polarToXY(cx: number, cy: number, angle: number, r: number) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

export default function SpiderChart({ scores, size }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.32;
  const angles = getAngles(4);

  const ringPoints = (r: number) =>
    angles.map((a) => {
      const p = polarToXY(cx, cy, a, r);
      return `${p.x},${p.y}`;
    }).join(' ');

  const dataPolygonPoints = scores.map((s, i) => {
    const r = (s.pct / 100) * R;
    const p = polarToXY(cx, cy, angles[i], r);
    return `${p.x},${p.y}`;
  }).join(' ');

  return (
    <View>
      <Svg width={size} height={size}>
        {/* Background rings */}
        {[1, 2, 3, 4, 5].map((ring) => (
          <Polygon
            key={ring}
            points={ringPoints((ring / 5) * R)}
            fill="none"
            stroke={ring === 5 ? '#c0c8e0' : '#e4e7f2'}
            strokeWidth={ring === 5 ? 1.5 : 1}
          />
        ))}

        {/* Axis lines */}
        {angles.map((angle, i) => {
          const end = polarToXY(cx, cy, angle, R);
          return (
            <Line
              key={i}
              x1={cx}
              y1={cy}
              x2={end.x}
              y2={end.y}
              stroke="#dde0ee"
              strokeWidth={1}
            />
          );
        })}

        {/* Data fill polygon */}
        <Polygon
          points={dataPolygonPoints}
          fill="rgba(38,128,194,0.22)"
          stroke="rgba(38,128,194,0.65)"
          strokeWidth={2.5}
        />

        {/* Data dots */}
        {scores.map((s, i) => {
          const r = (s.pct / 100) * R;
          const p = polarToXY(cx, cy, angles[i], r);
          return (
            <G key={i}>
              <Circle cx={p.x} cy={p.y} r={6} fill={s.color} />
              <Circle cx={p.x} cy={p.y} r={6} fill="none" stroke="white" strokeWidth={2} />
            </G>
          );
        })}

        {/* Labels outside */}
        {scores.map((s, i) => {
          const labelR = R + size * 0.1;
          const p = polarToXY(cx, cy, angles[i], labelR);
          return (
            <G key={`lbl-${i}`}>
              <SvgText
                x={p.x}
                y={p.y - 7}
                textAnchor="middle"
                fill={s.color}
                fontSize={14}
                fontWeight="bold"
              >
                {s.id}
              </SvgText>
              <SvgText
                x={p.x}
                y={p.y + 9}
                textAnchor="middle"
                fill="#333"
                fontSize={11}
              >
                {s.pct}%
              </SvgText>
            </G>
          );
        })}
      </Svg>
    </View>
  );
}
