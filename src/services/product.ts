import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-config";
import { createLogger } from "@/core/logger";
import {
  transformProductList,
  transformProductDetail,
  transformRelatedProducts,
  transformCategoryMenu,
  findCategoryBySlug,
  type UIProduct,
  type UICategory,
  type CategoryLookupResult,
} from "@/lib/transformers";
import { ProductWebServiceApi } from "@/services/api-main/product/product-service-api";
import { CategoryServiceApi } from "@/services/api-main/category/category-service-api";

const logger = createLogger("ProductService");

// ============================================================================
// Product Functions
// ============================================================================

/**
 * Fetch all products with cache
 * Uses ProductWebServiceApi.findProducts
 */
export async function getProducts(
  params: {
    taxonomyId?: number;
    brandId?: number;
    limit?: number;
    page?: number;
  } = {},
): Promise<UIProduct[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.products);

  try {
    const response = await ProductWebServiceApi.findProducts({
      pe_id_taxonomy: params.taxonomyId ?? 0,
      pe_id_marca: params.brandId ?? 0,
      pe_qt_registros: params.limit ?? 20,
      pe_pagina_id: params.page ?? 0,
    });

    const products = ProductWebServiceApi.extractProductList(response);
    return transformProductList(products);
  } catch (error) {
    logger.error("Failed to fetch products:", error);
    return [];
  }
}


/**
 * Fetch a product by ID with cache
 * Uses ProductWebServiceApi.findProductById
 */
export async function getProductById(
  id: string,
): Promise<UIProduct | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.product(id), CACHE_TAGS.products);

  try {
    const response = await ProductWebServiceApi.findProductById({
      pe_id_produto: Number.parseInt(id, 10),
      pe_slug_produto: "",
    });

    const product = ProductWebServiceApi.extractProduct(response);
    if (!product) {
      return undefined;
    }

    return transformProductDetail(product);
  } catch (error) {
    logger.error(`Failed to fetch product by ID ${id}:`, error);
    return undefined;
  }
}

/**
 * Fetch a product by slug with cache
 * Extracts product ID from slug and uses findProductById
 */
export async function getProductBySlug(
  slug: string[],
): Promise<UIProduct | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.products);

  try {
    const fullSlug = slug.join("/");
    // Extract ID from slug (format: product-name-123)
    const parts = fullSlug.split("-");
    const id = parts[parts.length - 1];

    if (!id || Number.isNaN(Number.parseInt(id, 10))) {
      logger.error(`Invalid product slug: ${fullSlug}`);
      return undefined;
    }

    const response = await ProductWebServiceApi.findProductById({
      pe_id_produto: Number.parseInt(id, 10),
      pe_slug_produto: fullSlug,
    });

    const product = ProductWebServiceApi.extractProduct(response);
    if (!product) {
      return undefined;
    }

    return transformProductDetail(product);
  } catch (error) {
    logger.error(`Failed to fetch product by slug:`, error);
    return undefined;
  }
}

/**
 * Fetch related products with cache
 * Uses taxonomy ID to find products in the same category
 */
export async function getRelatedProducts(
  productId: string,
  taxonomyId: string,
): Promise<UIProduct[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.products, CACHE_TAGS.category(taxonomyId));

  try {
    const response = await ProductWebServiceApi.findProducts({
      pe_id_taxonomy: Number.parseInt(taxonomyId, 10),
      pe_qt_registros: 10,
    });

    const products = ProductWebServiceApi.extractProductList(response);
    // Filter out the current product
    return transformProductList(products).filter((p) => p.id !== productId);
  } catch (error) {
    logger.error(`Failed to fetch related products:`, error);
    return [];
  }
}

/**
 * Fetch products by category with cache
 * Uses pe_id_taxonomy to filter by category
 */
export async function getProductsByCategory(
  categoryId: string,
  subcategoryId?: string,
): Promise<UIProduct[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.products, CACHE_TAGS.category(categoryId));

  try {
    // Use subcategory ID if provided, otherwise use category ID
    const taxonomyId = subcategoryId
      ? Number.parseInt(subcategoryId, 10)
      : Number.parseInt(categoryId, 10);

    const response = await ProductWebServiceApi.findProducts({
      pe_id_taxonomy: taxonomyId,
      pe_qt_registros: 50,
    });

    const products = ProductWebServiceApi.extractProductList(response);
    return transformProductList(products);
  } catch (error) {
    logger.error(`Failed to fetch products by category:`, error);
    return [];
  }
}


// ============================================================================
// Category Functions
// ============================================================================

// pe_id_tipo for category menu (0 = all categories)
const CATEGORY_MENU_TYPE_ID = 0;

/**
 * Fetch all categories (menu) with cache
 * Uses CategoryServiceApi.findMenu
 */
export async function getCategories(): Promise<UICategory[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.categories, CACHE_TAGS.navigation);

  try {
    const response = await CategoryServiceApi.findMenu({
      pe_id_tipo: CATEGORY_MENU_TYPE_ID,
    });

    const menu = CategoryServiceApi.extractCategories(response);
    return transformCategoryMenu(menu);
  } catch (error) {
    logger.error("Failed to fetch categories:", error);
    return [];
  }
}

/**
 * Fetch category by slug with cache
 * Searches the hierarchical menu structure for matching slug
 */
export async function getCategoryBySlug(
  categorySlug: string,
  subcategorySlug?: string,
): Promise<CategoryLookupResult | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.categories);

  try {
    const categories = await getCategories();
    return findCategoryBySlug(categories, categorySlug, subcategorySlug);
  } catch (error) {
    logger.error(`Failed to fetch category by slug:`, error);
    return null;
  }
}
