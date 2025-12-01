import { cacheLife, cacheTag } from "next/cache";
import { CATEGORIES, PRODUCTS } from "@/data/mock-data";
import { CACHE_TAGS } from "@/lib/cache-config";

// Types for mock data
type MockProduct = (typeof PRODUCTS)[number];
type MockCategory = (typeof CATEGORIES)[number];

/**
 * Fetch all products with 1 hour cache
 */
export async function getProducts(): Promise<MockProduct[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.products);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return PRODUCTS;
}

/**
 * Fetch all categories with 1 hour cache
 */
export async function getCategories(): Promise<MockCategory[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.categories, CACHE_TAGS.navigation);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return CATEGORIES;
}

/**
 * Fetch a product by ID with 1 hour cache
 */
export async function getProductById(
  id: string,
): Promise<MockProduct | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.product(id), CACHE_TAGS.products);

  await new Promise((resolve) => setTimeout(resolve, 50));
  return PRODUCTS.find((p) => p.id === id);
}

/**
 * Fetch a product by slug with 1 hour cache
 */
export async function getProductBySlug(
  slug: string[],
): Promise<MockProduct | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.products);

  await new Promise((resolve) => setTimeout(resolve, 100));
  const fullSlug = slug.join("/");
  const parts = fullSlug.split("-");
  const id = parts[parts.length - 1];
  return PRODUCTS.find((p) => p.id === id);
}

/**
 * Fetch related products with 1 hour cache
 */
export async function getRelatedProducts(
  productId: string,
  categoryId: string,
): Promise<MockProduct[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.products, CACHE_TAGS.category(categoryId));

  await new Promise((resolve) => setTimeout(resolve, 100));
  return PRODUCTS.filter(
    (p) => p.categoryId === categoryId && p.id !== productId,
  );
}

/**
 * Fetch category by slug with 1 hour cache
 */
export async function getCategoryBySlug(
  categorySlug: string,
  subcategorySlug?: string,
) {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.categories);

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
}

/**
 * Fetch products by category with 1 hour cache
 */
export async function getProductsByCategory(
  categoryId: string,
  subcategoryId?: string,
): Promise<MockProduct[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.products, CACHE_TAGS.category(categoryId));

  await new Promise((resolve) => setTimeout(resolve, 100));
  return PRODUCTS.filter((product) => {
    const matchCategory = product.categoryId === categoryId;
    const matchSubcategory = subcategoryId
      ? product.subcategoryId === subcategoryId
      : true;
    return matchCategory && matchSubcategory;
  });
}
