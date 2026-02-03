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

  if (loading) return <div className="animate-pulse text-slate-500">Loading token data...</div>;
  if (!info || !info.token) return <div className="text-slate-500 italic">Token deployment in progress...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between border-b border-slate-800 pb-2">
        <span className="text-slate-400">Token</span>
        <span className="font-mono text-cyan-400">{info.token.symbol}</span>
      </div>
      <div className="flex justify-between border-b border-slate-800 pb-2">
        <span className="text-slate-400">Price</span>
        <span className="font-mono">{info.price?.price || '0.00'} {info.token.reserveToken.symbol}</span>
      </div>
      <div className="flex justify-between border-b border-slate-800 pb-2">
        <span className="text-slate-400">Supply</span>
        <span className="font-mono">{(info.token.totalSupply / 10**18).toLocaleString()}</span>
      </div>
    </div>
  );
}
