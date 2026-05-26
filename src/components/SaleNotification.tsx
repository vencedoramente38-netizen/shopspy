import React, { useEffect, useState, useRef } from 'react';
import { Product } from '../types';
import { ShoppingBag } from 'lucide-react';
import { userStorage } from '../lib/storage';

interface SaleNotificationProps {
  product: Product | null;
  onClose: () => void;
}

export default function SaleNotification({ product, onClose }: SaleNotificationProps) {
  const [isClosing, setIsClosing] = useState(false);
  const lastPlayedId = useRef<number | null>(null);

  const isAdmin = localStorage.getItem('shopspy_is_admin') === 'true';
  const notificationsEnabled = localStorage.getItem('shopspy_notifications_enabled') !== 'false';

  if (!isAdmin || !notificationsEnabled) return null; // Não renderizar nada

  const comissao = product 
    ? (parseFloat(product.preco.replace('R$ ', '').replace(',', '.')) * 0.1).toFixed(2)
    : '0.00';

  useEffect(() => {
    if (!product) {
      lastPlayedId.current = null;
      return;
    }

    const adminCheck = localStorage.getItem('shopspy_is_admin') === 'true';
    const enabledCheck = localStorage.getItem('shopspy_notifications_enabled') !== 'false';
    if (!adminCheck || !enabledCheck) return;

    // Play sound logic - only if it's a new product
    if (lastPlayedId.current !== product.id) {
      const playNotificationSound = () => {
        const soundName = userStorage.get('notification_sound') || 'Caixa registradora';
        const isCustomClick = soundName === 'Personalizado';
        
        if (soundName === 'Silencioso') return;

        // Se for personalizado, tocar o base64 salvo
        if (isCustomClick) {
          const base64 = userStorage.get('custom_sound');
          if (base64) {
            const audio = new Audio(base64);
            audio.volume = 0.4;
            audio.play().catch(console.error);
            return;
          }
        }

        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = new AudioContextClass();

        switch (soundName) {
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
          default: {
            // Legacy/Default
            const audio = new Audio('https://notification-sounds.com/soundsfiles/Shopee-notification-sound.mp3');
            audio.volume = 0.5;
            audio.play().catch(() => {});
          }
        }
      };

      playNotificationSound();
      lastPlayedId.current = product.id;

      // Dispatch custom event for dashboard
      window.dispatchEvent(new CustomEvent('shopspy_sale', {
        detail: {
          productId: product.id,
          price: parseFloat(product.preco.replace('R$ ', '').replace('.', '').replace(',', '.'))
        }
      }));
    }

    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(onClose, 300); // 4000 + 300 = 4300ms total
    }, 4000);

    return () => clearTimeout(timer);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div 
      className={`
        fixed bottom-6 right-6 z-[99]
        w-[320px] bg-white dark:bg-[#111111] border-l-[6px] border-l-primary rounded-lg p-3 flex items-center gap-3
        shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-black/5 dark:border-white/5
        ${isClosing ? 'animate-slide-out' : 'animate-slide-in'}
      `}
    >
      {/* Icon with glow matching image */}
      <div className="relative shrink-0">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-sm animate-pulse"></div>
        <div className="relative w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
            <ShoppingBag size={18} className="text-primary fill-primary/10" />
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-bold text-primary leading-tight">Venda realizada!</div>
        <div className="text-[12px] font-medium text-gray-700 dark:text-white/90 truncate">
          {product.nome}
        </div>
        <div className="text-[12px] font-medium flex items-center gap-1">
          <span className="text-gray-400">Comissão:</span>
          <span className="text-[#26AA99] font-bold">R$ {comissao.replace('.', ',')}</span>
        </div>
      </div>
    </div>
  );
}
