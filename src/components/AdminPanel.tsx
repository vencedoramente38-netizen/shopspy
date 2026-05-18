import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Settings, 
  X, 
  Bell, 
  LayoutDashboard, 
  Sparkles, 
  Check,
  ChevronDown,
  Upload,
  Music
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { products } from '../data/products';

const ADMIN_EMAILS = [
  'shopspyadmin@gmail.com',
];

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [theme, setTheme] = useState(() => localStorage.getItem('shopspy_theme') || 'dark');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'notificacoes' | 'dashboard'>('notificacoes');

  // Sync theme and handle auto-auth when panel opens
  useEffect(() => {
    if (isOpen) {
      const isAdmin = localStorage.getItem('shopspy_is_admin') === 'true';
      if (isAdmin) {
        setIsAuthenticated(true);
      }
      setTheme(localStorage.getItem('shopspy_theme') || 'dark');
    }
  }, [isOpen]);

  const colors = {
    panel: theme === 'dark' ? 'bg-[#0f0f0f]' : 'bg-[#f9f9f9]',
    card: theme === 'dark' ? 'bg-[#111111]' : 'bg-white',
    input: theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#f0f0f0]',
    text: theme === 'dark' ? 'text-white' : 'text-[#111111]',
    textFull: theme === 'dark' ? 'rgba(255,255,255,1)' : '#111111',
    muted: theme === 'dark' ? 'text-white/40' : 'text-[#666666]',
    border: theme === 'dark' ? 'border-white/[0.08]' : 'border-[#e5e5e5]',
    borderSubtle: theme === 'dark' ? 'border-white/[0.06]' : 'border-[#e5e5e5]',
    shadow: theme === 'dark' ? 'shadow-[-8px_0_32px_rgba(0,0,0,0.6)]' : 'shadow-[0_2px_12px_rgba(0,0,0,1)]',
    toggleTrack: theme === 'dark' ? 'bg-[#333]' : 'bg-[#eeeeee]',
    closeBtn: theme === 'dark' ? 'bg-white/[0.06]' : 'bg-black/[0.06]',
  };

  // Config states
  const [notifEnabled, setNotifEnabled] = useState(
    localStorage.getItem('shopspy_notifications_enabled') === 'true'
  );
  const [notifInterval, setNotifInterval] = useState(() => parseInt(localStorage.getItem('shopspy_notification_interval') || '15'));
  const [notifSound, setNotifSound] = useState(() => localStorage.getItem('shopspy_notification_sound') || 'Caixa registradora');
  const [notifProducts, setNotifProducts] = useState<number[]>(() => JSON.parse(localStorage.getItem('shopspy_notification_products') || '[]'));
  const [notifAllProducts, setNotifAllProducts] = useState(() => localStorage.getItem('shopspy_notification_products_all') !== 'false');

  // Dashboard states
  const [dashSales, setDashSales] = useState(() => '2.353,90');
  const [metricVisitors, setMetricVisitors] = useState(() => '1.248');
  const [metricViews, setMetricViews] = useState(() => '4.892');
  const [metricOrders, setMetricOrders] = useState(() => '42');
  const [metricUnits, setMetricUnits] = useState(() => '58');
  const [top5Products, setTop5Products] = useState<number[]>(() => JSON.parse(localStorage.getItem('shopspy_top5_products') || '[11,12,13,14,15]'));
  const [showChart, setShowChart] = useState(() => localStorage.getItem('shopspy_show_chart') !== 'false');
  const [chartPeriod, setChartPeriod] = useState(() => localStorage.getItem('shopspy_chart_period') || 'Hoje');
  const [welcomeMessage, setWelcomeMessage] = useState(() => localStorage.getItem('shopspy_welcome_message') || '');

  // Sidebar visibility states
  const [tabDashboard, setTabDashboard] = useState(() => localStorage.getItem('shopspy_tab_dashboard') !== 'false');
  const [tabProducts, setTabProducts] = useState(() => localStorage.getItem('shopspy_tab_products') !== 'false');
  const [tabFindGroup, setTabFindGroup] = useState(() => localStorage.getItem('shopspy_tab_findgroup') !== 'false');
  const [tabReferral, setTabReferral] = useState(() => localStorage.getItem('shopspy_tab_referral') !== 'false');
  const [tabSettings, setTabSettings] = useState(() => localStorage.getItem('shopspy_tab_settings') !== 'false');

  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false });

  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => setToast({ message: '', show: false }), 2000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        const isAdmin = localStorage.getItem('shopspy_is_admin') === 'true';
        if (!isAdmin) return; // Silenciosamente ignorar
        setShowPasswordModal(true);
      }
      if (e.key === 'Escape') {
        setShowPasswordModal(false);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handlePasswordSubmit = () => {
    if (password === 'shopspyadmin123') {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleSave = () => {
    // Save all to localStorage
    localStorage.setItem('shopspy_notifications_enabled', notifEnabled ? 'true' : 'false');
    localStorage.setItem('shopspy_notification_interval', String(notifInterval));
    localStorage.setItem('shopspy_notification_sound', notifSound);
    localStorage.setItem('shopspy_notification_products', JSON.stringify(notifProducts));
    localStorage.setItem('shopspy_notification_products_all', String(notifAllProducts));
    
    localStorage.setItem('shopspy_dashboard_sales', dashSales);
    localStorage.setItem('shopspy_metric_visitors', metricVisitors);
    localStorage.setItem('shopspy_metric_views', metricViews);
    localStorage.setItem('shopspy_metric_orders', metricOrders);
    localStorage.setItem('shopspy_metric_units', metricUnits);
    localStorage.setItem('shopspy_top5_products', JSON.stringify(top5Products));
    localStorage.setItem('shopspy_show_chart', String(showChart));
    localStorage.setItem('shopspy_chart_period', chartPeriod);
    localStorage.setItem('shopspy_welcome_message', welcomeMessage);

    localStorage.setItem('shopspy_tab_dashboard', String(tabDashboard));
    localStorage.setItem('shopspy_tab_products', String(tabProducts));
    localStorage.setItem('shopspy_tab_findgroup', String(tabFindGroup));
    localStorage.setItem('shopspy_tab_referral', String(tabReferral));
    localStorage.setItem('shopspy_tab_settings', String(tabSettings));

    showToast('Configurações salvas!');
    setTimeout(() => {
      onClose();
      setIsAuthenticated(false);
    }, 1000);
  };

  const playSoundPreview = (name: string) => {
    if (name === 'Personalizado') {
      const base64 = localStorage.getItem('shopspy_custom_sound');
      if (base64) {
        const audio = new Audio(base64);
        audio.volume = 0.5;
        audio.play().catch(console.error);
      }
      return;
    }

    const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    switch (name) {
      case 'Caixa registradora': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(); osc.stop(ctx.currentTime + 0.3);
        break;
      }
      case 'Moedas caindo': {
        const playCoin = (delay: number, freq: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
          osc.frequency.exponentialRampToValueAtTime(freq / 2, ctx.currentTime + delay + 0.05);
          gain.gain.setValueAtTime(0.2, ctx.currentTime + delay);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.1);
          osc.start(ctx.currentTime + delay); osc.stop(ctx.currentTime + delay + 0.1);
        };
        playCoin(0, 800);
        playCoin(0.05, 900);
        playCoin(0.1, 750);
        break;
      }
      case 'Ding simples': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start(); osc.stop(ctx.currentTime + 0.2);
        break;
      }
      case 'Beep curto': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start(); osc.stop(ctx.currentTime + 0.1);
        break;
      }
      case 'Pop suave': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        osc.start(); osc.stop(ctx.currentTime + 0.05);
        break;
      }
    }
  };

  const handleSoundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamanho máximo 2MB
    if (file.size > 2 * 1024 * 1024) {
      showToast('Arquivo muito grande. Máximo 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      // Salvar base64 no localStorage
      localStorage.setItem('shopspy_custom_sound', base64);
      localStorage.setItem('shopspy_custom_sound_name', file.name);
      // Selecionar automaticamente o som personalizado
      setNotifSound('Personalizado');
      localStorage.setItem('shopspy_notification_sound', 'Personalizado');
      showToast('✅ Som personalizado carregado!');
    };
    reader.readAsDataURL(file);
  };

  const removeCustomSound = () => {
    localStorage.removeItem('shopspy_custom_sound');
    localStorage.removeItem('shopspy_custom_sound_name');
    setNotifSound('Caixa registradora');
    localStorage.setItem('shopspy_notification_sound', 'Caixa registradora');
    showToast('Som personalizado removido.');
  };

  const toggleProduct = (id: number) => {
    setNotifProducts(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleTop5 = (id: number) => {
    if (top5Products.includes(id)) {
      setTop5Products(prev => prev.filter(i => i !== id));
    } else {
      if (top5Products.length >= 5) {
        showToast('Máximo 5 produtos no Top 5');
        return;
      }
      setTop5Products(prev => [...prev, id]);
    }
  };

  const handleSidebarToggle = (tab: string, value: boolean) => {
    if (!value) {
      const activeCount = [tabDashboard, tabProducts, tabFindGroup, tabReferral, tabSettings].filter(Boolean).length;
      if (activeCount <= 1) {
        showToast('Pelo menos uma aba principal deve estar ativa');
        return;
      }
      if (tab === 'dashboard' && !tabProducts) {
        showToast('Pelo menos uma aba principal deve estar ativa');
        return;
      }
      if (tab === 'products' && !tabDashboard) {
        showToast('Pelo menos uma aba principal deve estar ativa');
        return;
      }
    }

    switch (tab) {
      case 'dashboard': setTabDashboard(value); break;
      case 'products': setTabProducts(value); break;
      case 'findgroup': setTabFindGroup(value); break;
      case 'referral': setTabReferral(value); break;
      case 'settings': setTabSettings(value); break;
    }
  };

  return (
    <div className="font-['Space Grotesk']">
      {/* PASSWORD MODAL */}
      <AnimatePresence>
        {showPasswordModal && !isAuthenticated && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 z-[200] flex items-center justify-center p-6 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${colors.card} border ${colors.border} rounded-[24px] p-8 w-full max-w-[360px] shadow-2xl transition-colors duration-300`}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[#D0011B]/10 rounded-full flex items-center justify-center mb-6">
                  <Shield size={32} className="text-[#D0011B]" />
                </div>
                <h2 className={`text-xl font-bold ${colors.text} mb-2 transition-colors`}>Acesso Restrito</h2>
                <p className={`text-[13px] ${colors.muted} text-center mb-8 transition-colors`}>Digite a senha de administrador</p>
                
                <div className="w-full space-y-4">
                  <input 
                    autoFocus
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                    placeholder="••••••••••••"
                    className={`w-full ${colors.input} border ${passwordError ? 'border-[#D0011B]' : colors.border} rounded-[12px] px-4 py-3.5 ${colors.text} outline-none focus:border-[#D0011B]/80 focus:ring-4 focus:ring-[#D0011B]/15 transition-all text-center tracking-widest`}
                  />
                  {passwordError && (
                    <p className="text-[12px] text-[#D0011B] font-bold text-center">Senha incorreta</p>
                  )}
                  <button 
                    onClick={handlePasswordSubmit}
                    className="w-full bg-[#D0011B] text-white py-4 rounded-[12px] font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-[#D0011B]/20"
                  >
                    Entrar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADMIN PANEL SIDEBAR */}
      <AnimatePresence>
        {isAuthenticated && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 right-0 h-screen w-full sm:w-[380px] ${colors.panel} border-l ${colors.border} z-[150] ${colors.shadow} flex flex-col transition-colors duration-300`}
          >
            {/* HEADER */}
            <div className={`px-6 py-5 border-b ${colors.borderSubtle} flex items-center justify-between ${colors.panel} z-10 transition-colors`}>
              <div className="flex items-center gap-3">
                <Settings size={20} className="text-[#D0011B]" />
                <span className={`text-[16px] font-bold ${colors.text}`}>Painel Admin</span>
              </div>
              <button 
                onClick={() => {
                  setIsAuthenticated(false);
                  onClose();
                }}
                className={`w-8 h-8 rounded-full ${colors.closeBtn} flex items-center justify-center ${colors.muted} hover:text-[#D0011B] transition-colors`}
              >
                <X size={18} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6 pb-24">
              
              {/* SEÇÃO 1: NOTIFICAÇÕES */}
              <div className={`${colors.card} border ${colors.borderSubtle} rounded-[16px] p-5 shadow-sm transition-colors`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Bell size={18} className="text-[#D0011B]" />
                    <span className={`text-sm font-bold ${colors.text}`}>Notificações de Venda</span>
                  </div>
                  <Toggle active={notifEnabled} onClick={() => setNotifEnabled(!notifEnabled)} theme={theme} />
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <label className={`text-[13px] font-bold ${colors.text}`}>Intervalo entre notificações</label>
                        <p className={`text-[11px] ${colors.muted}`}>Tempo em segundos entre cada notificação</p>
                      </div>
                      <span className="text-[14px] font-bold text-[#D0011B]">{notifInterval}s</span>
                    </div>
                    <input 
                      type="range"
                      min="5"
                      max="60"
                      step="5"
                      value={notifInterval}
                      onChange={(e) => setNotifInterval(parseInt(e.target.value))}
                      className="w-full accent-[#D0011B] h-1.5 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className={`text-[13px] font-bold ${colors.text}`}>Escolha o som da notificação</label>
                    
                    <div className="pt-1">
                      <input
                        type="file"
                        accept="audio/mp3,audio/mpeg,audio/wav"
                        id="sound-upload"
                        className="hidden"
                        onChange={handleSoundUpload}
                      />
                      <label htmlFor="sound-upload" className={`flex items-center gap-3 p-3.5 ${colors.card} border-2 border-dashed ${colors.border} rounded-xl cursor-pointer hover:border-[#D0011B]/50 transition-all mb-3`}>
                        <div className="w-8 h-8 rounded-full bg-[#D0011B]/10 flex items-center justify-center shrink-0">
                          <Upload size={16} className="text-[#D0011B]" />
                        </div>
                        <span className={`text-[13px] ${colors.text} font-medium`}>Fazer upload do meu som (.mp3 / .wav)</span>
                      </label>

                      {localStorage.getItem('shopspy_custom_sound') && (
                        <div className="flex items-center justify-between p-3 bg-[#D0011B]/5 border border-[#D0011B]/20 rounded-xl mb-4">
                          <div className="flex items-center gap-2 min-w-0">
                            <Music size={14} className="text-[#D0011B] shrink-0" />
                            <span className="text-[12px] text-white font-medium truncate uppercase tracking-widest opacity-80">
                              {localStorage.getItem('shopspy_custom_sound_name')}
                            </span>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button 
                              onClick={() => playSoundPreview('Personalizado')}
                              className={`px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold ${colors.text} hover:bg-white/10 transition-all`}
                            >
                              ▶ Ouvir
                            </button>
                            <button 
                              onClick={removeCustomSound}
                              className="px-3 py-1 bg-[#D0011B]/10 border border-[#D0011B]/20 rounded-lg text-[11px] font-bold text-[#D0011B] hover:bg-[#D0011B]/20 transition-all"
                            >
                              ✕ Remover
                            </button>
                          </div>
                        </div>
                      )}

                      <div className={`border-t ${colors.borderSubtle} pt-1`}>
                        {[
                          ...(localStorage.getItem('shopspy_custom_sound') ? ['Personalizado'] : []),
                          'Caixa registradora', 
                          'Moedas caindo', 
                          'Ding simples', 
                          'Beep curto', 
                          'Pop suave', 
                          'Silencioso'
                        ].map((sound) => (
                          <div 
                            key={sound}
                            onClick={() => {
                              setNotifSound(sound);
                              playSoundPreview(sound);
                            }}
                            className={`flex items-center justify-between py-3.5 border-b ${colors.borderSubtle} last:border-0 cursor-pointer group`}
                          >
                            <span className={`text-[14px] ${colors.muted} group-hover:text-[#D0011B] transition-colors`}>{sound}</span>
                            <div className={`w-[22px] h-[22px] rounded-full border-2 transition-all flex items-center justify-center ${notifSound === sound ? 'border-[#D0011B]' : 'border-black/20 dark:border-white/20'}`}>
                              {notifSound === sound && <div className="w-[10px] h-[10px] rounded-full bg-[#D0011B]" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className={`text-[13px] font-bold ${colors.text}`}>Produtos nas notificações</label>
                      <p className={`text-[11px] ${colors.muted}`}>Escolha quais produtos aparecem</p>
                    </div>
                    
                    <div className={`flex items-center justify-between p-3 ${colors.input} rounded-xl`}>
                      <span className={`text-[13px] ${colors.text} font-medium`}>Todos os produtos</span>
                      <Toggle active={notifAllProducts} onClick={() => setNotifAllProducts(!notifAllProducts)} theme={theme} />
                    </div>

                    {!notifAllProducts && (
                      <div className="max-h-[200px] overflow-y-auto custom-scrollbar space-y-2 pr-2">
                        {products.map(p => (
                          <div 
                            key={p.id}
                            onClick={() => toggleProduct(p.id)}
                            className={`flex items-center gap-3 p-2 border ${colors.borderSubtle} rounded-lg cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02]`}
                          >
                            <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${notifProducts.includes(p.id) ? 'bg-[#D0011B] border-transparent' : 'border-black/10 dark:border-white/20'}`}>
                              {notifProducts.includes(p.id) && <Check size={14} className="text-white" />}
                            </div>
                            <img src={p.imagem} className="w-7 h-7 rounded object-cover" />
                            <span className={`text-[12px] ${colors.muted} truncate`}>{p.nome}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* SEÇÃO 2: CONTROLE DO DASHBOARD */}
              <div className={`${colors.card} border ${colors.borderSubtle} rounded-[16px] p-5 shadow-sm transition-colors`}>
                <div className="flex items-center gap-3 mb-4">
                  <LayoutDashboard size={18} className="text-[#D0011B]" />
                  <span className={`text-sm font-bold ${colors.text}`}>Controle do Dashboard</span>
                </div>
                <div className={`h-px ${colors.borderSubtle} mb-6`} />

                <div className="space-y-6">
                  {/* VENDAS HOJE */}
                  <div className="space-y-2">
                    <label className={`text-[11px] ${colors.muted} uppercase font-black tracking-widest`}>Valor de Vendas Hoje</label>
                    <input 
                      type="text"
                      value={dashSales}
                      onChange={(e) => setDashSales(e.target.value)}
                      placeholder="2.353,90"
                      className={`w-full ${colors.input} border ${colors.border} rounded-[10px] px-4 py-3 ${colors.text} text-[14px] outline-none focus:border-[#D0011B] transition-colors`}
                    />
                  </div>

                  {/* MÉTRICAS PRINCIPAIS */}
                  <div className="space-y-4">
                    <label className={`text-[11px] ${colors.muted} uppercase font-black tracking-widest`}>Métricas Principais</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <span className={`text-[10px] ${colors.muted} ml-1`}>Visitantes</span>
                        <input 
                          type="text"
                          value={metricVisitors}
                          onChange={(e) => setMetricVisitors(e.target.value)}
                          className={`w-full ${colors.input} border ${colors.border} rounded-[8px] px-3 py-2.5 ${colors.text} text-[13px] outline-none focus:border-[#D0011B] transition-colors`}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <span className={`text-[10px] ${colors.muted} ml-1`}>Visualizações</span>
                        <input 
                          type="text"
                          value={metricViews}
                          onChange={(e) => setMetricViews(e.target.value)}
                          className={`w-full ${colors.input} border ${colors.border} rounded-[8px] px-3 py-2.5 ${colors.text} text-[13px] outline-none focus:border-[#D0011B] transition-colors`}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <span className={`text-[10px] ${colors.muted} ml-1`}>Pedidos</span>
                        <input 
                          type="text"
                          value={metricOrders}
                          onChange={(e) => setMetricOrders(e.target.value)}
                          className={`w-full ${colors.input} border ${colors.border} rounded-[8px] px-3 py-2.5 ${colors.text} text-[13px] outline-none focus:border-[#D0011B] transition-colors`}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <span className={`text-[10px] ${colors.muted} ml-1`}>Unidades</span>
                        <input 
                          type="text"
                          value={metricUnits}
                          onChange={(e) => setMetricUnits(e.target.value)}
                          className={`w-full ${colors.input} border ${colors.border} rounded-[8px] px-3 py-2.5 ${colors.text} text-[13px] outline-none focus:border-[#D0011B] transition-colors`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* TOP 5 PRODUTOS */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className={`text-[11px] ${colors.muted} uppercase font-black tracking-widest`}>Top 5 Produtos</label>
                      <p className={`text-[11px] ${colors.muted}`}>Escolha quais aparecem no Top 5</p>
                    </div>
                    <div className="max-h-[200px] overflow-y-auto custom-scrollbar space-y-2 pr-2">
                        {products.map(p => (
                          <div 
                            key={p.id}
                            onClick={() => toggleTop5(p.id)}
                            className={`flex items-center gap-3 p-2 border ${colors.borderSubtle} rounded-lg cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors ${top5Products.includes(p.id) ? (theme === 'dark' ? 'bg-white/[0.04] border-white/[0.1]' : 'bg-black/[0.02] border-black/[0.1]') : ''}`}
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${top5Products.includes(p.id) ? 'bg-[#D0011B] border-transparent' : 'border-black/20 dark:border-white/20'}`}>
                              {top5Products.includes(p.id) && <Check size={12} className="text-white" />}
                            </div>
                            <img src={p.imagem} className="w-7 h-7 rounded object-cover" />
                            <span className={`text-[12px] ${colors.muted} truncate flex-1`}>{p.nome}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* GRÁFICO */}
                  <div className="space-y-4">
                    <label className={`text-[11px] ${colors.muted} uppercase font-black tracking-widest`}>Controle do Gráfico</label>
                    <div className={`flex items-center justify-between p-3 ${colors.input} rounded-xl`}>
                      <span className={`text-[13px] ${colors.text} font-medium`}>Mostrar gráfico</span>
                      <Toggle active={showChart} onClick={() => setShowChart(!showChart)} theme={theme} />
                    </div>
                    <div className="space-y-1.5">
                      <span className={`text-[11px] ${colors.muted} ml-1`}>Período padrão</span>
                      <div className="relative">
                        <select 
                          value={chartPeriod}
                          onChange={(e) => setChartPeriod(e.target.value)}
                          className={`w-full ${colors.input} border ${colors.border} rounded-[10px] px-4 py-3 ${colors.text} text-[14px] outline-none focus:border-[#D0011B] appearance-none transition-colors`}
                        >
                          <option value="Hoje">Hoje</option>
                          <option value="7 Dias">7 Dias</option>
                          <option value="30 Dias">30 Dias</option>
                        </select>
                        <ChevronDown size={18} className={`absolute right-4 top-1/2 -translate-y-1/2 ${colors.muted} pointer-events-none opacity-50`} />
                      </div>
                    </div>
                  </div>

                  {/* ABAS SIDEBAR */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className={`text-[11px] ${colors.muted} uppercase font-black tracking-widest`}>Abas da Sidebar</label>
                      <p className={`text-[11px] ${colors.muted}`}>Controle a visibilidade</p>
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: 'Dashboard', key: 'dashboard', state: tabDashboard },
                        { label: 'Produtos Virais', key: 'products', state: tabProducts },
                        { label: 'Encontrar Grupo', key: 'findgroup', state: tabFindGroup },
                        { label: 'Indique e Ganhe', key: 'referral', state: tabReferral },
                        { label: 'Configurações', key: 'settings', state: tabSettings },
                      ].map((tab) => (
                        <div key={tab.key} className={`flex items-center justify-between p-3 ${colors.input} rounded-xl transition-colors`}>
                          <span className={`text-[13px] ${colors.text} font-medium opacity-80`}>{tab.label}</span>
                          <Toggle active={tab.state} onClick={() => handleSidebarToggle(tab.key, !tab.state)} theme={theme} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* MENSAGEM BOAS VINDAS */}
                  <div className="space-y-2">
                    <label className={`text-[11px] ${colors.muted} uppercase font-black tracking-widest`}>Mensagem de Boas Vindas</label>
                    <textarea 
                      value={welcomeMessage}
                      onChange={(e) => setWelcomeMessage(e.target.value)}
                      placeholder="Bem-vindo ao ShopSpy! Encontre produtos virais e lucre na Shopee."
                      className={`w-full ${colors.input} border ${colors.border} rounded-[10px] px-4 py-3 ${colors.text} text-[13px] outline-none focus:border-[#D0011B] h-24 resize-none leading-relaxed transition-colors`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER BUTTON */}
            <div className={`p-4 border-t ${colors.borderSubtle} ${colors.panel} sticky bottom-0 transition-colors`}>
              <button 
                onClick={handleSave}
                className="w-full bg-[#D0011B] text-white py-4 rounded-[12px] font-bold shadow-lg shadow-[#D0011B]/15 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                Salvar Configurações
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST PANEL */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed bottom-6 left-6 z-[300] ${theme === 'dark' ? 'bg-[#111111] border-white/[0.08]' : 'bg-white border-gray-200'} border px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3`}
          >
            <div className="w-2 h-2 rounded-full bg-[#D0011B] animate-pulse" />
            <span className={`text-sm font-bold ${colors.text}`}>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Toggle({ active, onClick, theme }: { active: boolean; onClick: () => void; theme: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-[44px] h-[24px] rounded-full relative transition-colors duration-300 ${active ? 'bg-[#D0011B]' : (theme === 'dark' ? 'bg-[#333]' : 'bg-[#e5e5e5]')}`}
    >
      <div className={`absolute top-1 w-[18px] h-[18px] bg-white rounded-full transition-all duration-300 shadow-sm ${active ? 'left-[22px]' : 'left-1'}`} />
    </button>
  );
}
