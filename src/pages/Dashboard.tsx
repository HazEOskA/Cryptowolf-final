import { Header } from '../components/layout/Header';
import { StatCard } from '../components/ui/StatCard';
import { MarketOverview } from '../components/dashboard/MarketOverview';
import { TrendingWidget } from '../components/dashboard/TrendingWidget';
import { Badge } from '../components/ui/Badge';
import { useMarketData } from '../hooks/useMarketData';
import { formatUSD, formatPercent, formatNumber } from '../lib/formatters';
import { DollarSign, ChartBar as BarChart3, Activity, Globe, TrendingUp, Coins } from 'lucide-react';

export default function DashboardPage() {
  const { markets, trending, global, loading, lastUpdated } = useMarketData();

  const g = global?.data;
  const totalMcap = g?.total_market_cap?.usd ?? 0;
  const totalVol = g?.total_volume?.usd ?? 0;
  const mcapChange = g?.market_cap_change_percentage_24h_usd ?? 0;
  const btcDom = g?.market_cap_percentage?.btc ?? 0;
  const ethDom = g?.market_cap_percentage?.eth ?? 0;
  const activeCoins = g?.active_cryptocurrencies ?? 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        title="Dashboard"
        subtitle="Real-time crypto intelligence overview"
        lastUpdated={lastUpdated}
      />

      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Global Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard
            label="Market Cap"
            value={formatUSD(totalMcap, true)}
            change={mcapChange}
            icon={DollarSign}
            accent="cyan"
            loading={loading}
          />
          <StatCard
            label="24h Volume"
            value={formatUSD(totalVol, true)}
            icon={BarChart3}
            accent="violet"
            loading={loading}
          />
          <StatCard
            label="BTC Dominance"
            value={`${btcDom.toFixed(1)}%`}
            subValue={`ETH: ${ethDom.toFixed(1)}%`}
            icon={Coins}
            accent="yellow"
            loading={loading}
          />
          <StatCard
            label="Active Coins"
            value={formatNumber(activeCoins)}
            icon={Activity}
            accent="green"
            loading={loading}
          />
          <StatCard
            label="24h Change"
            value={formatPercent(mcapChange)}
            icon={TrendingUp}
            accent={mcapChange >= 0 ? 'green' : 'red'}
            loading={loading}
          />
          <StatCard
            label="Markets"
            value={formatNumber(g?.markets ?? 0)}
            icon={Globe}
            accent="cyan"
            loading={loading}
          />
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Market Overview - 2 cols */}
          <div className="lg:col-span-2 bg-[#0D0E14] border border-[#1A1D2B] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-white font-bold text-base">Top Markets</h2>
                <p className="text-gray-600 text-xs mt-0.5">By market capitalization</p>
              </div>
              <Badge variant="info" size="sm">LIVE</Badge>
            </div>
            <MarketOverview markets={markets} loading={loading} />
          </div>

          {/* Trending - 1 col */}
          <div className="bg-[#0D0E14] border border-[#1A1D2B] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-white font-bold text-base">Trending</h2>
                <p className="text-gray-600 text-xs mt-0.5">Hot coins right now</p>
              </div>
              <Badge variant="warning" size="sm" dot>HOT</Badge>
            </div>
            <TrendingWidget coins={trending} loading={loading} />
          </div>
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {markets.slice(0, 4).map((coin) => {
            const positive = coin.price_change_percentage_24h >= 0;
            return (
              <div
                key={coin.id}
                className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl p-4 hover:border-[#2A2D3E] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-[#1A1D2B]">
                    <img src={coin.image} alt={coin.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{coin.name}</p>
                    <p className="text-[10px] text-gray-600 uppercase">{coin.symbol}</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-white tabular-nums">{formatUSD(coin.current_price)}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-xs font-semibold ${positive ? 'text-green-400' : 'text-red-400'}`}>
                    {formatPercent(coin.price_change_percentage_24h)}
                  </span>
                  <span className="text-[10px] text-gray-600">MCap: {formatUSD(coin.market_cap, true)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
