'use client';

import React from 'react';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Sparkline({
  data,
  width = 96,
  height = 24,
  stroke = '#22d3ee',
  fill = 'rgba(34, 211, 238, 0.12)',
}: {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
}) {
  const values = data.length ? data : [0, 0, 0, 0, 0];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const pad = 2;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;

  const pts = values.map((v, i) => {
    const x = pad + (innerW * i) / (values.length - 1 || 1);
    const y = pad + innerH - ((v - min) / range) * innerH;
    return [x, y] as const;
  });

  const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
  const area = `${d} L ${(pad + innerW).toFixed(2)} ${(pad + innerH).toFixed(2)} L ${pad.toFixed(2)} ${(pad + innerH).toFixed(2)} Z`;

  // subtle up/down hint based on last delta
  const delta = values[values.length - 1] - values[0];
  const stroke2 = delta >= 0 ? stroke : '#fb7185';
  const fill2 = delta >= 0 ? fill : 'rgba(251, 113, 133, 0.12)';

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <path d={area} fill={fill2} />
      <path d={d} fill="none" stroke={stroke2} strokeWidth={1.5} strokeLinecap="round" />
      <circle
        cx={pts[pts.length - 1][0]}
        cy={pts[pts.length - 1][1]}
        r={1.8}
        fill={stroke2}
        opacity={0.9}
      />
      {/* scanline */}
      <rect x={0} y={0} width={width} height={height} fill="url(#scan)" opacity={0.25} />
      <defs>
        <linearGradient id="scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="50%" stopColor="#000" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
