export interface Product {
  id: number;
  ranking: number;
  nome: string;
  preco: string;
  precoOriginal: string;
  desconto: string;
  avaliacao: number;
  vendas: string;
  imagem: string;
  link: string;
  categoria: string;
  scoreViral: number;
  badge?: string;
  comissao?: string;
}

export type Category = "Todos" | "Moda" | "Casa" | "Eletrônicos" | "Beleza" | "Ferramentas";
export type SortOption = "Mais Vendidos" | "Maior Desconto" | "Melhor Avaliação" | "Menor Preço";
