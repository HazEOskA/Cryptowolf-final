import { Header } from '../components/layout/Header';
import { Badge } from '../components/ui/Badge';
import { ChainBadge } from '../components/ui/ChainBadge';
import { useAirdrops } from '../hooks/useAirdrops';
import { ExternalLink, Clock, Gift, CircleAlert as AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';

function getStatus(start: number | null, end: number | null): { label: string; variant: 'success' | 'warning' | 'danger' | 'info' } {
  const now = Date.now() / 1000;
  if (start && start > now) return { label: 'Upcoming', variant: 'info' };
  if (end && end < now) return { label: 'Ended', variant: 'danger' };
  if (start && (!end || end > now)) return { label: 'Active', variant: 'success' };
  return { label: 'Unknown', variant: 'warning' };
}

function formatCountdown(ts: number | null): string {
  if (!ts) return 'TBD';
  const now = Date.now() / 1000;
  const diff = ts - now;
  if (diff <= 0) return 'Ended';
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h`;
}

export default function AirdropsPage() {
  const { airdrops, loading, lastUpdated } = useAirdrops();

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Airdrops" subtitle="Track upcoming and active airdrops" lastUpdated={lastUpdated} />

      <main className="flex-1 p-6 space-y-4 overflow-auto">
        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Gift size={14} className="text-green-400" />
              <span className="text-xs text-gray-500 uppercase tracking-wider">Active</span>
            </div>
            <p className="text-2xl font-bold text-white">{airdrops.filter(a => getStatus(a.start, a.end).label === 'Active').length}</p>
          </div>
          <div className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={14} className="text-cyan-400" />
              <span className="text-xs text-gray-500 uppercase tracking-wider">Upcoming</span>
            </div>
            <p className="text-2xl font-bold text-white">{airdrops.filter(a => getStatus(a.start, a.end).label === 'Upcoming').length}</p>
          </div>
          <div className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle size={14} className="text-yellow-400" />
              <span className="text-xs text-gray-500 uppercase tracking-wider">Total Tracked</span>
            </div>
            <p className="text-2xl font-bold text-white">{airdrops.length}</p>
          </div>
        </div>

        {/* Airdrop cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl p-5 animate-pulse space-y-3">
                <div className="h-5 bg-white/5 rounded w-32" />
                <div className="h-3 bg-white/5 rounded w-24" />
                <div className="h-12 bg-white/5 rounded" />
                <div className="h-8 bg-white/5 rounded w-20" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {airdrops.map((airdrop, i) => {
              const status = getStatus(airdrop.start, airdrop.end);
              return (
                <div
                  key={i}
                  className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl p-5 hover:border-[#2A2D3E] transition-all duration-200 animate-slide-up group"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white font-bold text-base">{airdrop.name}</h3>
                      {airdrop.token && (
                        <p className="text-gray-500 text-xs font-mono mt-0.5">${airdrop.token}</p>
                      )}
                    </div>
                    <Badge variant={status.variant} size="sm" dot>{status.label}</Badge>
                  </div>

                  <ChainBadge chain={airdrop.chain} size="md" />

                  {airdrop.description && (
                    <p className="text-gray-500 text-xs mt-3 leading-relaxed line-clamp-2">{airdrop.description}</p>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1A1D2B]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-gray-600">Start:</span>
                        <span className="text-gray-400 font-mono">{formatCountdown(airdrop.start)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-gray-600">End:</span>
                        <span className="text-gray-400 font-mono">{formatCountdown(airdrop.end)}</span>
                      </div>
                    </div>

                    {airdrop.link && (
                      <a
                        href={airdrop.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/25 text-cyan-400 text-xs rounded-lg transition-colors"
                      >
                        <ExternalLink size={10} />
                        Visit
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
