import React, { useState, useEffect } from 'react';
import { Star, BarChart2, Heart, TrendingUp, Flame, ExternalLink, Users } from 'lucide-react';
import { Product } from '../types';
import { userStorage } from '../lib/storage';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onAnalyze: (product: Product) => void;
  onAffiliate: () => void;
  onNotification: (message: string) => void;
}

export default function ProductCard({ product, onAnalyze, onAffiliate, onNotification }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const shortName = product.nome.length > 20 ? `${product.nome.substring(0, 20)}...` : product.nome;

  useEffect(() => {
    const favorites = JSON.parse(userStorage.get('favorites') || '[]');
    setIsFavorite(favorites.includes(product.id));
  }, [product.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites = JSON.parse(userStorage.get('favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter((id: number) => id !== product.id);
      setIsFavorite(false);
      onNotification(`"${shortName}" removido dos favoritos`);
    } else {
      newFavorites = [...favorites, product.id];
      setIsFavorite(true);
      onNotification(`"${shortName}" salvo nos favoritos`);
    }
    
    userStorage.set('favorites', JSON.stringify(newFavorites));
    
    window.dispatchEvent(new Event('shopspy_favorites_updated'));
  };

  return (
    <div 
      onClick={() => onAnalyze(product)}
      className="group relative w-full bg-white dark:bg-[#111111] border border-gray-100 dark:border-white/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.6),0_1px_3px_rgba(0,0,0,0.4)] rounded-[12px] overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
    >
      {/* Imagem Section */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 dark:bg-transparent">
        <img 
          src={product.imagem} 
          alt={product.nome}
          className="w-full h-full object-cover display-block transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Badge TOP #N */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/80 text-white text-[11px] font-bold rounded-[6px] z-10 shadow-sm flex items-center gap-1">
          TOP #{product.ranking}
        </div>

        {/* Badge CATEGORIA */}
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 text-white text-[10px] font-semibold rounded-[6px] z-10 shadow-sm">
          {product.categoria}
        </div>

        {/* Favorite Button */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-9 right-2 w-[32px] h-[32px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 z-[2] bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 shadow-sm"
        >
          <Heart 
            size={16} 
            className={`transition-colors duration-200 ${isFavorite ? 'text-white fill-white' : 'text-white'}`} 
          />
        </button>

        {/* Badge Hot */}
        {[10, 21, 26].includes(product.id) && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1.5 bg-[#D0011B] text-white text-[10px] font-bold rounded-[20px] shadow-md flex items-center gap-1.5 z-10">
            <Flame size={12} fill="currentColor" />
            {product.desconto ? `HOT -${product.desconto}` : 'HOT'}
          </div>
        )}
      </div>

      {/* Corpo do Card */}
      <div className="p-3">
        {/* Linha 1 - Nome */}
        <h3 className="text-[13px] font-medium text-gray-900 dark:text-white line-clamp-2 leading-[1.4] mb-1.5 h-[36px]">
          {product.nome}
        </h3>

        {/* Linha 2 - Preço */}
        <div className="mb-1.5 flex items-end gap-2 text-left">
          <div className="text-[20px] font-extrabold text-[#D0011B] dark:text-white flex items-baseline">
            {product.preco}
          </div>
          {product.precoOriginal && (
            <div className="text-[12px] font-medium text-gray-400 dark:text-white/30 line-through mb-1">
              {product.precoOriginal}
            </div>
          )}
        </div>

        {/* Linha 3 - Stats */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-white/45 mb-2">
          <div className="flex items-center gap-0.5 text-yellow-500">
            <Star size={11} fill="currentColor" />
            <span className="font-bold">{product.avaliacao}</span>
          </div>
          <span>|</span>
          <span>{product.vendas} vendidos</span>
        </div>

        {/* Linha 4 - Score Viral */}
        <div className="mb-2">
          <div className="text-[10px] text-gray-400 dark:text-white/40 uppercase font-bold mb-1">Score Viral</div>
          <div className="w-full h-1 bg-gray-100 dark:bg-white/10 rounded-full">
            <div 
              className="h-full bg-[#D0011B] rounded-full" 
              style={{ width: `${product.scoreViral}%` }}
            ></div>
          </div>
        </div>

        {/* Linha 5 - Botão Análise */}
        {/* Linha 5 - Botões Vender e Afiliar */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAnalyze(product);
            }}
            className="flex-1 bg-[#D0011B]/10 text-[#D0011B] border border-[#D0011B]/20 rounded-[8px] py-2 text-[12px] font-bold hover:bg-[#D0011B]/20 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Users size={14} />
            Vender
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(product.link, '_blank'); 
            }}
            className="flex-1 bg-[#D0011B] text-white rounded-[8px] py-2 text-[12px] font-bold hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 shadow-sm"
          >
            <ExternalLink size={14} />
            Afiliar-se
          </button>
        </div>
      </div>
    </div>
  );
}
