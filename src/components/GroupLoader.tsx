import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';

interface GroupLoaderProps {
  isDone?: boolean;
}

const GroupLoader: React.FC<GroupLoaderProps> = ({ isDone }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isDone) {
      setProgress(100);
      return;
    }

    let current = 0;
    const simulate = () => {
      if (current < 96) {
        const step = Math.random() * 1.5;
        current = Math.min(current + step, 96);
        setProgress(Math.floor(current));
        const delay = Math.random() * 50 + 20;
        setTimeout(simulate, delay);
      }
    };
    const timeout = setTimeout(simulate, 400);
    return () => clearTimeout(timeout);
  }, [isDone]);

  return (
    <div className="flex flex-col items-center justify-center p-12 px-6 bg-[#f9f9f9] dark:bg-[#111111] border border-black/[0.05] dark:border-white/[0.05] rounded-[16px] mt-4 font-['Space Grotesk',sans-serif]">
      <style>{`
        @keyframes rotate-loader {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-rotate-custom {
          animation: rotate-loader 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* ÍCONE CENTRAL (ai-orb) */}
      <div className="relative w-20 h-20 bg-black/[0.03] dark:bg-white/[0.03] rounded-full flex items-center justify-center border border-black/[0.08] dark:border-white/[0.08] mb-7">
        {/* Anel giratório */}
        <div className="absolute w-[112%] h-[112%] rounded-full border-2 border-transparent border-t-[#D0011B] border-b-black dark:border-b-white animate-rotate-custom" />
        
        {/* Glow atrás do orb */}
        <div className="absolute w-[140px] h-[140px] bg-[radial-gradient(circle,rgba(208,1,27,0.15)_0%,rgba(0,0,0,0.05)_50%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(208,1,27,0.25)_0%,rgba(255,255,255,0.1)_50%,transparent_70%)] blur-[25px] -z-10" />
        
        <Search size={22} className="text-[#D0011B]" />
      </div>

      <div className="text-[15px] font-semibold text-gray-900 dark:text-white mb-1.5">Buscando Grupos</div>
      <div className="text-[12px] text-gray-500 dark:text-white/50 text-center">Encontrando os melhores grupos para seu produto...</div>

      {/* BARRA DE PROGRESSO */}
      <div className="w-[280px] h-1.5 bg-black/[0.08] dark:bg-white/[0.08] rounded-full overflow-hidden my-5">
        <motion.div 
          className="h-full bg-[#D0011B] shadow-[0_0_15px_rgba(208,1,27,0.4)] rounded-full transition-all duration-400 ease-[cubic-bezier(0.1,0.7,0.1,1)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-[26px] font-bold text-gray-900 dark:text-white tabular-nums">
        {progress}%
      </div>
    </div>
  );
};

export default GroupLoader;
