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

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#0A0B0F]">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        <div className={cn('flex-1 flex flex-col min-h-screen transition-all duration-300', sidebarCollapsed ? 'ml-16' : 'ml-60')}>
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
