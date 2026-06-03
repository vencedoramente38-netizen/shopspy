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
import { 
  Navbar, 
  NavBody, 
  NavItems, 
  NavbarLogo, 
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu
} from './ui/resizable-navbar';
import FeaturedSectionStats from './ui/featured-section-stats';
import { TestimonialsColumn } from './ui/testimonials-columns-1';
import PricingSection from './ui/pricing-section';
import Footer4Col from './ui/footer-column';

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
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={[
              { name: "Como funciona", link: "#como-funciona" },
              { name: "Recursos", link: "#recursos" },
              { name: "Preços", link: "#pricing" },
              { name: "FAQ", link: "#faq" },
            ]}
          />
          <NavbarButton onClick={onEnterLogin}>Acessar Plataforma</NavbarButton>
        </NavBody>

        <MobileNav>
          {(visible) => {
            const [localIsMenuOpen, setLocalIsMenuOpen] = useState(false);
            return (
              <>
                <MobileNavHeader>
                  <NavbarLogo />
                  <MobileNavToggle
                    isOpen={localIsMenuOpen}
                    onClick={() => setLocalIsMenuOpen(!localIsMenuOpen)}
                  />
                </MobileNavHeader>
                <MobileNavMenu
                  isOpen={localIsMenuOpen}
                  onClose={() => setLocalIsMenuOpen(false)}
                >
                  <div className="flex flex-col gap-6 w-full">
                    <a href="#como-funciona" onClick={() => setLocalIsMenuOpen(false)} className="text-white/70 hover:text-white text-lg font-bold">Como funciona</a>
                    <a href="#recursos" onClick={() => setLocalIsMenuOpen(false)} className="text-white/70 hover:text-white text-lg font-bold">Recursos</a>
                    <a href="#pricing" onClick={() => setLocalIsMenuOpen(false)} className="text-white/70 hover:text-white text-lg font-bold">Preços</a>
                    <a href="#faq" onClick={() => setLocalIsMenuOpen(false)} className="text-white/70 hover:text-white text-lg font-bold">FAQ</a>
                    <NavbarButton onClick={onEnterLogin} className="w-full py-4 text-lg">Entrar</NavbarButton>
                  </div>
                </MobileNavMenu>
              </>
            );
          }}
        </MobileNav>
      </Navbar>

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
          <FeaturedSectionStats />
          
          <ContainerScroll
            titleComponent={
              <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-[32px] md:text-[60px] font-black text-white leading-tight">
                  Tudo que você precisa em <br />
                  <span className="text-[#D0011B]">um único lugar.</span>
                </h2>
              </div>
            }
          >
            <img
              src="https://i.postimg.cc/ZnB7C5zf/Captura-de-tela-2026-06-02-185948.png"
              alt="ShopSpy App Interface"
              className="hidden md:block mx-auto rounded-2xl object-cover w-full h-full bg-[#111111]/80 backdrop-blur-xl shadow-2xl border border-white/10"
              draggable={false}
              referrerPolicy="no-referrer"
            />
            <img
              src="https://i.postimg.cc/ZnB7C5zf/Captura-de-tela-2026-06-02-185948.png"
              alt="ShopSpy App Interface Mobile"
              className="md:hidden mx-auto rounded-2xl object-cover w-full h-full bg-[#111111]/80 backdrop-blur-xl shadow-2xl border border-white/10"
              draggable={false}
              referrerPolicy="no-referrer"
            />
          </ContainerScroll>
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
        className="px-6 py-24 bg-white relative overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-16">
             <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block border border-black/10 rounded-full px-4 py-1 text-[11px] font-bold text-black/60 mb-6 tracking-[0.2em] uppercase bg-black/5"
            >
              RECURSOS
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[32px] sm:text-[48px] font-black text-[#111111] uppercase italic"
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
                <div className="group relative h-full rounded-[24px] border border-black/5 p-1 overflow-hidden bg-[#f9f9f9]">
                  <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[20px] p-6 shadow-sm group-hover:shadow-xl transition-all duration-300">
                    <div className="relative flex flex-1 flex-col justify-between gap-4">
                      <div className="w-fit rounded-lg border border-black/5 p-2 text-[#D0011B] bg-white shrink-0 shadow-sm transition-transform group-hover:scale-110">
                        {feature.icon}
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold text-xl text-[#111111] leading-tight group-hover:text-[#D0011B] transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-[#555555] leading-relaxed font-medium">
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

      {/* SECTION 5.5: TESTEMUNHOS (BLACK) */}
      <section className="px-6 py-24 bg-[#0a0a0a] overflow-hidden border-t border-white/5">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-left">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block border border-white/15 rounded-full px-4 py-1 text-[11px] font-bold text-white/60 mb-6 tracking-[0.2em] uppercase"
            >
              DEPOIMENTOS
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[40px] sm:text-[56px] font-black text-white leading-tight uppercase italic mb-8"
            >
              Quem usa <br />
              <span className="text-[#D0011B]">ShopSpy, recomenda.</span>
            </motion.h2>
            <p className="text-white/40 text-lg font-medium max-w-md">
              Junte-se a centenas de afiliados que transformaram sua forma de minerar produtos e estão escalando resultados todos os dias.
            </p>
          </div>

          <div className="flex-1 flex gap-6 h-[600px] overflow-hidden">
            <TestimonialsColumn
              duration={20}
              className="flex-1"
              testimonials={[
                {
                  text: "Em menos de 2 dias usando o ShopSpy, já fiz minha primeira venda. O radar de produtos é surreal.",
                  image: "https://i.pravatar.cc/150?u=lucas",
                  name: "Lucas Oliveira",
                  role: "Afiliado Iniciante",
                },
                {
                  text: "A ferramenta de 'Nova Estrutura' economiza horas do meu dia. Gerar a copy é o diferencial.",
                  image: "https://i.pravatar.cc/150?u=mariana",
                  name: "Mariana Costa",
                  role: "Afiliado Pro",
                },
                {
                  text: "Uso para monitorar a concorrência e ver o que está viralizando. ShopSpy é indispensável.",
                  image: "https://i.pravatar.cc/150?u=ricardo",
                  name: "Ricardo Santos",
                  role: "Vendedor Shopee",
                },
              ]}
            />
            <TestimonialsColumn
              duration={15}
              className="flex-1 hidden sm:block"
              testimonials={[
                {
                  text: "Melhor suporte que já tive. Eles realmente ajudam você a vender mais.",
                  image: "https://i.pravatar.cc/150?u=julia",
                  name: "Julia Mello",
                  role: "Influencer",
                },
                {
                  text: "Nunca foi tão fácil minerar produtos. Consigo focar no que importa agora.",
                  image: "https://i.pravatar.cc/150?u=pedro",
                  name: "Pedro Alves",
                  role: "E-commerce Owner",
                },
                {
                  text: "Transformou minha renda extra em minha fonte principal de ganhos.",
                  image: "https://i.pravatar.cc/150?u=ana",
                  name: "Ana Silveira",
                  role: "Afiliada de Sucesso",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* WAVE: BLACK TO WHITE */}
      <div style={{ background: '#0a0a0a', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="#ffffff"/>
        </svg>
      </div>

      <PricingSection />
      
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
            <h2 className="text-[32px] sm:text-[48px] font-black text-white mb-4 uppercase italic">Perguntas Frequentes</h2>
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
            <h2 className="text-[32px] sm:text-[56px] font-black leading-tight mb-6 text-[#111111] uppercase italic">
              Pronto para <span className="text-[#D0011B]">Explodir suas Vendas?</span>
            </h2>
            <p className="text-[#555555] text-lg sm:text-xl font-medium max-w-[500px] mx-auto mb-10">
              Junte-se a centenas de afiliados que já automatizaram suas vendas na Shopee.
            </p>
            <NeonButton 
              onClick={() => {
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="solid"
              className="px-12 py-5 text-lg font-black rounded-2xl shadow-xl shadow-[#D0011B]/20 inline-flex items-center gap-3"
            >
              Começar Agora Grátis <ArrowRight />
            </NeonButton>
          </motion.div>
        </div>
      </section>

      <Footer4Col />

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
