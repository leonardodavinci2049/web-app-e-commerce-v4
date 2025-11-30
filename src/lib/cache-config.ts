/**
 * Cache configuration for Next.js 16 cacheComponents optimization
 * Defines cache tags and durations for granular cache invalidation
 */

// Cache tags for granular invalidation
export const CACHE_TAGS = {
  // Dynamic tag generators
  product: (id: string) => `product-${id}`,
  category: (id: string) => `category-${id}`,

  // Static tags
  products: "products",
  categories: "categories",
  navigation: "navigation",
  banners: "banners",
  footer: "footer",
} as const;

// Cache durations in seconds
export const CACHE_DURATIONS = {
  products: 300, // 5 minutes - product listings
  navigation: 3600, // 1 hour - navigation components
  banners: 60, // 1 minute - promotional banners
  footer: 86400, // 24 hours - footer content
  default: 300, // 5 minutes - default fallback
} as const;

// Type helpers
export type CacheTagKey = keyof typeof CACHE_TAGS;
export type CacheDurationKey = keyof typeof CACHE_DURATIONS;
export type ProductTag = ReturnType<typeof CACHE_TAGS.product>;
export type CategoryTag = ReturnType<typeof CACHE_TAGS.category>;
