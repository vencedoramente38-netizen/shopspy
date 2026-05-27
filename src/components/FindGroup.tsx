import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Package, 
  Link as LinkIcon, 
  Tag, 
  Download, 
  CheckCircle2,
  ExternalLink,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { products } from '../data/products';
import GroupLoader from './GroupLoader';
import { CopyButton } from './ui/CopyButton';

interface FindGroupProps {
  onNotification: (message: string) => void;
}

const productCopies: Record<number, string> = {
  1: "Essa calça vai mudar seu guarda-roupa! 👖✨\nCalça Jeans Wide Leg Marmorizada com cintura alta premium — conforto e estilo em uma peça só. Com 33% OFF, corre antes de esgotar!",
  2: "Look completo por menos! 🔥\nShort Alfaiataria Feminino estilo Zara com cintura alta e zíper lateral. Elegância no dia a dia com 39% de desconto. Aproveite!",
  3: "Noite quentinha e estilosa! 🌙💕\nKit com 3 pijamas Baby Doll SUEDE com personagens sortidos. 50% OFF — presente perfeito ou mimo pra você mesma!",
  4: "Resultado real, conforto garantido! ⚡\nCinta Modeladora Espartilho de Emagrecimento com envio imediato. Mais de 62 mil avaliações positivas. Garanta já o seu!",
  5: "Vitaminas na hora que quiser! 🥤💪\nMini Liquidificador Portátil Shake com 6 lâminas e cabo USB. Leve a qualquer lugar com 58% OFF. Estoque limitado!",
  6: "Nunca mais fique sem água! 💧\nBebedouro Bomba Elétrica Recarregável para galões de 5L, 10L e 20L. Fácil de instalar, 54% OFF. Compre agora!",
  7: "Segurança 4K na palma da mão! 📷🏠\nCâmera Externa Wi-Fi com 3 lentes 180°, IA, zoom ótico e visão noturna. Proteção total com 31% OFF!",
  8: "Projeto perfeito toda vez! 🔧⚡\nParafusadeira Furadeira 48V com 2 baterias, maleta e 28 acessórios. 63% OFF — a melhor relação custo-benefício do mercado!",
  9: "Cozinha mais prática todo dia! 🥩🥦\nTriturador de Alimentos Elétrico para carnes e legumes, 2/3L, 110v/220v. Agilidade na cozinha por um ótimo preço!",
  10: "Alívio na hora que você precisar! 💆♀️🔋\nMassageador Elétrico Profissional com 6 níveis e 4 ponteiras. Mais de 25 mil vendidos — 34% OFF por tempo limitado!",
  11: "Comece sua coleção agora! 🏆\nKit oficial com Álbum da Copa do Mundo 2026 + 3 envelopes de figurinhas. Não fique de fora do maior evento do planeta!",
  12: "Organização é tudo! 🥡✨\nKit 10 Marmitas Potes 900ml com travas laterais herméticas e livres de BPA. Ideal para marmita, congelador e dieta. Garanta já!",
  13: "Cozinha mais rápida e saudável! 🥗⚡\nMini Picador Elétrico com 3 lâminas, 250ml — perfeito para carnes, legumes, alho e frutas. 63% OFF por tempo limitado!",
  14: "Cinema em casa do seu jeito! 🎬🔥\nProjetor HY300 Smart Android 11 com 4K, Wi-Fi, Bluetooth e alto falante embutido. 63% OFF — estoque limitado!",
  15: "Kit completo para qualquer reparo! 🔧💪\nJogo de Chave Catraca com 40/46 peças, maleta completa e reversível. Mais de 169 mil vendidos — qualidade garantida!",
  16: "Noites mais quentinhas! 🌙❄️\nCobertor Casal Soft Manta Antialérgica 2x1,80m — macio, quentinho e 45% OFF. Perfeito para o inverno!",
  17: "Nunca fique com pneu murcho! 🚗💨\nBomba de Ar Portátil 4 em 1 com Powerbank 8000mAh — enche pneu de carro, moto e bicicleta sem fio!",
  18: "Silhueta dos sonhos! 💃🔥\nCinta Elastique Feminina Modeladora que afina a cintura e define o corpo. Mais de 5 mil clientes satisfeitas!",
  19: "Pneu calibrado em segundos! ⚡🚘\nCompressor de Ar Elétrico Portátil Digital para carro, moto, bike e bola. Mais de 15 mil vendidos — leve sempre com você!",
  20: "Poder na palma da mão! 🪚💥\nMini Motosserra Elétrica 6 Polegadas com 2 baterias, recarregável Bivolt. 28% OFF — ideal para jardim e pequenos cortes!",
  21: "🏆 Coleção Copa do Mundo 2026!\nFigurinhas e pacotes para colecionar e trocar. 80% de desconto por tempo limitado! Garanta o seu antes que esgote! 🔥",
  22: "🚗 Kit completo para seu carro brilhar!\nShampoo V-Floc + Cera + Pneu Pretinho + Restaurax Vonixx. Tudo que você precisa em um só kit! Qualidade Vonixx com ótimo preço!",
  23: "👶 Berço Balanço Portátil para seu bebê!\n83% de desconto — de R$ 2.888 por apenas R$ 489! Mosqueteiro incluso, trava de segurança, ideal até 3 anos. Estoque limitado! 🍼",
  24: "✨ Vestido Longo Elegante para o inverno!\nFenda lateral, manga longa, malha premium. De R$ 89,90 por apenas R$ 33,89 — 62% OFF! Corre antes de acabar! 👗",
  25: "🇧🇷 Chinelo Masculino Bandeira Brasil!\nAntiderrapante, casual e estiloso. Por apenas R$ 19,90! Perfeito para o verão e para torcer pelo Brasil na Copa! Aproveite!",
  26: "🩲 Kit 5 Cuecas Boxer Original!\n51% de desconto — de R$ 69,90 por R$ 33,99! Maies de 87 mil vendidos — qualidade comprovada. Garanta o seu agora! 🔥",
  27: "🛏️ Jogo de Lençol 400 Fios de LUXO!\nDe R$ 39,90 por apenas R$ 9,90 — 75% OFF! Mais de 39 mil vendidos. Tecido liso premium com elástico. Corre antes de esgotar!",
  28: "⚽ Camisa Torcedor Copa 2026!\nModelo exclusivo masculino para torcer com estilo. R$ 89,90 — estoque limitado! Vista a camisa e apoie o Brasil! 🇧🇷🏆",
  29: "🔊 Caixa de Som Bluetooth Potente!\nAlt falante grande, som estéreo, AL-3629 Altomex. De R$ 129,99 por R$ 98,99. Qualidade de som incrível para qualquer ambiente! 🎵",
};

const groups = [
  { name: "Ofertas da Shopee", members: "182 mil membros", link: "https://www.facebook.com/groups/826123847522536/", image: "https://scontent.fmoc6-1.fna.fbcdn.net/v/t39.30808-6/464177400_866672108873232_568719885916696251_n.jpg?stp=c76.0.788.788a_cp0_dst-jpg_s64x64_tt6&_nc_cat=110&ccb=1-7&_nc_sid=a9d32b&_nc_ohc=0tyMMOf6cmoQ7kNvwFo22zm&_nc_oc=AdqIzHppi7s-DBu5x35lEwySAq_glkCK_63LjFJajWzuW3NxpHDC7BBpX1Ki8uDM0tk&_nc_zt=23&_nc_ht=scontent.fmoc6-1.fna&oh=00_Af6vgkGHwD9vnf78rWYiBQ3gEtzMuupIzcbfqW_N__KUhA&oe=69FA7DE4" },
  { name: "SHOPEE PROMO E DICAS", members: "81 mil membros", link: "https://www.facebook.com/groups/228783514908768/", image: "https://scontent.fmoc6-1.fna.fbcdn.net/v/t39.30808-6/418426678_3070896599712992_193740003360334974_n.jpg?stp=c171.0.487.487a_cp0_dst-jpg_s64x64_tt6&_nc_cat=105&ccb=1-7&_nc_sid=a9d32b&_nc_ohc=wTBUQSeuH0EQ7kNvwGeKSWp&_nc_oc=AdraNYUyKKMsa3XvXmTzC1Lh7vN0hAGlItuaTaB77mPdqT3AzcXrqHKQRy9y_Nyxcp0&_nc_zt=23&_nc_ht=scontent.fmoc6-1.fna&oh=00_Af6egs6XIgdExX-G9KnJdGh_KGxAn2uGFfgGpnqB1XhzjQ&oe=69FA79F1" },
  { name: "Shopee Afiliados", members: "66,3 mil membros", link: "https://www.facebook.com/share/g/1BC79tjvDd/", image: "https://scontent.fmoc6-1.fna.fbcdn.net/v/t1.6435-9/199385747_4040844682676175_4517411720734015340_n.jpg?stp=cp0_dst-jpg_s64x64_tt6&_nc_cat=102&ccb=1-7&_nc_sid=a9d32b&_nc_ohc=I2ew7gLZqMkQ7kNvwFXuqNE&_nc_oc=Adp8fZtQaVmwA_YYcWGlPPZI7PU3uzbCB41JTwSV6Ow_bZa8Tt6BFcH7LRVPjLnXtTo&_nc_zt=23&_nc_ht=scontent.fmoc6-1.fna&oh=00_Af6cVZgWCIossW10JyJS4v1asH62fT3ZoO8M-p1NJByHmg&oe=6A1C3C99" },
  { name: "Shopee Afiliados Brasil - Vídeos Shopee", members: "42,6 mil membros", link: "https://www.facebook.com/share/g/1Hth3Ecm9F/", image: "https://scontent.fmoc6-1.fna.fbcdn.net/v/t39.30808-6/535119458_786221124347008_978579453568280283_n.jpg?stp=c144.0.432.432a_cp0_dst-jpg_s64x64_tt6&_nc_cat=106&ccb=1-7&_nc_sid=a9d32b&_nc_ohc=p8ZQVQX3n3gQ7kNvwHA3ijp&_nc_oc=AdrDvRpHUsA71XDGQbQ_cNb_ZdGD5boS-weMnreOY110vMG80XZ__Voxcwat2ZhXgQk&_nc_zt=23&_nc_ht=scontent.fmoc6-1.fna&oh=00_Af6SQvmkw1hzrHdc-Uodb0Qu6LzTNstOcNfI9qLdOcwUlA&oe=69FAA091" },
  { name: "Vendas online da Shopee", members: "31,5 mil membros", link: "https://www.facebook.com/share/g/1N5XUxFoka/", image: "https://scontent.fmoc6-1.fna.fbcdn.net/v/t39.30808-6/279838716_1121125318736401_53711839838964655_n.jpg?stp=c41.0.678.678a_cp0_dst-jpg_s64x64_tt6&_nc_cat=101&ccb=1-7&_nc_sid=a9d32b&_nc_ohc=MeOZstxwFpEQ7kNvwFVYpg9&_nc_oc=Adrt9nP52ElNCPcsijuIObIEsVLYXqCalMlZHH1fa-M_BpRYtFfVmg0XNCUh62cpUO0&_nc_zt=23&_nc_ht=scontent.fmoc6-1.fna&oh=00_Af4NXSfUzLmtBNY3YEiYLxaJzBobC_FHqfn21gNTawmwfQ&oe=69FA94C2" },
  { name: "Vendas de tudo da Shopee", members: "48,1 mil membros", link: "https://www.facebook.com/share/g/1CVJd4yqWh/", image: "https://scontent.fmoc6-1.fna.fbcdn.net/v/t39.30808-6/513920720_4035649840011096_4311450022284054005_n.jpg?stp=c160.0.640.640a_cp0_dst-jpg_s64x64_tt6&_nc_cat=110&ccb=1-7&_nc_sid=a9d32b&_nc_ohc=y-8kpoJRhNwQ7kNvwGkNOYz&_nc_oc=Adr_PUmTzrmb_F3OBe0QkjO8LvcciFBfGBnp5hMkww-nfAoBK0nohRkeFNo_ELgOoL4&_nc_zt=23&_nc_ht=scontent.fmoc6-1.fna&oh=00_Af7d1_24SNARGLWvCfhQMZ3WwZid7eoxsK433Qcbd8ZLFg&oe=69FA8226" },
  { name: "Shopee Divulgação", members: "12,9 mil membros", link: "https://www.facebook.com/share/g/1CkuFkBEcv/", image: "https://scontent.fmoc6-1.fna.fbcdn.net/v/t39.30808-6/616131042_1413381956843504_47218736201785591_n.jpg?stp=c224.0.576.576a_cp0_dst-jpg_s64x64_tt6&_nc_cat=107&ccb=1-7&_nc_sid=a9d32b&_nc_ohc=c1Sxe3vlZLwQ7kNvwFtIX2h&_nc_oc=Adq9StihkkY397B3DdeGE0vfbg26v8Fdi0UtkJIHu-1B04Vz1W2wtvDic8gMUZ3ZIcs&_nc_zt=23&_nc_ht=scontent.fmoc6-1.fna&oh=00_Af6pF_27K7PINDTlX9zYfXZ5Swf8PvSqdNXvhAmF1XPgtQ&oe=69FA95CA" },
  { name: "GRUPO PARA VENDEDORES DA SHOPEE", members: "6,2 mil membros", link: "https://www.facebook.com/groups/111964375276605/", image: "https://scontent.fmoc6-1.fna.fbcdn.net/v/t39.30808-6/358691831_240730622150785_1249320084474807694_n.jpg?stp=cp0_dst-jpg_s64x64_tt6&_nc_cat=108&ccb=1-7&_nc_sid=a9d32b&_nc_ohc=AzxjZhHxP0kQ7kNvwEMRn1j&_nc_oc=Adpic0Wz6dgWYFnrgejaQ5H3u9JbcH5TFAD4tme06NhIqTn4ddPozoHZx9O5E0IW8N8&_nc_zt=23&_nc_ht=scontent.fmoc6-1.fna&oh=00_Af7j5LXij7DNFUfETmGLzR7UDnHAaAgVUkBTbSx-JS8Y8g&oe=69FA7BDA" },
  { name: "Shopee - Dicas de Compras", members: "55,5 mil membros", link: "https://www.facebook.com/share/g/18bJfryAnS/", image: "https://scontent.fmoc6-1.fna.fbcdn.net/v/t39.30808-6/239515762_4134273103334873_7423723098673701271_n.jpg?stp=c341.0.1080.1080a_dst-jpg_s100x100_tt6&_nc_cat=108&ccb=1-7&_nc_sid=a9d32b&_nc_ohc=RFBaXUtq9wAQ7kNvwFLPmEu&_nc_oc=Adp-6PuDdbfZWxGfaGezP6y8iI73HEE7VuzupX3ruk5EMUEmpzlw7rT4PIFK9fW4js4&_nc_zt=23&_nc_ht=scontent.fmoc6-1.fna&oh=00_Af6NEGSR-H2tCe4mg9O76pSBT7MhZvBNXyTDMQ3h8s5i1w&oe=69FDBC53" },
  { name: "Shopee Brasil Comprar Online Barato", members: "22,7 mil membros", link: "https://www.facebook.com/share/g/1Dq1J8VCeP/", image: "https://scontent.fmoc6-1.fna.fbcdn.net/v/t39.30808-6/490736350_1091394646057652_770026761395981986_n.png?stp=c160.0.600.600a_cp0_dst-png_s64x64&_nc_cat=105&ccb=1-7&_nc_sid=a9d32b&_nc_ohc=TnRjW75DHOoQ7kNvwEhVe1d&_nc_oc=AdpaxCWfc2ZC5HZo71fWTz9caiYwSNNt2Kfq9HOGRgyHbSAsu0KB5ESb2N6tnVQAGxo&_nc_zt=23&_nc_ht=scontent.fmoc6-1.fna&oh=00_Af4dmRutjiCeMJs6-tiGyzxdfNtuzPWJPfAPjLygQ3ozCg&oe=69FDA11E" },
  { name: "Vendas online da Shopee", members: "32,0 mil membros", link: "https://www.facebook.com/share/g/1GGNQkivay/", image: "https://scontent.fmoc6-1.fna.fbcdn.net/v/t39.30808-6/279838716_1121125318736401_53711839838964655_n.jpg?stp=c41.0.678.678a_cp0_dst-jpg_s64x64_tt6&_nc_cat=101&ccb=1-7&_nc_sid=a9d32b&_nc_ohc=sQrWQDLQYIMQ7kNvwHjDJp_&_nc_oc=Ado4DAFoCOpy-2hrCXyYNLd9WTYZopXWqsKxdV8NDGbsZzBVZ0yMd3rsh25Akmjp9ho&_nc_zt=23&_nc_ht=scontent.fmoc6-1.fna&oh=00_Af4CIhPNnh5cle0gSGn8H-TKOcw2WjmTsxD52g6H3-HVGw&oe=69FDA842" },
  { name: "Universo Shopee 🌟", members: "81,4 mil membros", link: "https://www.facebook.com/groups/402005096935071/", image: "https://scontent.fmoc6-1.fna.fbcdn.net/v/t39.30808-6/557645161_24372054839139785_4994464493187035422_n.jpg?stp=c256.0.1024.1024a_cp0_dst-jpg_s64x64_tt6&_nc_cat=100&ccb=1-7&_nc_sid=a9d32b&_nc_ohc=Gl7ZRgx0qfUQ7kNvwFeCz0f&_nc_oc=AdpoNmI5rseho0ZuzDFXidr4HhOLBLYWTXrIcXYiAtbWqMJVIf7_z9yYYDptVZRv3mI&_nc_zt=23&_nc_ht=scontent.fmoc6-1.fna&oh=00_Af6wCIaVNgjdsraLOSgGaYht3bpgfSCeAtgnqZElTLjWEQ&oe=69FDB1C3" },
  { name: "Shopee afiliados, compra e venda", members: "59,6 mil membros", link: "https://www.facebook.com/share/g/17jTzfsVuc/", image: "https://scontent.fmoc6-1.fna.fbcdn.net/v/t39.30808-6/352361975_159797537080133_5811697753915886672_n.jpg?stp=c31.0.524.524a_dst-jpg_s100x100_tt6&_nc_cat=101&ccb=1-7&_nc_sid=a9d32b&_nc_ohc=bTxVmF8BmTkQ7kNvwE_sK6e&_nc_oc=AdpBXtb1wMuBY9igf_OLQc1kirq5M1lAhzKzeqVSiJu0TTCPHv8vQU-FnwwCw7fL41Q&_nc_zt=23&_nc_ht=scontent.fmoc6-1.fna&oh=00_Af7awffvz8KmyWUJxvzujNUEiKGYY6sj_okBB8Ip_bt2Kg&oe=69FDBE79" },
];

export default function FindGroup({ onNotification }: FindGroupProps) {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [affiliateLink, setAffiliateLink] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('shopspy_favorites') || '[]');
    let filtered = products.filter(p => favorites.includes(p.id));
    
    const tempProductStr = localStorage.getItem('shopspy_temp_product');
    if (tempProductStr) {
      const tempProduct = JSON.parse(tempProductStr);
      setSelectedProduct(tempProduct);
      localStorage.removeItem('shopspy_temp_product');
      // Adiciona na visualização local se não estivesse lá
      if (!favorites.includes(tempProduct.id)) {
        filtered = [tempProduct, ...filtered];
      }
    }

    setFavoriteProducts(filtered);
  }, []);

  const handleFindGroups = () => {
    if (!selectedProduct) return;
    
    setIsLoading(true);
    setLoadingFinished(false);
    setShowResults(false);
    
    // Simula o final do carregamento para a barra ir a 100%
    setTimeout(() => {
      setLoadingFinished(true);
    }, 2800);

    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 3200);
  };

  const filteredProducts = products.filter(p => 
    p.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.categoria.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    // Adiciona o produto à lista visível se não estiver nela para dar feedback visual
    if (!favoriteProducts.find(p => p.id === product.id)) {
      setFavoriteProducts(prev => [product, ...prev]);
    }
    setIsModalOpen(false);
    setSearchQuery("");
  };

  const handleDownloadImage = async (imageUrl: string, productName: string) => {
    try {
      onNotification("Iniciando download...");
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${productName.slice(0, 30)}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(imageUrl, '_blank');
      onNotification("Abrindo imagem em nova aba...");
    }
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-[#080808] p-6 custom-scrollbar overflow-y-auto font-['Space Grotesk'] min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#D0011B] inline-block"></span>
            <h1 className="text-[18px] font-bold text-gray-900 dark:text-white">Encontrar Grupo</h1>
            <span className="ml-1 bg-[#e8f0ff] text-[#2563EB] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">FACEBOOK</span>
          </div>
          <p className="text-[13px] text-gray-500 dark:text-white/40 ml-4">Selecione um produto, adicione seu link de afiliado e encontre grupos para divulgar</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-[12px] p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#fff0f0] flex items-center justify-center flex-shrink-0">
              <Users size={18} className="text-[#D0011B]" />
            </div>
            <div>
              <div className="text-[16px] font-bold text-gray-900 dark:text-white leading-tight">13</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">Grupos Relevantes</div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-[12px] p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#fff0f0] flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D0011B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2"/><path d="M12 8v4l3 3"/></svg>
            </div>
            <div>
              <div className="text-[16px] font-bold text-[#D0011B] leading-tight">581K+</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">Membros Totais</div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-[12px] p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#f0f4ff] flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            </div>
            <div>
              <div className="text-[16px] font-bold text-[#2563EB] leading-tight">1-Click</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">Divulgação</div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-[12px] p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#f0fff4] flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div>
              <div className="text-[16px] font-bold text-[#16a34a] leading-tight">Grátis</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">Custo de Uso</div>
            </div>
          </div>
        </div>

        {/* Seção 1 - Selecione um Produto */}
        <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-[14px] p-5 shadow-xl transition-colors duration-300">
          <div className="flex items-center gap-[10px] mb-6">
            <div className="w-6 h-6 bg-[#D0011B] rounded-full flex items-center justify-center text-white text-[12px] font-bold">
              1
            </div>
            <h2 className="text-gray-900 dark:text-white text-[14px] font-bold">Selecione um produto</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-gray-400 dark:text-white/40 font-bold tracking-wider">MEUS FAVORITOS</label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {favoriteProducts.length === 0 && (
                  <div className="col-span-2 border border-dashed border-black/10 dark:border-white/10 rounded-[12px] py-10 flex flex-col items-center justify-center gap-3">
                    <span className="text-4xl">⭐</span>
                    <p className="text-[13px] text-gray-500 dark:text-white/40 font-medium">Você ainda não favoritou produtos</p>
                    <button
                      onClick={() => {
                        // Navegar para Produtos Virais via evento
                        window.dispatchEvent(new CustomEvent('shopspy_navigate', { detail: { tab: 'products' } }));
                      }}
                      className="bg-[#D0011B] text-white text-[13px] font-bold px-5 py-2 rounded-[8px] hover:brightness-110 transition-all"
                    >Ir para Produtos Virais</button>
                  </div>
                )}
                {favoriteProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    className={`
                      flex items-center gap-3 p-3 rounded-[10px] cursor-pointer transition-all duration-200 border
                      ${selectedProduct?.id === p.id 
                        ? 'bg-primary/10 border-primary' 
                        : 'bg-black/[0.02] dark:bg-white/[0.04] border-transparent hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'}
                    `}
                    style={{ 
                      background: selectedProduct?.id === p.id ? 'rgba(208, 1, 27, 0.08)' : undefined
                    }}
                  >
                    <img 
                      src={p.imagem} 
                      alt={p.nome} 
                      className="w-[52px] h-[52px] rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 dark:text-white text-[13px] font-semibold truncate leading-tight">{p.nome}</h3>
                      <p className="text-primary text-[11px] mt-0.5">{p.categoria}</p>
                      <p className="text-gray-900 dark:text-white text-[13px] font-bold mt-0.5">{p.preco}</p>
                    </div>
                    {selectedProduct?.id === p.id && (
                      <div className="text-primary">
                        <CheckCircle2 size={18} />
                      </div>
                    )}
                  </div>
                ))}

                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center gap-2 w-full p-4 border border-dashed border-black/10 dark:border-white/15 rounded-[10px] text-gray-400 dark:text-white/40 text-[13px] hover:border-primary/40 hover:text-primary/70 transition-all duration-200"
                >
                  <Plus size={18} />
                  <span>Adicionar produto</span>
                </button>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex items-center gap-[10px] mb-2">
                <div className="w-6 h-6 bg-[#D0011B] rounded-full flex items-center justify-center text-white text-[12px] font-bold">
                  2
                </div>
                <h2 className="text-gray-900 dark:text-white text-[14px] font-bold">Cole seu link de afiliado</h2>
              </div>
              <input
                type="text"
                placeholder="https://shope.ee/link_afiliado"
                value={affiliateLink}
                onChange={(e) => setAffiliateLink(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-black/5 dark:border-white/[0.08] rounded-[10px] p-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:outline-none transition-all duration-200 text-sm"
              />
              <p className="text-[11px] text-[#D0011B] mt-1">O link de afiliado será injetado automaticamente na copy gerada ao final da extração.</p>
            </div>
          </div>

          <div className="mt-8">
            <button 
              onClick={handleFindGroups}
              disabled={!selectedProduct || isLoading}
              className={`
                w-full flex items-center justify-center gap-3 py-4 rounded-[10px] font-bold text-[15px] transition-all shadow-lg active:scale-[0.98]
                ${selectedProduct && !isLoading 
                  ? 'bg-primary text-white hover:bg-primary/90' 
                  : 'bg-primary/40 text-white/50 cursor-not-allowed'}
              `}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Users size={20} />
              )}
              {isLoading ? 'Buscando...' : 'Encontrar Grupos do Facebook'}
            </button>
          </div>
        </div>

        {/* Resultados */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loader"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <GroupLoader isDone={loadingFinished} />
            </motion.div>
          )}

          {showResults && !isLoading && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* 2. Card de Extração do Produto */}
              <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-[16px] p-5 mt-5 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-none transition-all duration-300">
                <img 
                  src={selectedProduct?.imagem} 
                  alt={selectedProduct?.nome} 
                  className="w-[72px] h-[72px] rounded-[10px] object-cover mb-4"
                />
                
                <div className="space-y-2">
                  {/* Campo: NOME */}
                  <div className="bg-[#f7f7f7] dark:bg-[#1a1a1a] rounded-[10px] p-[12px_14px] flex justify-between items-center">
                    <div className="flex-1 min-w-0 pr-4">
                      <label className="block text-[10px] font-bold uppercase text-[#999999] dark:text-[rgba(255,255,255,0.45)] mb-1">NOME:</label>
                      <div className="text-[13px] text-[#111111] dark:text-[#ffffff] font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                        {selectedProduct?.nome}
                      </div>
                    </div>
                    <CopyButton value={selectedProduct?.nome || ""} />
                  </div>

                  {/* Campo: LINK DO PRODUTO */}
                  <div className="bg-[#f7f7f7] dark:bg-[#1a1a1a] rounded-[10px] p-[12px_14px] flex justify-between items-center">
                    <div className="flex-1 min-w-0 pr-4">
                      <label className="block text-[10px] font-bold uppercase text-[#999999] dark:text-[rgba(255,255,255,0.45)] mb-1">LINK DO PRODUTO:</label>
                      <div className="text-[13px] text-[#111111] dark:text-[#ffffff] font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                        {selectedProduct?.link}
                      </div>
                    </div>
                    <button
                      onClick={() => selectedProduct && window.open(selectedProduct.link, '_blank')}
                      style={{
                        width: 32, height: 32,
                        borderRadius: 8,
                        background: '#D0011B',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                        transition: 'opacity 0.2s ease'
                      }}
                      title="Abrir produto na Shopee"
                    >
                      <ExternalLink size={14} color="white" />
                    </button>
                  </div>

                  {/* Campo: LINK DE AFILIADO */}
                  <div className="bg-[#f7f7f7] dark:bg-[#1a1a1a] rounded-[10px] p-[12px_14px] flex justify-between items-center">
                    <div className="flex-1 min-w-0 pr-4">
                      <label className="block text-[10px] font-bold uppercase text-[#999999] dark:text-[rgba(255,255,255,0.45)] mb-1">LINK DE AFILIADO:</label>
                      <div className="text-[13px] text-[#111111] dark:text-[#ffffff] font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                        {affiliateLink || "Não informado"}
                      </div>
                    </div>
                    <div className={!affiliateLink ? 'opacity-50 cursor-not-allowed' : ''}>
                      <CopyButton value={affiliateLink} />
                    </div>
                  </div>

                  {/* Campo: COPY DE VENDA */}
                  <div className="bg-[#f7f7f7] dark:bg-[#111111] border border-black/[0.05] dark:border-white/[0.05] rounded-[10px] p-3 flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <label className="block text-[10px] font-bold uppercase text-[#999999] dark:text-[rgba(255,255,255,0.4)] mb-2 tracking-wider">COPY DE VENDA:</label>
                      <div className="text-[13px] text-gray-900 dark:text-white leading-[1.6] whitespace-pre-wrap font-['Space Grotesk']">
                        {selectedProduct ? (
                          affiliateLink 
                            ? `${productCopies[selectedProduct.id]}\n\n🔗 Compre aqui: ${affiliateLink}` 
                            : productCopies[selectedProduct.id]
                        ) : ''}
                      </div>
                    </div>
                    <CopyButton value={
                      selectedProduct 
                        ? (affiliateLink 
                            ? `${productCopies[selectedProduct.id]}\n\n🔗 Compre aqui: ${affiliateLink}` 
                            : productCopies[selectedProduct.id]) 
                        : ''
                    } />
                  </div>

                  {/* Campo: IMAGEM */}
                  <div className="bg-[#f7f7f7] dark:bg-[#111111] border border-black/[0.05] dark:border-white/[0.05] rounded-[10px] p-[12px_14px] flex justify-between items-center">
                    <div className="flex-1">
                      <label className="block text-[10px] font-bold uppercase text-[#999999] dark:text-[rgba(255,255,255,0.45)] mb-1">IMAGEM:</label>
                      <div className="text-[13px] text-gray-900 dark:text-white font-medium">Produto_Imagem_Full.jpg</div>
                    </div>
                    <button 
                      onClick={() => selectedProduct && handleDownloadImage(selectedProduct.imagem, selectedProduct.nome)}
                      className="bg-[#D0011B] text-white rounded-lg px-[14px] py-[6px] text-[12px] font-bold hover:brightness-110 transition-all"
                    >
                      <span>Baixar imagem</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 1. Lista de Grupos */}
              <div className="space-y-3">
                <h3 className="text-gray-400 dark:text-white/45 text-[10px] uppercase font-bold tracking-widest px-1">GRUPOS ENCONTRADOS</h3>
                <div className="space-y-3">
                  {groups.map((group, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-[#111111] border border-black/5 dark:border-white/[0.08] rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-white/[0.03] hover:border-black/10 dark:hover:border-white/15 transition-all duration-200"
                    >
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <img 
                          src={group.image} 
                          alt={group.name} 
                          style={{
                            width: 48, height: 48,
                            borderRadius: 10,
                            objectFit: 'cover',
                            flexShrink: 0,
                            background: 'rgba(208, 1, 27, 0.1)'
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.setAttribute('style', 'display:flex');
                          }}
                        />
                        <div 
                          className="hidden absolute inset-0 items-center justify-center bg-[rgba(208, 1, 27, 0.15)] rounded-[10px]"
                        >
                          <Users size={20} color="#D0011B" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        <h4 className="text-gray-900 dark:text-white text-[13px] font-semibold truncate leading-tight">{group.name}</h4>
                        <p className="text-gray-400 dark:text-white/45 text-[11px] mt-0.5">Grupo Público • {group.members}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => window.open(group.link, '_blank')}
                          className="bg-primary/12 hover:bg-primary/20 text-primary border border-primary/20 rounded-lg px-4 py-1.5 text-xs font-bold transition-colors flex items-center gap-1.5"
                        >
                          Abrir <ExternalLink size={12} />
                        </button>
                        <CopyButton value={group.link} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal de Seleção de Produto - Moved outside the main scroll container for stability */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white dark:bg-[#111111] border border-black/10 dark:border-white/[0.08] rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="px-6 py-5 border-b border-black/5 dark:border-white/[0.06] flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Selecionar Produto</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-gray-400"
                >
                  <Plus size={20} className="rotate-45" />
                </button>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-[#1a1a1a] border-b border-black/5 dark:border-white/[0.06]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text"
                    placeholder="Pesquisar produto..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all text-gray-900 dark:text-white"
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <div className="grid grid-cols-1 gap-2">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p)}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/[0.02] border border-black/5 dark:border-white/10 rounded-xl cursor-pointer hover:bg-primary/5 hover:border-primary/20 transition-all group"
                    >
                      <img 
                        src={p.imagem} 
                        alt={p.nome} 
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13px] font-bold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">{p.nome}</h4>
                        <p className="text-[11px] text-gray-500 dark:text-white/45">{p.categoria} • {p.preco}</p>
                      </div>
                    </div>
                  ))}
                  {filteredProducts.length === 0 && (
                    <div className="py-12 text-center text-gray-400 text-sm">
                      Nenhum produto encontrado
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
