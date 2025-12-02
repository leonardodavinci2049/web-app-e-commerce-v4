# Plano de Refatoração: Página de Produtos para Server Components

## Objetivo
Refatorar `src/app/(catalog)/products/page.tsx` para ser um Server Component, movendo a lógica interativa (filtros, carregar mais) para Client Components isolados. Isso melhora a performance e segue as boas práticas do Next.js 16.

## Estado Atual
- `page.tsx` é um Client Component (`use client`).
- Gerencia estado local para `selectedCategory`, `selectedSubcategory`, `displayCount`.
- Filtra produtos no lado do cliente usando `useMemo`.
- Simula "Carregar Mais" fatiando um array local.

## Arquitetura Proposta

### 1. Server Actions / Utilities (`src/app/actions/get-products.ts`)
Criar funções utilitárias (ou Server Actions) para buscar e filtrar dados.
- `getProducts({ page, category, subcategory })`: Retorna produtos filtrados e paginados.
- `getCategories()`: Retorna categorias únicas.
- `getSubcategories(categoryName)`: Retorna subcategorias para uma categoria.

### 2. Página Principal (`src/app/(catalog)/products/page.tsx`)
- **Tipo**: Server Component.
- **Responsabilidades**:
    - Ler `searchParams` (category, subcategory).
    - Buscar dados iniciais usando as funções utilitárias.
    - Renderizar o layout da página.
    - Passar dados iniciais para os Client Components.

### 3. Filtros de Produto (`src/app/(catalog)/products/_components/ProductFilters.tsx`)
- **Tipo**: Client Component.
- **Mudanças**:
    - Remover props de callback `onCategoryChange` / `onSubcategoryChange`.
    - Usar `useSearchParams` para ler os filtros ativos.
    - Usar `useRouter` ou `Link` para atualizar os parâmetros da URL ao clicar em um filtro.
    - A URL passa a ser a fonte da verdade para o estado dos filtros.

### 4. Listagem de Produtos (`src/app/(catalog)/products/_components/ProductListing.tsx`)
- **Tipo**: Novo Client Component.
- **Props**: `initialProducts`, `initialHasMore`.
- **Responsabilidades**:
    - Manter o estado da *lista* de produtos exibidos.
    - Inicializar o estado com `initialProducts`.
    - Gerenciar o clique em "Carregar Mais":
        - Chamar uma Server Action para buscar a próxima página de produtos.
        - Adicionar os novos produtos à lista existente.
    - Renderizar `<ProductGrid />` e `<LoadMoreButton />`.

## Plano de Implementação Passo-a-Passo

1.  **Criar Utilitários de Servidor**:
    - Extrair a lógica de filtragem e paginação do `page.tsx` para um arquivo separado (ex: `src/lib/product-service.ts` ou `src/app/actions/product-actions.ts`).
    - Garantir que funcione com os dados mockados `CATEGORIES` e `PRODUCTS`.

2.  **Criar Componente `ProductListing`**:
    - Criar `src/app/(catalog)/products/_components/ProductListing.tsx`.
    - Mover o uso de `ProductGrid` e `LoadMoreButton` para cá.
    - Implementar a lógica de `handleLoadMore` usando Server Action.

3.  **Refatorar `ProductFilters`**:
    - Modificar `src/app/(catalog)/products/_components/ProductFilters.tsx`.
    - Substituir props por manipulação de parâmetros de URL.

4.  **Refatorar `page.tsx`**:
    - Remover `use client`.
    - Remover `useState` e `useMemo`.
    - Implementar leitura de `searchParams`.
    - Buscar dados no lado do servidor.
    - Renderizar a nova estrutura.

## Verificação
- **Filtros**: Clicar em categorias/subcategorias e verificar se a URL atualiza e a lista de produtos é filtrada.
- **Carregar Mais**: Clicar em "Carregar Mais" e verificar se novos produtos são adicionados sem recarregar a página inteira.
- **Deep Linking**: Recarregar a página com filtros ativos (ex: `?category=Eletrônicos`) e verificar se o estado correto é restaurado.
