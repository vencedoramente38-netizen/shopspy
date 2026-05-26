import React from 'react';
import { 
  LayoutDashboard, 
  Flame, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Users,
  Gift,
  Shield
} from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (val: boolean) => void;
  activeItem: string;
  onItemClick: (id: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ isExpanded, setIsExpanded, activeItem, onItemClick, onLogout }: SidebarProps) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('shopspy_auth');
    localStorage.removeItem('shopspy_is_admin');
    localStorage.removeItem('shopspy_user_email');
    localStorage.removeItem('shopspy_plan');
    localStorage.setItem('shopspy_notifications_enabled', 'false');
    onLogout();
  };
  const tabDashboard = localStorage.getItem('shopspy_tab_dashboard') !== 'false';
  const tabProducts = localStorage.getItem('shopspy_tab_products') !== 'false';
  const tabFindGroup = localStorage.getItem('shopspy_tab_findgroup') !== 'false';
  const tabReferral = localStorage.getItem('shopspy_tab_referral') !== 'false';
  const tabSettings = localStorage.getItem('shopspy_tab_settings') !== 'false';

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, visible: tabDashboard },
    { id: 'virais', label: 'Produtos Virais', icon: Flame, visible: tabProducts },
    { id: 'find-group', label: 'Encontrar Grupo', icon: Users, visible: tabFindGroup },
    { id: 'indique-e-ganhe', label: 'Indique e Ganhe', icon: Gift, visible: tabReferral },
    { id: 'configuracoes', label: 'Configurações', icon: Settings, visible: tabSettings },
    ...(localStorage.getItem('shopspy_is_admin') === 'true' ? [{ id: 'admin-panel', label: 'Painel Admin', icon: Shield, visible: true }] : []),
  ].filter(item => item.visible);

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: isExpanded ? 240 : 64,
        x: typeof window !== 'undefined' && window.innerWidth < 768 ? (isExpanded ? 0 : -240) : 0
      }}
      className={`
        h-screen bg-white dark:bg-[#111111] border-r border-[#e5e5e5] dark:border-white/[0.08] z-[101] flex flex-col transition-colors duration-300
        fixed md:relative left-0 top-0
      `}
    >
      <div className="h-20 flex items-center px-4 overflow-hidden border-b border-black/[0.03] dark:border-white/[0.03]">
        <div className={`flex items-center ${isExpanded ? 'justify-start gap-3 translate-x-1' : 'justify-center'} w-full transition-all duration-300`}>
          <img 
            src="https://i.postimg.cc/NfH1HDns/download-10-removebg-preview.png" 
            alt="ShopSpy Logo" 
            className="h-10 w-auto object-contain shrink-0 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          {isExpanded && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-gray-900 dark:text-white font-['Space Grotesk'] whitespace-nowrap"
            >
              ShopSpy
            </motion.span>
          )}
        </div>
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1">
        {menuItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <div
              key={item.id}
              onClick={() => {
                onItemClick(item.id);
              }}
              className={`
                flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                ${isActive 
                  ? 'bg-[#D0011B] text-white font-bold' 
                  : 'text-gray-500 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/[0.04] hover:text-gray-900 dark:hover:text-white/90'}
                ${(!isExpanded && (typeof window !== 'undefined' && window.innerWidth >= 768)) && 'justify-center p-3'}
              `}
            >
              <item.icon size={22} />
              {(isExpanded || (typeof window !== 'undefined' && window.innerWidth < 768)) && <span className="text-sm truncate">{item.label}</span>}
            </div>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 bg-white dark:bg-[#111111] border-t border-black/[0.03] dark:border-white/[0.08] transition-colors duration-300">
        <div className={`flex items-center gap-3 ${!isExpanded && 'justify-center'}`}>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span className="text-xs font-bold">JD</span>
          </div>
          {isExpanded && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">John Doe</p>
              <p className="text-[10px] text-gray-500 dark:text-white/40 truncate leading-tight">Admin Master</p>
            </div>
          )}
          {isExpanded && (
            <button 
              onClick={handleLogout}
              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
              title="Sair"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white dark:bg-[#111111] border border-[#e5e5e5] dark:border-white/[0.08] rounded-full items-center justify-center transition-colors shadow-sm hover:border-primary/50 group"
      >
        {isExpanded ? <ChevronLeft size={16} className="text-gray-400 group-hover:text-primary" /> : <ChevronRight size={16} className="text-gray-400 group-hover:text-primary" />}
      </button>
    </motion.aside>
  );
}
