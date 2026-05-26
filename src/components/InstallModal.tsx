import React from 'react';
import { X, Smartphone, MoreHorizontal, Share2, PlusSquare, Apple } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstallModal({ isOpen, onClose }: InstallModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] overflow-y-auto overflow-x-hidden">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-[8px]"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[400px] bg-white dark:bg-[#111111] border border-black/10 dark:border-white/[0.08] rounded-[24px] p-8 shadow-2xl transition-all duration-300 z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-white/50 dark:hover:text-white transition-colors"
            >
              <X size={16} />
            </button>

            <div className="flex flex-col items-center">
              <div className="w-12 h-14 border-2 border-primary rounded-lg flex items-center justify-center text-primary mb-6 relative">
                 <div className="w-1 h-1 bg-primary rounded-full absolute bottom-1" />
                 <div className="w-1.5 h-1.5 bg-primary/20 rounded-full absolute top-1" />
              </div>
              
              <h2 className="text-[22px] font-bold text-gray-900 dark:text-white text-center leading-tight font-['Space Grotesk']">
                Instale o ShopSpy no seu iPhone
              </h2>
              <p className="text-[14px] text-gray-600 dark:text-white/45 text-center mt-3 leading-relaxed px-2 font-medium font-['Space Grotesk']">
                Acesse a plataforma como um app nativo, direto da sua tela inicial.
              </p>
            </div>

            <div className="space-y-3 mt-8">
              <div className="bg-gray-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.05] p-4 rounded-2xl flex items-center gap-4">
                <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0">1</div>
                <div className="flex items-center gap-3">
                  <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg">
                    <MoreHorizontal size={18} className="text-gray-500 dark:text-white/60 shrink-0" />
                  </div>
                  <span className="text-[14px] text-gray-800 dark:text-white/80 font-medium font-['Space Grotesk'] leading-tight">
                    Na barra de pesquisa do Safari, toque nos 3 pontinhos
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.05] p-4 rounded-2xl flex items-center gap-4">
                <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0">2</div>
                <div className="flex items-center gap-3">
                  <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg">
                    <Share2 size={18} className="text-gray-500 dark:text-white/60 shrink-0" />
                  </div>
                  <span className="text-[14px] text-gray-800 dark:text-white/80 font-medium font-['Space Grotesk'] leading-tight">
                    Toque em Compartilhar no menu que aparece
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.05] p-4 rounded-2xl flex items-center gap-4">
                <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0">3</div>
                <div className="flex items-center gap-3">
                  <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg">
                    <PlusSquare size={18} className="text-gray-500 dark:text-white/60 shrink-0" />
                  </div>
                  <span className="text-[14px] text-gray-800 dark:text-white/80 font-medium font-['Space Grotesk'] leading-tight">
                    Toque em Adicionar à Tela de Início e confirme
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 dark:text-white/30 mt-8 mb-6 font-['Space Grotesk']">
              <Apple size={14} />
              <span>Disponível apenas para iPhone com Safari</span>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-primary text-white py-4 rounded-[12px] font-bold text-[16px] hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 font-['Space Grotesk']"
            >
              Entendido!
            </button>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

