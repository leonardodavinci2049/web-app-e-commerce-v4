# Prompt para Execução: Página de Listagem de Produtos E-commerce (/products)

- Crie uma página de listagem de produtos para e-commerce MUNDIAL MEGASTORE na rota `/products` usando Next.js 16+, TypeScript, Tailwind CSS v4 e Shadcn UI, reutilizando Header/Footer da homepage existente.
-  A Página será semelhante as que temos nos e-commerce, onde o usuário poderá fazer filtros por categorias
- em anexo temos um print, uma imagem para servir de inspiração
- sempre procure fazer um design limpo e modernos que traga uma boa experiência para o usuário
- seja flexivel e busque sempre o melhor
- Lembre-se o projeto é mobile first e será utilizao em diferentes tipos de tela

## Reutilização da Homepage

- **Header:** Usar EXATO Header da homepage (Top Bar + Main Header + Navigation Menu)
- **Footer:** Usar EXATO Footer da homepage (4 colunas + pagamento + copyright)
- **Cores:** APENAS variáveis CSS do tema ShadCN (bg-primary, text-foreground, etc.)
- **ProductCard:** Usar MESMO componente da homepage

## Estrutura de Dados (Expandir da Home)

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  image: string;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
  brand?: string;
}
```

## Layout Responsivo (MESMO da Home)

- **Desktop:** 4 colunas
- **Tablet:** 3 colunas
- **Mobile:** 2 colunas## Componentes Obrigatórios

1. **ProductsPage** - Página principal
2. **ProductCard** - Card individual do produto
3. **ProductFilters** - Filtros laterais
4. **ProductGrid** - Grid responsivo

## Design Requirements (Integrado com Home)

- **Rota:** `/products` (não raiz)
- **Cores:** APENAS variáveis CSS tema ShadCN (bg-primary, text-foreground)
- **Header:** Reutilizar Header completo da homepage
- **Footer:** Reutilizar Footer completo da homepage
- **Título:** "Nossos Produtos" + contador de produtos
- **Filtros:** Barra horizontal (não sidebar)
- **Cards:** MESMO ProductCard da homepage

## Dados Mock (Reutilizar + Expandir da Home)

**Categorias:** Eletrônicos, Energia Solar, Informática, Hardware, Segurança Eletrônica, Assistência Técnica, Perfumes Importados, etc

**Total:** ~48 produtos (usar dados existentes + expandir)

## Funcionalidades

- **Scroll Infinito:** Botão "Carregar Mais Produtos" (+20 por vez)
- Filtros horizontais funcionais por categoria/subcategoria
- Grid responsivo 4→3→2 colunas (mesmo da home)
- TypeScript 100% tipado
- **NÃO usar paginação tradicional**

## Estrutura de Arquivos

```
src/
├── app/products/page.tsx
├── app/products/_components/
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   └── ProductFilters.tsx
├── data/mockData.ts
└── types/product.ts
```

Crie uma interface moderna, funcional e responsiva seguindo as melhores práticas do Next.js 16.
