import { unstable_cache } from "next/cache";
import { cache } from "react";
import { CATEGORIES, PRODUCTS } from "@/data/mock-data";
import { CACHE_DURATIONS, CACHE_TAGS } from "@/lib/cache-config";

// Types for mock data
type MockProduct = (typeof PRODUCTS)[number];
type MockCategory = (typeof CATEGORIES)[number];

// Base functions with React cache() for request deduplication
const getProducts = cache(async (): Promise<MockProduct[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return PRODUCTS;
});

const getCategories = cache(async (): Promise<MockCategory[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return CATEGORIES;
});

const getProductById = cache(
  async (id: string): Promise<MockProduct | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return PRODUCTS.find((p) => p.id === id);
  },
);

const getProductBySlug = cache(
  async (slug: string[]): Promise<MockProduct | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const fullSlug = slug.join("/");
    const parts = fullSlug.split("-");
    const id = parts[parts.length - 1];
    return PRODUCTS.find((p) => p.id === id);
  },
);

const getRelatedProducts = cache(
  async (productId: string, categoryId: string): Promise<MockProduct[]> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return PRODUCTS.filter(
      (p) => p.categoryId === categoryId && p.id !== productId,
    );
  },
);

const getCategoryBySlug = cache(
  async (categorySlug: string, subcategorySlug?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const category = CATEGORIES.find((c) => c.slug === categorySlug);
    if (!category) return null;

    let subcategory = null;
    if (subcategorySlug) {
      subcategory = category.subcategories?.find(
        (s) => s.slug === subcategorySlug,
      );
      if (!subcategory) return null;
    }
    return { category, subcategory };
  },
);

const getProductsByCategory = cache(
  async (
    categoryId: string,
    subcategoryId?: string,
  ): Promise<MockProduct[]> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return PRODUCTS.filter((product) => {
      const matchCategory = product.categoryId === categoryId;
      const matchSubcategory = subcategoryId
        ? product.subcategoryId === subcategoryId
        : true;
      return matchCategory && matchSubcategory;
    });
  },
);

// Cached versions with unstable_cache for persistent cache with tags
export const getCachedProducts = unstable_cache(
  async () => getProducts(),
  ["products"],
  {
    tags: [CACHE_TAGS.products],
    revalidate: CACHE_DURATIONS.products,
  },
);

export const getCachedCategories = unstable_cache(
  async () => getCategories(),
  ["categories"],
  {
    tags: [CACHE_TAGS.categories, CACHE_TAGS.navigation],
    revalidate: CACHE_DURATIONS.navigation,
  },
);

export const getCachedProductById = (id: string) =>
  unstable_cache(async () => getProductById(id), ["product", id], {
    tags: [CACHE_TAGS.product(id), CACHE_TAGS.products],
    revalidate: CACHE_DURATIONS.products,
  })();

export const getCachedProductBySlug = (slug: string[]) =>
  unstable_cache(
    async () => getProductBySlug(slug),
    ["product-slug", ...slug],
    {
      tags: [CACHE_TAGS.products],
      revalidate: CACHE_DURATIONS.products,
    },
  )();

export const getCachedRelatedProducts = (
  productId: string,
  categoryId: string,
) =>
  unstable_cache(
    async () => getRelatedProducts(productId, categoryId),
    ["related-products", productId, categoryId],
    {
      tags: [CACHE_TAGS.products, CACHE_TAGS.category(categoryId)],
      revalidate: CACHE_DURATIONS.products,
    },
  )();

export const getCachedCategoryBySlug = (
  categorySlug: string,
  subcategorySlug?: string,
) =>
  unstable_cache(
    async () => getCategoryBySlug(categorySlug, subcategorySlug),
    ["category-slug", categorySlug, subcategorySlug || ""],
    {
      tags: [CACHE_TAGS.categories],
      revalidate: CACHE_DURATIONS.navigation,
    },
  )();

export const getCachedProductsByCategory = (
  categoryId: string,
  subcategoryId?: string,
) =>
  unstable_cache(
    async () => getProductsByCategory(categoryId, subcategoryId),
    ["products-by-category", categoryId, subcategoryId || ""],
    {
      tags: [CACHE_TAGS.products, CACHE_TAGS.category(categoryId)],
      revalidate: CACHE_DURATIONS.products,
    },
  )();

// Legacy service object for backward compatibility
export const productService = {
  getProducts,
  getCategories,
  getProductBySlug,
  getRelatedProducts,
  getCategoryBySlug,
  getProductsByCategory,
  // Cached versions
  getCachedProducts,
  getCachedCategories,
  getCachedProductById,
  getCachedProductBySlug,
  getCachedRelatedProducts,
  getCachedCategoryBySlug,
  getCachedProductsByCategory,
};
