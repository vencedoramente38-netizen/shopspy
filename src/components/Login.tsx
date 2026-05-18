import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

interface LoginProps {
  onLogin: () => void;
  onBack?: () => void;
}

export default function Login({ onLogin, onBack }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setErrorMsg('');
    setIsLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        setErrorMsg('E-mail ou senha incorretos');
        setIsLoading(false);
        return;
      }

      // Verificar se usuário está ativo e plano válido
      const { data: userData, error: dbError } = await supabase
        .from('users_shopspy')
        .select('is_active, plan, plan_expires_at')
        .eq('id', data.user.id)
        .single();

      if (dbError || !userData) {
        setErrorMsg('Conta não encontrada. Entre em contato com o suporte.');
        await supabase.auth.signOut();
        setIsLoading(false);
        return;
      }

      if (!userData.is_active) {
        setErrorMsg('Sua conta está inativa. Entre em contato com o suporte.');
        await supabase.auth.signOut();
        setIsLoading(false);
        return;
      }

      // Verificar expiração do plano mensal
      if (userData.plan === 'mensal' && userData.plan_expires_at) {
        const expired = new Date(userData.plan_expires_at) < new Date();
        if (expired) {
          setErrorMsg('Seu acesso expirou. Renove seu plano para continuar.');
          await supabase.auth.signOut();
          setIsLoading(false);
          return;
        }
      }


      // Verificar se é admin
      const { data: adminData } = await supabase
        .from('admins_shopspy')
        .select('email')
        .eq('email', data.user.email?.toLowerCase())
        .maybeSingle();

      const isAdmin = !!adminData;
      localStorage.setItem('shopspy_auth', 'true');
      localStorage.setItem('shopspy_plan', userData.plan);
      localStorage.setItem('shopspy_is_admin', isAdmin ? 'true' : 'false');
      localStorage.setItem('shopspy_notifications_enabled', 'false'); // sempre começa desativado
      localStorage.setItem('shopspy_user_email', data.user.email?.toLowerCase() || '');
      onLogin();
    } catch (err) {
      console.error(err);
      setErrorMsg('Ocorreu um erro ao entrar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden font-['Space Grotesk']">
      {/* Grid Background Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{ 
          backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Decorative Glow (Subtle in light mode) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D0011B] opacity-[0.05] blur-[120px] pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[400px] max-w-[calc(100%-32px)] bg-white border border-black/[0.05] rounded-[24px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-10 relative"
      >
        {/* BOTÃO VOLTAR */}
        {onBack && (
          <button 
            onClick={onBack}
            className="absolute top-8 left-8 text-black/30 hover:text-black transition-colors flex items-center gap-1.5 text-[12px] font-medium"
          >
            <ArrowLeft size={14} />
            Voltar
          </button>
        )}

        {/* TOPO DO CARD */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://i.postimg.cc/NfH1HDns/download-10-removebg-preview.png" 
              alt="ShopSpy Logo" 
              className="h-16 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-[14px] text-black/40 mt-1 text-center font-medium">Acesse sua conta</p>
        </div>

        {/* FORMULÁRIO */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[12px] text-black/50 uppercase font-bold tracking-wider">E-mail</label>
            <input 
              type="email" 
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f9f9fb] border border-black/[0.08] rounded-[12px] px-4 py-3.5 text-black text-[14px] placeholder-black/20 transition-all duration-200 outline-none focus:bg-white focus:border-[#D0011B]/80 focus:ring-4 focus:ring-[#D0011B]/5"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[12px] text-black/50 uppercase font-bold tracking-wider">Senha</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full bg-[#f9f9fb] border border-black/[0.08] rounded-[12px] px-4 py-3.5 text-black text-[14px] placeholder-black/20 transition-all duration-200 outline-none focus:bg-white focus:border-[#D0011B]/80 focus:ring-4 focus:ring-[#D0011B]/5"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/60 transition-colors"
                type="button"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* MENSAGEM DE ERRO */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-[#D0011B]/5 border border-[#D0011B]/20 rounded-[10px] p-3 flex items-center gap-3 overflow-hidden"
              >
                <AlertCircle size={18} className="text-[#D0011B] shrink-0" />
                <span className="text-[#D0011B] text-[13px] font-bold">{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BOTÃO ENTRAR */}
          <button 
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-[#D0011B] text-white rounded-[12px] py-[16px] text-[15px] font-bold mt-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_24px_rgba(208,1,27,0.3)] hover:brightness-[1.1] active:scale-[0.98] relative overflow-hidden group shadow-lg shadow-[#D0011B]/10"
          >
            <span className={isLoading ? 'opacity-0' : 'opacity-100'}>Entrar</span>
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
          </button>
        </div>

        {/* RODAPÉ DO CARD */}
        <div className="mt-10 text-center">
          <p className="text-[12px] text-black/40 font-medium">
            Não tem acesso? <a href="#" className="text-[#D0011B] font-bold hover:underline">Entre em contato.</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
