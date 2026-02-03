'use client';

import { useEffect, useState } from 'react';

export default function TokenStatus() {
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/token/info')
      .then(res => res.json())
      .then(data => {
        setInfo(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="animate-pulse text-slate-500 font-terminal text-xs">Loading token data...</div>;
  if (!info || !info.token) return <div className="text-slate-500 italic font-terminal text-xs">Token deployment in progress...</div>;

  const reserveSymbol = info?.token?.reserveToken?.symbol || 'OPENWORK';
  const price = typeof info?.price?.price === 'string' || typeof info?.price?.price === 'number' ? String(info.price.price) : '0.00';

  const rawSupply = Number(info?.token?.totalSupply);
  const supply = Number.isFinite(rawSupply) ? rawSupply / 1e18 : null;

  const line = (label: string, value: React.ReactNode, accent?: 'cyan') => (
    <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
      <span className="font-terminal text-xs text-slate-500">{label}</span>
      <span className={`font-terminal text-xs ${accent === 'cyan' ? 'text-cyan-200' : 'text-slate-200'} tabular-nums`}>{value}</span>
    </div>
  );

  return (
    <div className="space-y-3">
      {line('token', info.token.symbol, 'cyan')}
      {line('price', `${price} ${reserveSymbol}`)}
      {line('supply', supply === null ? '—' : supply.toLocaleString(undefined, { maximumFractionDigits: 0 }))}
    </div>
  );
}
