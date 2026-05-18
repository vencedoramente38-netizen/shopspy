import React, { useState } from 'react';
import { 
  X, 
  TrendingUp, 
  ShoppingBag, 
  Percent, 
  DollarSign, 
  ExternalLink,
  Clock,
  Store,
  Zap,
  Crown,
  Video,
  Circle,
  Gift,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { CopyButton } from './ui/CopyButton';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!product) return null;

  const precoNum = parseFloat(product.preco.replace('R$ ', '').replace('.', '').replace(',', '.')) || 0;
  const comissaoPorVenda = (precoNum * 0.1);
  
  const parseVendas = (vendas: string) => {
    if (vendas.toLowerCase() === 'novo') return 0;
    const clean = vendas.replace('mil', '').replace(',', '.');
    const num = parseFloat(clean);
    if (isNaN(num)) return 0;
    return vendas.includes('mil') ? num * 1000 : num;
  };

  const vendasTotais = parseVendas(product.vendas);
  const vendasDia = Math.round(vendasTotais / 30) || 0;

  const stats = [
    { icon: TrendingUp, label: "Score Viral", value: product.scoreViral, sublabel: "viralidade", isMain: true },
    { icon: ShoppingBag, label: "Vendas/Dia", value: vendasDia, sublabel: "média estimada" },
    { icon: Percent, label: "Margem", value: "30%", sublabel: "lucro estimado" },
    { icon: DollarSign, label: "Comissão", value: `R$ ${comissaoPorVenda.toFixed(2)}`, sublabel: "por venda" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-[520px] max-h-[90vh] bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-5 overflow-y-auto custom-scrollbar shadow-2xl transition-colors duration-300"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-7 h-7 bg-gray-100 dark:bg-[#1a1a1a] hover:bg-gray-200 dark:hover:bg-white/10 rounded-full flex items-center justify-center text-gray-500 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X size={14} />
            </button>

            {/* SEÇÃO 1 — CABEÇALHO */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-24 h-24 sm:w-[120px] sm:h-[120px] rounded-xl overflow-hidden shrink-0">
                <img src={product.imagem} alt={product.nome} className="w-full h-full object-cover" />
                <div className="absolute bottom-1.5 left-1.5 bg-primary text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                  🔥 Hot
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <span className="text-[10px] font-bold text-primary uppercase mb-1">{product.categoria}</span>
                <h2 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">{product.nome}</h2>
                
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-white/60">
                    <StarIcon /> {product.avaliacao} · {product.vendas} vendas
                  </div>
                  <span className="bg-primary/15 text-primary text-[10px] px-2 py-0.5 rounded-full font-medium">Concorrência média</span>
                </div>

                <div className="flex items-center justify-between mt-3 bg-gray-50 dark:bg-white/[0.03] p-2 rounded-lg border border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-gray-900 dark:text-white">{product.preco}</span>
                    <span className="bg-primary text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold whitespace-nowrap">{product.comissao || '10%'} comissão</span>
                  </div>
                  <div className="flex items-center gap-2 pr-1">
                    <span className="text-[11px] text-gray-400 font-bold uppercase tracking-tight">Copiar Link</span>
                    <CopyButton value={product.link} />
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 text-[11px] text-gray-400 dark:text-white/50">
                  <div className="flex items-center gap-1"><Clock size={12} /> 7-15 dias</div>
                  <div className="flex items-center gap-1"><Store size={12} /> Fornecedor 4.5/5</div>
                </div>
              </div>
            </div>

            <button
               onClick={() => window.open(product.link, '_blank')}
               className="afiliar-btn"
            >
              <span className="flex items-center justify-center gap-2">
                Afiliar-se a este Produto <ExternalLink size={20} />
              </span>
            </button>

            <style>{`
              .afiliar-btn {
                width: 100%;
                background: #D0011B;
                border-radius: 12px;
                padding: 14px;
                font-size: 16px;
                font-weight: 700;
                color: white;
                border: none;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
                letter-spacing: 0.3px;
                margin-top: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .afiliar-btn:hover {
                transform: scale(1.02);
                box-shadow: 0 8px 20px -5px rgba(208, 1, 27, 0.4);
                filter: brightness(1.1);
              }
              .afiliar-btn:active {
                transform: scale(0.97);
              }
              .afiliar-btn::after {
                content: '';
                position: absolute;
                top: 0; left: -100%;
                width: 100%; height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
                transition: 0.4s;
              }
              .afiliar-btn:hover::after {
                left: 100%;
              }
            `}</style>

            {/* SEÇÃO 2 — SCORE VIRAL + INDICADORES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
              {stats.map((stat, i) => (
                <div key={i} className={`bg-gray-50 dark:bg-[#111111] border border-gray-100 dark:border-white/[0.08] rounded-xl p-3 flex flex-col transition-colors ${stat.isMain ? 'ring-1 ring-primary/20 bg-primary/5' : ''}`}>
                  <div className="flex items-center gap-1 text-primary">
                    <stat.icon size={12} />
                    <span className="text-[10px] text-gray-400 dark:text-white/45 uppercase font-medium">{stat.label}</span>
                  </div>
                  <div className="text-base font-bold text-gray-900 dark:text-white mt-1">{stat.value}</div>
                  <span className="text-[9px] text-gray-400 dark:text-white/45 uppercase tracking-wider">{stat.sublabel}</span>
                  {stat.isMain && (
                    <div className="w-full h-1 bg-gray-200 dark:bg-white/10 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${stat.value}%` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* SEÇÃO 3 — PROJEÇÃO DE LUCRO */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign size={16} className="text-primary" />
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Projeção de Lucro</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { label: "Início", count: 10, icon: TrendingUp },
                  { label: "Crescimento", count: 100, icon: Zap },
                  { label: "Escala", count: 1000, icon: Crown }
                ].map((tier, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-[#111111] border border-gray-100 dark:border-white/[0.08] rounded-xl p-3 transition-colors">
                    <div className="flex items-center gap-1.5 text-gray-500 dark:text-white/45 text-[10px] mb-2">
                      <tier.icon size={12} className="text-primary" />
                      {tier.label} ({tier.count} vendas)
                    </div>
                    <div className="text-[10px] text-gray-400 dark:text-white/45">Comissão por venda R${comissaoPorVenda.toFixed(2)}</div>
                    <div className="text-sm font-bold text-primary mt-1">Lucro Total <span className="text-gray-900 dark:text-white font-black">R$ {(comissaoPorVenda * tier.count).toFixed(2)}</span></div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 dark:text-white/40 mt-3 italic">Projeção baseada em tráfego 100% orgânico</p>
            </div>

            {/* SEÇÃO 4 — CRIATIVOS RECOMENDADOS */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Video size={16} className="text-primary" />
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Criativos Recomendados</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="bg-gray-50 dark:bg-[#111111] border border-gray-100 dark:border-white/[0.08] rounded-xl p-3 flex gap-3 transition-colors">
                   <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 border border-primary/20">
                    <Circle size={14} className="text-primary" fill="currentColor" />
                   </div>
                   <div>
                    <h4 className="text-[12px] font-bold text-gray-900 dark:text-white">UGC Review</h4>
                    <p className="text-[10px] text-gray-500 dark:text-white/45 leading-tight mt-0.5">Review autêntico como usuário real do produto</p>
                   </div>
                </div>
                <div className="bg-gray-50 dark:bg-[#111111] border border-gray-100 dark:border-white/[0.08] rounded-xl p-3 flex gap-3 transition-colors">
                   <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center shrink-0 border border-green-500/20">
                    <Gift size={14} className="text-green-600 dark:text-green-500" />
                   </div>
                   <div>
                    <h4 className="text-[12px] font-bold text-gray-900 dark:text-white">Unboxing</h4>
                    <p className="text-[10px] text-gray-500 dark:text-white/45 leading-tight mt-0.5">Abra o produto mostrando a experiência completa</p>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FBBF24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}
