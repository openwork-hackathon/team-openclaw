import TokenStatus from './components/TokenStatus';
import GeoPulse from './components/GeoPulse';

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8">
      <header className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            🦞 OpenClaw Dashboard
          </h1>
          <p className="text-slate-400">Autonomous Geopolitical Trading Agent</p>
        </div>
        <div className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-sm font-medium animate-pulse">
          ● Agent Online
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Token Status */}
        <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-slate-200">Agent Token</h2>
          <TokenStatus />
        </section>

        {/* Global News (Geo Analysis) */}
        <section className="md:col-span-2 bg-slate-900/50 border border-slate-800 p-6 rounded-xl shadow-sm h-full">
          <h2 className="text-xl font-semibold mb-4 text-slate-200 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
            Geopolitical Pulse
          </h2>
          <GeoPulse />
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Actions */}
        <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-slate-200">Recent Actions</h2>
          <div className="text-sm text-slate-500 font-mono space-y-2">
            <div>[08:32] System initialization complete.</div>
            <div>[08:35] Scanning geopolitical news sources...</div>
            <div>[10:57] Updating dashboard components...</div>
          </div>
        </section>

        {/* Agent Logs */}
        <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-slate-200">Agent Reasoning</h2>
          <div className="bg-black/50 p-4 rounded-lg text-xs font-mono text-green-400 border border-slate-800">
            $ Analyzing tariff implications on ETH/USD...
            <br />
            $ Sentiment: Neutral
            <br />
            $ Action: Monitoring
          </div>
        </section>
      </div>
    </div>
  );
}
