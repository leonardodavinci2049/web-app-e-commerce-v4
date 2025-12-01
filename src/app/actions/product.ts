"use server";

import {
  getCategories,
  getCategoryBySlug,
  getProductBySlug,
  getProducts,
  getProductsByCategory,
  getRelatedProducts,
} from "@/services/product";

/**
 * Fetch all products (cached via 'use cache' in service)
 */
export async function fetchProductsAction() {
  try {
    return await getProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

/**
 * Fetch all categories (cached via 'use cache' in service)
 */
export async function fetchCategoriesAction() {
  try {
    return await getCategories();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

/**
 * Fetch a product by its slug (cached via 'use cache' in service)
 */
export async function fetchProductBySlugAction(slug: string[]) {
  try {
    return await getProductBySlug(slug);
  } catch (error) {
    console.error("Failed to fetch product by slug:", error);
    return undefined;
  }
}

/**
 * Fetch related products (cached via 'use cache' in service)
 */
export async function fetchRelatedProductsAction(
  productId: string,
  categoryId: string,
) {
  try {
    return await getRelatedProducts(productId, categoryId);
  } catch (error) {
    console.error("Failed to fetch related products:", error);
    return [];
  }
}

/**
 * Fetch category by slug (cached via 'use cache' in service)
 */
export async function fetchCategoryBySlugAction(
  categorySlug: string,
  subcategorySlug?: string,
) {
  try {
    return await getCategoryBySlug(categorySlug, subcategorySlug);
  } catch (error) {
    console.error("Failed to fetch category by slug:", error);
    return null;
  }
}

/**
 * Fetch products by category (cached via 'use cache' in service)
 */
export async function fetchProductsByCategoryAction(
  categoryId: string,
  subcategoryId?: string,
) {
  try {
    return await getProductsByCategory(categoryId, subcategoryId);
  } catch (error) {
    console.error("Failed to fetch products by category:", error);
    return [];
  }
}
