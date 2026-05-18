import React, { useState, useEffect } from 'react';
import { Star, BarChart2, Heart, TrendingUp } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onAnalyze: (product: Product) => void;
  onAffiliate: () => void;
  onNotification: (message: string) => void;
}

export default function ProductCard({ product, onAnalyze, onAffiliate, onNotification }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('shopspy_favorites') || '[]');
    setIsFavorite(favorites.includes(product.id));
  }, [product.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('shopspy_favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter((id: number) => id !== product.id);
      onNotification('Removido dos favoritos');
    } else {
      newFavorites = [...favorites, product.id];
      onNotification('❤️ Adicionado aos favoritos');
    }
    
    localStorage.setItem('shopspy_favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
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
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/75 text-white text-[11px] font-bold rounded-[6px] z-10 shadow-sm">
          TOP #{product.ranking}
        </div>

        {/* Badge CATEGORIA */}
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/75 text-white text-[10px] font-semibold rounded-[6px] z-10 shadow-sm">
          {product.categoria}
        </div>

        {/* Favorite Button */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-9 right-2 w-[32px] h-[32px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 z-[2] bg-white/70 dark:bg-black/40 backdrop-blur-sm border border-black/5 dark:border-white/10 hover:bg-white/90 dark:hover:bg-black/60 shadow-sm"
        >
          <Heart 
            size={16} 
            className={`transition-colors duration-200 ${isFavorite ? 'text-[#D0011B] fill-[#D0011B]' : 'text-gray-600 dark:text-white'}`} 
          />
        </button>
        
        {/* Badge Alta Demanda */}
        <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-[#D0011B] text-white text-[10px] font-bold rounded-[20px] flex items-center gap-1 shadow-md">
          <TrendingUp size={10} />
          Alta Demanda
        </div>

        {/* Overlay ao Hover */}
        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="px-6 py-2.5 bg-[#D0011B] text-white rounded-full text-[13px] font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
            Analisar Produto
          </div>
        </div>
      </div>

      {/* Corpo do Card */}
      <div className="p-3">
        {/* Linha 1 - Nome */}
        <h3 className="text-[13px] font-medium text-gray-900 dark:text-white line-clamp-2 leading-[1.4] mb-1.5 h-[36px]">
          {product.nome}
        </h3>

        {/* Linha 2 - Preço e Comissão */}
        <div className="mb-1 flex items-center justify-between">
          <div>
            <div className="text-[18px] font-extrabold text-[#D0011B] dark:text-white">
              {product.preco}
            </div>
            {product.precoOriginal && (
              <div className="text-[10px] text-gray-400 dark:text-white/30 line-through -mt-1">
                {product.precoOriginal}
              </div>
            )}
          </div>
          {product.comissao && (
            <span className="bg-primary text-white text-[9px] px-2 py-0.5 rounded-full font-bold h-fit shrink-0">
              {product.comissao} comissão
            </span>
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
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAnalyze(product);
          }}
          className="w-full flex items-center justify-center gap-1.5 py-2 bg-[#D0011B] hover:brightness-110 text-white rounded-[8px] text-[12px] font-bold transition-all shadow-sm active:scale-95"
        >
          <BarChart2 size={13} />
          Análise
        </button>
      </div>
    </div>
  );
}
