import TokenStatus from './components/TokenStatus';
import GeoPulse from './components/GeoPulse';
import KpiCard from './components/KpiCard';

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 py-8">
      {/* Top terminal bar */}
      <div className="terminal-panel border px-4 py-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="font-terminal text-xs text-slate-400">OPENCLAW ▸ DASHBOARD</div>
          <div className="hidden md:block text-slate-700">|</div>
          <div className="font-terminal text-xs text-slate-400">MODE: AUTO</div>
          <div className="hidden md:block text-slate-700">|</div>
          <div className="font-terminal text-xs text-slate-400">REGION: GLOBAL</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-200 text-xs font-terminal">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            AGENT ONLINE
          </span>
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/25 bg-cyan-500/10 text-cyan-200 text-xs font-terminal">
            LATENCY 42ms
          </span>
        </div>
      </div>

      {/* Title row */}
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            🦞 OpenClaw <span className="text-slate-400">— Terminal Overview</span>
          </h1>
          <p className="text-slate-400 font-terminal text-sm">Autonomous geopolitics → signals → execution (Base)</p>
        </div>
        <div className="font-terminal text-xs text-slate-400">
          LAST REFRESH: <span className="text-slate-200">LIVE</span>
        </div>
      </header>

      {/* KPI strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Portfolio PnL" value="+1.42" unit="% (24h)" change="+0.18" accent="lime" />
        <KpiCard label="Risk Index" value="63" unit="/ 100" change="-4" accent="amber" trend={[70, 68, 66, 64, 63, 62, 63]} />
        <KpiCard label="Signals" value="12" unit="active" change="+3" accent="cyan" trend={[6, 8, 9, 10, 12, 12, 12]} />
        <KpiCard label="Executions" value="0" unit="today" change="0" accent="cyan" trend={[0, 0, 0, 0, 0, 0, 0]} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <section className="lg:col-span-4 terminal-panel terminal-panel-hover border p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-terminal tracking-wider text-slate-300">TOKEN / CLAW</h2>
            <span className="text-[10px] font-terminal text-slate-500">MCv2 • Base</span>
          </div>
          <div className="mt-4">
            <TokenStatus />
          </div>
        </section>

        <section className="lg:col-span-8 terminal-panel terminal-panel-hover border p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-terminal tracking-wider text-slate-300">GEOPOLITICAL PULSE</h2>
            <span className="text-[10px] font-terminal text-slate-500">SENTIMENT • SIGNALS</span>
          </div>
          <div className="mt-4">
            <GeoPulse />
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <section className="lg:col-span-6 terminal-panel terminal-panel-hover border p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-terminal tracking-wider text-slate-300">RECENT ACTIONS</h2>
            <span className="text-[10px] font-terminal text-slate-500">SYSTEM</span>
          </div>
          <div className="mt-4 space-y-2 font-terminal text-xs text-slate-400">
            <div className="flex gap-3"><span className="text-slate-500">08:32</span><span>System initialization complete.</span></div>
            <div className="flex gap-3"><span className="text-slate-500">08:35</span><span>Scanning geopolitical news sources…</span></div>
            <div className="flex gap-3"><span className="text-slate-500">10:57</span><span>Refreshing market adapters + cache…</span></div>
          </div>
        </section>

        <section className="lg:col-span-6 terminal-panel terminal-panel-hover border p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-terminal tracking-wider text-slate-300">AGENT CONSOLE</h2>
            <span className="text-[10px] font-terminal text-slate-500">REASONING</span>
          </div>
          <div className="mt-4 bg-black/50 border border-slate-800 rounded-lg p-4 font-terminal text-xs text-emerald-200">
            <div>$ analyzing macro + tariff headlines → volatility regime</div>
            <div className="text-slate-400 mt-2">sentiment: NEUTRAL</div>
            <div className="text-slate-400">action: MONITOR</div>
            <div className="mt-3 text-slate-500">tip: widen lookback when volatility spikes.</div>
          </div>
        </section>
      </div>
    </div>
  );
}
