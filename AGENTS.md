# Project: Next.js 16 E-commerce (Mundial Megastore)

## Tech Stack & Commands

- **Next.js 16** (App Router), **React 19**, **TypeScript 5.9**, **Tailwind CSS 4**, **Biome** (linter/format)
- **Package manager**: pnpm (pnpm-lock.yaml present)
- **Commands** (always use these; they include dotenv-cli):
  - `npm run dev` - Start dev server (loads .env via dotenv-cli)
  - `npm run build` - Production build
  - `npm run start` - Start production server (loads .env)
  - `npm run lint` - Run Biome linter
  - `npm run format` - Format code with Biome
- Do NOT run `next dev` or `next start` directly (they skip dotenv loading)
- No test suite configured (no test files, no test commands)

## Architecture

- **Frontend-only app** consuming data from external NestJS APIs
- External APIs:
  - Main API: `EXTERNAL_API_MAIN_URL` (products, categories, cart, etc.)
  - Assets API: `EXTERNAL_API_ASSETS_URL` (images, galleries)
- API uses **custom status codes** (100XXX format, not standard HTTP):
  - `100200` = success, `100204` = empty result, `100404` = not found, `100400` = error
  - See `src/core/constants/api-constants.ts` for all codes and utility functions
- Data flow: API service (BaseApiService) → cached service (`use cache`) → Server Action → Component

## Caching (Next.js 16 `use cache`)

- Cached services use `"use cache"` directive with `cacheLife` profiles and `cacheTag` invalidation
- Cache profiles (defined in `next.config.ts`):
  - `hours` (1 hour) - navigation, categories
  - `quarter` (15 min) - categories menu
  - `frequent` (5 min) - products
  - `daily` (24 hours) - footer, static content
- Cache tags (defined in `src/lib/cache-config.ts`): `product(id)`, `category(id)`, `products`, `categories`, `navigation`, etc.
- Connection errors during build are expected/suppressed (API may be unavailable)

## Routing & Path Alias

- App Router with route groups:
  - `(home)` - Home page
  - `(catalog)` - Products (`/products`, `/product/[...slug]`, `/category/[...slug]`)
  - `(sitemaps)` - Sitemap XML routes
- Path alias: `@/*` resolves to `./src/*` (configured in tsconfig.json)

## Styling & Components

- **Tailwind CSS 4** via `@tailwindcss/postcss` (no tailwind.config.js)
- **shadcn/ui** components configured in `components.json`:
  - Style: "new-york"
  - Base color: "stone"
  - CSS variables: enabled
  - Icon library: lucide
- Biome configuration (`biome.json`):
  - 2-space indentation
  - Recommended rules + Next.js + React domains
  - `noUnknownAtRules` off (for Tailwind)

## Environment Variables

- **Do NOT load env vars via `dotenv/config`** - Next.js loads .env automatically
- **Validation**: `src/core/config/envs.ts` uses Zod schema to validate all env vars
  - Separate validation for server vs client vars (prevents hydration errors)
  - Server: validates ALL env vars
  - Client: validates only NEXT_PUBLIC_* vars
- `.env` must exist with all required vars (API URLs, system IDs, etc.)

## Key Libraries & Patterns

- **State management**: Zustand (cart)
- **Theme**: next-themes (dark/light mode)
- **Forms**: Zod validation
- **API clients**:
  - `src/lib/axios/axios-client.ts` - Client-side (not for secrets)
  - `src/lib/axios/server-axios-client.ts` - Server-side (can use secrets)
  - `src/lib/axios/base-api-service.ts` - Base class for all API services
- **Services**:
  - `src/services/api-main/` - Main API services (product, category, brand)
  - `src/services/api-assets/` - Assets API services
  - `*-cached-service.ts` files use `"use cache"` with `cacheLife` and `cacheTag`
- **Server Actions**: `src/app/actions/` (e.g., `fetchProductsAction`, `fetchProductBySlugAction`)
- **Data transformation**: `src/lib/adapters/` and `src/lib/transformers.ts`

## Special Configurations

- **React Compiler**: Enabled in `next.config.ts` (`reactCompiler: true`)
- **Component caching**: `cacheComponents: true` in `next.config.ts`
- **Image domains**: Allowed remote patterns in `next.config.ts`:
  - images.unsplash.com
  - mundialmegastore.com.br
  - assents01.comsuporte.com.br
  - localhost:5573 (dev)
- **Redirects**: Legacy product URLs at root (e.g., `/perfume-afnan-9pm`) → Home (308 permanent)
  - Does NOT affect valid routes: `/product/*`, `/category/*`, `/products/*`, etc.
- **SEO**:
  - Dynamic sitemaps in `src/app/(sitemaps)/`
  - robots.ts in `src/app/`
  - JSON-LD components: OrganizationJsonLd, WebSiteJsonLd (in layout.tsx)
  - Google Analytics via `src/components/analytics/GoogleAnalytics.tsx` (env: NEXT_PUBLIC_GA_MEASUREMENT_ID)

## Important Constraints

- **All services in `src/services/api-main/` are server-only** (`import "server-only"`)
- **Client data fetching must go through API routes or Server Actions** (to avoid exposing API keys)
- **Product slug format**: `{product-name}-{id}` (ID extracted from last segment)
- **Category menu type ID**: 1 (hierarchical menu), parent_id: 0 (root)

## Code Style

- **Biome** is the linter/formatter (not ESLint/Prettier)
- Run `npm run lint` before committing
- Run `npm run format` to auto-fix style issues
