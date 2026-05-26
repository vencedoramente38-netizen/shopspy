import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Target, 
  Sparkles, 
  DollarSign, 
  Flame, 
  TrendingUp, 
  MessageSquare, 
  Users, 
  Calculator, 
  Heart, 
  Check, 
  AlertTriangle, 
  ChevronDown,
  ArrowRight,
  Search,
  LayoutDashboard,
  Gem,
  LayoutGrid,
  Info,
  Menu,
  X,
  TrendingUp as TrendingUpIcon,
  MessageSquare as MessageSquareIcon,
  Users as UsersIcon,
  Calculator as CalculatorIcon,
  Flame as FlameIcon,
  Box,
  Lock,
  Settings
} from 'lucide-react';
import { useScroll, useTransform, motion, AnimatePresence, type MotionValue } from 'framer-motion';
import { GlowingEffect } from './ui/glowing-effect';
import { WavyBackground } from './ui/wavy-background';
import { Button as NeonButton } from './ui/neon-button';
import { FlipWords } from './ui/flip-words';

function HeaderScroll({ 
  translate, 
  titleComponent 
}: { 
  translate: MotionValue<number>; 
  titleComponent: string | React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
}

function CardScroll({
  rotate,
  scale,
  translate,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[25rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className=" h-full w-full  overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4 ">
        {children}
      </div>
    </motion.div>
  );
}

function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[40rem] md:h-[60rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <HeaderScroll translate={translate} titleComponent={titleComponent} />
        <CardScroll rotate={rotate} translate={translate} scale={scale}>
          {children}
        </CardScroll>
      </div>
    </div>
  );
}

interface LandingPageProps {
  onEnterLogin: () => void;
}

export default function LandingPage({ onEnterLogin }: LandingPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqItems = [
    {
      q: "O que exatamente o ShopSpy faz?",
      a: "O ShopSpy monitora os produtos mais vendidos da Shopee e entrega tudo pronto: score viral, copy de venda, projeção de lucro e grupos para divulgar."
    },
    {
      q: "Preciso ter experiência para usar?",
      a: "Não. A plataforma foi criada para qualquer pessoa, desde iniciantes até afiliados experientes."
    },
    {
      q: "Em quanto tempo consigo começar a vender?",
      a: "Em menos de 5 minutos você já tem um produto escolhido, a copy pronta e os grupos para divulgar."
    },
    {
      q: "Os produtos são atualizados com frequência?",
      a: "Sim. A lista de produtos virais é revisada semanalmente com os mais vendidos da Shopee."
    },
    {
      q: "Funciona para qualquer nicho?",
      a: "Sim. Temos produtos de Moda, Casa, Eletrônicos, Beleza, Ferramentas e muito mais."
    }
  ];

  return (
    <div className="bg-white min-h-screen text-[#111111] selection:bg-[#D0011B]/30 scroll-smooth" style={{ fontFamily: '"Space Grotesk", "Space Grotesk Fallback", ui-sans-serif, system-ui, sans-serif' }}>
      
      {/* SECTION 1: NAVBAR */}
      <motion.nav 
        initial={false}
        animate={{ 
          scale: scrolled ? 1 : 1,
          y: scrolled ? 10 : 0,
          width: scrolled ? 'calc(100% - 32px)' : 'calc(100% - 48px)',
          backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderColor: scrolled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 w-full max-w-[950px] z-[100] backdrop-blur-md border rounded-[20px] px-4 sm:px-6 py-3 flex items-center justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
      >
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <img 
              src="https://i.postimg.cc/NfH1HDns/download-10-removebg-preview.png" 
              alt="ShopSpy Logo" 
              className={`h-8 sm:h-12 w-auto object-contain transition-all duration-300 ${scrolled ? 'brightness-200' : ''}`}
              referrerPolicy="no-referrer"
            />
        </div>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <a href="#como-funciona" className={`text-[13px] xl:text-[14px] transition-colors whitespace-nowrap font-medium ${scrolled ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}>Como funciona</a>
            <a href="#recursos" className={`text-[13px] xl:text-[14px] transition-colors whitespace-nowrap font-medium ${scrolled ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}>Recursos</a>
            <a href="#precos" className={`text-[13px] xl:text-[14px] transition-colors whitespace-nowrap font-medium ${scrolled ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}>Preços</a>
            <a href="#faq" className={`text-[13px] xl:text-[14px] transition-colors whitespace-nowrap font-medium ${scrolled ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}>FAQ</a>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 sm:gap-4">
            <NeonButton 
              onClick={onEnterLogin}
              variant="solid"
              className="px-4 sm:px-6 py-2 rounded-full text-[13px] sm:text-[14px] font-bold"
            >
              Entrar
            </NeonButton>
          </div>
        </div>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-2xl border border-black/10 rounded-3xl p-6 flex flex-col gap-6 lg:hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            >
              <div className="flex flex-col gap-4 text-center">
                <a href="#como-funciona" onClick={() => setIsMenuOpen(false)} className="text-[16px] text-black/70 hover:text-black py-2 border-b border-black/5">Como funciona</a>
                <a href="#recursos" onClick={() => setIsMenuOpen(false)} className="text-[16px] text-black/70 hover:text-black py-2 border-b border-black/5">Recursos</a>
                <a href="#precos" onClick={() => setIsMenuOpen(false)} className="text-[16px] text-black/70 hover:text-black py-2 border-b border-black/5">Preços</a>
                <a href="#faq" onClick={() => setIsMenuOpen(false)} className="text-[16px] text-black/70 hover:text-black py-2">FAQ</a>
              </div>
              <button 
                onClick={() => {
                  onEnterLogin();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-[#D0011B] text-white py-4 rounded-2xl font-bold text-base shadow-[0_8px_20px_rgba(208,1,27,0.3)]"
              >
                Entrar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* SECTION 2: HERO */}
      <header className="relative pt-32 sm:pt-48 pb-20 px-6 max-w-[800px] mx-auto text-center overflow-hidden bg-white">
        {/* Glow Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#D0011B]/5 blur-[120px] -z-10 rounded-full" />

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="inline-flex items-center gap-2 border border-[#D0011B]/20 rounded-full px-4 py-1.5 text-[11px] sm:text-[12px] text-[#D0011B] mb-8 bg-[#D0011B]/5 backdrop-blur-sm"
        >
          <Zap size={14} className="text-[#D0011B]" fill="#D0011B" />
          <span className="font-bold tracking-wide uppercase">A FERRAMENTA NÚMERO 1 PARA AFILIADOS SHOPEE</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[40px] sm:text-[64px] font-black leading-[1.1] mb-6 flex flex-col items-center text-[#111111]"
        >
          <span>O Jeito Mais Rápido de</span>
          <div className="h-[1.2em] flex items-center justify-center overflow-visible">
            <FlipWords words={["Encontrar", "Lucrar", "Vender", "Escalar"]} className="text-[#D0011B]" />
          </div>
          <span className="text-[#D0011B]">Produtos Virais na Shopee.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-[#555555] max-w-[560px] mx-auto mb-10 font-medium"
        >
          Esqueça horas pesquisando produtos. O ShopSpy encontra os mais vendidos, calcula sua comissão e gera a copy pronta.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginTop: '40px'
          }}
          className="mb-4"
        >
          <NeonButton 
            onClick={() => {
              document.getElementById('secao-precos')?.scrollIntoView({ behavior: 'smooth' });
            }}
            variant="solid"
            className="w-full sm:w-auto px-10 py-4 text-base font-bold flex items-center justify-center gap-2 rounded-xl"
          >
            Acessar Agora <ArrowRight size={18} />
          </NeonButton>
          <a 
            href="#secao-precos"
            className="w-full sm:w-auto bg-transparent border border-black/10 text-black px-10 py-4 rounded-xl text-base font-bold hover:bg-black/5 transition-all text-center"
          >
            Ver Planos
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mt-12"
        >
          {[
            { icon: <FlameIcon size={14} />, text: "Produtos Virais" },
            { icon: <TrendingUpIcon size={14} />, text: "Score Viral" },
            { icon: <MessageSquareIcon size={14} />, text: "Copy Pronta" },
            { icon: <UsersIcon size={14} />, text: "Grupos do Facebook" },
            { icon: <CalculatorIcon size={14} />, text: "Projeção de Lucro" }
          ].map((pill, idx) => (
            <span key={idx} className="bg-black/5 border border-black/10 rounded-full px-4 py-1.5 text-[13px] text-black/60 flex items-center gap-2 font-semibold">
              <span className="text-[#D0011B]">{pill.icon}</span>
              {pill.text}
            </span>
          ))}
        </motion.div>
      </header>

      {/* WAVE: WHITE TO BLACK */}
      <div style={{ background: '#ffffff', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="#0a0a0a"/>
        </svg>
      </div>

      {/* Container Scroll Section & STATS (BLACK) */}
      <section className="relative w-full bg-[#0a0a0a] overflow-hidden py-20" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}>
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(208,1,27,0.06)_0%,transparent_70%)] pointer-events-none z-0" />
        
        <div className="relative z-10">
          <ContainerScroll
            titleComponent={
              <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-[32px] md:text-[60px] font-black text-white leading-tight">
                  O Jeito Mais Rápido de <br />
                  <span className="text-[#D0011B]">Lucrar na Shopee.</span>
                </h2>
              </div>
            }
          >
            <img
              src="https://i.postimg.cc/0r1RyZzC/image.png"
              alt="ShopSpy App Interface"
              className="hidden md:block mx-auto rounded-2xl object-cover h-full object-left-top shadow-2xl"
              draggable={false}
              referrerPolicy="no-referrer"
            />
            <img
              src="https://i.postimg.cc/MTjzZn9d/image.png"
              alt="ShopSpy App Interface Mobile"
              className="md:hidden mx-auto rounded-2xl object-cover h-full object-left-top shadow-2xl"
              draggable={false}
              referrerPolicy="no-referrer"
            />
          </ContainerScroll>

          {/* STATS */}
          <div className="px-6 mb-24 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-[800px] mx-auto bg-[#111111] border border-white/[0.08] rounded-[32px] p-8 sm:p-14 shadow-2xl relative overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-[48px] sm:text-[56px] font-black text-[#D0011B] leading-none mb-2">+20</div>
                  <div className="text-[14px] text-white/50 uppercase font-black tracking-widest leading-tight">Produtos Virais Atualizados</div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="border-y sm:border-y-0 sm:border-x border-white/5 py-8 sm:py-0"
                >
                  <div className="text-[48px] sm:text-[56px] font-black text-[#D0011B] leading-none mb-2">+5</div>
                  <div className="text-[14px] text-white/50 uppercase font-black tracking-widest leading-tight">Categorias Disponíveis</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-[48px] sm:text-[56px] font-black text-[#D0011B] leading-none mb-2">100%</div>
                  <div className="text-[14px] text-white/50 uppercase font-black tracking-widest leading-tight">Gratuito para Usar</div>
                </motion.div>
              </div>
              
              <NeonButton 
                onClick={() => {
                  document.getElementById('secao-precos')?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="solid"
                className="mt-12 mx-auto px-10 py-4 font-black flex items-center justify-center gap-2 rounded-xl shadow-lg shadow-[#D0011B]/20"
              >
                Acessar Agora <ArrowRight size={18} />
              </NeonButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WAVE: BLACK TO WHITE */}
      <div style={{ background: '#0a0a0a', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="#ffffff"/>
        </svg>
      </div>

      {/* SECTION 4: COMO FUNCIONA (WHITE) */}
      <motion.section 
        id="como-funciona" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-24 max-w-[1200px] mx-auto bg-white"
      >
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block border border-[#D0011B]/20 rounded-full px-4 py-1 text-[11px] font-bold text-[#D0011B] mb-6 tracking-[0.2em] uppercase bg-[#D0011B]/5"
          >
            COMO FUNCIONA
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[32px] sm:text-[48px] font-black text-[#111111]"
          >
            Simples assim.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "ETAPA — 1",
              icon: <Target size={24} className="text-[#D0011B]" />,
              title: "Você escolhe o produto.",
              desc: "Navegue pelos produtos virais ranqueados por score e escolha o que quer promover."
            },
            {
              step: "ETAPA — 2",
              icon: <Sparkles size={24} className="text-[#D0011B]" />,
              title: "A ferramenta gera tudo.",
              desc: "Copy de venda, projeção de lucro, comissão calculada e grupos do Facebook para divulgar."
            },
            {
              step: "ETAPA — 3",
              icon: <DollarSign size={24} className="text-[#D0011B]" />,
              title: "Você divulga e lucra.",
              desc: "Copie, cole nos grupos e comece a receber suas comissões. Sem complicação."
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-full w-full bg-[#f9f9f9] rounded-[24px] border border-black/[0.05] transition-all duration-300 group-hover:border-[#D0011B]/30 overflow-hidden flex flex-col min-h-[300px] sm:min-h-[320px] shadow-sm">
                <div className="relative z-10 p-8 flex flex-col h-full">
                  <span className="inline-block bg-[#D0011B]/10 text-[#D0011B] rounded-full px-3 py-1 text-[11px] font-bold mb-6 tracking-wide uppercase w-fit">
                    {item.step}
                  </span>
                  <div className="w-14 h-14 bg-white rounded-[18px] flex items-center justify-center mb-6 border border-black/[0.05] group-hover:scale-110 transition-transform duration-500 shrink-0 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111] mb-4 group-hover:text-[#D0011B] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#555555] leading-relaxed font-medium group-hover:text-[#111111] transition-colors">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* WAVE: WHITE TO BLACK */}
      <div style={{ background: '#ffffff', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="#0a0a0a"/>
        </svg>
      </div>

      {/* SECTION 5: RECURSOS (BLACK) */}
      <motion.section 
        id="recursos" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="px-6 py-24 bg-[#0a0a0a] relative overflow-hidden"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      >
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(208,1,27,0.06)_0%,transparent_70%)] pointer-events-none z-0" />
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-16">
             <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block border border-white/15 rounded-full px-4 py-1 text-[11px] font-bold text-white/60 mb-6 tracking-[0.2em] uppercase"
            >
              RECURSOS
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[32px] sm:text-[48px] font-black text-white"
            >
              Tudo que você precisa para vender.
            </motion.h2>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-3 gap-6">
            {[
              { 
                area: "md:col-span-6 xl:col-span-4",
                icon: <FlameIcon className="h-5 w-4" />, 
                title: "Produtos Virais", 
                desc: "Top 20 produtos mais vendidos da Shopee atualizados." 
              },
              { 
                area: "md:col-span-6 xl:col-span-4",
                icon: <TrendingUpIcon className="h-5 w-4" />, 
                title: "Score Viral", 
                desc: "Cada produto tem uma pontuação de viralidade de 0 a 100." 
              },
              { 
                area: "md:col-span-6 xl:col-span-4",
                icon: <MessageSquareIcon className="h-5 w-4" />, 
                title: "Copy Pronta", 
                desc: "Copy de venda gerada gratuitamente para cada produto spy." 
              },
              { 
                area: "md:col-span-6 xl:col-span-4",
                icon: <UsersIcon className="h-5 w-4" />, 
                title: "Grupos do Facebook", 
                desc: "Lista dos maiores grupos de afiliados Shopee para divulgar." 
              },
              { 
                area: "md:col-span-6 xl:col-span-4",
                icon: <CalculatorIcon className="h-5 w-4" />, 
                title: "Projeção de Lucro", 
                desc: "Calcule quanto vai ganhar com 10, 100 ou 1000 vendas." 
              },
              { 
                area: "md:col-span-6 xl:col-span-4",
                icon: <Heart className="h-5 w-4" />, 
                title: "Favoritos", 
                desc: "Salve seus produtos preferidos para acessar rapidamente." 
              }
            ].map((feature, idx) => (
              <li key={idx} className={`min-h-[16rem] list-none ${feature.area}`}>
                <div className="group relative h-full rounded-[24px] border border-white/10 p-1 overflow-hidden bg-white/5">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[20px] p-6 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.2)]">
                    <div className="relative flex flex-1 flex-col justify-between gap-4">
                      <div className="w-fit rounded-lg border border-white/10 p-2 text-[#D0011B] bg-white/5 shrink-0">
                        {feature.icon}
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold text-xl text-white leading-tight">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-white/50 leading-relaxed font-medium">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* WAVE: BLACK TO WHITE */}
      <div style={{ background: '#0a0a0a', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="#ffffff"/>
        </svg>
      </div>

      {/* SECTION 6: PREÇOS (WHITE) */}
      <section id="secao-precos" className="px-6 py-32 max-w-[1200px] mx-auto bg-white font-['Space Grotesk']">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block border border-[#D0011B]/20 rounded-full px-4 py-1 text-[11px] font-bold text-[#D0011B] mb-6 tracking-[0.2em] uppercase bg-[#D0011B]/5"
          >
            INVESTIMENTO
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[32px] sm:text-[48px] font-black text-[#111111] leading-tight"
          >
            Quanto vale encontrar o produto certo?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[28px] sm:text-[40px] font-black text-[#D0011B] leading-none"
          >
            e lucrar todos os dias?
          </motion.p>
        </div>

        <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-20">
          
          {/* Plano Mensal */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-black/[0.05] bg-[#f9f9f9] rounded-[40px] px-8 py-12 flex flex-col h-full shadow-lg"
          >
            <div className="mb-10 text-left">
              <h2 className="text-3xl font-bold mb-3 text-[#111111]">Plano Mensal</h2>
              <p className="text-[#555555] text-sm leading-relaxed font-medium">Ideal para testar a plataforma e começar a vender</p>
            </div>

            <div className="flex items-baseline mb-12">
              <span className="text-lg font-bold mr-1 text-[#D0011B]">R$</span>
              <span className="text-6xl font-black tracking-tight text-[#D0011B]">97</span>
              <span className="text-[#555555] text-lg ml-2 font-bold">/mês</span>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open('https://ggcheckout.app/checkout/v3/wPmdkoLh4QAWSIoHjAVD', '_blank')}
              className="w-full py-4 rounded-2xl font-black text-md mb-12 bg-white border border-black/10 text-black shadow-sm transition-all duration-300"
            >
              Assinar Plano Mensal
            </motion.button>

            <div className="flex flex-col gap-5">
              <p className="text-[10px] font-black tracking-[0.2em] text-[#555555] uppercase text-left">RECURSOS</p>
              <p className="text-[#D0011B] font-bold text-base text-left">Recursos incluídos:</p>
              
              <ul className="space-y-4">
                {[
                  "Radar de Produtos",
                  "Produtos Virais com Score",
                  "Copy de Venda Pronta",
                  "Grupos do Facebook",
                  "Projeção de Lucro",
                  "Favoritos",
                  "Calculadora de Comissão"
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-[14px] text-[#555555] text-left font-medium">
                    <span className="mr-3 flex items-center justify-center w-5 h-5 rounded-full border border-[#D0011B]/40 text-[#D0011B] flex-shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Plano Vitalício */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-[#D0011B]/30 bg-white rounded-[40px] px-8 py-12 flex flex-col h-full relative overflow-hidden shadow-2xl"
          >
            {/* Badge Popular */}
            <div className="absolute top-8 right-8">
              <span className="bg-[#D0011B] shadow-[0_10px_30px_-5px_rgba(208,1,27,0.4)] text-[10px] uppercase font-black px-3 py-1.5 rounded-full tracking-wide text-white">
                Popular
              </span>
            </div>

            <div className="mb-10 text-left">
              <h2 className="text-3xl font-bold mb-3 text-[#111111]">Plano Vitalício</h2>
              <p className="text-[#555555] text-sm leading-relaxed font-medium">Pague uma vez, use para sempre com todas as atualizações</p>
            </div>

            <div className="flex flex-col mb-4 text-left">
              <div className="flex items-baseline">
                <span className="text-lg font-bold mr-1 text-[#D0011B]">R$</span>
                <span className="text-6xl font-black tracking-tight text-[#D0011B]">147</span>
              </div>
              <p className="text-[#D0011B] text-sm font-black mt-4">à vista com acesso vitalício</p>
            </div>

            <motion.button 
              whileHover={{ opacity: 0.9, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open('https://ggcheckout.app/checkout/v3/WQ583Zqro94TV375rMYX', '_blank')}
              className="w-full py-4 rounded-2xl font-black text-md flex items-center justify-center gap-2 mb-12 bg-[#D0011B] shadow-[0_10px_30px_-5px_rgba(208,1,27,0.4)] text-white transition-all duration-300"
            >
              <Zap size={16} fill="white" />
              Comprar Acesso Vitalício
            </motion.button>

            <div className="flex flex-col gap-5">
              <p className="text-[10px] font-black tracking-[0.2em] text-[#555555] uppercase text-left">RECURSOS</p>
              <p className="text-[#D0011B] font-bold text-base text-left">Tudo do Mensal, mais:</p>
              
              <ul className="space-y-4">
                {[
                  { text: "Radar de Produtos", bold: false },
                  { text: "Produtos Virais com Score", bold: false },
                  { text: "Copy de Venda Pronta", bold: false },
                  { text: "Grupos do Facebook", bold: false },
                  { text: "Projeção de Lucro", bold: false },
                  { text: "Favoritos", bold: false },
                  { text: "Novos Produtos Toda Semana", bold: true },
                  { text: "Atualizações Vitalícias", bold: true }
                ].map((item, i) => (
                  <li key={i} className={`flex items-start text-[14px] text-[#555555] text-left font-medium ${item.bold ? 'font-bold text-[#111111]' : ''}`}>
                    <span className="mr-3 flex items-center justify-center w-5 h-5 rounded-full border border-[#D0011B]/40 text-[#D0011B] flex-shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Card de urgência */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-[700px] mx-auto bg-[#f9f9f9] border border-black/[0.05] rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8 shadow-xl"
        >
           <div className="w-14 h-14 bg-[#D0011B]/10 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle size={28} className="text-[#D0011B]" />
           </div>
           <div className="flex-1 text-center sm:text-left">
              <p className="text-[#111111] text-xl font-bold mb-3">Vagas limitadas</p>
              <div className="w-full h-2.5 bg-black/10 rounded-full overflow-hidden mb-3">
                 <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: '85%' }}
                   transition={{ duration: 1, ease: "easeOut" }}
                   className="h-full bg-[#D0011B]" 
                 />
              </div>
              <div className="flex justify-between text-[12px] font-black">
                <span className="text-[#111111]">Restam apenas 15 acessos disponíveis.</span>
                <span className="text-[#555555] uppercase tracking-widest">Atualizado em tempo real</span>
              </div>
           </div>
        </motion.div>
      </section>

      {/* WAVE: WHITE TO BLACK */}
      <div style={{ background: '#ffffff', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="#0a0a0a"/>
        </svg>
      </div>

      {/* SECTION 7: FAQ (BLACK) */}
      <motion.section 
        id="faq" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-24 bg-[#0a0a0a] relative overflow-hidden"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      >
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(208,1,27,0.06)_0%,transparent_70%)] pointer-events-none z-0" />

        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-[32px] sm:text-[48px] font-black text-white mb-4">Perguntas Frequentes</h2>
            <p className="text-white/50 font-medium">Tire suas dúvidas sobre o ShopSpy.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "ShopSpy é grátis?",
                a: "O ShopSpy oferece recursos gratuitos para você começar agora mesmo a encontrar produtos virais. Temos planos premium para quem deseja escalar com recursos exclusivos."
              },
              {
                q: "Como recebo minhas comissões?",
                a: "As comissões são pagas diretamente pela Shopee através do seu link de afiliado. O ShopSpy apenas ajuda você a encontrar os produtos e gerar as copies."
              },
              {
                q: "Onde divulgo os produtos?",
                a: "Você pode divulgar em Grupos de Facebook (lista inclusa no app), WhatsApp, Telegram, TikTok, Instagram e Reels. Onde houver tráfego, há venda."
              },
              {
                q: "Preciso de estoque?",
                a: "Não! Como afiliado, você apenas indica o produto através do seu link. A Shopee cuida da entrega, estoque e suporte ao cliente."
              },
              {
                q: "Os produtos são realmente atualizados?",
                a: "Sim, nossa equipe atualiza a lista de produtos virais e suas pontuações de Score Viral todos os dias."
              }
            ].map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#111111] border border-white/[0.08] rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <button 
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-white/[0.02]"
                >
                  <span className="font-bold text-white text-[16px] sm:text-[18px]">{faq.q}</span>
                  <div className={`transition-transform duration-300 text-[#D0011B] ${activeFaq === idx ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-white/60 leading-relaxed text-[14px] sm:text-[16px] font-medium border-t border-white/[0.05] pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* WAVE: BLACK TO WHITE */}
      <div style={{ background: '#0a0a0a', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="#ffffff"/>
        </svg>
      </div>

      {/* SECTION 8: CTA FINAL (WHITE) */}
      <section className="px-6 py-24 text-center bg-white relative overflow-hidden">
        <div className="max-w-[800px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="h-20 w-20 bg-[#D0011B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap size={40} className="text-[#D0011B]" fill="#D0011B" />
            </div>
            <h2 className="text-[32px] sm:text-[56px] font-black leading-tight mb-6 text-[#111111]">
              Pronto para <span className="text-[#D0011B]">Explodir suas Vendas?</span>
            </h2>
            <p className="text-[#555555] text-lg sm:text-xl font-medium max-w-[500px] mx-auto mb-10">
              Junte-se a centenas de afiliados que já automatizaram suas vendas na Shopee.
            </p>
            <NeonButton 
              onClick={() => {
                document.getElementById('secao-precos')?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="solid"
              className="px-12 py-5 text-lg font-black rounded-2xl shadow-xl shadow-[#D0011B]/20 inline-flex items-center gap-3"
            >
              Começar Agora Grátis <ArrowRight />
            </NeonButton>
          </motion.div>
        </div>
      </section>

      {/* FOOTER (BLACK) */}
      <footer className="bg-[#0a0a0a] text-white/40 py-16 px-6 font-medium relative border-t border-white/[0.05]"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}>
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
          <img 
            src="https://i.postimg.cc/NfH1HDns/download-10-removebg-preview.png" 
            alt="ShopSpy Logo" 
            className="h-12 w-auto mb-8 opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <a href="#como-funciona" className="hover:text-white transition-colors">Como funciona</a>
            <a href="#recursos" className="hover:text-white transition-colors">Recursos</a>
            <a href="#precos" className="hover:text-white transition-colors">Preços</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
          <p className="text-[13px] text-center mb-4">© 2026 ShopSpy. Todos os direitos reservados. Não temos vínculo oficial com a Shopee.</p>
        </div>
      </footer>

      {/* Scroll Blur Effect Elements */}
      <div className="scroll-blur-overlay" />
      <div className="scroll-blur-bottom" />

      <style dangerouslySetInnerHTML={{ __html: `
        .scroll-blur-bottom {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 250px;
            z-index: 9999;
            pointer-events: none;
            backdrop-filter: blur(60px); 
            -webkit-backdrop-filter: blur(60px);
            -webkit-mask-image: linear-gradient(to bottom, 
                transparent 0%, 
                rgba(0, 0, 0, 0.2) 20%,
                black 80%, 
                black 100%
            );
            mask-image: linear-gradient(to bottom, 
                transparent 0%, 
                rgba(0, 0, 0, 0.2) 20%,
                black 80%, 
                black 100%
            );
        }

        .scroll-blur-overlay {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 250px;
            z-index: 9998;
            pointer-events: none;
            background: linear-gradient(to bottom, 
                transparent 0%, 
                rgba(10,10,10,0.8) 100%
            );
        }
      `}} />
    </div>
  );
}
