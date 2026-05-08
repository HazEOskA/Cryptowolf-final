import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ErrorBoundary } from './components/ErrorBoundary';
import DashboardPage from './pages/Dashboard';
import AirdropsPage from './pages/Airdrops';
import ProtocolsPage from './pages/Protocols';
import FarmingPage from './pages/Farming';
import WalletPage from './pages/Wallet';
import SignalsPage from './pages/Signals';
import SettingsPage from './pages/Settings';
import { cn } from './utils/cn';
import { Menu } from 'lucide-react';

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#0A0B0F]">

        {/* Mobile backdrop overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        <div
          className={cn(
            'flex-1 flex flex-col min-h-screen transition-all duration-300',
            'ml-0',
            sidebarCollapsed ? 'md:ml-16' : 'md:ml-60'
          )}
        >
          {/* Mobile top bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1A1D2B] bg-[#0D0E14] md:hidden sticky top-0 z-30">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex items-center justify-center w-9 h-9 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-sm shadow-lg shadow-violet-500/25">
                🐺
              </div>
              <span className="text-white font-bold text-sm">CryptoWolf</span>
              <span className="text-violet-400 text-[10px] font-mono">OS v2.0</span>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[10px] text-green-400 font-mono">LIVE</span>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/airdrops" element={<AirdropsPage />} />
            <Route path="/protocols" element={<ProtocolsPage />} />
            <Route path="/farming" element={<FarmingPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/signals" element={<SignalsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
