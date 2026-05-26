const fs = require('fs');

const file = fs.readFileSync('src/data/products.ts', 'utf8');
const match = file.match(/export const products = \[([\s\S]+?)\];/);
let existingStr = match[1];

let oldProducts = [];
const evaluate = new Function(`return [${existingStr}];`);
try {
  oldProducts = evaluate();
} catch(e) {
  console.log("Error evaluating", e);
}

const newStr = `
{ id:28, ranking:28, categoria:"Moda", nome:"Regata Baby Look Brasil Feminina Y2K Estampa Brasil Amarela Moda Verão Casual Brazilcore", preco:"R$ 47,90", precoOriginal:"", desconto:"", avaliacao:4.8, vendas:"3mil+", comissao:"19%", imagem:"https://down-bs-br.img.susercontent.com/br-11134207-820lq-mnemiw2tuwaq8e.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/19199600174", scoreViral:88 },
{ id:29, ranking:29, categoria:"Casa", nome:"Garrafa 1200ml Térmica Estampa Floral Capinha Silicone Na Base + Tampa Para Canudo", preco:"R$ 53,99", precoOriginal:"", desconto:"", avaliacao:4.7, vendas:"146", comissao:"37%", imagem:"https://down-bs-br.img.susercontent.com/br-11134207-820lf-mldi8yfy2o0407.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/58206143243", scoreViral:85 },
{ id:30, ranking:30, categoria:"Casa", nome:"Bebedouro Automático Pet Fonte para Cães e Gatos Silenciosa Bivolt 1,5L", preco:"R$ 48,99", precoOriginal:"", desconto:"", avaliacao:4.8, vendas:"2mil+", comissao:"21%", imagem:"https://down-bs-br.img.susercontent.com/br-11134207-820l5-mlutq7b3a1a877.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/51557241162", scoreViral:82 },
{ id:31, ranking:31, categoria:"Moda", nome:"Calça Legging Bolha Suplex Cós Alto Empina Bumbum Fitness 3D Textura Flocada Academia", preco:"R$ 24,75", precoOriginal:"", desconto:"", avaliacao:4.7, vendas:"1mil+", comissao:"35%", imagem:"https://down-bs-br.img.susercontent.com/br-11134207-7r98o-m0g5e3lt54kde5.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/18099499392", scoreViral:91 },
{ id:32, ranking:32, categoria:"Casa", nome:"Torneira Aquecedora De Água Quente Elétrica Instantânea 3000W Com Display Digital Para Banheiro", preco:"R$ 107,67", precoOriginal:"", desconto:"", avaliacao:4.8, vendas:"1mil+", comissao:"35%", imagem:"https://down-bs-br.img.susercontent.com/sg-11134201-7rau8-mb52sdbtjje12d.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/27787724235", scoreViral:89 },
{ id:33, ranking:33, categoria:"Moda", nome:"2 Calças Legging com Bolso Lateral Suplex Cós Alto Largo Academia Crossfit Verão Fitness", preco:"R$ 31,67", precoOriginal:"", desconto:"", avaliacao:4.7, vendas:"247", comissao:"20%", imagem:"https://down-bs-br.img.susercontent.com/sg-11134201-8226t-mhhqouwtadj495.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/23499391520", scoreViral:80 },
{ id:34, ranking:34, categoria:"Casa", nome:"Caminha Pet Toca Iglu 2 Em 1 Cama Para Cães e Gatos Com Almofada", preco:"R$ 48,93", precoOriginal:"", desconto:"", avaliacao:4.9, vendas:"10mil+", comissao:"32%", imagem:"https://down-bs-br.img.susercontent.com/br-11134207-7r98o-mds8mgxrn1rtb9.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/23697629645", scoreViral:94 },
{ id:35, ranking:35, categoria:"Casa", nome:"Kit Mesa Posta Glamour 11 Peças – Café da Manhã Completo com Jarra + Queijeira + Manteigueira", preco:"R$ 69,35", precoOriginal:"", desconto:"", avaliacao:4.7, vendas:"87", comissao:"12%", imagem:"https://down-bs-br.img.susercontent.com/br-11134207-81zuh-mkmgscpcvw1sa5.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/58205089161", scoreViral:78 },
{ id:36, ranking:36, categoria:"Casa", nome:"Kit Café Manhã Chaleira Elétrica + Sanduicheira 127v ou 220v - Kian", preco:"R$ 156,99", precoOriginal:"", desconto:"", avaliacao:4.8, vendas:"153", comissao:"40%", imagem:"https://down-bs-br.img.susercontent.com/br-11134207-81z1k-mhv1vovemm8355.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/23893965494", scoreViral:86 },
{ id:37, ranking:37, categoria:"Casa", nome:"Rack de Armazenamento de Banheiro em Alumínio Dourado Preto MEIDOO", preco:"R$ 37,50", precoOriginal:"", desconto:"", avaliacao:4.7, vendas:"2mil+", comissao:"11%", imagem:"https://down-bs-br.img.susercontent.com/cn-11134207-820l4-meurxjnzqfi8c1.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/26991849556", scoreViral:79 },
{ id:38, ranking:38, categoria:"Moda", nome:"Conjunto Feminino Casual Blusa e Saia Inverno Modelador Canelado Gola Alta Elegante", preco:"R$ 139,90", precoOriginal:"", desconto:"", avaliacao:4.8, vendas:"326", comissao:"18%", imagem:"https://down-bs-br.img.susercontent.com/br-11134207-7r98o-mbsv0qjbbnvr8e.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/18899841725", scoreViral:83 },
{ id:39, ranking:39, categoria:"Moda", nome:"Blusa de Frio Feminina Estilo Blogueira Com Trança Tendência 2025 Tricot Manga Bufante", preco:"R$ 49,89", precoOriginal:"", desconto:"", avaliacao:4.8, vendas:"6mil+", comissao:"17%", imagem:"https://down-bs-br.img.susercontent.com/br-11134207-7r98o-m86gomr5mrkh92.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/23498379918", scoreViral:87 },
{ id:40, ranking:40, categoria:"Casa", nome:"Cola Calçados Resistente A Altas Temperaturas Conserto De Sapatos", preco:"R$ 11,99", precoOriginal:"", desconto:"", avaliacao:4.7, vendas:"6mil+", comissao:"5%", imagem:"https://down-bs-br.img.susercontent.com/sg-11134201-8260i-mj72f6fyb2mc24.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/58252841983", scoreViral:75 },
{ id:41, ranking:41, categoria:"Moda", nome:"Moletom Canguru Masculino Banda Stray Kids Blusa de Frio Premium Casaco Inverno Unisex", preco:"R$ 99,99", precoOriginal:"", desconto:"", avaliacao:4.7, vendas:"Novo", comissao:"5%", imagem:"https://down-bs-br.img.susercontent.com/sg-11134201-820ni-mnlkp6gtxjwh94.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/58209766469", scoreViral:72 },
{ id:42, ranking:42, categoria:"Casa", nome:"Guarda Chuva Sombrinha Reforçado 10 Varetas Grande Haste de Metal Colorida com Babado", preco:"R$ 39,99", precoOriginal:"", desconto:"", avaliacao:4.7, vendas:"586", comissao:"17%", imagem:"https://down-bs-br.img.susercontent.com/sg-11134201-7req2-m853saugfmoh91.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/20299678058", scoreViral:81 },
{ id:43, ranking:43, categoria:"Beleza", nome:"Dupla Body Splash Delight Barbour's Beauty 200ml Perfume Feminino", preco:"R$ 79,03", precoOriginal:"", desconto:"", avaliacao:4.8, vendas:"697", comissao:"25%", imagem:"https://down-bs-br.img.susercontent.com/br-11134207-820lx-mnu126yehmv5ca.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/58260056158", scoreViral:84 },
{ id:44, ranking:44, categoria:"Beleza", nome:"Kit Trio Pulseiras Fita Ponto Luz Trançada Banhado Prata 925", preco:"R$ 17,00", precoOriginal:"", desconto:"", avaliacao:4.7, vendas:"760", comissao:"17%", imagem:"https://down-bs-br.img.susercontent.com/br-11134207-820lx-mnu126yehmv5ca.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/58207970054", scoreViral:77 },
{ id:45, ranking:45, categoria:"Moda", nome:"Kit com 12 Pares de Meia Soquete de Algodão Unisex Cano Curto Original", preco:"R$ 11,90", precoOriginal:"", desconto:"", avaliacao:4.7, vendas:"2mil+", comissao:"5%", imagem:"https://down-bs-br.img.susercontent.com/sg-11134201-7rdve-m0xjn9wa6w5jca.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/23693403745", scoreViral:73 },
{ id:46, ranking:46, categoria:"Eletrônicos", nome:"A1 PRO Max Fone de Ouvido Modelo Max Super Bass Bluetooth Over-ear iOS e Android", preco:"R$ 68,97", precoOriginal:"", desconto:"", avaliacao:4.7, vendas:"10mil+", comissao:"5%", imagem:"https://down-bs-br.img.susercontent.com/br-11134207-7r98o-m26tej4yg01y4f.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/22598012670", scoreViral:76 },
{ id:47, ranking:47, categoria:"Casa", nome:"Brinquedos Para Gatos Bola De Rolamento Automática Cauda Falsa Recarregável Elétrico", preco:"R$ 10,35", precoOriginal:"", desconto:"", avaliacao:4.8, vendas:"30mil+", comissao:"10%", imagem:"https://down-bs-br.img.susercontent.com/sg-11134201-7ra29-m4t7308tjip76d.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/21799578236", scoreViral:93 },
{ id:48, ranking:48, categoria:"Casa", nome:"Escova 3 Em 1 Vassoura Rodo Gap Limpeza Esfregão Mop Limpa", preco:"R$ 15,88", precoOriginal:"", desconto:"", avaliacao:4.7, vendas:"40mil+", comissao:"5%", imagem:"https://down-bs-br.img.susercontent.com/sg-11134201-7rdyw-lzcksj98pb0nf8.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/22197745981", scoreViral:90 },
{ id:49, ranking:49, categoria:"Casa", nome:"Secadora de Roupas Portátil 110v e 220v", preco:"R$ 200,00", precoOriginal:"", desconto:"", avaliacao:4.7, vendas:"464", comissao:"15%", imagem:"https://down-bs-br.img.susercontent.com/sg-11134201-7renj-m2k61k3eaxme3d.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/21099558142", scoreViral:81 },
{ id:50, ranking:50, categoria:"Casa", nome:"Coberbrom Edredom Petit Poa Sherpa Queen Manta Flannel Estampa Romântica", preco:"R$ 180,00", precoOriginal:"", desconto:"", avaliacao:4.8, vendas:"1mil+", comissao:"15%", imagem:"https://down-bs-br.img.susercontent.com/br-11134207-820m9-mnocoa8jpq81ab.webp", link:"https://affiliate.shopee.com.br/offer/product_offer/23691619307", scoreViral:83 },
{ id:51, ranking:51, categoria:"Casa", nome:"Jarra Dispenser Dosador Medidor de Massa", preco:"R$ 19,90", precoOriginal:"", desconto:"", avaliacao:4.8, vendas:"Novo", comissao:"10%", imagem:"https://down-bs-br.img.susercontent.com/br-11134207-820l4-meurxjnzqfi8c1.webp", link:"https://affiliate.shopee.com.br", scoreViral: 50 },
`;

// Parse using eval to save characters
const newProducts = (new Function(\`return [\${newStr}];\`))();

const allProducts = [...oldProducts, ...newProducts];
const idsToTop = [26, 21, 10];
const topItems = idsToTop.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
const restItems = allProducts.filter(p => !idsToTop.includes(p.id));
const finalProducts = [...topItems, ...restItems];

const jsStr = \`export const products = \${JSON.stringify(finalProducts, null, 2)};\\n\`;

fs.writeFileSync('src/data/products.ts', jsStr);
console.log('done!');
