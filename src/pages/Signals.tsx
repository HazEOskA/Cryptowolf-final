import { Header } from '../components/layout/Header';
import { Badge } from '../components/ui/Badge';
import { ChainBadge } from '../components/ui/ChainBadge';
import { useSignals } from '../hooks/useSignals';
import { Signal, TrendingPool } from '../lib/api/signals';
import { formatUSD, formatPercent, formatNumber, timeAgo } from '../lib/formatters';
import { Zap, Volume2, TrendingUp, Users, Anchor, Gift, ArrowUpRight, ArrowDownRight, ChartBar as BarChart3 } from 'lucide-react';
import { cn } from '../utils/cn';

const SIGNAL_ICONS: Record<Signal['type'], typeof Zap> = {
  volume_spike: Volume2,
  price_breakout: TrendingUp,
  social_hype: Users,
  new_listing: Anchor,
  whale_move: BarChart3,
  airdrop_alert: Gift,
};

const SIGNAL_COLORS: Record<Signal['type'], string> = {
  volume_spike: 'text-cyan-400 bg-cyan-500/10',
  price_breakout: 'text-green-400 bg-green-500/10',
  social_hype: 'text-yellow-400 bg-yellow-500/10',
  new_listing: 'text-teal-400 bg-teal-500/10',
  whale_move: 'text-orange-400 bg-orange-500/10',
  airdrop_alert: 'text-pink-400 bg-pink-500/10',
};

const STRENGTH_VARIANTS: Record<Signal['strength'], 'danger' | 'warning' | 'info' | 'default'> = {
  critical: 'danger',
  high: 'warning',
  medium: 'info',
  low: 'default',
};

export default function SignalsPage() {
  const { signals, trendingPools, loading, lastUpdated } = useSignals();

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Signals" subtitle="Real-time trading signals & trending pools" lastUpdated={lastUpdated} />

      <main className="flex-1 p-6 space-y-6 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Signals feed */}
          <div className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-white font-bold text-base">Signal Feed</h2>
                <p className="text-gray-600 text-xs mt-0.5">AI-generated trading signals</p>
              </div>
              <Badge variant="danger" size="sm" dot>LIVE</Badge>
            </div>

            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] animate-pulse">
                    <div className="w-8 h-8 rounded-lg bg-white/5" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3 bg-white/5 rounded w-40" />
                      <div className="h-3 bg-white/5 rounded w-64" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {signals.map((signal) => {
                  const Icon = SIGNAL_ICONS[signal.type];
                  const colorClass = SIGNAL_COLORS[signal.type];
                  const positive = signal.change >= 0;

                  return (
                    <div
                      key={signal.id}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-[#1A1D2B] group"
                    >
                      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', colorClass)}>
                        <Icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold text-white truncate">{signal.title}</span>
                          <Badge variant={STRENGTH_VARIANTS[signal.strength]} size="sm">{signal.strength}</Badge>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{signal.description}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <ChainBadge chain={signal.chain} />
                          <span className={cn('text-xs font-semibold flex items-center gap-0.5', positive ? 'text-green-400' : 'text-red-400')}>
                            {positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                            {formatPercent(signal.change)}
                          </span>
                          <span className="text-[10px] text-gray-600">{timeAgo(signal.timestamp)}</span>
                          <span className="text-[10px] text-gray-700">{signal.source}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Trending pools */}
          <div className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-white font-bold text-base">Trending Pools</h2>
                <p className="text-gray-600 text-xs mt-0.5">Highest activity DEX pools</p>
              </div>
              <Badge variant="warning" size="sm" dot>HOT</Badge>
            </div>

            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.02] animate-pulse space-y-2">
                    <div className="h-3 bg-white/5 rounded w-32" />
                    <div className="h-3 bg-white/5 rounded w-48" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {trendingPools.map((pool) => {
                  const positive = pool.priceChangeH24 >= 0;
                  return (
                    <div
                      key={pool.id}
                      className="p-3 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-[#1A1D2B] cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{pool.name}</span>
                          <ChainBadge chain={pool.network} />
                        </div>
                        <span className="text-[10px] text-gray-600">{pool.dex}</span>
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <div>
                          <span className="text-gray-600">Price</span>
                          <p className="text-gray-300 font-mono">${parseFloat(pool.priceUsd) < 0.01 ? pool.priceUsd : parseFloat(pool.priceUsd).toFixed(2)}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">24h</span>
                          <p className={cn('font-semibold', positive ? 'text-green-400' : 'text-red-400')}>
                            {formatPercent(pool.priceChangeH24)}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Volume</span>
                          <p className="text-gray-300">{formatUSD(pool.volumeH24, true)}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">TXs</span>
                          <p className="text-gray-300">{formatNumber(pool.txCount24h, true)}</p>
                        </div>
                        <div className="hidden md:block">
                          <span className="text-gray-600">Buys/Sells</span>
                          <div className="flex items-center gap-1">
                            <span className="text-green-400">{formatNumber(pool.buys24h, true)}</span>
                            <span className="text-gray-700">/</span>
                            <span className="text-red-400">{formatNumber(pool.sells24h, true)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
