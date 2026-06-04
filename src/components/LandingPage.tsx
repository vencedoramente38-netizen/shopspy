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
  Settings,
  Star
} from 'lucide-react';
import { useScroll, useTransform, motion, AnimatePresence, type MotionValue } from 'framer-motion';
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
import Footer4Col from './ui/footer-column';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

// ─────────────────────────────────────────────
// DisplayCard component (stacked cards effect)
// ─────────────────────────────────────────────
interface DisplayCardProps {
  className?: string;
  etapa?: string;
  titulo?: string;
  descricao?: string;
  children?: React.ReactNode;
}

function DisplayCard({ className = '', etapa, titulo, descricao, children }: DisplayCardProps) {
  return (
    <div
      className={`relative flex h-44 w-80 -skew-y-2 select-none flex-col justify-between rounded-xl border-2 border-red-100 bg-white/90 backdrop-blur-sm px-5 py-4 transition-all duration-700 hover:border-red-300 hover:shadow-lg hover:shadow-red-100 ${className}`}
      style={{ boxShadow: '0 4px 20px rgba(208,1,27,0.08)' }}
    >
      {children ? children : (
        <>
          <div>
            <span style={{
              background: '#D0011B', color: 'white',
              borderRadius: 9999, padding: '3px 12px',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.08em'
            }}>{etapa}</span>
          </div>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#111111', lineHeight: 1.3 }}>{titulo}</p>
          <p style={{ fontSize: 13, color: '#666666', lineHeight: 1.5 }}>{descricao}</p>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// ContainerScroll
// ─────────────────────────────────────────────
function HeaderScroll({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: string | React.ReactNode }) {
  return (
    <motion.div style={{ translateY: translate }} className="div max-w-5xl mx-auto text-center">
      {titleComponent}
    </motion.div>
  );
}

function CardScroll({ rotate, scale, translate, children }: { rotate: MotionValue<number>; scale: MotionValue<number>; translate: MotionValue<number>; children: React.ReactNode }) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow: '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="max-w-5xl -mt-12 mx-auto h-[25rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
}

function ContainerScroll({ titleComponent, children }: { titleComponent: string | React.ReactNode; children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scaleDimensions = () => isMobile ? [0.7, 0.9] : [1.05, 1];
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="h-[40rem] md:h-[60rem] flex items-center justify-center relative p-2 md:p-20" ref={containerRef}>
      <div className="py-10 md:py-40 w-full relative" style={{ perspective: '1000px' }}>
        <HeaderScroll translate={translate} titleComponent={titleComponent} />
        <CardScroll rotate={rotate} translate={translate} scale={scale}>{children}</CardScroll>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Chart data
// ─────────────────────────────────────────────
const chartData = [
  { name: 'Jan', value: 20 },
  { name: 'Fev', value: 45 },
  { name: 'Mar', value: 70 },
  { name: 'Abr', value: 95 },
  { name: 'Mai', value: 130 },
  { name: 'Jun', value: 175 },
  { name: 'Jul', value: 220 },
];

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
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
    return () => { document.head.removeChild(link); };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="bg-white min-h-screen text-[#111111] selection:bg-[#D0011B]/30 scroll-smooth"
      style={{ fontFamily: '"Space Grotesk", "Space Grotesk Fallback", ui-sans-serif, system-ui, sans-serif' }}
    >
      {/* ─── NAVBAR ─── */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={[
              { name: 'Como funciona', link: '#como-funciona' },
              { name: 'Recursos', link: '#recursos' },
              { name: 'Preços', link: '#secao-precos' },
              { name: 'FAQ', link: '#faq' },
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
                  <MobileNavToggle isOpen={localIsMenuOpen} onClick={() => setLocalIsMenuOpen(!localIsMenuOpen)} />
                </MobileNavHeader>
                <MobileNavMenu isOpen={localIsMenuOpen} onClose={() => setLocalIsMenuOpen(false)}>
                  <div className="flex flex-col gap-6 w-full">
                    <a href="#como-funciona" onClick={() => setLocalIsMenuOpen(false)} className="text-white/70 hover:text-white text-lg font-bold">Como funciona</a>
                    <a href="#recursos" onClick={() => setLocalIsMenuOpen(false)} className="text-white/70 hover:text-white text-lg font-bold">Recursos</a>
                    <a href="#secao-precos" onClick={() => setLocalIsMenuOpen(false)} className="text-white/70 hover:text-white text-lg font-bold">Preços</a>
                    <a href="#faq" onClick={() => setLocalIsMenuOpen(false)} className="text-white/70 hover:text-white text-lg font-bold">FAQ</a>
                    <NavbarButton onClick={onEnterLogin} className="w-full py-4 text-lg">Entrar</NavbarButton>
                  </div>
                </MobileNavMenu>
              </>
            );
          }}
        </MobileNav>
      </Navbar>

      {/* ─── HERO ─── */}
      <header
        className="relative pt-32 sm:pt-48 pb-20 px-6 max-w-[800px] mx-auto text-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(208,1,27,0.06) 0%, transparent 70%)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 border border-[#D0011B]/20 rounded-full px-4 py-1.5 text-[11px] sm:text-[12px] text-[#D0011B] mb-8 bg-[#D0011B]/5 backdrop-blur-sm"
        >
          <Zap size={14} className="text-[#D0011B]" fill="#D0011B" />
          <span className="font-bold tracking-wide uppercase">A ferramenta número 1 para afiliados Shopee</span>
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
            <FlipWords words={['Encontrar', 'Lucrar', 'Vender', 'Escalar']} className="text-[#D0011B]" />
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
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          <button
            onClick={() => document.getElementById('secao-precos')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: '#D0011B', color: 'white', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            Acessar Agora <ArrowRight size={18} />
          </button>
          <a
            href="#secao-precos"
            className="bg-transparent border border-black/10 text-black px-8 py-3.5 rounded-[10px] text-base font-bold hover:bg-black/5 transition-all text-center"
          >
            Ver Planos
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {[
            { icon: <FlameIcon size={14} />, text: 'Produtos Virais' },
            { icon: <TrendingUpIcon size={14} />, text: 'Score Viral' },
            { icon: <MessageSquareIcon size={14} />, text: 'Copy Pronta' },
            { icon: <UsersIcon size={14} />, text: 'Grupos do Facebook' },
            { icon: <CalculatorIcon size={14} />, text: 'Projeção de Lucro' },
          ].map((pill, idx) => (
            <span key={idx} className="bg-black/5 border border-black/10 rounded-full px-4 py-1.5 text-[13px] text-black/60 flex items-center gap-2 font-semibold">
              <span className="text-[#D0011B]">{pill.icon}</span>
              {pill.text}
            </span>
          ))}
        </motion.div>
      </header>

      {/* ─── CONTAINER SCROLL (App Preview) ─── */}
      <section className="relative w-full bg-white overflow-hidden py-0">
        <ContainerScroll
          titleComponent={
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-[32px] md:text-[56px] font-black text-[#111111] leading-tight">
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
      </section>

      {/* ─── STATS + CHART ─── */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block border border-[#D0011B]/20 rounded-full px-4 py-1 text-[11px] font-bold text-[#D0011B] mb-6 tracking-[0.2em] uppercase bg-[#D0011B]/5"
            >
              DADOS EM TEMPO REAL
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: 36, fontWeight: 600, color: '#111111', lineHeight: 1.25, maxWidth: 600, marginBottom: 16 }}
            >
              Impulsionando lucros com dados reais em tempo real.
            </motion.h2>
            <p style={{ fontSize: 16, color: '#555555', maxWidth: 560, lineHeight: 1.7 }}>
              Nossa tecnologia de monitoramento ajuda você a encontrar produtos virais, gerar ofertas e dominar a Shopee em segundos.
            </p>
          </div>

          {/* 4 stat numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
            {[
              { num: '+20.000', label: 'Produtos Analisados' },
              { num: '99.9%', label: 'Uptime Garantido' },
              { num: '500+', label: 'Afiliados Ativos' },
              { num: '1.2s', label: 'Tempo de Resposta' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div style={{ fontSize: 32, fontWeight: 700, color: '#111111', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 14, color: '#555555', marginTop: 6 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-black/5 p-6"
            style={{ boxShadow: '0 8px 40px rgba(208,1,27,0.08)' }}
          >
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D0011B" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#D0011B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #eee', borderRadius: 8, fontSize: 13 }} />
                  <Area type="monotone" dataKey="value" stroke="#D0011B" strokeWidth={2} fillOpacity={1} fill="url(#colorRed)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── COMO FUNCIONA (Stacked Display Cards) ─── */}
      <motion.section
        id="como-funciona"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-24 bg-white"
      >
        <div className="max-w-[1200px] mx-auto">
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

          <div className="flex flex-col md:flex-row items-center gap-16 justify-between">
            {/* Left: text */}
            <div className="flex-1 space-y-6 max-w-md">
              {[
                { step: '01', title: 'Você escolhe o produto.', desc: 'Navegue pelos produtos virais ranqueados por score e escolha o que quer promover.' },
                { step: '02', title: 'A ferramenta gera tudo.', desc: 'Copy de venda, projeção de lucro, comissão calculada e grupos do Facebook para divulgar.' },
                { step: '03', title: 'Você divulga e lucra.', desc: 'Copie, cole nos grupos e comece a receber suas comissões. Sem complicação.' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="flex gap-5 items-start"
                >
                  <div className="w-10 h-10 rounded-full bg-[#D0011B]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#D0011B] font-black text-sm">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#111111] mb-1">{item.title}</h3>
                    <p className="text-[#555555] leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: stacked display cards */}
            <div className="flex-1 flex items-center justify-center">
              <div style={{ display: 'grid', gridTemplateAreas: "'stack'", placeItems: 'center', height: 260 }}>
                <DisplayCard
                  className="[grid-area:stack] hover:-translate-y-8 transition-transform grayscale hover:grayscale-0"
                  etapa="ETAPA — 1"
                  titulo="Você escolhe o produto."
                  descricao="Navegue pelos produtos virais ranqueados por score e escolha o que quer promover."
                />
                <DisplayCard
                  className="[grid-area:stack] translate-x-14 translate-y-8 hover:-translate-y-1 transition-transform grayscale hover:grayscale-0"
                  etapa="ETAPA — 2"
                  titulo="A ferramenta gera tudo."
                  descricao="Copy de venda, projeção de lucro, comissão calculada e grupos do Facebook para divulgar."
                />
                <DisplayCard
                  className="[grid-area:stack] translate-x-28 translate-y-16 hover:translate-y-8 transition-transform"
                  etapa="ETAPA — 3"
                  titulo="Você divulga e lucra."
                  descricao="Copie, cole nos grupos e comece a receber suas comissões. Sem complicação."
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── RECURSOS ─── */}
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
              className="text-[32px] sm:text-[48px] font-black text-[#111111]"
            >
              Tudo que você precisa para vender.
            </motion.h2>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <FlameIcon className="h-5 w-4" />, title: 'Produtos Virais', desc: 'Top 20 produtos mais vendidos da Shopee atualizados.' },
              { icon: <TrendingUpIcon className="h-5 w-4" />, title: 'Score Viral', desc: 'Cada produto tem uma pontuação de viralidade de 0 a 100.' },
              { icon: <MessageSquareIcon className="h-5 w-4" />, title: 'Copy Pronta', desc: 'Copy de venda gerada gratuitamente para cada produto spy.' },
              { icon: <UsersIcon className="h-5 w-4" />, title: 'Grupos do Facebook', desc: 'Lista dos maiores grupos de afiliados Shopee para divulgar.' },
              { icon: <CalculatorIcon className="h-5 w-4" />, title: 'Projeção de Lucro', desc: 'Calcule quanto vai ganhar com 10, 100 ou 1000 vendas.' },
              { icon: <Heart className="h-5 w-4" />, title: 'Favoritos', desc: 'Salve seus produtos preferidos para acessar rapidamente.' },
            ].map((feature, idx) => (
              <li key={idx} className="min-h-[16rem] list-none">
                <div className="group relative h-full rounded-[24px] border border-black/5 overflow-hidden bg-[#f9f9f9]" style={{ boxShadow: '0 8px 40px rgba(208,1,27,0.08)' }}>
                  <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[20px] p-6 group-hover:shadow-xl transition-all duration-300">
                    <div className="relative flex flex-1 flex-col justify-between gap-4">
                      <div className="w-fit rounded-lg border border-black/5 p-2 text-[#D0011B] bg-white shrink-0 shadow-sm transition-transform group-hover:scale-110">
                        {feature.icon}
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold text-xl text-[#111111] leading-tight group-hover:text-[#D0011B] transition-colors">{feature.title}</h3>
                        <p className="text-sm text-[#555555] leading-relaxed font-medium">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ─── DEPOIMENTOS (Stacked Display Cards) ─── */}
      <section className="px-6 py-24 bg-white overflow-hidden">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          {/* Left text */}
          <div className="flex-1 text-left max-w-md">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block border border-[#D0011B]/20 rounded-full px-4 py-1 text-[11px] font-bold text-[#D0011B] mb-6 tracking-[0.2em] uppercase bg-[#D0011B]/5"
            >
              DEPOIMENTOS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[36px] sm:text-[48px] font-black text-[#111111] leading-tight mb-6"
            >
              Quem usa ShopSpy, recomenda.
            </motion.h2>
            <p className="text-[#555555] text-base font-medium leading-relaxed">
              Junte-se a centenas de afiliados que transformaram sua forma de minerar produtos e estão escalando resultados todos os dias.
            </p>
          </div>

          {/* Right: stacked testimonial cards */}
          <div className="flex-1 flex items-center justify-center">
            <div style={{ display: 'grid', gridTemplateAreas: "'stack'", placeItems: 'center', height: 280, width: '100%', maxWidth: 380 }}>
              <DisplayCard
                className="[grid-area:stack] hover:-translate-y-8 transition-transform grayscale hover:grayscale-0"
              >
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-[#D0011B] fill-[#D0011B]" />)}
                </div>
                <p style={{ fontSize: 13, color: '#444', lineHeight: 1.5 }}>"Em menos de 2 dias usando o ShopSpy, já fiz minha primeira venda."</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#111' }}>Lucas Oliveira · Afiliado Iniciante</p>
              </DisplayCard>
              <DisplayCard
                className="[grid-area:stack] translate-x-14 translate-y-8 hover:-translate-y-1 transition-transform grayscale hover:grayscale-0"
              >
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-[#D0011B] fill-[#D0011B]" />)}
                </div>
                <p style={{ fontSize: 13, color: '#444', lineHeight: 1.5 }}>"A ferramenta gera a copy em segundos. Economiza horas do meu dia."</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#111' }}>Mariana Costa · Afiliado Pro</p>
              </DisplayCard>
              <DisplayCard
                className="[grid-area:stack] translate-x-28 translate-y-16 hover:translate-y-8 transition-transform"
              >
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-[#D0011B] fill-[#D0011B]" />)}
                </div>
                <p style={{ fontSize: 13, color: '#444', lineHeight: 1.5 }}>"Transformou minha renda extra na minha fonte principal de ganhos."</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#111' }}>Ana Silveira · Afiliada de Sucesso</p>
              </DisplayCard>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="secao-precos" className="px-6 py-24 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16">
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
              className="text-[26px] sm:text-[36px] font-black text-[#D0011B] leading-none mt-2"
            >
              e lucrar todos os dias?
            </motion.p>
          </div>

          <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-16">
            {/* PLANO MENSAL */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border border-black/[0.05] bg-[#f9f9f9] rounded-[40px] px-8 py-12 flex flex-col h-full shadow-sm"
            >
              <div className="mb-8 text-left">
                <h2 className="text-2xl font-bold mb-2 text-[#111111]">Plano Mensal</h2>
                <p className="text-[#555555] text-sm leading-relaxed font-medium">Ideal para testar a plataforma e começar a vender</p>
              </div>
              <div className="flex items-baseline mb-10">
                <span className="text-lg font-bold mr-1 text-[#D0011B]">R$</span>
                <span className="text-6xl font-black tracking-tight text-[#D0011B]">97</span>
                <span className="text-[#555555] text-lg ml-2 font-bold">/mês</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://ggcheckout.app/checkout/v3/wPmdkoLh4QAWSIoHjAVD', '_blank')}
                className="w-full py-4 rounded-2xl font-black text-md mb-10 bg-white border border-black/10 text-black shadow-sm transition-all duration-300 hover:shadow-md"
              >
                Assinar Plano Mensal
              </motion.button>
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-black tracking-[0.2em] text-[#555555] uppercase">RECURSOS INCLUÍDOS</p>
                <ul className="space-y-3">
                  {['Radar de Produtos', 'Produtos Virais com Score', 'Copy de Venda Pronta', 'Grupos do Facebook', 'Projeção de Lucro', 'Favoritos', 'Calculadora de Comissão'].map((item, i) => (
                    <li key={i} className="flex items-center text-[14px] text-[#555555] font-medium gap-3">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full border border-[#D0011B]/40 text-[#D0011B] shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* PLANO VITALÍCIO */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-[40px] px-8 py-12 flex flex-col h-full relative overflow-hidden"
              style={{
                border: '2px solid rgba(208,1,27,0.3)',
                boxShadow: '0 8px 40px rgba(208,1,27,0.12)',
                background: 'linear-gradient(110deg, #ffffff 45%, #fff5f5 55%, #ffffff)',
                backgroundSize: '200% 100%',
                animation: 'shine 3s linear infinite',
              }}
            >
              <div className="absolute top-6 right-6">
                <span className="bg-[#D0011B] shadow-[0_10px_30px_-5px_rgba(208,1,27,0.4)] text-[10px] uppercase font-black px-3 py-1.5 rounded-full tracking-wide text-white">Mais Popular</span>
              </div>
              <div className="mb-8 text-left">
                <h2 className="text-2xl font-bold mb-2 text-[#111111]">Plano Vitalício</h2>
                <p className="text-[#555555] text-sm leading-relaxed font-medium">Pague uma vez, use para sempre com todas as atualizações</p>
              </div>
              <div className="flex flex-col mb-4 text-left">
                <div className="flex items-baseline">
                  <span className="text-lg font-bold mr-1 text-[#D0011B]">R$</span>
                  <span className="text-6xl font-black tracking-tight text-[#D0011B]">147</span>
                </div>
                <p className="text-[#D0011B] text-sm font-black mt-3">à vista com acesso vitalício</p>
              </div>
              <motion.button
                whileHover={{ opacity: 0.9, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://ggcheckout.app/checkout/v3/WQ583Zqro94TV375rMYX', '_blank')}
                className="w-full py-4 rounded-2xl font-black text-md flex items-center justify-center gap-2 mb-10 mt-4 bg-[#D0011B] shadow-[0_10px_30px_-5px_rgba(208,1,27,0.4)] text-white transition-all duration-300"
              >
                <Zap size={16} fill="white" />
                Comprar Acesso Vitalício
              </motion.button>
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-black tracking-[0.2em] text-[#555555] uppercase">TUDO DO MENSAL, MAIS:</p>
                <ul className="space-y-3">
                  {[
                    { text: 'Radar de Produtos', bold: false },
                    { text: 'Produtos Virais com Score', bold: false },
                    { text: 'Copy de Venda Pronta', bold: false },
                    { text: 'Grupos do Facebook', bold: false },
                    { text: 'Projeção de Lucro', bold: false },
                    { text: 'Favoritos', bold: false },
                    { text: 'Novos Produtos Toda Semana', bold: true },
                    { text: 'Atualizações Vitalícias', bold: true },
                  ].map((item, i) => (
                    <li key={i} className={`flex items-center text-[14px] font-medium gap-3 ${item.bold ? 'font-bold text-[#111111]' : 'text-[#555555]'}`}>
                      <span className="flex items-center justify-center w-5 h-5 rounded-full border border-[#D0011B]/40 text-[#D0011B] shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Urgency bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-[700px] mx-auto bg-[#f9f9f9] border border-black/[0.05] rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8 shadow-sm"
            style={{ boxShadow: '0 8px 40px rgba(208,1,27,0.08)' }}
          >
            <div className="w-14 h-14 bg-[#D0011B]/10 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle size={28} className="text-[#D0011B]" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-[#111111] text-lg font-bold mb-3">Vagas limitadas</p>
              <div className="w-full h-2.5 bg-black/10 rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-[#D0011B]"
                />
              </div>
              <div className="flex justify-between text-[12px] font-black">
                <span className="text-[#111111]">Restam apenas 15 acessos disponíveis.</span>
                <span className="text-[#555555] uppercase tracking-widest">Tempo real</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <motion.section
        id="faq"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 py-24 bg-white relative overflow-hidden"
      >
        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block border border-[#D0011B]/20 rounded-full px-4 py-1 text-[11px] font-bold text-[#D0011B] mb-6 tracking-[0.2em] uppercase bg-[#D0011B]/5"
            >
              DÚVIDAS
            </motion.span>
            <h2 className="text-[32px] sm:text-[48px] font-black text-[#111111] mb-4">Perguntas frequentes</h2>
            <p className="text-[#555555] font-medium">Tire suas dúvidas sobre o ShopSpy.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: 'ShopSpy é grátis?', a: 'O ShopSpy oferece recursos gratuitos para você começar agora mesmo a encontrar produtos virais. Temos planos premium para quem deseja escalar com recursos exclusivos.' },
              { q: 'Como recebo minhas comissões?', a: 'As comissões são pagas diretamente pela Shopee através do seu link de afiliado. O ShopSpy apenas ajuda você a encontrar os produtos e gerar as copies.' },
              { q: 'Onde divulgo os produtos?', a: 'Você pode divulgar em Grupos de Facebook (lista inclusa no app), WhatsApp, Telegram, TikTok, Instagram e Reels. Onde houver tráfego, há venda.' },
              { q: 'Preciso de estoque?', a: 'Não! Como afiliado, você apenas indica o produto através do seu link. A Shopee cuida da entrega, estoque e suporte ao cliente.' },
              { q: 'Os produtos são realmente atualizados?', a: 'Sim, nossa equipe atualiza a lista de produtos virais e suas pontuações de Score Viral todos os dias.' },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#f9f9f9] border border-black/[0.05] rounded-2xl overflow-hidden cursor-pointer"
                style={{ boxShadow: '0 4px 24px rgba(208,1,27,0.04)' }}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <button className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-black/[0.01]">
                  <span className="font-bold text-[#111111] text-[15px] sm:text-[17px]">{faq.q}</span>
                  <div className={`transition-transform duration-300 text-[#D0011B] ${activeFaq === idx ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-[#555555] leading-relaxed text-[14px] sm:text-[16px] font-medium border-t border-black/[0.04] pt-4">
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

      {/* ─── CTA FINAL ─── */}
      <section style={{
        padding: '80px 40px',
        textAlign: 'center',
        background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(208,1,27,0.06) 0%, transparent 70%)',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontSize: 48, fontWeight: 900, color: '#111111', lineHeight: 1.2, marginBottom: 16 }}>
            Pronto para turbinar<br />
            <span style={{ color: '#D0011B' }}>suas vendas na Shopee?</span>
          </h2>
          <p style={{ fontSize: 18, color: '#555555', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Entre no ShopSpy e descubra o que acontece quando estratégia de afiliado encontra inteligência de dados sob medida.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            <button
              onClick={() => document.getElementById('secao-precos')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: '#D0011B', color: 'white', borderRadius: 10, padding: '16px 32px', fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer' }}
            >
              Criar minha conta →
            </button>
            <button
              onClick={() => document.getElementById('secao-precos')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'transparent', color: '#111111', borderRadius: 10, padding: '16px 32px', fontSize: 16, fontWeight: 600, border: '1px solid #e5e5e5', cursor: 'pointer' }}
            >
              Ver planos
            </button>
          </div>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Resultados em minutos', 'Seus dados, sua privacidade', 'Atualizações toda semana'].map(item => (
              <span key={item} style={{ fontSize: 13, color: '#888888', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#D0011B', fontWeight: 700 }}>✓</span> {item}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        style={{
          background: '#f9f9f9',
          backgroundImage: 'linear-gradient(rgba(208,1,27,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(208,1,27,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          borderTop: '1px solid rgba(208,1,27,0.1)',
          padding: '64px 40px 32px',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
            <div>
              <img
                src="https://i.postimg.cc/NFkJ8vX6/edd68b75-b6bf-4dcd-af88-7dd1332566ed.png"
                alt="ShopSpy Logo"
                style={{ height: 40, width: 'auto', objectFit: 'contain', marginBottom: 16 }}
                referrerPolicy="no-referrer"
              />
              <p style={{ fontSize: 14, color: '#888', lineHeight: 1.7, maxWidth: 260 }}>
                A ferramenta definitiva para afiliados que buscam minerar produtos virais e escalar vendas na Shopee.
              </p>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: '#111', marginBottom: 16, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Plataforma</h4>
              {['Mineração de Produtos', 'Categorias Quentes', 'Gerador de Copys', 'Suporte'].map(l => (
                <a key={l} href="#" style={{ display: 'block', color: '#888', fontSize: 14, marginBottom: 10, textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = '#111')} onMouseLeave={e => (e.currentTarget.style.color = '#888')}>{l}</a>
              ))}
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: '#111', marginBottom: 16, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Empresa</h4>
              {['Sobre Nós', 'Termos de Uso', 'Privacidade', 'Afiliados'].map(l => (
                <a key={l} href="#" style={{ display: 'block', color: '#888', fontSize: 14, marginBottom: 10, textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = '#111')} onMouseLeave={e => (e.currentTarget.style.color = '#888')}>{l}</a>
              ))}
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: '#111', marginBottom: 16, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Suporte</h4>
              <a href="mailto:contato@shopspy.com.br" style={{ display: 'block', color: '#888', fontSize: 14, marginBottom: 10, textDecoration: 'none' }}>contato@shopspy.com.br</a>
              <a href="#" style={{ display: 'block', color: '#888', fontSize: 14, marginBottom: 10, textDecoration: 'none' }}>Central de Ajuda</a>
              <p style={{ color: '#D0011B', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>Atendimento Prioritário</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(208,1,27,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'center' }}>
            <p style={{ fontSize: 12, color: '#aaa' }}>© {new Date().getFullYear()} ShopSpy. Todos os direitos reservados. Não temos vínculo oficial com a Shopee.</p>
          </div>
        </div>
      </footer>

      {/* Scroll Blur Effect Elements */}
      <div className="scroll-blur-overlay" />
      <div className="scroll-blur-bottom" />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shine {
          from { background-position: 200% center; }
          to { background-position: -200% center; }
        }

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
                rgba(255,255,255,0.8) 100%
            );
        }
      `}} />
    </div>
  );
}
