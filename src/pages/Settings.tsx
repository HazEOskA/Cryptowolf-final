import { Header } from '../components/layout/Header';
import { Badge } from '../components/ui/Badge';
import {
  Settings as SettingsIcon, Bell, RefreshCw, Shield, Palette,
  Database, Globe, Monitor, Moon, Sun
} from 'lucide-react';
import { cn } from '../utils/cn';
import { REFRESH_INTERVALS, APP_NAME, APP_VERSION } from '../lib/constants';
import { useState } from 'react';

interface SettingRowProps {
  icon: typeof SettingsIcon;
  label: string;
  description: string;
  children: React.ReactNode;
}

function SettingRow({ icon: Icon, label, description, children }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#1A1D2B] last:border-0">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#111318] flex items-center justify-center flex-shrink-0">
          <Icon size={14} className="text-gray-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="text-xs text-gray-600 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="flex-shrink-0 ml-4">{children}</div>
    </div>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'w-10 h-5 rounded-full transition-colors duration-200 relative',
        on ? 'bg-cyan-500' : 'bg-[#1E2130]'
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200',
          on ? 'left-5' : 'left-0.5'
        )}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [compactView, setCompactView] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Settings" subtitle="Configure your CryptoWolf OS experience" />

      <main className="flex-1 p-6 space-y-6 overflow-auto max-w-3xl">
        {/* General */}
        <div className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl p-5">
          <h3 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
            <SettingsIcon size={14} className="text-gray-500" />
            General
          </h3>
          <SettingRow icon={Bell} label="Notifications" description="Receive alerts for signals and airdrops">
            <Toggle on={notifications} onToggle={() => setNotifications(!notifications)} />
          </SettingRow>
          <SettingRow icon={RefreshCw} label="Auto-Refresh" description="Automatically refresh data at intervals">
            <Toggle on={autoRefresh} onToggle={() => setAutoRefresh(!autoRefresh)} />
          </SettingRow>
          <SettingRow icon={Monitor} label="Compact View" description="Show more data with smaller UI elements">
            <Toggle on={compactView} onToggle={() => setCompactView(!compactView)} />
          </SettingRow>
        </div>

        {/* Appearance */}
        <div className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl p-5">
          <h3 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
            <Palette size={14} className="text-gray-500" />
            Appearance
          </h3>
          <SettingRow icon={Moon} label="Dark Mode" description="Use dark theme (recommended for crypto dashboards)">
            <Toggle on={darkMode} onToggle={() => setDarkMode(!darkMode)} />
          </SettingRow>
        </div>

        {/* Data */}
        <div className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl p-5">
          <h3 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
            <Database size={14} className="text-gray-500" />
            Data Sources & Refresh Intervals
          </h3>
          <div className="space-y-3 py-4">
            {[
              { label: 'Prices', interval: REFRESH_INTERVALS.PRICES, source: 'CoinGecko' },
              { label: 'Trending', interval: REFRESH_INTERVALS.TRENDING, source: 'CoinGecko' },
              { label: 'Protocols', interval: REFRESH_INTERVALS.PROTOCOLS, source: 'DeFiLlama' },
              { label: 'Airdrops', interval: REFRESH_INTERVALS.AIRDROPS, source: 'DeFiLlama' },
              { label: 'Farming', interval: REFRESH_INTERVALS.FARMING, source: 'DeFiLlama' },
              { label: 'Signals', interval: REFRESH_INTERVALS.SIGNALS, source: 'GeckoTerminal' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-xs">
                <span className="text-gray-400">{item.label}</span>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" size="sm">{item.source}</Badge>
                  <span className="text-gray-600 font-mono">{item.interval / 1000}s</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="bg-[#0D0E14] border border-[#1A1D2B] rounded-xl p-5">
          <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
            <Shield size={14} className="text-gray-500" />
            About
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Application</span>
              <span className="text-white font-medium">{APP_NAME}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Version</span>
              <span className="text-gray-300 font-mono">{APP_VERSION}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">APIs</span>
              <span className="text-gray-300">CoinGecko, DeFiLlama, GeckoTerminal</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Status</span>
              <Badge variant="success" size="sm" dot>Operational</Badge>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
