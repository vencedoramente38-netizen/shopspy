import React from 'react';
import { 
  Users, 
  Eye, 
  ShoppingCart, 
  Package,
  ChevronRight,
  Menu,
  Search,
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
import { CopyButton } from './ui/CopyButton';
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
  const timestamp = `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR')} (GMT-03)`;

  const [salesTotal] = React.useState(() => userStorage.get('dashboard_sales') || '0,00');
  const [visitors] = React.useState(() => userStorage.get('metric_visitors') || '0');
  const [views] = React.useState(() => userStorage.get('metric_views') || '0');
  const [orders] = React.useState(() => userStorage.get('metric_orders') || '0');
  const [units] = React.useState(() => userStorage.get('metric_units') || '0');

  // Track changes for animation
  const [lastUpdate, setLastUpdate] = React.useState<Record<string, number>>({});

  const triggerAnimation = (key: string) => {
    setLastUpdate(prev => ({ ...prev, [key]: Date.now() }));
  };

  // Listen for sales
  React.useEffect(() => {
    const handleSale = (e: any) => {
      const { price } = e.detail;
      
      // Logic kept for event listeners
    };

    window.addEventListener('shopspy_sale', handleSale as EventListener);
    return () => window.removeEventListener('shopspy_sale', handleSale as EventListener);
  }, []);

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

      {/* Top Banner (Header area) */}
      <header className="relative bg-[#D0011B] pt-12 pb-24 px-6 overflow-hidden">
        {/* Background Watermark (Shopping Bag Icon mimic) */}
        <div className="absolute top-0 right-0 w-[600px] h-full opacity-10 pointer-events-none select-none">
          <div className="absolute top-[-100px] right-[-150px] w-[500px] h-[500px] border-[60px] border-white rounded-[80px] rotate-[15deg]"></div>
          <div className="absolute top-[20px] right-[50px] w-[300px] h-[40px] bg-white rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Top Nav (Mobile menu and User profile) */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3 ml-auto cursor-pointer group invisible" title="Clique para sair">
              {/* Profile removed */}
            </div>
          </div>

          {/* Header Content */}
          <div className="text-center text-white">
            <div className="mb-4 flex justify-center">
              <img 
                src="https://i.postimg.cc/NfH1HDns/download-10-removebg-preview.png" 
                alt="ShopSpy Logo" 
                className="h-14 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className="text-[32px] font-bold mb-3 tracking-tight">Vendas Hoje</h1>
            
            <div className="inline-block bg-white/20 dark:bg-black/20 px-4 py-1.5 rounded-[4px] text-[12px] font-medium mb-6">
              {timestamp}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-white/15 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-[4px] text-[13px] font-bold transition-all no-underline">
                Painel de Mineração
              </a>
              <a href="#" className="bg-white/15 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-[4px] text-[13px] font-bold transition-all no-underline flex items-center gap-1">
                Ver Métricas Detalhadas &gt;
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 -mt-12 pb-20 relative z-20">
        
        {/* Floating Value Card  */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white dark:bg-[#111111] rounded-[12px] shadow-[0_4px_25px_rgba(0,0,0,0.08)] p-10 flex flex-col items-center justify-center mb-8 border border-black/5 dark:border-white/5"
        >
          <div className="flex items-center gap-2">
            <span className="text-[20px] font-bold text-gray-400 dark:text-white/30 pt-4 self-start mt-2">R$</span>
            <span 
              key={lastUpdate.sales}
              className={`text-[64px] font-bold text-[#D0011B] tracking-tight leading-tight ${lastUpdate.sales ? 'animate-value-flash' : ''}`}
            >
              {salesTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Col 1: Métricas Principais */}
          <section className="lg:col-span-4 flex flex-col bg-white dark:bg-[#111111] rounded-[4px] shadow-sm border border-black/[0.08] dark:border-white/5 overflow-hidden">
            <div className="px-5 py-4 border-b border-black/[0.05] dark:border-white/5">
              <h2 className="text-[16px] font-bold text-gray-800 dark:text-white/90">Métricas Principais</h2>
            </div>
            <div className="grid grid-cols-2 flex-grow">
              <MetricItem icon={<Users size={22} className="text-[#999]" />} label="Visitantes" value={visitors.toLocaleString('pt-BR')} borderRight borderBottom animationKey={lastUpdate.visitors} />
              <MetricItem icon={<Eye size={22} className="text-[#999]" />} label="Visualizações da Página" value={views.toLocaleString('pt-BR')} borderBottom animationKey={lastUpdate.views} />
              <MetricItem icon={<ShoppingCart size={22} className="text-[#999]" />} label="Pedidos" value={orders.toLocaleString('pt-BR')} borderRight animationKey={lastUpdate.orders} />
              <MetricItem icon={<Package size={22} className="text-[#999]" />} label="Unidades" value={units.toLocaleString('pt-BR')} animationKey={lastUpdate.units} />
            </div>
          </section>

          {/* Col 2: Visão Geral de Vendas (Chart) */}
          <section className={`hidden lg:flex lg:col-span-12 xl:col-span-5 bg-white dark:bg-[#111111] rounded-[4px] shadow-sm border border-black/[0.08] dark:border-white/5 overflow-hidden flex-col ${!showChart ? 'lg:hidden' : 'lg:flex'}`}>
            <div className="px-5 py-4 border-b border-black/[0.05] dark:border-white/5">
              <h2 className="text-[16px] font-bold text-gray-800 dark:text-white/90">Visão Geral de Vendas ({chartPeriod})</h2>
            </div>
            
            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-[12px] font-medium text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#D0011B]"></span> Hoje
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#2673DD]"></span> Ontem
                  </div>
                </div>
                <div className="flex p-1 bg-gray-100 dark:bg-white/5 rounded-lg gap-1">
                  <button className="px-3 py-1 text-[11px] font-bold rounded-md bg-white dark:bg-white/10 text-[#D0011B] shadow-sm transition-all">Hoje</button>
                  <button className="px-3 py-1 text-[11px] font-bold rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-white transition-all">7 Dias</button>
                  <button className="px-3 py-1 text-[11px] font-bold rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-white transition-all">30 Dias</button>
                </div>
              </div>

              <div className="h-[250px] mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis 
                      dataKey="time" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: '#999' }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: '#999' }} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '8px', 
                        border: 'none', 
                        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                        backgroundColor: '#fff' 
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#D0011B" 
                      strokeWidth={2}
                      fill="url(#dashboardColorValue)" 
                    />
                    <defs>
                      <linearGradient id="dashboardColorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D0011B" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#D0011B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="text-[11px] text-gray-400 py-3 border-t border-black/[0.05] dark:border-white/5 mt-auto">
                Os vendedores que usam os Anúncios da Shopee estão recebendo 65% mais pedidos em média. <a href="#" className="text-blue-500 hover:underline">Crie anúncios aqui !</a>
              </div>
            </div>
          </section>

          {/* Col 3: Top 5 Produtos */}
          <section className={`lg:col-span-12 xl:col-span-3 bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/[0.08] rounded-[14px] p-5 shadow-xl transition-colors ${!showChart ? 'lg:col-span-8' : ''}`}>
            <h2 className="text-[16px] font-bold text-gray-900 dark:text-white">Top 5 dos Produtos à Venda</h2>
            
            <div className="border-t border-gray-100 dark:border-white/[0.06] mt-3 pt-1">
              <div className="flex flex-col">
                {topProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className={`flex items-center gap-3 py-3 ${index !== topProducts.length - 1 ? 'border-b border-gray-100 dark:border-white/[0.05]' : ''}`}
                  >
                    {/* Ranking */}
                    <span className="text-[14px] font-bold text-[#D0011B] w-5 flex-shrink-0">
                      {index + 1}
                    </span>
                    
                    {/* Imagem */}
                    <img 
                      src={product.imagem} 
                      alt={product.nome}
                      className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Texto */}
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium text-gray-900 dark:text-white truncate-2-lines leading-snug">
                        {product.nome}
                      </div>
                      <div className="text-[11px] text-gray-500 dark:text-white/40 mt-0.5">
                        {product.vendas} vendidos
                      </div>
                    </div>
                    
                    {/* Preço */}
                    <div className="text-[13px] font-bold text-gray-900 dark:text-white shrink-0 ml-1">
                      {product.preco}
                    </div>
                  </div>
                ))}
                
                {products.length === 0 && (
                  <div className="py-8 flex flex-col items-center justify-center text-center opacity-40">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-3 text-gray-400">
                      <Package size={20} />
                    </div>
                    <p className="text-gray-500 text-[12px]">Nenhum dado disponível.</p>
                  </div>
                )}
              </div>
            </div>

            <style>{`
              .truncate-2-lines {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
            `}</style>
          </section>

        </div>
      </main>
    </div>
  );
}

function MetricItem({ icon, label, value, borderRight, borderBottom, animationKey }: { icon: React.ReactNode, label: string, value: string, borderRight?: boolean, borderBottom?: boolean, animationKey?: number }) {
  return (
    <div className={`p-6 flex flex-col items-center justify-center text-center transition-colors hover:bg-gray-50/80 dark:hover:bg-white/[0.01] ${borderRight ? 'border-r border-black/[0.05] dark:border-white/5' : ''} ${borderBottom ? 'border-b border-black/[0.05] dark:border-white/5' : ''}`}>
      <div className="mb-2">
        {icon}
      </div>
      <span className="text-[11px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wide mb-1 leading-tight">
        {label}
      </span>
      <span 
        key={animationKey}
        className={`text-[22px] font-bold text-gray-800 dark:text-white ${animationKey ? 'animate-value-flash' : ''}`}
      >
        {value}
      </span>
    </div>
  );
}
