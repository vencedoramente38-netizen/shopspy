import React, { useState } from 'react';
import { 
  Gift, 
  ShoppingBag, 
  Users, 
  Sparkles, 
  Zap,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReferralPage() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const copyPriceLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="min-h-full bg-white dark:bg-[#0a0a0a] text-black dark:text-white p-6 font-['Space Grotesk'] selection:bg-[#D0011B]/30 overflow-x-hidden">
      {/* TOPO DA PÁGINA */}
      <div className="flex flex-col items-center mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D0011B]/10 border border-[#D0011B]/30"
        >
          <ShoppingBag size={14} className="text-[#D0011B]" />
          <span className="text-[#D0011B] text-[11px] font-bold tracking-wider uppercase">ACESSO EXCLUSIVO</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-[36px] font-black text-[#D0011B] text-center mt-6 leading-tight"
        >
          Ganhe 10% ao indicar novos usuários
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[14px] text-black/50 dark:text-white/50 text-center max-w-[600px] mt-3 leading-relaxed"
        >
          Como afiliado ou proprietário, você recebe 10% do faturamento gerado pelos usuários que indicar, referente ao primeiro mês de uso na plataforma.
        </motion.p>
      </div>

      {/* BARRA DE PROGRESSO DE INDICADOS */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-50 dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-[14px] p-5 max-w-[700px] mx-auto mt-8 shadow-xl"
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-black/40 dark:text-white/50" />
            <span className="text-[14px] text-black dark:text-white font-medium">Usuários indicados</span>
          </div>
          <span className="text-[14px] text-black dark:text-white font-bold tracking-wider">0/10</span>
        </div>
        
        <div className="h-1.5 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "0%" }}
            className="h-full bg-[#D0011B]"
          />
        </div>
        
        <p className="text-[12px] text-black/40 dark:text-white/40 mt-3 font-medium">
          Você pode indicar até 10 pessoas neste programa.
        </p>
      </motion.div>

      {/* SEÇÃO "COMO FUNCIONA" */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-50 dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-[16px] p-6 max-w-[700px] mx-auto mt-6 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles size={20} className="text-[#D0011B]" />
          <h2 className="text-[16px] font-bold text-black dark:text-white">Como funciona o programa de Indicações</h2>
        </div>
        
        <div className="w-full h-px bg-black/5 dark:bg-white/5 mb-6" />

        <div className="flex flex-col gap-3">
          {/* Sub-card 1 */}
          <div className="bg-white dark:bg-white/[0.03] rounded-[10px] p-4 border border-black/5 dark:border-white/5 shadow-sm">
            <h3 className="text-[14px] font-bold text-black dark:text-white mb-2">💰 Receba 10% do faturamento no primeiro mês</h3>
            <p className="text-[13px] text-black/60 dark:text-white/60 leading-relaxed font-medium">
              Durante o <span className="text-[#D0011B] font-bold italic">primeiro mês</span> de atividade do usuário indicado, você recebe <span className="text-[#D0011B] font-bold">10% do valor da comissão</span> gerada por ele.
            </p>
            <p className="text-[12px] text-black/40 dark:text-white/40 mt-3 italic border-l-2 border-[#D0011B]/30 pl-3">
              Exemplo: se o indicado faturar R$ 100 em comissão, você recebe R$ 10 automaticamente.
            </p>
          </div>

          {/* Sub-card 2 */}
          <div className="bg-white dark:bg-white/[0.03] rounded-[10px] p-4 border border-black/5 dark:border-white/5 shadow-sm">
            <h3 className="text-[14px] font-bold text-black dark:text-white mb-2">📅 Válido apenas no primeiro mês</h3>
            <p className="text-[13px] text-black/60 dark:text-white/60 leading-relaxed font-medium">
              Você recebe 10% de <span className="font-bold underline decoration-[#D0011B]/50 text-black dark:text-white">todas as vendas realizadas</span> pelo usuário indicado durante o primeiro mês na plataforma. Quanto maior o faturamento dele, maior será o seu ganho.
            </p>
          </div>

          {/* Sub-card 3 */}
          <div className="bg-white dark:bg-white/[0.03] rounded-[10px] p-4 border border-black/5 dark:border-white/5 shadow-sm">
            <h3 className="text-[14px] font-bold text-black dark:text-white mb-4">🎁 Desconto Exclusivo para Indicações</h3>
            <p className="text-[13px] text-black/60 dark:text-white/60 mb-5 font-medium">
              Quem entrar pelo seu link tem acesso a <span className="text-[#D0011B] font-bold italic">preços exclusivos:</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card Mensal */}
              <div className="bg-[#D0011B]/5 dark:bg-[#D0011B]/10 border border-[#D0011B]/20 rounded-[12px] p-5 flex flex-col items-center">
                <span className="bg-[#D0011B] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">-40% OFF</span>
                <span className="text-[14px] font-bold text-black dark:text-white mt-3">Plano Mensal</span>
                <span className="text-[13px] text-black/20 dark:text-white/40 line-through mt-1">R$ 247</span>
                <div className="flex items-baseline mt-4">
                  <span className="text-[16px] text-[#D0011B] font-bold">R$</span>
                  <span className="text-[42px] font-black text-[#D0011B] leading-none ml-1">97</span>
                </div>
                <span className="text-[12px] text-black/40 dark:text-white/40 mt-1">por mês</span>
                
              </div>

              {/* Card Vitalício */}
              <div className="bg-[#22C55E]/5 dark:bg-[#22C55E]/5 border border-[#22C55E]/10 rounded-[12px] p-5 flex flex-col items-center">
                <span className="bg-yellow-500/15 dark:bg-[#EAB308]/15 text-yellow-600 dark:text-[#EAB308] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">🔥 MAIS POPULAR</span>
                <span className="text-[14px] font-bold text-black dark:text-white mt-3">Plano Vitalício</span>
                <span className="text-[13px] text-black/20 dark:text-white/40 line-through mt-1">R$ 697</span>
                <span className="text-[12px] text-black/50 dark:text-white/50 mt-4 leading-none">12x de</span>
                <div className="flex items-baseline mt-1">
                  <span className="text-[16px] text-[#22C55E] font-bold">R$</span>
                  <span className="text-[42px] font-black text-[#22C55E] leading-none ml-1">12,25</span>
                </div>
                <span className="text-[12px] text-black/40 dark:text-white/40 mt-1">ou R$ 147 à vista</span>

              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 text-black/30 dark:text-white/40 italic">
              <Zap size={14} />
              <span className="text-[12px]">Esses preços são exclusivos para quem vem por indicação!</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
