import { Header } from '../components/layout/Header';
import { Badge } from '../components/ui/Badge';
import { ChainBadge } from '../components/ui/ChainBadge';
import { DataTable } from '../components/ui/DataTable';
import { useProtocols } from '../hooks/useProtocols';
import { formatUSD, formatPercent, formatNumber } from '../lib/formatters';
import { Protocol } from '../lib/api/defillama';
import { ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../utils/cn';

export default function ProtocolsPage() {
  const { protocols, chainTvl, loading, lastUpdated } = useProtocols();

  const topChains = Object.entries(chainTvl)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  const columns = [
    {
      key: 'rank',
      header: '#',
      render: (_: Protocol, i: number) => (
        <span className="text-gray-600 font-mono text-xs">{i + 1}</span>
      ),
      className: 'w-10',
    },
    {
      key: 'name',
      header: 'Protocol',
      render: (p: Protocol) => (
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full overflow-hidden bg-[#1A1D2B] flex-shrink-0">
            <img src={p.logo} alt={p.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{p.name}</p>
            <p className="text-[10px] text-gray-600 uppercase">{p.symbol}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (p: Protocol) => (
        <Badge variant="outline" size="sm">{p.category}</Badge>
      ),
    },
    {
      key: 'chain',
      header: 'Chain',
      render: (p: Protocol) => <ChainBadge chain={p.chain} />,
    },
    {
      key: 'tvl',
      header: 'TVL',
      render: (p: Protocol) => (
        <span className="text-sm font-semibold text-white tabular-nums">{formatUSD(p.tvl, true)}</span>
      ),
      headerClassName: 'text-right',
      className: 'text-right',
    },
    {
      key: 'change1d',
      header: '24h',
      render: (p: Protocol) => {
        const v = p.change_1d;
        if (v === null) return <span className="text-gray-600">--</span>;
        const pos = v >= 0;
        return (
          <span className={cn('flex items-center justify-end gap-0.5 text-xs font-semibold', pos ? 'text-green-400' : 'text-red-400')}>
            {pos ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {formatPercent(v)}
          </span>
        );
      },
      headerClassName: 'text-right',
      className: 'text-right',
    },
    {
      key: 'change7d',
      header: '7d',
      render: (p: Protocol) => {
        const v = p.change_7d;
        if (v === null) return <span className="text-gray-600">--</span>;
        const pos = v >= 0;
        return (
          <span className={cn('text-xs font-semibold', pos ? 'text-green-400' : 'text-red-400')}>
            {formatPercent(v)}
          </span>
        );
      },
      headerClassName: 'text-right',
      className: 'text-right',
    },
    {
      key: 'link',
      header: '',
      render: (p: Protocol) => (
        <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-cyan-400 transition-colors">
          <ExternalLink size={12} />
        </a>
      ),
      className: 'w-8',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Protocols" subtitle="DeFi protocols ranked by TVL" lastUpdated={lastUpdated} />

      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Chain TVL bar */}
        <div className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl p-4">
          <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Chain TVL Distribution</h3>
          <div className="flex items-end gap-2 h-16">
            {topChains.map(([chain, tvl]) => {
              const maxTvl = topChains[0]?.[1] ?? 1;
              const pct = (tvl / maxTvl) * 100;
              return (
                <div key={chain} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-gray-500 font-mono">{formatUSD(tvl, true)}</span>
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-cyan-600/60 to-cyan-400/40 transition-all duration-500"
                    style={{ height: `${Math.max(pct, 4)}%` }}
                  />
                  <span className="text-[9px] text-gray-600 truncate w-full text-center">{chain}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Protocols table */}
        <div className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl overflow-hidden">
          <DataTable
            columns={columns}
            data={protocols}
            loading={loading}
            emptyMessage="No protocols found"
            skeletonRows={8}
          />
        </div>
      </main>
    </div>
  );
}
