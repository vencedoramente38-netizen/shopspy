import React, { useState, useEffect, useRef } from 'react';
import { Flame, Sun, Moon, Bell, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import InstallModal from './InstallModal';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  notifications: Product[];
  hasUnread: boolean;
  setHasUnread: (val: boolean) => void;
  clearNotifications: () => void;
  title: string;
  icon: React.ReactNode;
}

export default function Header({ 
  isDarkMode, 
  toggleTheme, 
  notifications, 
  hasUnread, 
  setHasUnread,
  clearNotifications,
  title,
  icon
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mainContainer = document.querySelector('main > div');
    if (!mainContainer) return;

    const handleScroll = () => {
      setScrolled(mainContainer.scrollTop > 20);
    };

    mainContainer.addEventListener('scroll', handleScroll);
    return () => mainContainer.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifRef]);

  const handleOpenNotif = () => {
    setIsNotifOpen(!isNotifOpen);
    if (!isNotifOpen) setHasUnread(false);
  };

  return (
    <header 
      style={{
        background: isDarkMode ? 'rgba(17, 17, 17, 0.6)' : '#D0011B',
        backdropFilter: isDarkMode ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: isDarkMode ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
        boxShadow: isDarkMode ? '0 1px 20px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        transition: 'all 0.3s ease'
      }}
      className="h-16 flex items-center justify-between px-6"
    >
      <div className="flex items-center">
        <h1 className="text-lg font-bold text-white font-['Space Grotesk']">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Action Buttons Group */}
        <div className="flex items-center gap-2">
          {/* Install Button */}
          <button
            onClick={() => setIsInstallOpen(true)}
            className="w-9 h-9 rounded-full bg-black/40 border border-white/5 flex items-center justify-center text-white hover:bg-black/60 transition-all duration-300 shadow-lg"
            title="Instalar App"
          >
            <Download size={18} className="opacity-90" />
          </button>

          {/* Notifications Button */}
          <div className="relative" ref={notifRef}>
            <button
              className="relative shadow-lg"
              onClick={handleOpenNotif}
              aria-label="Notificações"
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Bell size={18} color="white" className="opacity-90" />
              {notifications.length > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -4,
                  background: '#D0011B',
                  color: 'white',
                  borderRadius: 9999,
                  minWidth: 16, height: 16,
                  fontSize: 9, fontWeight: 900,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 4px',
                  fontFamily: 'system-ui, sans-serif',
                  border: '2px solid rgba(0,0,0,0.4)'
                }}>
                  {notifications.length > 99 ? '99+' : notifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {isNotifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute top-12 right-0 w-[320px] bg-white dark:bg-[#111111] border border-black/10 dark:border-white/[0.08] rounded-[14px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden z-[60]"
                >
                  <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/[0.06]">
                    <span className="text-sm font-bold text-gray-900 dark:text-white font-['Space Grotesk']">Central de Notificações</span>
                    <button 
                      onClick={clearNotifications}
                      className="text-[12px] text-gray-500 dark:text-white/40 hover:text-primary transition-colors font-medium"
                    >
                      Limpar tudo
                    </button>
                  </div>

                  <div className="max-height-[280px] overflow-y-auto custom-scrollbar">
                    {notifications.length === 0 ? (
                      <div className="py-10 px-5 text-center flex flex-col items-center">
                        <Bell size={32} className="text-gray-300 dark:text-white/[0.15] mb-3" />
                        <p className="text-[13px] text-gray-400 dark:text-white/30 font-medium font-['Space Grotesk']">Nenhuma notificação</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-black/5 dark:divide-white/[0.04]">
                        {notifications.map((notif, index) => (
                          <div 
                            key={index}
                            className="flex gap-3 p-3 hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors group cursor-pointer"
                          >
                            <img 
                              src={notif.imagem} 
                              alt={notif.nome} 
                              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex flex-col min-w-0">
                              <span className="text-primary text-[11px] font-bold">🔥 Venda realizada!</span>
                              <span className="text-[12px] text-gray-800 dark:text-white font-medium truncate">{notif.nome}</span>
                              <span className="text-[11px] text-gray-500 dark:text-white/40 mt-0.5 font-['Space Grotesk']">
                                {notif.preco} · agora mesmo
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <InstallModal isOpen={isInstallOpen} onClose={() => setIsInstallOpen(false)} />
    </header>
  );
}
