# Implementação: Página de Listagem de Produtos por Categoria

## 📋 Resumo da Tarefa

Implementar uma página funcional na rota `/category/[...slug]` que exiba produtos filtrados por categoria, com navegação lateral em desktop e design responsivo para mobile.

---

## 🎯 Objetivo Principal

Criar uma experiência de navegação por categorias onde o usuário possa:
1. Clicar em uma categoria em qualquer parte da aplicação
2. Ser redirecionado para `/category/{slug-da-categoria}`
3. Visualizar apenas os produtos relacionados àquela categoria
4. Navegar entre categorias usando um menu lateral (desktop) ou alternativa mobile

---

## 📂 Contexto do Projeto

### Estrutura de Rotas
- **Rota alvo**: `src/app/(catalog)/category/[...slug]/page.tsx` (atualmente não implementada)
- **Grupo de rotas**: `(catalog)` - agrupa páginas relacionadas ao catálogo de produtos
- **Padrão de slug**: Catch-all route `[...slug]` para suportar categorias e subcategorias

### Tecnologias Utilizadas
- **Framework**: Next.js 16.0.3 (App Router)
- **React**: 19.2.0
- **Estilização**: Tailwind CSS v4
- **Componentes UI**: Radix UI + Shadcn/ui
- **Ícones**: lucide-react
- **TypeScript**: Tipagem estrita habilitada

### Dados Mockados
**Localização**: `src/data/mock-data.ts`

**Estrutura de Categorias** (`CATEGORIES`):
```typescript
{
  id: string,           // Identificador único
  name: string,         // Nome da categoria (ex: "Eletrônicos")
  icon: LucideIcon,     // Ícone da categoria
  href: string,         // URL da categoria
  subcategories?: [     // Subcategorias (opcional)
    {
      id: string,
      name: string,
      href: string
    }
  ]
}
```

**Estrutura de Produtos** (`PRODUCTS`):
```typescript
{
  id: string,
  name: string,
  description: string,
  price: number,
  image: string,
  categoryId: string,      // Relaciona com CATEGORIES.id
  subcategoryId?: string,  // Relaciona com subcategoria
  inStock: boolean,
  brand: string,
  isNew?: boolean,
  discount?: number,
  specifications?: object,
  shipping?: object
}
```

---

## ✅ Requisitos Funcionais

### 1. Filtragem de Produtos
- [ ] Extrair o slug da URL usando `params.slug`
- [ ] Converter slug para ID de categoria (ex: "eletronicos" → categoryId)
- [ ] Filtrar `PRODUCTS` onde `product.categoryId === categoryId`
- [ ] Se houver subcategoria no slug, filtrar também por `subcategoryId`
- [ ] Exibir mensagem amigável se nenhum produto for encontrado

### 2. Menu Lateral de Categorias (Desktop)
- [ ] Posicionar sidebar à esquerda em telas ≥ 1024px (lg breakpoint)
- [ ] Listar todas as categorias de `CATEGORIES`
- [ ] Destacar visualmente a categoria ativa
- [ ] Exibir subcategorias em formato expansível/colapsável
- [ ] Usar ícones das categorias (`lucide-react`)
- [ ] Links devem apontar para `/category/{slug}`

### 3. Navegação Mobile
- [ ] Ocultar sidebar em telas < 1024px
- [ ] Implementar alternativa mobile (dropdown, drawer ou tabs)
- [ ] Manter funcionalidade de navegação entre categorias

### 4. Listagem de Produtos
- [ ] Reutilizar componentes de card de produto existentes (verificar em `src/app/(home)/_components`)
- [ ] Exibir grid responsivo:
  - Mobile: 1 coluna
  - Tablet: 2 colunas
  - Desktop: 3-4 colunas
- [ ] Mostrar informações essenciais: imagem, nome, preço, desconto, status de estoque
- [ ] Links dos cards devem apontar para `/product/{slug-do-produto}`

### 5. SEO e Performance
- [ ] Gerar `metadata` dinâmico com:
  - `title`: "Categoria {nome} | Nome da Loja"
  - `description`: Descrição relevante da categoria
- [ ] Usar `generateStaticParams` para pré-renderizar categorias principais
- [ ] Implementar tratamento de 404 para slugs inválidos

---

## 🎨 Requisitos de Design

### Layout Desktop
```
┌─────────────────────────────────────────┐
│           Header Global                 │
├──────────┬──────────────────────────────┤
│          │                              │
│ Sidebar  │   Grid de Produtos           │
│ (250px)  │   (3-4 colunas)              │
│          │                              │
│ - Cat 1  │   [Card] [Card] [Card]       │
│ - Cat 2  │   [Card] [Card] [Card]       │
│   • Sub1 │   [Card] [Card] [Card]       │
│   • Sub2 │                              │
│ - Cat 3  │                              │
│          │                              │
└──────────┴──────────────────────────────┘
```

### Layout Mobile
```
┌─────────────────────┐
│   Header Global     │
├─────────────────────┤
│ [Dropdown Categorias]│
├─────────────────────┤
│                     │
│   [Card Produto]    │
│   [Card Produto]    │
│   [Card Produto]    │
│                     │
└─────────────────────┘
```

### Estilo Visual
- Seguir o design system existente do projeto
- Usar classes Tailwind consistentes com outras páginas
- Manter espaçamentos e tipografia padronizados
- Aplicar estados hover/focus em elementos interativos

---

## 🔗 Integração com Aplicação

### Links de Entrada
Atualizar componentes existentes que devem linkar para a página de categorias:

1. **Menu de Navegação Principal** (verificar em `src/app/(home)/_components/header`)
2. **Cards de Categoria** (se existirem na home)
3. **Breadcrumbs** (se aplicável)

**Formato do link**:
```tsx
<Link href={`/category/${slugify(category.name)}`}>
  {category.name}
</Link>
```

### Geração de Slugs
Criar função utilitária para converter nomes em slugs SEO-friendly:

```typescript
// Exemplo: "Eletrônicos" → "eletronicos"
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '')         // Remove caracteres especiais
    .replace(/\s+/g, '-')             // Substitui espaços por hífens
    .trim();
}
```

---

## 🧪 Critérios de Validação

### Testes Funcionais
- [ ] Acessar `/category/eletronicos` exibe apenas produtos de eletrônicos
- [ ] Clicar em categoria no sidebar atualiza a listagem
- [ ] Slugs com acentos são tratados corretamente
- [ ] Categoria inexistente retorna 404 ou página de erro
- [ ] Subcategorias filtram produtos corretamente

### Testes de Responsividade
- [ ] Sidebar visível apenas em desktop (≥1024px)
- [ ] Navegação mobile funcional em telas pequenas
- [ ] Grid de produtos se adapta a diferentes tamanhos de tela
- [ ] Imagens de produtos carregam com aspect ratio correto

### Testes de SEO
- [ ] Metadata dinâmico aparece no `<head>`
- [ ] URLs são amigáveis e descritivas
- [ ] Heading H1 presente na página com nome da categoria

---

## 📝 Notas de Implementação

### Boas Práticas
1. **Componentização**: Extrair sidebar e grid de produtos em componentes separados
2. **TypeScript**: Tipar corretamente props e dados de categorias/produtos
3. **Acessibilidade**: 
   - Usar tags semânticas (`<nav>`, `<main>`, `<article>`)
   - Adicionar `aria-current="page"` na categoria ativa
   - Garantir contraste adequado de cores
4. **Performance**:
   - Usar `next/image` para otimização de imagens
   - Implementar lazy loading se houver muitos produtos

### Referências de Código Existente
- **Página similar**: `src/app/(catalog)/products` (verificar padrões de listagem)
- **Componentes de card**: Buscar em `src/app/(home)/_components`
- **Tipos TypeScript**: `src/types` (verificar se há tipos de Product/Category)

### Pontos de Atenção
⚠️ **Não implementar**: Paginação, ordenação ou filtros adicionais (fora do escopo)  
⚠️ **Não criar**: Novos dados mockados (usar apenas `CATEGORIES` e `PRODUCTS` existentes)  
⚠️ **Manter consistência**: Seguir padrões de nomenclatura e estrutura de pastas do projeto

---


## 🚀 Fluxo de Execução Esperado

1. **Preparação**
   - Revisar estrutura de `CATEGORIES` e `PRODUCTS` em `mock-data.ts`
   - Identificar componentes reutilizáveis no projeto

2. **Desenvolvimento**
   - Implementar página `src/app/(catalog)/category/[...slug]/page.tsx`
   - Criar componente de sidebar de categorias
   - Adaptar componentes de card de produto existentes
   - Implementar lógica de filtragem

3. **Integração**
   - Adicionar links para categorias nos componentes de navegação
   - Testar navegação entre categorias

4. **Validação**
   - Verificar responsividade em diferentes dispositivos
   - Testar todos os critérios de validação listados
   - Confirmar SEO e acessibilidade

---

## ❓ Perguntas para Esclarecer (se necessário)

- Existe algum componente de sidebar já implementado no projeto? (Não existe sidebar com menu de categoria no Projeto)
- Há preferência entre drawer/dropdown/tabs para navegação mobile? (Use Menu Hamburguer que abre um panel lateral com o menu)
- Deve haver breadcrumb na página de categoria? (sim, crie um breadcrumb para a melhor experiencia do usuário)
- Quantos produtos por página (ou exibir todos)? (exibir no máximo 20 produtos com um botão no final para carregar mais)
- Há design mockup ou referência visual específica a seguir? ( sim,  use a página da rota `/products` como referencia)
