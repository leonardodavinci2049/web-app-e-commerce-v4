# Project: Next.js 16 E-commerce (Mundial Megastore)

## Tech Stack & Commands

- **Next.js 16** (App Router), **React 19**, **TypeScript 6**, **Tailwind CSS 4**, **Biome 2** (linter/format), **Zod 4**
- **Package manager**: pnpm (pnpm-lock.yaml present)
- **Commands**:
  - `pnpm run dev` / `npm run dev` - Start dev server (loads .env via dotenv-cli)
  - `npm run build` - Production build (does NOT use dotenv-cli — Next.js loads .env automatically)
  - `npm run start` - Start production server (loads .env via dotenv-cli)
  - `npm run lint` - Run Biome linter (`biome check`)
  - `npm run format` - Format code with Biome (`biome format --write`)
- Do NOT run `next dev` or `next start` directly (they skip dotenv loading)
- No test suite configured (no test files, no test commands)
- **No typecheck script** — `tsc --noEmit` works but isn't wired to npm

## Architecture

- **Frontend-only app** consuming data from external NestJS APIs
- External APIs:
  - Main API: `EXTERNAL_API_MAIN_URL` (products, categories/taxonomy, cart, checkout, brands, accounts)
  - Assets API: `EXTERNAL_API_ASSETS_URL` (images, galleries) — uses native `fetch` with `x-api-key` header, NOT Axios
  - CEP API: ViaCEP (`https://viacep.com.br/ws`) — address lookup by Brazilian postal code
- API uses **custom status codes** (100XXX format, not standard HTTP):
  - `100200` = success, `100204` = empty result, `100404` = not found, `100400` = error, `100422` = validation error
  - See `src/core/constants/api-constants.ts` for all codes and utility functions (`mapApiStatusToHttp`, `isApiSuccess`, `isApiError`)
- Data flow: API service (BaseApiService) → cached service (`use cache`) → Server Action → Component
- Error classes in `base-api-service.ts`: `ApiConnectionError`, `ApiValidationError`, `ApiAuthenticationError`, `ApiNotFoundError`, `ApiServerError`

## Routing

- App Router with route groups:
  - `(home)` — Home page (`page.tsx`, `actions.ts`, `_components/`)
  - `(catalog)` — Catalog (shared `layout.tsx`):
    - `/products` — Product listing
    - `/product/[...slug]` — Product detail
    - `/category/[...slug]` — Category page (has `not-found.tsx`)
  - `(company)` — Company pages (shared `layout.tsx` with CompanyHeader/Footer/Logo, own `error.tsx` + `loading.tsx`):
    - `/about`, `/antispam`, `/contact`, `/privacy`, `/return`, `/terms`
  - `(sitemaps)` — 7 sitemap routes: `sitemap.xml`, `sitemap-categories.xml`, `sitemap-products-{0..3}.xml`, `sitemap-static.xml`
- Root files: `src/app/layout.tsx`, `not-found.tsx`, `robots.ts`
- Path alias: `@/*` resolves to `./src/*` (configured in tsconfig.json)

## Caching (Next.js 16 `use cache`)

- Cached services use `"use cache"` directive with `cacheLife` profiles and `cacheTag` invalidation
- Cache profiles (defined in `next.config.ts`):
  - `hours` (stale: 10min, revalidate: 2min, expire: 10min) — navigation
  - `quarter` (stale: 15min, revalidate: 5min, expire: 15min) — categories menu
  - `frequent` (stale: 5min, revalidate: 1min, expire: 5min) — products
  - `daily` (stale: 24h, revalidate: 1h, expire: 24h) — footer, static content
- Cache tags (defined in `src/lib/cache-config.ts`): `product(id)`, `productGallery(id)`, `category(id)`, `products`, `categories`, `navigation`, `banners`, `footer`
- Connection errors during build are expected/suppressed (API may be unavailable)
- **Mixed pattern**: `src/app/(home)/actions.ts` combines `"use server"` with `"use cache"` inside `fetchSectionProducts` (uses `cacheLife("frequent")` and `cacheTag(CACHE_TAGS.products)`)

## Styling & Components

- **Tailwind CSS 4** via `@tailwindcss/postcss` (no tailwind.config.js — Tailwind 4 syntax)
  - `@import "tailwindcss"` + `@import "tw-animate-css"` in globals.css
  - Uses **oklch** color space for theme colors (not hsl)
  - Dark mode via `@custom-variant dark (&:is(.dark *))`
  - CSS declares fonts `Inter` / `Playfair Display` / `Roboto Mono`, but `layout.tsx` loads **Geist** and **Geist_Mono** via `next/font/google` — the CSS vars are unused overrides from shadcn scaffolding
- **shadcn/ui** configured in `components.json` (style: "new-york", RSC: true, base color: "stone", icons: lucide)
- **Biome** configuration (`biome.json`):
  - 2-space indentation, space style
  - Recommended rules + Next.js + React domains
  - `noUnknownAtRules` off (for Tailwind)
  - Auto organize imports via assist

## Environment Variables

- **Do NOT load env vars via `dotenv/config`** — Next.js loads .env automatically
- **Validation**: `src/core/config/envs.ts` uses Zod 4 schema to validate all env vars
  - Server-side: full Zod validation with `safeParse(process.env)`
  - Client-side: manual `typeof window === "undefined"` guard — does NOT run Zod on client (Turbopack statically replaces `process.env.NEXT_PUBLIC_*`, Zod can fail on timing)
  - Server-only vars get empty/default values on client (never exposed)
- `.env` must exist with all required vars
- **Non-obvious validation**: `envs.ts` checks that `HOME_SECTION_*_TITLE` values used as `<h2>` elements are unique (SEO requirement, fails at startup if duplicates)
- Key server-only vars: `PORT`, `EXTERNAL_API_MAIN_URL`, `EXTERNAL_API_ASSETS_URL`, `API_KEY`, `APP_ID`, `SYSTEM_CLIENT_ID`, `STORE_ID`, `ORGANIZATION_ID`, `MEMBER_ID`, `USER_ID`, `PERSON_ID`, `TYPE_BUSINESS`, `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `RESEND_API_KEY`, `HOME_CATEGORY{1-6}_ID`, `HOME_SECTION_{1-10}_TITLE`
- Public vars: `NEXT_PUBLIC_BASE_URL_APP`, `NEXT_PUBLIC_COMPANY_*` (many), `NEXT_PUBLIC_DISCOUNT_CASH_PAYMENT`, `NEXT_PUBLIC_PAY_IN_UP_TO`, `NEXT_PUBLIC_FREE_SHIPPING_OVER`, `NEXT_PUBLIC_DEVELOPER_NAME`, `NEXT_PUBLIC_DEVELOPER_URL`, `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional, format `G-XXXXXXX`)

## Key Patterns

- **State management**: Zustand v5 with `persist` middleware (localStorage key: `cart-storage`)
  - Cart store wrapped in React Context + `useRef` for Next.js RSC compatibility
  - `src/contexts/CartContext.tsx` (provider + `useCartStore`)
  - `src/hooks/useCart.tsx` (thin wrapper exposing flat cart API)
- **API clients**:
  - `src/lib/axios/axios-client.ts` — Client-side Axios (no API_KEY, no secrets)
  - `src/lib/axios/server-axios-client.ts` — Server-side Axios with `Authorization: Bearer ${API_KEY}` (`import "server-only"`)
  - `src/lib/axios/base-api-service.ts` — Abstract `BaseApiService` class with `get`/`post` methods (`import "server-only"`)
- **Services** (`src/services/`):
  - `api-main/product/` — Product API + cached service (`product-web-cached-service.ts`) + types + validation
  - `api-main/category/` — Category/Taxonomy API + types + validation
  - `api-main/brand/` — Brand API + types + validation
  - `api-assets/` — Assets API (native `fetch`, not Axios) + gallery cached service
  - `api-cep/` — ViaCEP integration + types
  - `*-cached-service.ts` files use `"use cache"` with `cacheLife` and `cacheTag`
- **Server Actions**:
  - `src/app/actions/product.ts` — product/category CRUD + gallery actions
  - `src/app/(home)/actions.ts` — Home page section actions (highlight, promotion, new releases, category 1-6 sections)
- **Data transformation**:
  - `src/lib/adapters/product-adapter.ts` — `adaptProductFromApi` (API → `ProductWithMetadata`)
  - `src/lib/adapters/product-sections-adapter.ts` — `adaptHomeSectionProduct(s)` (section items → `ProductWithMetadata`)
  - `src/lib/transformers.ts` — `transformProductList`, `transformProductDetail`, `transformRelatedProducts`, `transformCategoryMenu`, `findCategoryBySlug` (+ UI types)
- **Other utilities** (`src/lib/`):
  - `utils.ts` — `cn()` (className merge), `slugify()`, `formatCurrencyBRL()`
  - `slug.ts` — `generateSlug(name, id)`
  - `product-utils.ts` — `transformProducts()` (server-side)
  - `whatsapp.ts` — WhatsApp message formatting, `getWhatsAppLink()`

## Special Configurations

- **React Compiler**: Enabled in `next.config.ts` (`reactCompiler: true`) with `babel-plugin-react-compiler`
- **Component caching**: `cacheComponents: true` in `next.config.ts`
- **Image config**: `qualities: [75, 100]`, `minimumCacheTTL: 86400`, allowed remote patterns: `images.unsplash.com`, `mundialmegastore.com.br`, `assents01.comsuporte.com.br`, `localhost:5573` (dev)
- **SEO**:
  - Dynamic sitemaps in `src/app/(sitemaps)/` (7 route files)
  - `robots.ts` in `src/app/`
  - JSON-LD components in `src/components/seo/`: `OrganizationJsonLd`, `WebSiteJsonLd`, `LocalBusinessJsonLd`
  - Product-level JSON-LD: `ProductJsonLd` (in `src/app/(catalog)/product/_components/`)
  - Google Analytics via `src/components/analytics/GoogleAnalytics.tsx` (env: NEXT_PUBLIC_GA_MEASUREMENT_ID)
  - GA4 events in `src/components/analytics/events.ts`

## Types (`src/types/`)

- `product.ts` — canonical types including `ProductWithMetadata` (use this as the main product type)
- `cart.ts` — `CartItem`, `PaymentMethod` ("PIX" | "Cartão" | "Dinheiro"), `CartState`, `CartActions`, `CartStore`
- `types.ts` — `Brand`, `FilterOptions`, `SortOption`, `ViewMode`, legacy duplicates of `Product`/`Category`
- `home-type.ts`, `home.ts` — home page types, also have legacy `Product` duplicates
- `api-assets.ts` — `FileAsset`, `FileVersion`, `FileUrls`, etc.
- `account.ts` — `Customer`, `Order`, `DashboardStat`, `QuickAction`, `SalesConsultant`
- **Warning**: There are 3 separate `Product` interfaces across `product.ts`, `types.ts`, `home.ts` with different shapes — always use **`ProductWithMetadata`** from `product.ts`
- **Note**: `home-type copy.ts` is a stale duplicate — do not use

## Important Constraints

- **Server-only imports**: Most services in `src/services/api-main/` use `import "server-only"` — exception: `brand-service-api.ts` lacks it
- **Assets API service** (`src/services/api-assets/assets-api-service.ts`) uses native `fetch` (not Axios) and does NOT have `import "server-only"`; the cached layer (`gallery-cached-service.ts`) does have it
- **Client data fetching must go through API routes or Server Actions** (to avoid exposing API keys)
- **Product slug format**: `{product-name}-{id}` (ID extracted from last segment after last `-`)
- **Category system**: Uses `TAXONOMY_ENDPOINTS` (15 endpoints in `api-constants.ts`). `CATEGORY_ENDPOINTS` is legacy — prefer taxonomy
- **Category menu type ID**: 1 (hierarchical menu), parent_id: 0 (root)
- **Brazilian locale**: app uses `pt-BR`, prices in BRL, addresses via CEP lookup. `src/core/constants/brazilian-states.ts` has all states with IBGE codes
- **No middleware.ts** — there is no Next.js middleware file in this project

## Code Style

- **Biome** is the linter/formatter (not ESLint/Prettier)
- Run `npm run lint` before committing
- Run `npm run format` to auto-fix style issues
- 2-space indentation, space style
- Auto organize imports enabled
