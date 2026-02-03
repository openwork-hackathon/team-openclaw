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

  if (loading) return <div className="animate-pulse text-slate-500 text-center py-8">Scanning global signals...</div>;
  if (!news.length) return <div className="text-slate-500 italic text-center py-8">No significant signals detected. Monitoring...</div>;

  return (
    <div className="space-y-4">
      {news.map((item, i) => (
        <div key={i} className="border-l-2 border-orange-500/50 pl-4 py-2">
          <div className="flex justify-between items-start">
            <h3 className="text-slate-200 font-medium">{item.title}</h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              item.sentiment === 'positive' ? 'bg-green-500/10 text-green-400' : 
              item.sentiment === 'negative' ? 'bg-red-500/10 text-red-400' : 'bg-slate-500/10 text-slate-400'
            }`}>
              {item.sentiment.toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1 line-clamp-2">{item.summary}</p>
        </div>
      ))}
    </div>
  );
}
