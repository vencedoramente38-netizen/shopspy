"use client";
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";

export default function Footer4Col() {
  return (
    <footer className="w-full bg-black border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Column 1: Brand */}
        <div className="flex flex-col gap-6">
          <img
            src="https://i.postimg.cc/NFkJ8vX6/edd68b75-b6bf-4dcd-af88-7dd1332566ed.png"
            alt="ShopSpy Logo"
            className="h-10 w-auto self-start filter brightness-110"
          />
          <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xs">
            A ferramenta definitiva para afiliados que buscam minerar produtos virais e escalar vendas na Shopee.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#D0011B] hover:border-[#D0011B]/40 transition-all">
              <IconBrandInstagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#D0011B] hover:border-[#D0011B]/40 transition-all">
              <IconBrandFacebook size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#D0011B] hover:border-[#D0011B]/40 transition-all">
              <IconBrandYoutube size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#D0011B] hover:border-[#D0011B]/40 transition-all">
              <IconBrandTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Column 2: Product */}
        <div>
          <h4 className="text-white font-black uppercase italic tracking-wider mb-6">Plataforma</h4>
          <ul className="flex flex-col gap-4">
            <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Mineração de Produtos</a></li>
            <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Categorias Quentes</a></li>
            <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Gerador de Copys</a></li>
            <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Suporte 24/7</a></li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h4 className="text-white font-black uppercase italic tracking-wider mb-6">Empresa</h4>
          <ul className="flex flex-col gap-4">
            <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Sobre Nós</a></li>
            <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Termos de Uso</a></li>
            <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Privacidade</a></li>
            <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Afiliados</a></li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div>
          <h4 className="text-white font-black uppercase italic tracking-wider mb-6">Suporte</h4>
          <ul className="flex flex-col gap-4">
            <li><a href="mailto:contato@shopspy.com.br" className="text-white/40 hover:text-white transition-colors text-sm font-medium">contato@shopspy.com.br</a></li>
            <li><a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-medium">Central de Ajuda</a></li>
            <li><p className="text-[#D0011B] text-xs font-black uppercase mt-2">Atendimento Prioritário</p></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 text-center md:flex md:justify-between items-center">
        <p className="text-white/20 text-xs font-medium">
          © {new Date().getFullYear()} ShopSpy. Todos os direitos reservados.
        </p>
        <div className="mt-4 md:mt-0 flex justify-center gap-6">
          <img src="https://i.postimg.cc/mD8xMBvY/payment-methods.png" alt="Pagamentos" className="h-5 opacity-20 filter grayscale hover:grayscale-0 hover:opacity-50 transition-all" />
        </div>
      </div>
    </footer>
  );
}
