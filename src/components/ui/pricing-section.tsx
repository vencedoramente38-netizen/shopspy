"use client";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Acesso Vitalício",
    price: "R$ 0",
    description: "Tudo que você precisa para começar a minerar produtos virais hoje mesmo.",
    features: [
      "Acesso completo à plataforma",
      "Mineração de produtos em tempo real",
      "Monitoramento de categorias",
      "Suporte exclusivo via chat",
      "Filtros avançados de busca",
      "Acesso às atualizações futuras"
    ],
    buttonText: "Começar Agora",
    popular: true
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6 relative overflow-hidden bg-black">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D0011B]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#D0011B]/10 border border-[#D0011B]/20 text-[#D0011B] text-xs font-bold uppercase tracking-wider mb-6"
          >
            Preço Transparente
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic"
          >
            Escolha seu Plano
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-xl max-w-2xl mx-auto font-medium"
          >
            Otimize sua operação e escale seu faturamento com a ferramenta mais completa do mercado.
          </motion.p>
        </div>

        <div className="flex justify-center">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative w-full max-w-md p-8 md:p-12 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 group"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D0011B] text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-[#D0011B]/20">
                  Mais Popular
                </div>
              )}

              <div className="mb-10 text-center">
                <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tight">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-5xl md:text-7xl font-black text-white tracking-tighter">{plan.price}</span>
                </div>
                <p className="text-white/40 font-medium leading-relaxed">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-10">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D0011B]/10 border border-[#D0011B]/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#D0011B]" />
                    </div>
                    <span className="text-white/70 font-medium text-[15px]">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-5 rounded-2xl bg-[#D0011B] text-white text-lg font-black uppercase tracking-widest transition-all duration-300 hover:brightness-110 hover:shadow-2xl hover:shadow-[#D0011B]/40 active:scale-95">
                {plan.buttonText}
              </button>

              {/* Decorative border glow */}
              <div className="absolute inset-0 rounded-[40px] border-2 border-[#D0011B]/0 group-hover:border-[#D0011B]/20 transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
