# Project: Next.js 16 E-commerce (Mundial Megastore)

## Tech Stack & Commands

- **Next.js 16.2.3** (App Router), **React 19.2.5**, **TypeScript 6.0.2**, **Tailwind CSS 4.2.2**, **Biome 2.4.11** (linter/format), **Zod 4.3.6**
- **Package manager**: pnpm (pnpm-lock.yaml present)
- **Commands**:
  - `npm run dev` - Start dev server (loads .env via dotenv-cli)
  - `npm run build` - Production build (does NOT use dotenv-cli — Next.js loads .env automatically)
  - `npm run start` - Start production server (loads .env via dotenv-cli)
  - `npm run lint` - Run Biome linter (`biome check`)
  - `npm run format` - Format code with Biome (`biome format --write`)
- Do NOT run `next dev` or `next start` directly (they skip dotenv loading)
- No test suite configured (no test files, no test commands)

## Architecture

- **Frontend-only app** consuming data from external NestJS APIs
- External APIs:
  - Main API: `EXTERNAL_API_MAIN_URL` (products, categories/taxonomy, cart, checkout, brands, accounts)
  - Assets API: `EXTERNAL_API_ASSETS_URL` (images, galleries) — uses native `fetch` with `x-api-key` header
  - CEP API: ViaCEP (`https://viacep.com.br/ws`) — address lookup by Brazilian postal code
- API uses **custom status codes** (100XXX format, not standard HTTP):
  - `100200` = success, `100204` = empty result, `100404` = not found, `100400` = error, `100422` = validation error
  - See `src/core/constants/api-constants.ts` for all codes and utility functions (`mapApiStatusToHttp`, `isApiSuccess`, `isApiError`)
- Data flow: API service (BaseApiService) → cached service (`use cache`) → Server Action → Component
- Error classes in `base-api-service.ts`: `ApiConnectionError`, `ApiValidationError`, `ApiAuthenticationError`, `ApiNotFoundError`, `ApiServerError`

## API Endpoints (defined in `src/core/constants/api-constants.ts`)

- `PRODUCT_ENDPOINTS` — 14 endpoints for product CRUD
- `PRODUCT_WEB_ENDPOINTS` — FIND_BY_ID, FIND, SECTIONS (frontend-specific)
- `TAXONOMY_ENDPOINTS` — 17 endpoints (the **active** category system, replaces legacy CATEGORY_ENDPOINTS)
- `CATEGORY_ENDPOINTS` — FIND_MENU, FIND_BY_ID (**Legacy** — prefer TAXONOMY_ENDPOINTS)
- `CART_ENDPOINTS` — 8 endpoints
- `CHECKOUT_ENDPOINTS` — VIEW_CUSTOMER, CREATE_ORDER
- `ACCOUNT_ENDPOINTS` — 19 endpoints (full customer dashboard API)
- `BRAND_ENDPOINTS` — FIND_ALL
- `SUPPLIER_ENDPOINTS` — FIND_ALL
- `PTYPE_ENDPOINTS` — FIND_ALL (product types)
- `CHECK_ENDPOINTS` — 7 validation endpoints
- `CUSTOMER_ENDPOINTS` — CHECK_CUSTOMER
- `API_TIMEOUTS` — CLIENT_DEFAULT=15s, SERVER_DEFAULT=30s, CLIENT_UPLOAD=60s, SERVER_LONG_RUNNING=120s, SERVER_UPLOAD=180s

## Caching (Next.js 16 `use cache`)

- Cached services use `"use cache"` directive with `cacheLife` profiles and `cacheTag` invalidation
- Cache profiles (defined in `next.config.ts`):
  - `hours` (stale: 1h, revalidate: 15min, expire: 1h) — navigation, categories
  - `quarter` (stale: 15min, revalidate: 5min, expire: 15min) — categories menu
  - `frequent` (stale: 5min, revalidate: 1min, expire: 5min) — products
  - `daily` (stale: 24h, revalidate: 1h, expire: 24h) — footer, static content
- Cache tags (defined in `src/lib/cache-config.ts`): `product(id)`, `productGallery(id)`, `category(id)`, `products`, `categories`, `navigation`, `banners`, `footer`
- Connection errors during build are expected/suppressed (API may be unavailable)
- **Mixed pattern**: `src/app/(home)/actions.ts` combines `"use server"` with `"use cache"` inside `fetchSectionProducts` (uses `cacheLife("frequent")` and `cacheTag(CACHE_TAGS.products)`)

## Routing & Path Alias

- App Router with route groups:
  - `(home)` — Home page (`page.tsx`, `actions.ts`, `_components/` with banner, footer, header, hero, navegation, product, sections)
  - `(catalog)` — Catalog (shared `layout.tsx`):
    - `/products` — Product listing with `_components/`
    - `/product/[...slug]` — Product detail with `_components/` (ProductDetailContainer, ProductInfo, ProductJsonLd, ProductTabs, RelatedProducts, imagegallery/)
    - `/category/[...slug]` — Category page with `_components/` (breadcrumbs, sidebar, mobile category, products), `not-found.tsx`
  - `(sitemaps)` — 7 sitemap routes: `sitemap.xml`, `sitemap-categories.xml`, `sitemap-products-{0..3}.xml`, `sitemap-static.xml`
- **Redirect/stub routes** (outside route groups):
  - `/categoria` and `/categoria/[...slug]` — redirect to `/` (legacy URL handling)
  - `/loja` — redirect to `/products`
  - `/lancamentos` — stub/WIP page (placeholder `<div>page</div>`)
- **Note**: The `next.config.ts` redirect pattern excludes `product`, `category`, `products` but NOT `categoria`, `lancamentos`, `loja`. These work because Next.js file-based routes take priority over `redirects()`.
- Path alias: `@/*` resolves to `./src/*` (configured in tsconfig.json)

## Styling & Components

- **Tailwind CSS 4** via `@tailwindcss/postcss` (no tailwind.config.js — Tailwind 4 syntax)
  - `@import "tailwindcss"` + `@import "tw-animate-css"` in globals.css
  - Uses **oklch** color space for theme colors (not hsl)
  - Custom fonts: `--font-sans: Inter`, `--font-serif: Playfair Display`, `--font-mono: Roboto Mono`
  - Dark mode via `@custom-variant dark (&:is(.dark *))`
- **shadcn/ui** components configured in `components.json`:
  - Style: "new-york", RSC: true, TSX: true
  - Base color: "stone"
  - CSS variables: enabled
  - Icon library: lucide
  - Aliases: `@/components`, `@/components/ui`, `@/lib/utils`, `@/lib`, `@/hooks`
- Biome configuration (`biome.json`):
  - 2-space indentation, space style
  - Recommended rules + Next.js + React domains
  - `noUnknownAtRules` off (for Tailwind)
  - CSS modules + Tailwind directives parser enabled
  - Auto organize imports via assist

## Environment Variables

- **Do NOT load env vars via `dotenv/config`** — Next.js loads .env automatically
- **Validation**: `src/core/config/envs.ts` uses Zod 4 schema to validate all env vars
  - Separate validation for server vs client vars (prevents hydration errors)
  - Server: validates ALL env vars
  - Client: validates only NEXT*PUBLIC*\* vars
- `.env` must exist with all required vars
- **Server-only env vars**:
  - `PORT`, `EXTERNAL_API_MAIN_URL`, `EXTERNAL_API_ASSETS_URL`, `API_KEY`
  - `APP_ID`, `SYSTEM_CLIENT_ID`, `STORE_ID`, `ORGANIZATION_ID`, `MEMBER_ID`, `USER_ID`, `PERSON_ID`, `TYPE_BUSINESS`
  - `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (auth — in progress)
  - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (OAuth — in progress)
  - `RESEND_API_KEY`, `EMAIL_SENDER_NAME`, `EMAIL_SENDER_ADDRESS` (email — in progress)
  - `HOME_CATEGORY1_ID` through `HOME_CATEGORY6_ID` (home page section categories)
  - `HOME_SECTION_1_TITLE` through `HOME_SECTION_10_TITLE` (home page section titles)
- **Public env vars** (`NEXT_PUBLIC_*`):
  - `NEXT_PUBLIC_BASE_URL_APP` — App base URL
  - `NEXT_PUBLIC_COMPANY_*` — Company info (NAME, PHONE, EMAIL, WHATSAPP, ADDRESS, CNPJ, ABOUT, SLOGAN1-5, CALLTO_ACTION1-5, META_TITLE_MAIN, META_TITLE_CAPTION, META_DESCRIPTION, etc.)
  - `NEXT_PUBLIC_DISCOUNT_CASH_PAYMENT`, `NEXT_PUBLIC_PAY_IN_UP_TO`, `NEXT_PUBLIC_FREE_SHIPPING_OVER`
  - `NEXT_PUBLIC_DEVELOPER_NAME`, `NEXT_PUBLIC_DEVELOPER_URL`
  - `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional, format `G-XXXXXXX`)

## Key Libraries & Patterns

- **State management**: Zustand v5 with `persist` middleware (localStorage key: `cart-storage`)
  - Cart store wrapped in React Context + `useRef` for Next.js RSC compatibility
  - `src/contexts/CartContext.tsx` (provider + `useCartStore`)
  - `src/hooks/useCart.tsx` (thin wrapper exposing flat cart API)
- **Theme**: next-themes (dark/light mode)
- **Validation**: Zod 4 (forms + API response validation + env validation)
  - Each service has a `validation/` subdirectory with Zod schemas (e.g., `product-schemas.ts`, `category-schemas.ts`)
- **HTML sanitization**: `isomorphic-dompurify` (for rendering HTML from API)
- **Toast notifications**: `sonner`
- **Command menu**: `cmdk` (command palette component)
- **Animations**: `tw-animate-css` (Tailwind animation utilities)
- **API clients**:
  - `src/lib/axios/axios-client.ts` — Client-side Axios (no API_KEY, no secrets)
  - `src/lib/axios/server-axios-client.ts` — Server-side Axios with `Authorization: Bearer ${API_KEY}` (`import "server-only"`)
  - `src/lib/axios/base-api-service.ts` — Abstract `BaseApiService` class with `get`/`post` methods (`import "server-only"`)
- **Services**:
  - `src/services/api-main/product/` — Product API + cached service + types + validation
  - `src/services/api-main/category/` — Category/Taxonomy API (uses `TAXONOMY_ENDPOINTS`) + types + validation
  - `src/services/api-main/brand/` — Brand API + types + validation
  - `src/services/api-assets/` — Assets API (native `fetch`, not Axios) + gallery cached service
  - `src/services/api-cep/` — ViaCEP integration (`fetchAddressByCep`, `validateCep`, `formatCep`) + types
  - `*-cached-service.ts` files use `"use cache"` with `cacheLife` and `cacheTag`
- **Server Actions**:
  - `src/app/actions/product.ts` — `fetchProductsAction`, `fetchCategoriesAction`, `fetchProductBySlugAction`, `fetchProductWithRelatedAction`, `fetchRelatedProductsAction`, `fetchCategoryBySlugAction`, `fetchProductsByCategoryAction`, `fetchProductsBySlugAction`, `fetchProductsByTaxonomyAction`, `fetchProductGalleryAction`
  - `src/app/(home)/actions.ts` — Home page sections: `getHighlightSectionProducts`, `getPromotionSectionProducts`, `getNewReleasesSectionProducts`, `getCategoryOneSectionProducts` through `getCategorySixSectionProducts`
- **Data transformation**:
  - `src/lib/adapters/product-adapter.ts` — `adaptProductFromApi` (API → `ProductWithMetadata`)
  - `src/lib/adapters/product-sections-adapter.ts` — `adaptHomeSectionProduct(s)` (section items → `ProductWithMetadata`)
  - `src/lib/transformers.ts` — `transformProductList`, `transformProductDetail`, `transformRelatedProducts`, `transformCategoryMenu`, `findCategoryBySlug` (+ UI types: `UIProduct`, `UICategory`, `UISubcategory`)
- **Utilities** (`src/lib/`):
  - `utils.ts` — `cn()` (className merge), `slugify()`, `formatCurrencyBRL()`
  - `slug.ts` — `generateSlug(name, id)`
  - `product-utils.ts` — `transformProducts()` (server-side)
  - `whatsapp.ts` — WhatsApp message formatting, `getWhatsAppLink()`

## Special Configurations

- **React Compiler**: Enabled in `next.config.ts` (`reactCompiler: true`) with `babel-plugin-react-compiler`
- **Component caching**: `cacheComponents: true` in `next.config.ts`
- **Image config**: `qualities: [75, 100]`, allowed remote patterns in `next.config.ts`:
  - images.unsplash.com
  - mundialmegastore.com.br
  - assents01.comsuporte.com.br
  - localhost:5573 (dev)
- **Redirects**: Legacy product URLs at root (e.g., `/perfume-afnan-9pm`) → Home (308 permanent)
  - Excluded from redirect: `/product/*`, `/category/*`, `/products/*`, `/_next/*`, `/api/*`, `/images/*`, `/slides/*`, static files
  - Note: `/categoria`, `/lancamentos`, `/loja` are NOT excluded in the pattern but work via file-based route priority
- **SEO**:
  - Dynamic sitemaps in `src/app/(sitemaps)/` (7 sitemap files)
  - `robots.ts` in `src/app/`
  - JSON-LD components: `OrganizationJsonLd`, `WebSiteJsonLd` (in `src/components/seo/`, used in layout.tsx)
  - Product-level JSON-LD: `ProductJsonLd` (in `src/app/(catalog)/product/_components/`)
  - Google Analytics via `src/components/analytics/GoogleAnalytics.tsx` (env: NEXT_PUBLIC_GA_MEASUREMENT_ID)
  - GA4 event tracking in `src/components/analytics/events.ts`: `trackViewItem`, `trackSelectItem`, `trackViewItemList`, `trackAddToCart`, `trackRemoveFromCart`, `trackViewCart`, `trackBeginCheckout`, `trackPurchase`, `trackSearch`, `trackEvent`
- **Scripts** (`scripts/`):
  - `generate-schema.mjs` — Generates TypeScript schema types from MySQL database tables (output: `src/database/schema.ts`)
  - `git-flow-release.sh` — Automates git-flow release process (feature → release → main+develop, push tags)

## Types (`src/types/`)

- `product.ts` — `Product`, `ProductHome`, `ProductCategory`, `ProductFilters`, `RawProduct`, `TransformedProduct`, `Category`, `CategoryMap`, `ProductWithMetadata`
- `cart.ts` — `CartItem`, `PaymentMethod` ("PIX" | "Cartão" | "Dinheiro"), `CartState`, `CartActions`, `CartStore`
- `types.ts` — `Product` (legacy duplicate), `Category`, `Subcategory`, `Subgroup`, `CategoryHierarchy`, `SortOption`, `ViewMode`, `Brand`, `FilterOptions`
- `home-type.ts` — `SlideData`, `ContactInfo`, `FAQItem`, `ProductCategory`, `StatsData`
- `home.ts` — `Product` (legacy duplicate), `Category`, `NavigationItem`, `Banner`, `Testimonial`, `Advantage`
- `api-assets.ts` — `EntityType`, `FileType`, `FileStatus`, `FileVersionType`, `FileVersion`, `FileUrls`, `FileAsset`, `ApiStatusResponse`
- `account.ts` — `Customer`, `Order`, `DashboardStat`, `QuickAction`, `SalesConsultant` (dashboard/account features)
- **Note**: There are 3 separate `Product` interfaces across `product.ts`, `types.ts`, `home.ts` with different shapes — use `ProductWithMetadata` from `product.ts` as the canonical type

## Important Constraints

- **Most services in `src/services/api-main/` are server-only** (`import "server-only"`) — exception: `brand-service-api.ts` lacks the import
- **Assets API service** (`src/services/api-assets/assets-api-service.ts`) uses native `fetch` (not Axios) and does NOT have `import "server-only"`; the cached layer (`gallery-cached-service.ts`) does have it
- **Client data fetching must go through API routes or Server Actions** (to avoid exposing API keys)
- **Product slug format**: `{product-name}-{id}` (ID extracted from last segment)
- **Category system**: Uses `TAXONOMY_ENDPOINTS` (17 endpoints). `CATEGORY_ENDPOINTS` is legacy
- **Category menu type ID**: 1 (hierarchical menu), parent_id: 0 (root)
- **Brazilian locale**: `src/core/constants/brazilian-states.ts` has all states with IBGE codes (for CEP/address features)

## Code Style

- **Biome 2.4.11** is the linter/formatter (not ESLint/Prettier)
- Run `npm run lint` before committing
- Run `npm run format` to auto-fix style issues
- 2-space indentation, space style
- Auto organize imports enabled
