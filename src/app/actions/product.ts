"use server";

import {
  getCachedCategories,
  getCachedCategoryBySlug,
  getCachedProductBySlug,
  getCachedProducts,
  getCachedProductsByCategory,
  getCachedRelatedProducts,
} from "@/services/product";

/**
 * Fetch all products with caching
 */
export async function fetchProductsAction() {
  try {
    return await getCachedProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

/**
 * Fetch all categories with caching
 */
export async function fetchCategoriesAction() {
  try {
    return await getCachedCategories();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

/**
 * Fetch a product by its slug with caching
 */
export async function fetchProductBySlugAction(slug: string[]) {
  try {
    return await getCachedProductBySlug(slug);
  } catch (error) {
    console.error("Failed to fetch product by slug:", error);
    return undefined;
  }
}

/**
 * Fetch related products with caching
 */
export async function fetchRelatedProductsAction(
  productId: string,
  categoryId: string,
) {
  try {
    return await getCachedRelatedProducts(productId, categoryId);
  } catch (error) {
    console.error("Failed to fetch related products:", error);
    return [];
  }
}

/**
 * Fetch category by slug with caching
 */
export async function fetchCategoryBySlugAction(
  categorySlug: string,
  subcategorySlug?: string,
) {
  try {
    return await getCachedCategoryBySlug(categorySlug, subcategorySlug);
  } catch (error) {
    console.error("Failed to fetch category by slug:", error);
    return null;
  }
}

/**
 * Fetch products by category with caching
 */
export async function fetchProductsByCategoryAction(
  categoryId: string,
  subcategoryId?: string,
) {
  try {
    return await getCachedProductsByCategory(categoryId, subcategoryId);
  } catch (error) {
    console.error("Failed to fetch products by category:", error);
    return [];
  }
}
