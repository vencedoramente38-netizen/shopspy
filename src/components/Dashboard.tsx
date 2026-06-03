import React from 'react';
import { 
  Users, 
  Eye, 
  ShoppingCart, 
  Package,
  Menu,
  LayoutDashboard,
  TrendingUp,
  Zap,
  Sparkles,
  X
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'motion/react';
import { products } from '../data/products';
import { userStorage } from '../lib/storage';

const data = [
  { time: '00', value: 0 },
  { time: '02', value: 0 },
  { time: '04', value: 0 },
  { time: '06', value: 0 },
  { time: '08', value: 0 },
  { time: '10', value: 0 },
  { time: '12', value: 0 },
  { time: '14', value: 0 },
  { time: '16', value: 0 },
  { time: '18', value: 0 },
  { time: '20', value: 0 },
  { time: '22', value: 0 },
];

export default function Dashboard() {
  const [showWelcome, setShowWelcome] = React.useState(true);
  const now = new Date();

  const [salesTotal] = React.useState(() => userStorage.get('dashboard_sales') || '0,00');
  const [visitors] = React.useState(() => userStorage.get('metric_visitors') || '0');
  const [views] = React.useState(() => userStorage.get('metric_views') || '0');
  const [orders] = React.useState(() => userStorage.get('metric_orders') || '0');
  const [units] = React.useState(() => userStorage.get('metric_units') || '0');

  const [lastUpdate] = React.useState<Record<string, number>>({});

  const top5Ids = JSON.parse(userStorage.get('top5_products') || '[11,12,13,14,15]');
  const showChart = localStorage.getItem('shopspy_show_chart') !== 'false';
  const chartPeriod = localStorage.getItem('shopspy_chart_period') || 'Hoje';
  const welcomeMessage = userStorage.get('welcome_message') || '';

  const topProducts = React.useMemo(() => {
    return products.filter(p => top5Ids.includes(p.id)).slice(0, 5);
  }, [top5Ids]);

  return (
    <div className="flex-1 bg-[#F5F5F7] dark:bg-[#080808] relative overflow-x-hidden min-h-screen font-['Space Grotesk',sans-serif]">
      {/* Animation Styles */}
      <style>{`
        @keyframes valueFlash {
          0% { color: inherit; }
          30% { color: #D0011B; transform: scale(1.08); }
          100% { color: inherit; transform: scale(1); }
        }
        .animate-value-flash {
          display: inline-block;
          animation: valueFlash 0.6s ease;
        }
      `}</style>
      
      {/* Welcome Banner */}
      {welcomeMessage && showWelcome && (
        <div className="mx-6 mt-6">
          <div className="bg-[#D0011B]/[0.08] border border-[#D0011B]/20 rounded-[10px] p-4 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-[#D0011B]" />
              <p className="text-[13px] font-medium text-gray-900 dark:text-white">{welcomeMessage}</p>
            </div>
            <button 
              onClick={() => setShowWelcome(false)}
              className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white transition-all"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Header Minimalista */}
      <header className="px-6 pt-10 pb-6 border-b border-black/[0.05] dark:border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D0011B] flex items-center justify-center shadow-lg shadow-[#D0011B]/20">
                <LayoutDashboard className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard</h1>
                <p className="text-gray-500 dark:text-white/40 text-sm">Visão geral do seu desempenho</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
               <div className="bg-white dark:bg-[#111111] px-5 py-3 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm flex items-center gap-3">
                  <span className="text-gray-400 dark:text-white/40 text-sm font-medium">Vendas Hoje:</span>
                  <span className="text-[#D0011B] text-xl font-bold">R$ {salesTotal}</span>
               </div>
               
               <button
                 onClick={() => window.dispatchEvent(new CustomEvent('shopspy_toggle_sidebar'))}
                 className="md:hidden w-11 h-11 rounded-xl bg-white dark:bg-[#111111] border border-black/5 dark:border-white/10 flex items-center justify-center text-gray-900 dark:text-white"
               >
                 <Menu size={20} />
               </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-10 relative z-20">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <MetricCard 
            icon={<Users size={20} className="text-[#D0011B]" />} 
            label="Visitantes" 
            value={visitors} 
            color="#D0011B"
          />
          <MetricCard 
            icon={<Eye size={20} className="text-[#2563EB]" />} 
            label="Visualizações" 
            value={views} 
            color="#2563EB"
          />
          <MetricCard 
            icon={<ShoppingCart size={20} className="text-[#16A34A]" />} 
            label="Pedidos" 
            value={orders} 
            color="#16A34A"
          />
          <MetricCard 
            icon={<Package size={20} className="text-[#D97706]" />} 
            label="Unidades" 
            value={units} 
            color="#D97706"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Chart Section */}
          {showChart && (
            <section className="lg:col-span-8 bg-white dark:bg-[#111111] rounded-[24px] border border-black/[0.05] dark:border-white/[0.08] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <TrendingUp size={18} className="text-[#D0011B]" />
                  Desempenho de Vendas
                </h2>
                <div className="flex p-1 bg-gray-100 dark:bg-white/5 rounded-xl gap-1">
                  <button className="px-4 py-1.5 text-[11px] font-bold rounded-lg bg-white dark:bg-white/10 text-[#D0011B] shadow-sm">{chartPeriod}</button>
                  <button className="px-4 py-1.5 text-[11px] font-bold rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white">Relatório</button>
                </div>
              </div>

              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.03)" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#999' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#999' }} />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        backgroundColor: '#fff',
                        fontFamily: 'Space Grotesk'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#D0011B" 
                      strokeWidth={3}
                      fill="url(#dashboardColorValue)" 
                    />
                    <defs>
                      <linearGradient id="dashboardColorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D0011B" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#D0011B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}

          {/* Top Products Section */}
          <section className={`${showChart ? 'lg:col-span-4' : 'lg:col-span-12'} bg-white dark:bg-[#111111] rounded-[24px] border border-black/[0.05] dark:border-white/[0.08] p-6 shadow-sm`}>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Sparkles size={18} className="text-[#D0011B]" />
              Top Ranking
            </h2>
            
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-sm font-bold text-[#D0011B]">
                    {index + 1}
                  </div>
                  <img 
                    src={product.imagem} 
                    alt={product.nome}
                    className="w-12 h-12 rounded-xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-gray-900 dark:text-white truncate">{product.nome}</p>
                    <p className="text-[11px] text-gray-500 dark:text-white/40">{product.vendas} vendas</p>
                  </div>
                  <Zap size={14} className="text-[#D0011B] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <div className="bg-white dark:bg-[#111111] border border-black/[0.05] dark:border-white/[0.08] rounded-[24px] p-6 shadow-sm hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-white/[0.03]">
          {icon}
        </div>
        <span className="text-[10px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-widest leading-tight">
          Live
        </span>
      </div>
      <div>
        <p className="text-gray-500 dark:text-white/40 text-[12px] font-medium mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</p>
      </div>
    </div>
  );
}
