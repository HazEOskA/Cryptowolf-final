import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Gift, Network, Sprout, Wallet, Zap, Settings,
  ChevronLeft, ChevronRight, Activity, X
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { NAV_ITEMS } from '../../lib/constants';

const ICON_MAP: Record<string, typeof LayoutDashboard> = {
  LayoutDashboard, Gift, Network, Sprout, Wallet, Zap, Settings,
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen z-50 flex flex-col transition-all duration-300',
        'bg-[#0D0E14] border-r border-[#1A1D2B]',

        // Mobile: full-width slide-in overlay (always w-60, hidden by default)
        'w-60',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',

        // Desktop: override transform + width based on collapsed state
        'md:translate-x-0',
        collapsed ? 'md:w-16' : 'md:w-60'
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          'flex items-center px-4 py-5 border-b border-[#1A1D2B]',
          collapsed && 'md:justify-center md:px-0'
        )}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="relative flex-shrink-0 w-9 h-9">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <span className="text-white font-black text-base">🐺</span>
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0D0E14] animate-pulse" />
          </div>
          <div className={cn('min-w-0', collapsed && 'md:hidden')}>
            <p className="text-white font-bold text-sm leading-none">CryptoWolf</p>
            <p className="text-violet-400 text-[10px] font-mono leading-none mt-0.5">OS v2.0</p>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onMobileClose}
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all active:scale-95 flex-shrink-0"
        >
          <X size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto scrollbar-none">
        {NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon];
          const isActive = item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.id}
              to={item.path}
              title={collapsed ? item.label : undefined}
              onClick={onMobileClose} // auto-close sidebar on mobile when nav item clicked
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                isActive
                  ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5',
                collapsed && 'md:justify-center md:px-0'
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-violet-500 rounded-r-full" />
              )}
              {Icon && (
                <Icon
                  size={18}
                  className={cn(
                    'flex-shrink-0 transition-colors',
                    isActive ? 'text-violet-400' : 'text-gray-600 group-hover:text-gray-400'
                  )}
                />
              )}
              <span className={cn('truncate', collapsed && 'md:hidden')}>{item.label}</span>
              {isActive && (
                <span className={cn('ml-auto w-1.5 h-1.5 bg-violet-400 rounded-full', collapsed && 'md:hidden')} />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Status indicator — hide when collapsed on desktop */}
      <div className={cn('px-3 pb-3', collapsed && 'md:hidden')}>
        <div className="bg-[#111420] border border-[#1A1D2B] rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={12} className="text-green-400" />
            <span className="text-[10px] text-gray-500 font-mono">SYSTEM STATUS</span>
          </div>
          <div className="space-y-1">
            {[
              { label: 'Data Engine', status: 'LIVE' },
              { label: 'Signal Feed', status: 'ACTIVE' },
              { label: 'Price Oracle', status: 'SYNC' },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-[10px] text-gray-600">{s.label}</span>
                <span className="text-[10px] text-green-400 font-mono">{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle btn — desktop only */}
      <button
        onClick={onToggle}
        className="hidden md:flex items-center justify-center h-10 border-t border-[#1A1D2B] text-gray-600 hover:text-gray-400 hover:bg-white/5 transition-colors"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
