"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function FeaturedSectionStats() {
  const data = [
    { name: "Jan", value: 30 },
    { name: "Feb", value: 45 },
    { name: "Mar", value: 75 },
    { name: "Apr", value: 110 },
    { name: "May", value: 155 },
    { name: "Jun", value: 210 },
    { name: "Jul", value: 280 },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto text-left py-24 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-[32px] sm:text-[40px] font-black text-white leading-tight mb-8">
            Impulsionando lucros com dados reais em tempo integral.{" "}
            <span className="text-white/40 text-[18px] sm:text-[24px] font-medium block mt-4">
              Nossa tecnologia de monitoramento ajuda você a encontrar produtos virais, 
              gerar ofertas e dominar a Shopee em segundos.
            </span>
          </h3>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <p className="text-4xl font-black text-[#D0011B]">+20.000</p>
              <p className="text-white/50 text-sm font-bold uppercase tracking-widest mt-2">Produtos Analisados</p>
            </div>
            <div>
              <p className="text-4xl font-black text-[#D0011B]">99.9%</p>
              <p className="text-white/50 text-sm font-bold uppercase tracking-widest mt-2">Uptime Garantido</p>
            </div>
            <div>
              <p className="text-4xl font-black text-[#D0011B]">500+</p>
              <p className="text-white/50 text-sm font-bold uppercase tracking-widest mt-2">Afiliados Ativos</p>
            </div>
            <div>
              <p className="text-4xl font-black text-[#D0011B]">1.2s</p>
              <p className="text-white/50 text-sm font-bold uppercase tracking-widest mt-2">Tempo de Resposta</p>
            </div>
          </div>
        </div>

        {/* Area Chart */}
        <div className="w-full h-64 sm:h-80 bg-white/5 rounded-3xl p-8 border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D0011B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D0011B" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#D0011B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a0a0a', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
                itemStyle={{ color: '#D0011B' }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#D0011B"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRed)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
