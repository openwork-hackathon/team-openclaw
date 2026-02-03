'use client';

import { useEffect, useState } from 'react';

export default function GeoPulse() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/geo')
      .then(res => res.json())
      .then(data => {
        setNews(data.news || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="animate-pulse text-slate-500 text-center py-10">Scanning global signals...</div>;

  const fallbackTopics = [
    { label: 'Monitoring', value: 'Israel-Gaza / Tariffs / China-Taiwan' },
    { label: 'Bias', value: 'Neutral risk (range-bound)' },
    { label: 'Next update', value: 'Hourly (cron)' },
  ];

  const sentimentBadge = (s: string) => {
    const cls =
      s === 'positive'
        ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-200'
        : s === 'negative'
          ? 'border-rose-500/25 bg-rose-500/10 text-rose-200'
          : 'border-slate-500/25 bg-slate-500/10 text-slate-200';

    return (
      <span className={`badge font-terminal text-[10px] ${cls}`}> {String(s).toUpperCase()} </span>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Signals list */}
      <div className="lg:col-span-2 space-y-3">
        {(news?.length ? news : []).slice(0, 4).map((item, i) => (
          <div key={i} className="border-l-2 border-amber-500/50 pl-4 py-2">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-slate-200 font-medium truncate">{item.title}</div>
                <div className="mt-1 text-xs text-slate-400 line-clamp-2">{item.summary}</div>
              </div>
              {sentimentBadge(item.sentiment)}
            </div>
            <div className="mt-2 flex items-center gap-2 font-terminal text-[10px] text-slate-500">
              <span>impact</span>
              <span className="text-slate-300">{typeof item.impactScore === 'number' ? item.impactScore.toFixed(2) : '—'}</span>
              <span className="text-slate-700">|</span>
              <span>mode</span>
              <span className="text-slate-300">{item.cryptoCorrelation || 'neutral'}</span>
            </div>
          </div>
        ))}

        {!news?.length ? (
          <div className="text-slate-500 italic text-center py-4">No significant signals detected. Monitoring...</div>
        ) : null}
      </div>

      {/* Right column: compact “status” even when quiet */}
      <div className="space-y-3">
        <div className="grid gap-2">
          {fallbackTopics.map((t, idx) => (
            <div key={idx} className="flex items-center justify-between border-b border-slate-800/60 pb-2">
              <span className="font-terminal text-xs text-slate-500">{t.label}</span>
              <span className="font-terminal text-xs text-slate-200 text-right">{t.value}</span>
            </div>
          ))}
        </div>

        <div className="panel border-slate-800/60 p-3">
          <div className="panel-header">
            <div className="panel-title font-terminal">RISK BREAKDOWN</div>
            <div className="panel-meta font-terminal">indicative</div>
          </div>
          <div className="mt-3 space-y-2">
            {[
              { label: 'macro', v: 0.62, c: 'bg-cyan-400/70' },
              { label: 'conflict', v: 0.48, c: 'bg-amber-400/70' },
              { label: 'policy', v: 0.55, c: 'bg-cyan-400/45' },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-20 font-terminal text-[10px] text-slate-500 uppercase tracking-wider">{r.label}</div>
                <div className="flex-1 h-2 rounded bg-slate-900/60 border border-slate-800 overflow-hidden">
                  <div className={`h-full ${r.c}`} style={{ width: `${Math.round(r.v * 100)}%` }} />
                </div>
                <div className="w-10 font-terminal text-[10px] text-slate-400 tabular-nums text-right">{Math.round(r.v * 100)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
