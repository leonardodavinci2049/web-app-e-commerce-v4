# 🎯 Task: Desenvolver Homepage Moderna estilo 2025 para o E-commerce B2B da MUNDIAL MEGASTORE

## 📋 CONTEXTO DO PROJETO

**Empresa:** MUNDIAL MEGASTORE site (https://mundialmegastore.com.br)
**Modelo de Negócio:** E-commerce B2B e B2C (Vendas no atacado e Varejo - Eletrônicos, peças para celulares, Informática e Perfumes Importados)  
**Objetivo:** Homepage moderna, responsiva e mobile-first baseada no layout de referência

## Objetivo Principal

- Desenvolver uma Homepage para web app de e-commerce, moderna, limpa, responsiva e mobile-first inspirada no layout de referência anexo.

### 🛠️ Stack Tecnológica Requerida

```typescript
// Estrutura técnica obrigatória
Framework: Next.js 16 + App Router + Turbopack
Authentication: Better-Auth + Prisma Adapter
Database: MariaDB + Prisma ORM
UI/UX: React 19 + Tailwind CSS + Shadcn/UI + Radix UI
Validation: Zod
Notifications: Sonner (toast)
```

## 🎨 ESPECIFICAÇÕES DE DESIGN E LAYOUT

### 📱 Responsividade Obrigatória

- **Desktop:** Grid 4 colunas para produtos
- **Tablet:** Grid 3 colunas para produtos
- **Mobile:** Grid 2 colunas para produtos
- **Abordagem:** Mobile-first design com breakpoints Tailwind

## 🔧 REQUISITOS TÉCNICOS

### 📱 Componentização

- `page.tsx` deve ser um Server Component com Cache Components (Next.js 16 + App Router + Turbopack)
- Cada seção deve ser um componente separado
- Priorizar Server Components sempre que possível
- Use "Use Client" Components apenas quando necessário para interatividade isolando esses componentes separados
- Arquivo inicial da rota deve ser sempre server components
- Isole componentes Client em arquivos separados

### 📊 Dados Fictícios

- Foco inicial somente no layout 
- Usar dados fictícios
- Criar dados mockados para todas as interfaces
- Categorias: Eletrônicos, Energia Solar, Informática, Hardware, Segurança Eletrônica, Assistência Técnica, Perfumes Importados, etc.

### 🖼️ Imagens

- Utilizar imagens da pasta `public/` quando disponível
- Usar Unsplash/Pexels para imagens de produtos
- Placeholder para slides do hero section
- Logos de marcas conhecidas para eletrônicos, hardware de computadores e perfumes importados

### 🖼️ Logo

- public/images/logo/logo-horizontal-footer.png (logo com nome para uso no footer)
- public/images/logo/logo-horizontal-header.png (logo com nome para uso no header)
- public/images/logo/logo-mobile.png (Logo sem Nome para uso no mobile)

### 🎨 Sistema de Cores e Theme

**OBRIGATÓRIO:** Usar exclusivamente as variáveis CSS do tema ShadCN configurado em `src/app/globals.css`
- As cores do design System já estão configuradas no arquivo `src/app/globals.css` e são essas que iremos utilizar para o modo claro e escuro

**Paleta de Cores Oficial do Projeto:**

**⚠️ CRÍTICO - Mapeamento de Cores:**
- `bg-primary`: Azul principal da marca (botões, destaques)
- `bg-secondary`: Azul escuro ou tom complementar
- `bg-accent`: Cor de destaque para promoções (ex: laranja ou amarelo)
- `bg-card`: Fundo branco ou cinza muito claro para cards
- `bg-background`: Fundo geral da página

## 🏗️ ESTRUTURA DA HOMEPAGE (Ordem Exata da Referência)

### 1️⃣ **Header Superior (Top Bar)**

```markdown
Layout horizontal minimalista:
├── Container centralizado
├── Link: "Atendimento ao Cliente" (lado esquerdo)
├── Informações: "Televendas: (11) 9999-9999" (centro)
├── Mode Toggle: Dark/Light theme (lado direito)
└── Cores: bg-muted text-muted-foreground, texto pequeno (text-xs ou text-sm)
```

### 2️⃣ **Header Principal (Main Header)**

```markdown
Layout em linha com fundo card (sticky opcional):
├── Logo: "MUNDIAL MEGASTORE" (text-primary, bold, lado esquerdo)
├── Search Bar: Input com placeholder "O que você procura?" (centro, expandido, com botão de busca)
├── Ícones da direita (flex gap-4):
│ ├── "Fale Conosco" (ícone chat/whatsapp)
│ ├── "Entre / Cadastre-se" (ícone usuário + texto)
│ └── "Carrinho" (ícone carrinho + badge quantidade)
└── Cores: bg-card border-b border-border shadow-sm
```

### 3️⃣ **Barra de Menu Horizontal (Navigation Menu)**

```markdown
Barra de navegação completa:
├── Fundo: bg-primary text-primary-foreground
├── Container centralizado
├── Item Esquerdo: Botão "Todas as Categorias" (com ícone de menu/hambúrguer) - Dropdown
├── Lista de Links (Centro/Direita):
│ ├── Home
│ ├── Lançamentos
│ ├── Ofertas do Dia
│ ├── Celulares & Smartphones
│ ├── Hardware
│ └── Perfumes
└── Estilo: Links com hover:bg-primary/80 ou sublinhado, texto font-medium
```

### 4️⃣ **Hero Banner Principal**

```markdown
Banner full-width com call-to-action (Carousel):
├── Fundo: bg-gradient-to-r from-primary to-accent ou bg-muted
├── Slide 1:
│ ├── Título: "Compre online e retire na loja!"
│ ├── Subtítulo: "Mais comodidade para o seu dia a dia"
│ ├── CTA: bg-accent text-accent-foreground "Conheça a promoção"
│ └── Imagem: Produtos em destaque (lado direito)
├── Slide 2: "Ofertas de Hardware"
├── Navegação: Setas laterais e dots de paginação na parte inferior
└── Cores: text-primary-foreground ou text-foreground sobre bg apropriado
```

### 5️⃣ **Navegação por Departamentos**

```markdown
Carrossel ou Grid de ícones de categorias:
├── Título da Seção: "Compre por Departamento" (centralizado)
├── Layout: Flex row com scroll horizontal no mobile, Grid no desktop
├── Itens (Cards circulares ou quadrados com ícone):
│ ├── Ícone (SVG/Lucide) centralizado
│ └── Nome da Categoria abaixo (text-sm font-medium)
├── Categorias sugeridas:
│ ├── Smartphones
│ ├── Hardware
│ ├── Periféricos
│ ├── Games
│ ├── Casa Inteligente
│ └── Áudio
└── Estilo: Hover scale effect, bg-card border-border
```

### 6️⃣ **Seção: Produtos Novos e Lançamentos**

```markdown
Grid de produtos recentes:
├── Título: "Lançamentos" ou "Novidades"
├── Layout: Grid responsivo (2 cols mobile, 3 tablet, 4 desktop)
├── Componente: ProductCard (ver detalhes abaixo)
├── Quantidade: 4 a 8 produtos
└── Botão "Ver todos" opcional no topo ou base
```

### 7️⃣ **Banner Novidades (Seção Primary)**

```markdown
Banner promocional intermediário:
├── Layout: Full width ou Container width
├── Conteúdo:
│ ├── Texto de destaque: "Oferta Relâmpago - Até 50% OFF"
│ ├── Countdown timer (opcional, visual apenas)
│ └── Botão CTA: "Aproveitar Agora"
├── Background: Imagem de fundo ou cor sólida (bg-secondary)
└── Altura: Média (h-48 a h-64)
```

### 8️⃣ **Seção: Produtos em Destaque**

```markdown
Grid de produtos mais vendidos:
├── Título: "Destaques da Semana"
├── Layout: Grid responsivo (mesma estrutura de Lançamentos)
├── Componente: ProductCard
├── Diferencial: Badge "Mais Vendido" ou "Hot" nos cards
└── Quantidade: 8 produtos
```

### 9️⃣ **Seção: Categoria Específica (Ex: Gamer)**

```markdown
Destaque para uma vertical específica:
├── Título: "Mundo Gamer"
├── Layout:
│ ├── Opção A: Banner lateral esquerdo (destaque) + Grid 2x2 à direita
│ └── Opção B: Grid simples de 4 produtos
├── Produtos focados: Teclados mecânicos, Mouses, Headsets, Cadeiras
└── Estilo: Pode ter um background sutilmente diferente ou borda colorida (border-primary)
```

### 🔟 **Grid de Banners Promocionais**

```markdown
Grid de banners menores para ofertas específicas:
├── Layout: Grid de 2 colunas (Mobile 1 col) ou 3 colunas
├── Banner 1: "Smartphones com 10% OFF no PIX"
├── Banner 2: "Monte seu PC Gamer"
├── Banner 3: "Perfumes Importados Originais"
└── Estilo: Imagens com texto sobreposto, hover zoom effect
```

### 1️⃣1️⃣ **Seção: Depoimentos dos Clientes**

```markdown
Cards informativos sobre segmentos:
├── Título: "Departamentos dos Clientes"
├── Grid de 3 cards:
│ ├── "Pessoa Física" - Ferramentas para uso doméstico
│ ├── "Pequenas Empresas" - Equipamentos profissionais  
│ └── "Grandes Empresas" - Soluções industriais
├── Cores: bg-muted text-foreground
├── Cada card com ícone, descrição e CTA (bg-primary)
└── Background diferenciado (bg-muted)
```

### 1️⃣2️⃣ **Seção: Vantagens e Diferenciais**

```markdown
Grid horizontal com benefícios:
├── Título: "Por que escolher a MUNDIAL MEGASTORE?"
├── Cores: bg-card border-border
├── Cards com ícones (Layout horizontal ou vertical):
│ ├── "Entrega Rápida" - Ícone caminhão
│ ├── "Melhor Preço" - Ícone etiqueta  
│ ├── "Atendimento Especializado" - Ícone headset
│ └── "Produtos de Qualidade" - Ícone estrela
├── Layout: 4 colunas desktop / 2 colunas mobile
└── Ícones com text-primary, tamanho destaque
```

### 1️⃣3️⃣ **Seção: Sobre a Empresa + Certificações**

```markdown
Layout duas colunas:
├── Coluna esquerda:
│ ├── Título: "15 anos de tradição" (text-foreground)
│ ├── Texto sobre a empresa MUNDIAL MEGASTORE (text-muted-foreground)
│ └── Lista de diferenciais (checkmarks)
├── Coluna direita:
│ ├── Imagem representativa (Loja ou Equipe)
│ ├── Certificações/selos (Logos grayscale ou coloridos)
│ └── Badge "Empresa confiável" (bg-accent)
├── Cores: bg-card border-border
└── CTA: "Conheça nossa história" (text-primary)
```

### 1️⃣4️⃣ **Mapa e Localização**

```markdown
Seção com mapa integrado:
├── Título: "Visite Nossa Loja Física" (text-foreground)
├── Layout: Grid 2 colunas (Info + Mapa)
├── Coluna Info:
│ ├── Endereço completo (text-muted-foreground)
│ ├── Telefone e WhatsApp (text-primary)
│ ├── Horário de funcionamento
│ ├── E-mail
│ └── Botão: "Como Chegar" (bg-primary text-primary-foreground)
├── Coluna Mapa:
│ └── Iframe Google Maps (simulado/placeholder)
└── Cores: bg-card border-border
```

### 1️⃣5️⃣ **Newsletter + CTA Final**

```markdown
Banner de newsletter:
├── Fundo: bg-primary text-primary-foreground
├── Container centralizado
├── Título: "Fique por dentro das novidades!"
├── Subtítulo: "Cadastre-se e receba ofertas exclusivas"
├── Form:
│ ├── Input: border-border (bg-background text-foreground)
│ └── Botão: bg-accent text-accent-foreground "CADASTRAR"
├── Validação: Zod + feedback Sonner
└── Layout: Flex row (desktop) ou Column (mobile)
```

## 🦶 FOOTER COMPLETO

### **Footer Principal (4 Colunas)**

```markdown
Cores: bg-muted text-foreground border-t border-border padding-y-lg

Coluna 1: Institucional
├── Logo MUNDIAL MEGASTORE (text-primary)
├── Descrição: "Sua parceira em ferramentas e equipamentos"
└── Redes sociais (ícones text-muted-foreground hover:text-primary)

Coluna 2: Links Rápidos  
├── Links com text-muted-foreground hover:text-primary
├── Quem Somos
├── Nossas Lojas
├── Trabalhe Conosco
├── Política de Privacidade
└── Termos de Uso

Coluna 3: Minha Conta
├── Login / Cadastro
├── Meus Pedidos  
├── Lista de Desejos
├── Rastreamento
└── Central de Ajuda

Coluna 4: Contato
├── (11) 9999-9999 (text-primary)
├── vendas@MUNDIALMEGASTORE.com.br
├── Rua das Ferramentas, 123
├── Seg a Sex: 8h às 18h
└── Sáb: 8h às 12h
```

### **Footer Formas de Pagamento**

```markdown
Barra inferior ao footer principal:
├── Layout: Flex justify-between ou Grid
├── PIX: "Pagamento à vista com 5% desconto" (text-accent)
├── Cartões: Visa, Master, Elo, Amex "Parcele até 12x"  
├── Entrega: "Frete grátis acima de R$299"
└── Segurança: "Site 100% seguro - SSL"
```

### **Copyright**

```markdown
Cores: bg-muted text-muted-foreground border-t border-border text-center py-4
"© 2025 MUNDIAL MEGASTORE - Todos os direitos reservados | CNPJ: XX.XXX.XXX/0001-XX"
```

## 🎯 INSTRUÇÕES ESPECÍFICAS PARA IMPLEMENTAÇÃO

### ✅ **OBRIGATÓRIO FAZER:**

- **Nome:** Usar exclusivamente "MUNDIAL MEGASTORE"
- **Cores:** APENAS variáveis CSS do tema ShadCN (`bg-primary`, `text-foreground`, etc.)
- **Tema:** Suporte completo a dark/light mode
- **Layout:** Implementar ordem sequencial EXATA dos módulos
- **Grid:** 4 colunas desktop / 2 colunas mobile
- **Componentes:** Shadcn/UI + Tailwind CSS v4
- **Performance:** Server Components prioritários
- **SEO:** Estrutura semântica HTML5 adequada

### ❌ **PROIBIDO FAZER:**

- Não usar cores hardcoded (ex: `bg-blue-500`), usar sempre variáveis semânticas ou do tema (`bg-primary`).
- Não criar componentes gigantes em um único arquivo.
- Não esquecer de configurar a responsividade para mobile.

### 🔍 **DETALHES DE IMPLEMENTAÇÃO:**

**ProductCard Component:**

```typescript
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  isNew?: boolean;
  discount?: number;
  category: string;
}

// Exemplo de classes CSS para ProductCard:
// Container: "group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all"
// Imagem: "aspect-square object-cover group-hover:scale-105 transition-transform"
// Preço: "text-primary font-bold text-lg"
// Título: "text-foreground font-medium line-clamp-2"
// Badge Novo: "absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 text-xs rounded"
// Botão: "w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
```

**Navigation Menu Component:**

```typescript
interface NavigationMenuProps {
  items: Array<{
    id: string;
    label: string;
    hasDropdown?: boolean;
    dropdownItems?: CategoryItem[];
  }>;
}

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  href: string;
}
```

**Dados Mock Sugeridos:**

- 24+ produtos fictícios de ferramentas/equipamentos
- 8 categorias de departamentos (sincronizadas entre menu e seção)
- 6 itens da barra de menu horizontal
- 4+ banners promocionais
- 3 tipos de clientes (PF, pequenas, grandes empresas)
- Informações da empresa MUNDIAL MEGASTORE

**Responsividade Breakpoints:**

- Mobile: < 640px (2 colunas, menu hambúrguer)
- Tablet: 640px - 1024px (3 colunas)
- Desktop: > 1024px (4 colunas, menu completo)
- Container max-width: 1200px (mx-auto px-4)
