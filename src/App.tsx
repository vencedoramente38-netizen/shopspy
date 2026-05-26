import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProductsHeader from './components/ProductsHeader';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import SaleNotification from './components/SaleNotification';
import FindGroup from './components/FindGroup';
import Dashboard from './components/Dashboard';
import SettingsView from './components/Settings';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import ReferralPage from './components/ReferralPage';
import AdminPanel from './components/AdminPanel';
import { products } from './data/products';
import { Product, Category } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  LayoutDashboard, 
  Flame, 
  Users, 
  BarChart2, 
  Search, 
  Settings,
  Gift
} from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('shopspy_auth') === 'true';
  });
  const [showLanding, setShowLanding] = useState(!isLoggedIn);
  const [activeView, setActiveView] = useState('dashboard');
  
  const handleLogout = () => {
    localStorage.removeItem('shopspy_auth');
    setIsLoggedIn(false);
    setShowLanding(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLanding(false);
  };

  const handleEnterLogin = () => {
    setShowLanding(false);
  };
  
  const viewInfo = useMemo(() => {
    switch (activeView) {
      case 'dashboard':
        return { title: 'Dashboard', icon: <LayoutDashboard className="text-white" size={24} /> };
      case 'virais':
        return { title: 'Produtos Virais', icon: null };
      case 'find-group':
        return { title: 'Encontrar Grupo', icon: <Users className="text-white" size={24} /> };
      case 'indique-e-ganhe':
        return { title: 'Indique e Ganhe', icon: <Gift className="text-white" size={24} /> };
      case 'metricas':
        return { title: 'Métricas', icon: <BarChart2 className="text-white" size={24} /> };
      case 'mineracao':
        return { title: 'Mineração', icon: <Search className="text-white" size={24} /> };
      case 'configuracoes':
        return { title: 'Configurações', icon: <Settings className="text-white" size={24} /> };
      default:
        return { title: 'ShopSpy', icon: <Flame className="text-white" size={24} /> };
    }
  }, [activeView]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarExpanded(false);
      } else {
        setIsSidebarExpanded(true);
      }
    };

    window.addEventListener('resize', handleResize);
    
    const handleToggleEvent = () => setIsSidebarExpanded(true);
    window.addEventListener('shopspy_toggle_sidebar', handleToggleEvent);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('shopspy_toggle_sidebar', handleToggleEvent);
    };
  }, []);

  const [activeCategory, setActiveCategory] = useState<Category>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<Product | null>(null);
  const [notificationHistory, setNotificationHistory] = useState<Product[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false });
  const notificationTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => setToast({ message: '', show: false }), 3000);
  };

  useEffect(() => {
    console.log('App: Theme changed to', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Initialize audio context on first interaction
  useEffect(() => {
    const initAudio = () => {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
      }
      window.removeEventListener('click', initAudio);
      window.removeEventListener('touchstart', initAudio);
    };

    window.addEventListener('click', initAudio);
    window.addEventListener('touchstart', initAudio);
    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('touchstart', initAudio);
    };
  }, []);

  // Fechar modal ao trocar de aba
  useEffect(() => {
    setSelectedProduct(null);
  }, [activeView]);

  // Sale notification interval
  useEffect(() => {
    const triggerNotification = () => {
      const enabled = localStorage.getItem('shopspy_notifications_enabled') !== 'false';
      if (!enabled) {
        const interval = parseInt(localStorage.getItem('shopspy_notification_interval') || '15') * 1000;
        notificationTimerRef.current = setTimeout(triggerNotification, interval);
        return;
      }

      if (notificationTimerRef.current) clearTimeout(notificationTimerRef.current);

      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        const allowedProductsRaw = localStorage.getItem('shopspy_notification_products');
        const allowedProducts = allowedProductsRaw ? JSON.parse(allowedProductsRaw) : [];
        const allProductsEnabled = localStorage.getItem('shopspy_notification_products_all') !== 'false';
        
        let pool = products;
        if (!allProductsEnabled && allowedProducts.length > 0) {
          pool = products.filter(p => allowedProducts.includes(p.id));
        }

        if (pool.length > 0) {
          const randomProduct = pool[Math.floor(Math.random() * pool.length)];
          setCurrentNotification(randomProduct);
          setNotificationHistory(prev => [randomProduct, ...prev].slice(0, 50));
          setHasUnread(true);
        }
      }
      
      const intervalVal = parseInt(localStorage.getItem('shopspy_notification_interval') || '15');
      const nextDelay = intervalVal * 1000;
      notificationTimerRef.current = setTimeout(triggerNotification, nextDelay);
    };

    const initialDelay = parseInt(localStorage.getItem('shopspy_notification_interval') || '15') * 1000;
    notificationTimerRef.current = setTimeout(triggerNotification, initialDelay);

    return () => {
      if (notificationTimerRef.current) clearTimeout(notificationTimerRef.current);
    };
  }, []);

  const handleCloseNotification = useCallback(() => {
    setCurrentNotification(null);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === "Todos" || p.categoria === activeCategory;
      const matchesSearch = p.nome.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  if (!isLoggedIn) {
    if (showLanding) {
      return <LandingPage onEnterLogin={handleEnterLogin} />;
    }
    return <Login onLogin={handleLogin} onBack={() => setShowLanding(true)} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9f9f9] dark:bg-[#080808] transition-colors duration-300 font-['Space Grotesk']">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isSidebarExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarExpanded(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[100] md:hidden transition-all duration-300"
          />
        )}
      </AnimatePresence>

      <Sidebar 
        isExpanded={isSidebarExpanded} 
        setIsExpanded={setIsSidebarExpanded}
        activeItem={activeView}
        onLogout={handleLogout}
        onItemClick={(id) => {
          if (id === 'admin-panel') {
            setIsAdminPanelOpen(true);
          } else {
            setActiveView(id);
          }
          if (isMobile) setIsSidebarExpanded(false);
        }}
      />

      <main className="flex-1 flex flex-col min-w-0">
        {activeView !== 'dashboard' && (
          <Header 
            isDarkMode={isDarkMode} 
            toggleTheme={() => setIsDarkMode(prev => !prev)} 
            notifications={notificationHistory}
            hasUnread={hasUnread}
            setHasUnread={setHasUnread}
            clearNotifications={() => setNotificationHistory([])}
            title={viewInfo.title}
            icon={viewInfo.icon}
          />
        )}

        <div className="flex-1 overflow-y-auto bg-white dark:bg-[#080808] flex flex-col transition-colors duration-300">
          <AnimatePresence mode="wait">
            {activeView === 'virais' ? (
              <motion.div
                key="virais"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col flex-1"
              >
                <ProductsHeader 
                  products={products}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />

                <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4 sm:p-6 pt-0 max-w-[1300px] mx-auto w-full">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAnalyze={(p) => {
                         localStorage.setItem('shopspy_temp_product', JSON.stringify(p));
                         setActiveView('find-group');
                      }}
                      onAffiliate={() => {}}
                      onNotification={(msg) => showToast(msg)}
                    />
                  ))}
                  {filteredProducts.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-white/30">
                      <p className="text-lg">Nenhum produto encontrado</p>
                      <p className="text-sm">Tente ajustar sua busca ou categoria</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : activeView === 'find-group' ? (
              <motion.div
                key="find-group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col flex-1"
              >
                <FindGroup onNotification={showToast} />
              </motion.div>
            ) : activeView === 'indique-e-ganhe' ? (
              <motion.div
                key="indique-e-ganhe"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col flex-1"
              >
                <ReferralPage />
              </motion.div>
            ) : activeView === 'dashboard' ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col flex-1"
              >
                <Dashboard />
              </motion.div>
            ) : activeView === 'configuracoes' ? (
              <motion.div
                key="configuracoes"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col flex-1"
              >
                <SettingsView isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(prev => !prev)} />
              </motion.div>
            ) : (
              <motion.div
                key="other"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex items-center justify-center text-white/30"
              >
                <div className="text-center">
                  <p className="text-xl font-bold">Em breve</p>
                  <p className="text-sm">Esta funcionalidade está sendo preparada</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <AdminPanel 
        isOpen={isAdminPanelOpen} 
        onClose={() => setIsAdminPanelOpen(false)} 
      />

      <ProductModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {localStorage.getItem('shopspy_is_admin') === 'true' && (
        <SaleNotification 
          product={currentNotification}
          onClose={handleCloseNotification}
        />
      )}

      {/* Mobile Floating Action Button Removed for Header-based menu */}

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-6 z-[110] bg-white dark:bg-[#111111] border border-[#e5e5e5] dark:border-primary/40 px-6 py-3 rounded-xl shadow-2xl text-sm font-medium text-gray-900 dark:text-white flex items-center gap-3 w-[calc(100%-48px)] sm:w-auto"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(208, 1, 27, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(208, 1, 27, 0.4);
        }
      `}} />
    </div>
  );
}
