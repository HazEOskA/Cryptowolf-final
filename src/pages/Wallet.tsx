import { Header } from '../components/layout/Header';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Copy, ExternalLink, TrendingUp, TrendingDown, Coins, ChartBar as BarChart3 } from 'lucide-react';
import { formatUSD, formatPercent, shortenAddress } from '../lib/formatters';
import { cn } from '../utils/cn';

const MOCK_WALLET = {
  address: '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18',
  balance: 47832.45,
  change24h: 3.42,
  tokens: [
    { symbol: 'ETH', name: 'Ethereum', amount: 12.5, value: 44750, change: 2.05, allocation: 93.6 },
    { symbol: 'USDC', name: 'USD Coin', amount: 2500, value: 2500, change: 0.01, allocation: 5.2 },
    { symbol: 'ARB', name: 'Arbitrum', amount: 420, value: 520.8, change: 4.3, allocation: 1.1 },
    { symbol: 'OP', name: 'Optimism', amount: 150, value: 61.65, change: -1.2, allocation: 0.1 },
  ],
  recentTx: [
    { hash: '0xabc123...def456', type: 'send', to: '0x9876...5432', amount: '1.5 ETH', usd: '$5,370', time: '2h ago', status: 'confirmed' },
    { hash: '0x789abc...012def', type: 'receive', from: '0x1234...5678', amount: '500 USDC', usd: '$500', time: '5h ago', status: 'confirmed' },
    { hash: '0xdef456...abc789', type: 'swap', to: 'Uniswap V3', amount: '0.5 ETH → 1000 USDC', usd: '$1,790', time: '1d ago', status: 'confirmed' },
    { hash: '0x012345...6789ab', type: 'send', to: '0xabcd...ef01', amount: '200 ARB', usd: '$248', time: '2d ago', status: 'confirmed' },
    { hash: '0xfedcba...098765', type: 'receive', from: '0x5555...6666', amount: '2.0 ETH', usd: '$7,160', time: '3d ago', status: 'confirmed' },
  ],
};

export default function WalletPage() {
  const w = MOCK_WALLET;

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Wallet" subtitle="Portfolio tracker & transaction history" />

      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Wallet header */}
        <div className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-teal-500 flex items-center justify-center">
                <WalletIcon size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-base">Portfolio</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-500 font-mono">{shortenAddress(w.address)}</span>
                  <button className="text-gray-600 hover:text-gray-400 transition-colors">
                    <Copy size={10} />
                  </button>
                  <a href={`https://etherscan.io/address/${w.address}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-cyan-400 transition-colors">
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>
            <Badge variant="success" size="sm" dot>Connected</Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Value" value={formatUSD(w.balance)} change={w.change24h} accent="cyan" />
            <StatCard label="24h P&L" value={formatUSD(w.balance * (w.change24h / 100))} accent={w.change24h >= 0 ? 'green' : 'red'} />
            <StatCard label="Tokens" value={String(w.tokens.length)} icon={Coins} accent="violet" />
            <StatCard label="24h Change" value={formatPercent(w.change24h)} icon={BarChart3} accent={w.change24h >= 0 ? 'green' : 'red'} />
          </div>
        </div>

        {/* Token holdings */}
        <div className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl p-5">
          <h3 className="text-white font-bold text-sm mb-4">Token Holdings</h3>
          <div className="space-y-2">
            {w.tokens.map((token) => {
              const pos = token.change >= 0;
              return (
                <div key={token.symbol} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#1A1D2B] flex items-center justify-center text-xs font-bold text-white">
                    {token.symbol.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{token.name}</p>
                        <p className="text-[10px] text-gray-600">{token.amount} {token.symbol}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-white tabular-nums">{formatUSD(token.value)}</p>
                        <div className="flex items-center justify-end gap-1">
                          <span className={cn('text-[10px] font-semibold', pos ? 'text-green-400' : 'text-red-400')}>
                            {pos ? <TrendingUp size={9} className="inline" /> : <TrendingDown size={9} className="inline" />}
                            {' '}{formatPercent(token.change)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Allocation bar */}
                    <div className="mt-2 h-1 bg-[#1A1D2B] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full"
                        style={{ width: `${token.allocation}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent transactions */}
        <div className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl p-5">
          <h3 className="text-white font-bold text-sm mb-4">Recent Transactions</h3>
          <div className="space-y-1">
            {w.recentTx.map((tx, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center',
                  tx.type === 'send' ? 'bg-red-500/10' : tx.type === 'receive' ? 'bg-green-500/10' : 'bg-cyan-500/10'
                )}>
                  {tx.type === 'send' ? (
                    <ArrowUpRight size={14} className="text-red-400" />
                  ) : tx.type === 'receive' ? (
                    <ArrowDownLeft size={14} className="text-green-400" />
                  ) : (
                    <Coins size={14} className="text-cyan-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white capitalize">{tx.type}</p>
                  <p className="text-[10px] text-gray-600 font-mono">{tx.hash}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{tx.amount}</p>
                  <p className="text-[10px] text-gray-500">{tx.usd}</p>
                </div>
                <div className="text-right w-16">
                  <p className="text-[10px] text-gray-500">{tx.time}</p>
                  <Badge variant="success" size="sm">{tx.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
