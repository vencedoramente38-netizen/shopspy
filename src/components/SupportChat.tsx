import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Plus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuickReply {
  id: string;
  question: string;
  answer: string;
}

const QUICK_REPLIES: QuickReply[] = [
  {
    id: 'how-it-works',
    question: 'Como funciona o ShopSpy?',
    answer: 'O ShopSpy é uma plataforma de inteligência para afiliados. Nós monitoramos os produtos mais vendidos e virais da Shopee em tempo real, fornecemos métricas de vendas, análise de concorrência e ferramentas para você criar sua estrutura de vendas em segundos.'
  },
  {
    id: 'plans',
    question: 'Quais são os planos?',
    answer: 'Atualmente temos o Plano Mensal (R$ 47,00/mês) e o Plano Vitalício (R$ 147,00 em oferta única). Ambos dão acesso total às ferramentas de espionagem, buscador de produtos e gerador de estruturas.'
  },
  {
    id: 'contact',
    question: 'Como entrar em contato?',
    answer: 'Você pode falar com nosso suporte oficial via WhatsApp clicando no link disponível na aba "Configurações" ou enviando um e-mail para suporte@shopspy.com.br. Nosso horário de atendimento é de segunda a sexta, das 09h às 18h.'
  },
  {
    id: 'nova-estrutura',
    question: 'O que é a Nova Estrutura?',
    answer: 'A "Nova Estrutura" é nossa ferramenta exclusiva de automação. Com ela, você escolhe um produto e nossa IA gera automaticamente a copy, o link encurtado e encontra os melhores grupos de promoção para você divulgar.'
  }
];

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ type: 'user' | 'bot', content: string }[]>([
    { type: 'bot', content: 'Olá! Sou seu assistente ShopSpy. Como posso te ajudar hoje?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleQuickReply = (reply: QuickReply) => {
    setMessages(prev => [...prev, { type: 'user', content: reply.question }]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', content: reply.answer }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-['Space Grotesk']">
      {/* Botão Flutuante */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#D0011B] text-white rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(208,1,27,0.4)] relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? <X key="close" size={24} /> : <MessageCircle key="chat" size={24} />}
        </AnimatePresence>
        
        {/* Notificação Pulse */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#080808] rounded-full animate-bounce" />
        )}
      </motion.button>

      {/* Janela de Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[360px] max-w-[calc(100vw-48px)] bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-[24px] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#D0011B] p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[16px]">Suporte ShopSpy</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[11px] opacity-80 font-medium">Online para te ajudar</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[350px] min-h-[300px] custom-scrollbar bg-gray-50/50 dark:bg-black/20">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.type === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[80%] p-3.5 rounded-[18px] text-[13px] leading-relaxed
                    ${msg.type === 'user' 
                      ? 'bg-[#D0011B] text-white rounded-br-none font-medium' 
                      : 'bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-white/80 rounded-bl-none shadow-sm border border-black/[0.03] dark:border-white/[0.03]'}
                  `}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-[#1a1a1a] p-3 rounded-[18px] rounded-bl-none shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-[#D0011B] rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-[#D0011B] rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-[#D0011B] rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies Area */}
            <div className="p-4 border-t border-black/5 dark:border-white/[0.06] bg-white dark:bg-[#111111]">
              <p className="text-[10px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-widest mb-3 px-1">Perguntas Frequentes</p>
              <div className="flex flex-col gap-2">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => handleQuickReply(reply)}
                    className="text-left text-[12px] p-2.5 rounded-xl border border-black/[0.05] dark:border-white/[0.05] hover:border-[#D0011B]/50 dark:hover:border-[#D0011B]/50 hover:bg-[#D0011B]/5 dark:hover:bg-[#D0011B]/5 transition-all text-gray-600 dark:text-white/60 flex items-center justify-between group"
                  >
                    <span className="group-hover:text-[#D0011B] transition-colors">{reply.question}</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Input (Decorative) */}
            <div className="p-4 bg-gray-50 dark:bg-[#0d0d0d] flex gap-2 border-t border-black/5 dark:border-white/[0.06]">
              <div className="flex-1 bg-white dark:bg-white/[0.05] rounded-xl px-4 py-2.5 border border-black/[0.08] dark:border-white/[0.1] text-[13px] text-gray-400">
                Digite sua mensagem...
              </div>
              <button disabled className="w-10 h-10 bg-gray-200 dark:bg-white/10 text-gray-400 rounded-xl flex items-center justify-center">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
