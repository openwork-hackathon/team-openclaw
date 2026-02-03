'use client';

import React from 'react';
import Sparkline from './Sparkline';

export default function KpiCard({
  label,
  value,
  unit,
  change,
  trend,
  accent = 'cyan',
}: {
  label: string;
  value: string;
  unit?: string;
  change?: string;
  trend?: number[];
  accent?: 'cyan' | 'amber' | 'lime';
}) {
  const accentClass =
    accent === 'amber'
      ? 'border-amber-500/25 text-amber-200'
      : accent === 'lime'
        ? 'border-lime-500/25 text-lime-200'
        : 'border-cyan-500/25 text-cyan-200';

  return (
    <div className={`terminal-panel terminal-panel-hover border ${accentClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="terminal-label">{label}</div>
          <div className="flex items-baseline gap-2 mt-1">
            <div className="terminal-value tabular-nums">{value}</div>
            {unit ? <div className="terminal-unit">{unit}</div> : null}
          </div>
          {change ? <div className="terminal-sub mt-2">Δ {change}</div> : <div className="terminal-sub mt-2">&nbsp;</div>}
        </div>

        <div className="shrink-0 pt-1">
          <Sparkline
            data={trend || [1, 1.1, 1.05, 1.14, 1.22, 1.18, 1.26]}
            width={96}
            height={28}
          />
        </div>
      </div>
    </div>
  );
}
