import { Header } from '../components/layout/Header';
import { Badge } from '../components/ui/Badge';
import { ChainBadge } from '../components/ui/ChainBadge';
import { DataTable } from '../components/ui/DataTable';
import { useFarming } from '../hooks/useFarming';
import { formatUSD, formatAPY, formatPercent } from '../lib/formatters';
import { YieldPool } from '../lib/api/defillama';
import { TrendingUp, TrendingDown, ShieldCheck, ShieldAlert } from 'lucide-react';
import { cn } from '../utils/cn';

export default function FarmingPage() {
  const { pools, loading, lastUpdated } = useFarming();

  const columns = [
    {
      key: 'rank',
      header: '#',
      render: (_: YieldPool, i: number) => (
        <span className="text-gray-600 font-mono text-xs">{i + 1}</span>
      ),
      className: 'w-10',
    },
    {
      key: 'pool',
      header: 'Pool',
      render: (p: YieldPool) => (
        <div>
          <p className="text-sm font-semibold text-white">{p.symbol}</p>
          <p className="text-[10px] text-gray-600">{p.project}</p>
        </div>
      ),
    },
    {
      key: 'chain',
      header: 'Chain',
      render: (p: YieldPool) => <ChainBadge chain={p.chain} />,
    },
    {
      key: 'tvl',
      header: 'TVL',
      render: (p: YieldPool) => (
        <span className="text-sm font-semibold text-white tabular-nums">{formatUSD(p.tvlUsd, true)}</span>
      ),
      headerClassName: 'text-right',
      className: 'text-right',
    },
    {
      key: 'apy',
      header: 'APY',
      render: (p: YieldPool) => {
        const high = p.apy >= 20;
        return (
          <span className={cn(
            'text-sm font-bold tabular-nums',
            high ? 'text-green-400' : 'text-cyan-400'
          )}>
            {formatAPY(p.apy)}
          </span>
        );
      },
      headerClassName: 'text-right',
      className: 'text-right',
    },
    {
      key: 'apy7d',
      header: '7d APY',
      render: (p: YieldPool) => {
        const v = p.apyPct7D;
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
      key: 'stablecoin',
      header: 'Type',
      render: (p: YieldPool) => (
        <Badge variant={p.stablecoin ? 'info' : 'outline'} size="sm">
          {p.stablecoin ? 'Stable' : 'Volatile'}
        </Badge>
      ),
    },
    {
      key: 'ilRisk',
      header: 'IL Risk',
      render: (p: YieldPool) => {
        const risk = p.ilRisk?.toLowerCase();
        const Icon = risk === 'no' || risk === 'low' ? ShieldCheck : ShieldAlert;
        const color = risk === 'no' ? 'text-green-400' : risk === 'low' ? 'text-yellow-400' : 'text-red-400';
        return (
          <span className={cn('flex items-center gap-1 text-xs', color)}>
            <Icon size={12} />
            {risk ? risk.charAt(0).toUpperCase() + risk.slice(1) : 'N/A'}
          </span>
        );
      },
    },
  ];

  const topApy = [...pools].sort((a, b) => b.apy - a.apy).slice(0, 3);
  const topTvl = [...pools].sort((a, b) => b.tvlUsd - a.tvlUsd).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Farming" subtitle="Top yield opportunities across DeFi" lastUpdated={lastUpdated} />

      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl p-4">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Highest APY</h3>
            <div className="space-y-2">
              {topApy.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 font-mono w-4">{i + 1}</span>
                    <span className="text-sm text-white font-medium">{p.symbol}</span>
                    <ChainBadge chain={p.chain} />
                  </div>
                  <span className="text-sm font-bold text-green-400 tabular-nums">{formatAPY(p.apy)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl p-4">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Largest TVL</h3>
            <div className="space-y-2">
              {topTvl.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 font-mono w-4">{i + 1}</span>
                    <span className="text-sm text-white font-medium">{p.symbol}</span>
                    <ChainBadge chain={p.chain} />
                  </div>
                  <span className="text-sm font-bold text-cyan-400 tabular-nums">{formatUSD(p.tvlUsd, true)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl overflow-hidden">
          <DataTable
            columns={columns}
            data={pools}
            loading={loading}
            emptyMessage="No yield pools found"
            skeletonRows={8}
          />
        </div>
      </main>
    </div>
  );
}
