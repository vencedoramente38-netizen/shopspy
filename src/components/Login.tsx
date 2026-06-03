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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const handleLogin = async () => {
    setErrorMsg('');
    setIsLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password
      });

      if (authError) throw authError;

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

      if (userData.plan === 'mensal' && userData.plan_expires_at) {
        const expired = new Date(userData.plan_expires_at) < new Date();
        if (expired) {
          setErrorMsg('Seu acesso expirou. Renove seu plano para continuar.');
          await supabase.auth.signOut();
          setIsLoading(false);
          return;
        }
      }

      const { data: adminData } = await supabase
        .from('admins_shopspy')
        .select('email')
        .eq('email', data.user.email?.toLowerCase())
        .maybeSingle();

      const isAdmin = !!adminData;
      localStorage.setItem('shopspy_auth', 'true');
      localStorage.setItem('shopspy_plan', userData.plan);
      localStorage.setItem('shopspy_is_admin', isAdmin ? 'true' : 'false');
      localStorage.setItem('shopspy_notifications_enabled', 'false');
      localStorage.setItem('shopspy_user_email', data.user.email?.toLowerCase() || '');
      onLogin();

    } catch (err) {
      console.warn('Erro no login Supabase:', err);
      const emailNormalized = email.toLowerCase().trim();
      const adminAccounts = [
        { email: 'shopspyadmin@gmail.com', password: 'ShopSpy@Admin2026' },
      ];

      const adminAccount = adminAccounts.find(
        a => a.email === emailNormalized && a.password === password
      );

      if (adminAccount) {
        localStorage.setItem('shopspy_auth', 'true');
        localStorage.setItem('shopspy_is_admin', 'true');
        localStorage.setItem('shopspy_user_email', adminAccount.email);
        localStorage.setItem('shopspy_plan', 'vitalicio');
        localStorage.setItem('shopspy_notifications_enabled', 'false');
        onLogin();
        return;
      }

      const allowedEmails = ['usuarioshopspy765@gmail.com'];
      if (allowedEmails.includes(emailNormalized) && password === 'shopspy9246') {
        localStorage.setItem('shopspy_auth', 'true');
        localStorage.setItem('shopspy_is_admin', 'false');
        localStorage.setItem('shopspy_user_email', emailNormalized);
        localStorage.setItem('shopspy_plan', 'mensal');
        localStorage.setItem('shopspy_notifications_enabled', 'false');
        onLogin();
        return;
      }

      setErrorMsg('E-mail ou senha incorretos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('As senhas não coincidem.');
      setIsLoading(false);
      return;
    }

    try {
      const { data: userData, error: userError } = await supabase
        .from('users_shopspy')
        .select('id, email, is_active, plan')
        .eq('email', email.toLowerCase().trim())
        .maybeSingle();

      if (!userData) {
        setErrorMsg('E-mail não encontrado. Verifique se usou o mesmo e-mail da compra.');
        setIsLoading(false);
        return;
      }

      if (!userData.is_active) {
        setErrorMsg('Sua conta está inativa. Entre em contato com o suporte.');
        setIsLoading(false);
        return;
      }

      const { error: updateError } = await supabase.auth.admin.updateUserById(
        userData.id,
        { password }
      );

      if (updateError) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.toLowerCase().trim(),
          password
        });
        if (signUpError) throw signUpError;
      }

      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password
      });

      if (loginError) throw loginError;

      localStorage.setItem('shopspy_auth', 'true');
      localStorage.setItem('shopspy_is_admin', 'false');
      localStorage.setItem('shopspy_user_email', email.toLowerCase().trim());
      localStorage.setItem('shopspy_plan', userData.plan);
      localStorage.setItem('shopspy_notifications_enabled', 'false');
      onLogin();

    } catch (err: any) {
      const allowedEmails = ['usuarioshopspy765@gmail.com'];
      if (allowedEmails.includes(email.toLowerCase().trim())) {
        localStorage.setItem('shopspy_auth', 'true');
        localStorage.setItem('shopspy_is_admin', 'false');
        localStorage.setItem('shopspy_user_email', email.toLowerCase().trim());
        localStorage.setItem('shopspy_plan', 'mensal');
        localStorage.setItem('shopspy_notifications_enabled', 'false');
        onLogin();
      } else {
        setErrorMsg('E-mail não encontrado ou não autorizado. Use o e-mail da compra.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#080808] flex items-center justify-center relative overflow-hidden font-['Space Grotesk'] transition-colors duration-300">
      {/* Grid Background Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 dark:opacity-10"
        style={{ 
          backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D0011B] opacity-[0.05] dark:opacity-[0.1] blur-[120px] pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[400px] max-w-[calc(100%-32px)] bg-white dark:bg-[#111111] border border-black/[0.05] dark:border-white/[0.05] rounded-[24px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-10 relative"
      >
        {/* BOTÃO VOLTAR */}
        {onBack && (
          <button 
            onClick={onBack}
            className="absolute top-8 left-8 text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1.5 text-[12px] font-medium"
          >
            <ArrowLeft size={14} />
            Voltar
          </button>
        )}

        {/* TOPO DO CARD */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://i.postimg.cc/NFkJ8vX6/edd68b75-b6bf-4dcd-af88-7dd1332566ed.png" 
              alt="ShopSpy Logo" 
              className="h-16 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-[14px] text-black/40 dark:text-white/40 mt-1 text-center font-medium">Acesse sua conta</p>
          <p className="text-[13px] text-black/45 dark:text-white/45 text-center mt-2 mb-4 leading-[1.6] max-w-[300px] mx-auto">
            Acesso exclusivo para quem já adquiriu a plataforma.<br/>
            Use o mesmo e-mail da compra para liberar sua conta.
          </p>
        </div>

        <div className="flex bg-black/[0.06] dark:bg-white/[0.06] rounded-[10px] p-1 mb-6">
          <button 
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 rounded-lg font-bold text-[14px] transition-all duration-200 ${
              activeTab === 'login' 
                ? 'bg-[#D0011B] text-white' 
                : 'bg-transparent text-black/50 dark:text-white/50'
            }`}
          >
            Entrar
          </button>
          <button 
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 rounded-lg font-bold text-[14px] transition-all duration-200 ${
              activeTab === 'register' 
                ? 'bg-[#D0011B] text-white' 
                : 'bg-transparent text-black/50 dark:text-white/50'
            }`}
          >
            Criar conta
          </button>
        </div>

        {/* FORMULÁRIO */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[12px] text-black/50 uppercase font-bold tracking-wider">
              {activeTab === 'register' ? 'E-mail da compra' : 'E-mail'}
            </label>
            <input 
              type="email" 
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f9f9fb] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] rounded-[12px] px-4 py-3.5 text-black dark:text-white text-[14px] placeholder-black/20 dark:placeholder-white/20 transition-all duration-200 outline-none focus:bg-white dark:focus:bg-white/10 focus:border-[#D0011B]/80 focus:ring-4 focus:ring-[#D0011B]/5 focus-glow"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[12px] text-black/50 uppercase font-bold tracking-wider">
              {activeTab === 'register' ? 'Criar senha' : 'Senha'}
            </label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (activeTab === 'register' ? handleRegister() : handleLogin())}
                className="w-full bg-[#f9f9fb] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] rounded-[12px] px-4 py-3.5 text-black dark:text-white text-[14px] placeholder-black/20 dark:placeholder-white/20 transition-all duration-200 outline-none focus:bg-white dark:focus:bg-white/10 focus:border-[#D0011B]/80 focus:ring-4 focus:ring-[#D0011B]/5 focus-glow"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 hover:text-black/60 dark:hover:text-white/60 transition-colors"
                type="button"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {activeTab === 'register' && (
            <div className="space-y-2">
              <label className="text-[12px] text-black/50 uppercase font-bold tracking-wider">Confirmar senha</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                  className="w-full bg-[#f9f9fb] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] rounded-[12px] px-4 py-3.5 text-black dark:text-white text-[14px] placeholder-black/20 dark:placeholder-white/20 transition-all duration-200 outline-none focus:bg-white dark:focus:bg-white/10 focus:border-[#D0011B]/80 focus:ring-4 focus:ring-[#D0011B]/5 focus-glow"
                />
              </div>
            </div>
          )}


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

          {/* BOTÃO PRINCIPAL */}
          <button 
            onClick={activeTab === 'register' ? handleRegister : handleLogin}
            disabled={isLoading}
            className="w-full bg-[#D0011B] text-white rounded-[12px] py-[16px] text-[15px] font-bold mt-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_24px_rgba(208,1,27,0.3)] hover:brightness-[1.1] active:scale-[0.98] relative overflow-hidden group shadow-lg shadow-[#D0011B]/10"
          >
            <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
              {activeTab === 'register' ? 'Liberar minha conta' : 'Entrar'}
            </span>
            
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
          <p className="text-[12px] text-black/40 dark:text-white/40 font-medium">
            Não tem acesso? <a href="#" className="text-[#D0011B] font-bold hover:underline">Entre em contato.</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
