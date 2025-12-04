"use server";

import { createLogger } from "@/core/logger";
import {
  getCategories,
  getCategoryBySlug,
  getProductBySlug,
  getProducts,
  getProductsByCategory,
  getProductsBySlug,
  getProductsByTaxonomy,
  getRelatedProducts,
} from "@/services/product";

const logger = createLogger("ProductActions");

/**
 * Fetch all products (cached via 'use cache' in service)
 */
export async function fetchProductsAction(
  params: {
    taxonomyId?: number;
    brandId?: number;
    limit?: number;
    page?: number;
    searchTerm?: string;
  } = {},
) {
  try {
    return await getProducts(params);
  } catch (error) {
    logger.error("Failed to fetch products:", error);
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
    logger.error("Failed to fetch categories:", error);
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
    logger.error("Failed to fetch product by slug:", error);
    return undefined;
  }
}

/**
 * Fetch related products (cached via 'use cache' in service)
 */
export async function fetchRelatedProductsAction(
  productId: string,
  taxonomyId: string,
) {
  try {
    return await getRelatedProducts(productId, taxonomyId);
  } catch (error) {
    logger.error("Failed to fetch related products:", error);
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
    logger.error("Failed to fetch category by slug:", error);
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
    logger.error("Failed to fetch products by category:", error);
    return [];
  }
}

/**
 * Fetch products by taxonomy slug (cached via 'use cache' in service)
 */
export async function fetchProductsBySlugAction(
  slugTaxonomy: string,
  limit?: number,
  page?: number,
) {
  try {
    return await getProductsBySlug(slugTaxonomy, limit, page);
  } catch (error) {
    logger.error("Failed to fetch products by slug:", error);
    return [];
  }
}

/**
 * Fetch products by taxonomy - tries slug first, falls back to ID
 */
export async function fetchProductsByTaxonomyAction(
  slugOrId: string,
  taxonomyId?: number,
  limit?: number,
  page?: number,
) {
  try {
    return await getProductsByTaxonomy(slugOrId, taxonomyId, limit, page);
  } catch (error) {
    logger.error("Failed to fetch products by taxonomy:", error);
    return [];
  }
}
