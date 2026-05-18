import React from 'react';
import { Settings as SettingsIcon, Palette, Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface SettingsProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className="flex-1 bg-gray-50 dark:bg-[#0a0a0a] p-6 min-h-screen font-['Space Grotesk'] transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon size={24} className="text-[#D0011B]" />
          <h1 className="text-[20px] font-bold text-gray-900 dark:text-white">Configurações</h1>
        </div>

        {/* Card: Aparência */}
        <section className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/[0.08] rounded-[14px] p-5 shadow-xl transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <Palette size={20} className="text-[#D0011B]" />
            <h2 className="text-[15px] font-bold text-gray-900 dark:text-white">Aparência</h2>
          </div>
          
          <div className="h-[1px] bg-gray-100 dark:bg-white/[0.06] w-full mb-3" />

          {/* Item Toggle Modo Claro/Escuro */}
          <div 
            onClick={toggleTheme}
            className="flex items-center justify-between p-3.5 bg-gray-50 dark:bg-[#1a1a1a] rounded-[10px] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#D0011B]/10 flex items-center justify-center text-[#D0011B] group-hover:scale-110 transition-transform">
                {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
              </div>
              <div>
                <p className="text-[14px] font-medium text-gray-900 dark:text-white">Modo Escuro</p>
                <p className="text-[12px] text-gray-500 dark:text-white/40">Alterna entre tema claro e escuro</p>
              </div>
            </div>

            {/* Custom Toggle Switch */}
            <div 
              className={`
                relative w-11 h-6 rounded-full transition-colors duration-200
                ${isDarkMode ? 'bg-[#D0011B]' : 'bg-[#333333]'}
              `}
            >
              <motion.div 
                animate={{ x: isDarkMode ? 22 : 2 }}
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-[18px] h-[18px] bg-white rounded-full shadow-sm"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
