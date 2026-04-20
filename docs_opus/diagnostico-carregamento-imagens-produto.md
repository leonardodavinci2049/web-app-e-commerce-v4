# Diagnóstico: Lentidão e Falhas no Carregamento de Imagens — Página de Detalhe de Produto

**Data:** 2026-04-17  
**Rota investigada:** `/product/[...slug]`  
**URL de teste:** `http://localhost:5557/product/perfume-al-wataniah-sabah-al-ward-feminino-edp-100ml-arabe-54580`  
**Rota de comparação:** `/category/perfumaria-e-beleza`

---

## 1. Resumo Executivo

A página de detalhe de produto sofre de **falhas intermitentes e carregamento lento de imagens** causados por uma combinação de fatores arquiteturais e de configuração que se amplificam mutuamente. O principal agressor é a **velocidade de download da imagem `medium` do servidor de assets** (~8 segundos para 219KB), que ultrapassa o timeout interno do otimizador de imagens do Next.js (~7s), resultando em respostas `500` no endpoint `/_next/image`. Além disso, o uso de `unoptimized={true}` na imagem principal impede que o cache do Next.js atue, forçando o browser a buscar a imagem diretamente no servidor externo a cada carregamento.

---

## 2. Contexto: Duas Rotas, Dois Comportamentos

| Aspecto | `/category/[slug]` (rápido) | `/product/[slug]` (lento/falha) |
|---|---|---|
| Origem das imagens | API principal (campo `product.image`) | API principal + **Assets API separada** |
| URLs das imagens | Sufixo `-main-medium.jpg` via `getImageVariantUrl()` | Galeria: URLs `preview`, `thumbnail`, `medium` da Assets API |
| Passa pelo `/_next/image`? | **Sim** (otimização ativa) | Main image: **Não** (`unoptimized={true}`) / Thumbnails: **Sim** |
| Cache do Next.js (`minimumCacheTTL`) | **Sim** — cache de 24h ativo | Main image: **Não** / Thumbnails: Sim (quando não falha) |
| Número de APIs consultadas | 1 (main API) | 2 (main API + assets API) |
| Imagens carregadas em paralelo | Lazy por padrão | **5 thumbnails com `loading="eager"`** simultaneamente |

---

## 3. Medições Realizadas

### 3.1 Velocidade do servidor de assets (`assents01.comsuporte.com.br`)

Testes feitos diretamente do servidor Next.js para o servidor de assets:

| Tipo de imagem | Tamanho | TTFB | Tempo total |
|---|---|---|---|
| `-main-thumbnail.jpg` | 68.9 KB | ~685ms | **~1.4s** |
| `-main-preview.jpg` | 231 KB | ~686ms | **~2.2s** |
| `-main-medium.jpg` | 219.5 KB | ~988ms | **~8.0s** ⚠️ |

> **Achado crítico:** A imagem `-medium.jpg` (219KB) leva ~8 segundos para baixar completamente do servidor de assets, provavelmente por throttling de banda ou limitação do servidor de assets.

### 3.2 Timeout do otimizador de imagens do Next.js

O Next.js 16 impõe um timeout de **~7 segundos** ao buscar imagens remotas para otimização. Como a imagem `-medium.jpg` leva ~8s para baixar:

```
GET /_next/image?url=...main-medium.jpg&w=640&q=75 → 500 in 7.1s
```

O otimizador cancela a requisição antes de receber a imagem completa, retornando HTTP 500. Essa é a origem direta dos erros nos logs do terminal.

### 3.3 Teste de 5 requisições concorrentes (thumbnails)

Com 5 thumbnails sendo carregados simultaneamente (`loading="eager"`):

| Requisição | Tempo total | Bytes |
|---|---|---|
| 1 | 2646ms | 68.9KB |
| 2 | 1842ms | 68.9KB |
| 3 | 1169ms | 68.9KB |
| 4 | 2767ms | 68.9KB |
| 5 | 1880ms | 68.9KB |

> Os thumbnails em si são rápidos (~1-3s) e não causam os 500s. O problema é que o `/_next/image` busca a URL que o componente passa, e as URLs de preview/medium têm 231-219KB que excedem o tempo limite.

### 3.4 Tempo de resposta das páginas (HTML)

| Página | TTFB | Tempo total |
|---|---|---|
| `/product/[slug]` | ~1.665s | ~1.676s |
| `/category/perfumaria-e-beleza` | ~2.033s | ~2.173s |

> As páginas em si (HTML) carregam em tempo similar. O gargalo é exclusivamente no carregamento das imagens após o HTML ser entregue ao browser.

---

## 4. Análise Detalhada dos Fatores

### 4.1 [CRÍTICO] Uso de `unoptimized={true}` na imagem principal da galeria

**Arquivo:** `src/app/(catalog)/product/_components/imagegallery/componets/ImageGalleryClient.tsx` (linha 77)

```tsx
<Image
  src={getMainImageUrl(images[selectedImage])}  // URL preview (~231KB)
  alt={productName}
  fill
  sizes="(min-width: 768px) 50vw, 100vw"
  className="object-contain p-4 md:p-8"
  priority
  unoptimized  // ← PROBLEMA: bypass completo do otimizador
/>
```

**Impacto:**
- O browser faz requisição **direta** para `assents01.comsuporte.com.br` — sem passar pelo `/_next/image`
- **Nenhum cache** do Next.js (`minimumCacheTTL: 86400`) é aplicado à imagem principal
- O browser precisa baixar os **231KB completos** do servidor externo a cada acesso (cold load)
- A imagem `-main-preview.jpg` de 231KB leva ~2.2s para baixar — aceitável, mas ainda sem cache
- Se o browser tiver conexão mais lenta ou o servidor de assets estiver sob carga, esse tempo aumenta, causando o carregamento parcial observado na screenshot

**Comparação com categoria:** Na rota `/category`, a imagem no `ProductCard` usa Next.js Image **sem** `unoptimized`, passando pelo optimizer e sendo cacheada por 24h no servidor.

### 4.2 [CRÍTICO] Imagem `-medium.jpg` ultrapassa o timeout do Next.js image optimizer

**Arquivo:** `src/app/(catalog)/product/_components/imagegallery/componets/ImageGalleryClient.tsx` (linha 26)

```tsx
const getThumbnailUrl = (img: GalleryImageData) => {
  return (
    img.urls.thumbnail ||
    img.urls.medium ||   // ← fallback para medium (219KB, ~8s de download!)
    img.urls.preview ||
    img.urls.original
  );
};
```

**Fluxo do problema:**
1. O componente tenta usar `thumbnail` URL para as miniaturas
2. Se `thumbnail` não estiver disponível, cai no `medium` (219KB)
3. O Next.js image optimizer tenta buscar essa imagem para servir otimizada
4. Como o download leva ~8s e o timeout do Next.js é ~7s → **HTTP 500**
5. A miniatura não aparece no browser (broken image)

**Log exato do erro:**
```
Error [TimeoutError]: The operation was aborted due to timeout
GET /_next/image?url=...main-medium.jpg&w=640&q=75 500 in 7.1s
(next.js: 7.1s, application-code: 17ms)
```

O `application-code: 17ms` confirma que o problema **não é código da aplicação** — é puramente a latência de download do servidor de assets.

### 4.3 [ALTO] `loading="eager"` em todos os 5 thumbnails simultaneamente

**Arquivo:** `src/app/(catalog)/product/_components/imagegallery/componets/ImageGalleryClient.tsx` (linha 61)

```tsx
<Image
  src={getThumbnailUrl(image)}
  alt={...}
  fill
  sizes="80px"
  className="object-contain p-1"
  loading="eager"  // ← aplicado a TODOS os 5 thumbnails
/>
```

**Impacto:**
- Ao renderizar a galeria, **5 requisições ao `/_next/image` são disparadas simultaneamente**
- Cada uma tenta buscar a imagem thumbnail/medium do servidor de assets
- Se alguma cai no fallback `medium`, temos até 5 timeouts concorrentes
- Isso também compete com a imagem principal por banda de rede

**Comparação com categoria:** No `ProductCard`, o carregamento usa `loading={priority ? "eager" : "lazy"}` — apenas o primeiro card usa eager; os demais são lazy. Isso distribui as requisições no tempo.

### 4.4 [ALTO] Assets API sem timeout configurado

**Arquivo:** `src/services/api-assets/assets-api-service.ts`

```ts
// Nenhum timeout configurado em nenhum dos métodos
const response = await fetch(`${this.baseUrl}/file/v1/entity-gallery`, {
  method: "POST",
  headers: this.getHeaders(),
  body: JSON.stringify(request),
  // timeout: ??? — AUSENTE
});
```

**Impacto:**
- A busca da galeria no servidor (dentro de `ProductGalleryWrapper`) pode aguardar indefinidamente pelo servidor de assets
- Se o servidor de assets estiver lento, o `<Suspense>` que envolve a galeria mantém o skeleton por tempo indeterminado
- O `API_TIMEOUTS` definido em `api-constants.ts` é usado apenas pelo Axios (API principal). A Assets API usa `fetch` nativo **sem timeout**.

### 4.5 [MÉDIO] Arquitetura com duas APIs externas na rota de produto

A rota `/product/[slug]` faz chamadas para **dois servidores externos distintos**:

```
Browser → Next.js Server
             ├── Main API (port 5572) → produto + produtos relacionados
             └── Assets API (assents01.comsuporte.com.br) → galeria de imagens
```

Enquanto a rota `/category` só consulta:

```
Browser → Next.js Server
             └── Main API (port 5572) → lista de produtos (com imagens já inclusas)
```

O segundo hop para a Assets API adiciona latência variável e é o ponto fraco da arquitetura da página de produto.

### 4.6 [MÉDIO] `ProgressiveGallery` — falso progressivo

**Arquivo:** `src/app/(catalog)/product/_components/imagegallery/ProgressiveGallery.tsx`

O componente cria 5 thumbnails temporários com a imagem fallback enquanto aguarda os dados reais. No entanto, como `ProductGalleryWrapper` (componente servidor) já **aguarda** a resposta da Assets API antes de renderizar, os `galleryImages` já chegam prontos ao `ProgressiveGallery`. 

O carregamento progressivo real (mostrar placeholder → atualizar para galeria real) depende do streaming do React, mas a galeria só chega ao cliente **depois** que o `await fetchProductGalleryAction()` resolve no servidor — que pode levar vários segundos se o servidor de assets estiver lento.

Na prática, o usuário vê:
1. `<ProductDetailSkeleton>` por alguns segundos (Suspense externo)
2. Página carrega com dados reais mas imagens ainda sendo baixadas

### 4.7 [BAIXO] Cache da galeria com profile `hours` (agora 10min)

**Arquivo:** `src/services/api-assets/gallery-cached-service.ts`

```ts
cacheLife("hours");  // next.config.ts: stale=600s (10min), não 1h
```

O perfil `hours` foi reconfigurado em `next.config.ts` para expirar em 10 minutos (não 1 hora como o nome sugere). Para produtos de catálogo estável, a galeria poderia ser cacheada por mais tempo, reduzindo chamadas à Assets API.

---

## 5. Diagrama do Fluxo de Carregamento (Problema)

```
Usuário acessa /product/[slug]
         │
         ▼
Next.js Server: Suspense(ProductDetailContainer)
         │
         ├── fetchProductWithRelatedAction → Main API → ~1s OK
         │
         └── Suspense(ProductGalleryWrapper)
                   │
                   └── fetchProductGalleryAction → Assets API → ???s (sem timeout)
                             │
                             ▼ (quando resolve)
                       ProgressiveGallery (client)
                             │
                             ├── Main image: unoptimized=true
                             │   → Browser → assents01.comsuporte.com.br
                             │   → 231KB preview → ~2.2s (sem cache Next.js)
                             │
                             └── 5x Thumbnails: loading=eager
                                 → /_next/image → assents01.comsuporte.com.br
                                 → se thumbnail: ~1.4s OK ✓
                                 → se fallback medium: 219KB → ~8s → TIMEOUT → 500 ✗
```

---

## 6. Comparação: Categoria vs. Produto

```
/category: ProductCard
  └── Image src={getImageVariantUrl(product.image, "medium")}
        → URL: ...-main-medium.jpg (vem da Main API, campo image)
        → next/image: SIM (otimizado, cacheado 24h)
        → loading: lazy (exceto primeiro card)
        → Resultado: cache efetivo após primeira carga

/product: ImageGalleryClient - imagem principal
  └── Image src={img.urls.preview}
        → URL: ...-main-preview.jpg (vem da Assets API)
        → next/image: NÃO (unoptimized=true)
        → loading: eager (priority=true)
        → Resultado: sempre busca no servidor externo, sem cache

/product: ImageGalleryClient - thumbnails
  └── Image src={img.urls.thumbnail || img.urls.medium}
        → URL: -thumbnail.jpg (68KB) ou -medium.jpg (219KB)
        → next/image: SIM (otimizado)
        → loading: eager (todos os 5)
        → Resultado: thumbnail funciona; se cair em medium → timeout 500
```

---

## 7. Hipótese sobre o Agravamento Recente

O usuário mencionou que os problemas se intensificaram após atualização do Next.js. Possíveis razões:

1. **Next.js 16 pode ter alterado o timeout padrão do image optimizer** — versões anteriores podem ter sido mais tolerantes com latências altas de servidores remotos.

2. **A flag `cacheComponents: true`** adicionada no `next.config.ts` pode afetar o comportamento do Suspense/streaming em versões diferentes.

3. **Mudança no comportamento do `"use cache"`** — o Next.js 16 introduziu formalizações no comportamento do `use cache`, que pode ter alterado quando e como o cache da galeria é invalidado.

> **Nota:** O problema da Assets API lenta com imagens `-medium.jpg` de 219KB provavelmente existia antes, mas ficou mais visível com ajustes de timeout do novo Next.js.

---

## 8. Evidências dos Logs do Terminal

```
Error [TimeoutError]: The operation was aborted due to timeout
  code: 23 (TIMEOUT_ERR)

GET /_next/image?url=...main-medium.jpg&w=640&q=75 500 in 7.1s
  (next.js: 7.1s, application-code: 17ms)
```

- **`next.js: 7.1s`** → tempo que o framework aguardou antes de abortar
- **`application-code: 17ms`** → a lógica da aplicação em si é instantânea; o atraso é **100% de I/O com o servidor externo**
- **`TimeoutError code: 23`** → `TIMEOUT_ERR` do DOMException — timeout da requisição fetch interna do Next.js

---

## 9. Resumo das Causas Identificadas

| # | Causa | Severidade | Localização |
|---|---|---|---|
| 1 | Imagem `-medium.jpg` (219KB) excede timeout do Next.js (~7s) | **CRÍTICA** | `assets-api-service.ts` + velocidade do servidor |
| 2 | `unoptimized={true}` na imagem principal — sem cache Next.js | **CRÍTICA** | `ImageGalleryClient.tsx:77` |
| 3 | `loading="eager"` em todos os 5 thumbnails simultaneamente | **ALTA** | `ImageGalleryClient.tsx:61` |
| 4 | Assets API sem timeout configurado | **ALTA** | `assets-api-service.ts` |
| 5 | Arquitetura de dois saltos para APIs externas | **MÉDIA** | `ProductGalleryWrapper.tsx` |
| 6 | `ProgressiveGallery` aguarda servidor antes de mostrar galeria real | **MÉDIA** | `ProgressiveGallery.tsx` |
| 7 | Cache da galeria com TTL curto (10min) | **BAIXA** | `gallery-cached-service.ts` |

---

## 10. Recomendações de Correção (Escopo Futuro)

> ⚠️ *Este documento é de diagnóstico. As correções abaixo são sugestões para análise posterior.*

### Prioridade 1 — Remover `unoptimized` da imagem principal
Usar o otimizador do Next.js na imagem principal permite cache de 24h no servidor, eliminando downloads repetidos para o mesmo produto.

### Prioridade 2 — Usar `thumbnail` como imagem principal (não preview)
O thumbnail (68KB, ~1.4s) é suficiente para galeria de produto em mobile/tablet. Usar `thumbnail` em vez de `preview` na imagem selecionada reduz drasticamente o tempo de download.

### Prioridade 3 — Adicionar timeout à Assets API
Configurar `AbortSignal.timeout(10000)` no fetch da gallery-cached-service para garantir que o servidor não espere indefinidamente.

### Prioridade 4 — Carregar thumbnails com lazy + priority apenas no primeiro
Alterar `loading="eager"` para `loading={index === 0 ? "eager" : "lazy"}`, distribuindo as requisições no tempo.

### Prioridade 5 — Investigar gargalo do servidor de assets para imagens `-medium.jpg`
A discrepância entre `-preview.jpg` (231KB em ~2.2s) e `-medium.jpg` (219KB em ~8s) sendo ambas de tamanho similar mas com tempos tão diferentes sugere possível throttling seletivo ou problema de roteamento no servidor de assets para esse tipo específico.

---

*Relatório gerado por análise estática de código, medições de rede diretas e logs de terminal.*  
*Arquivos analisados: `ProductGalleryWrapper.tsx`, `ProgressiveGallery.tsx`, `ProductImageGallery.tsx`, `ImageGalleryClient.tsx`, `assets-api-service.ts`, `gallery-cached-service.ts`, `product.ts` (actions), `next.config.ts`, `ProductCard.tsx` (category).*
