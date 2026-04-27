import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { createLogger } from "@/core/logger";
import { CACHE_TAGS } from "@/lib/cache-config";
import {
  type CategoryLookupResult,
  findCategoryBySlug,
  transformCategoryMenu,
  type UICategory,
} from "@/lib/transformers";
import { CategoryServiceApi } from "./category-service-api";
import type { TblTaxonomyFindById } from "./types/category-types";

const logger = createLogger("CategoryWebCachedService");

const CATEGORY_MENU_TYPE_ID = 1;
const CATEGORY_PARENT_ID = 0;

/**
 * Busca o menu hierárquico de categorias com cache.
 */
export async function getCategories(): Promise<UICategory[]> {
  "use cache";
  cacheLife("quarter");
  cacheTag(CACHE_TAGS.categories, CACHE_TAGS.navigation);

  try {
    const response = await CategoryServiceApi.findMenu({
      pe_id_tipo: CATEGORY_MENU_TYPE_ID,
      pe_parent_id: CATEGORY_PARENT_ID,
    });

    const menu = CategoryServiceApi.extractCategories(response);

    if (menu.length === 0) {
      logger.warn("No categories found in menu response");
    }

    return transformCategoryMenu(menu);
  } catch (error) {
    logger.error("Failed to fetch categories:", error);
    return [];
  }
}

/**
 * Busca uma categoria pelo slug dentro do menu hierárquico em cache.
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
    logger.error("Failed to fetch category by slug:", error);
    return null;
  }
}

/**
 * Busca detalhes de uma taxonomia por ID com cache.
 */
export async function getCategoryDetailsById(
  taxonomyId: number | string,
): Promise<TblTaxonomyFindById | null> {
  "use cache";
  cacheLife("hours");

  const normalizedId =
    typeof taxonomyId === "number"
      ? taxonomyId
      : Number.parseInt(taxonomyId, 10);

  if (Number.isNaN(normalizedId) || normalizedId <= 0) {
    logger.warn(`Invalid taxonomy ID: ${String(taxonomyId)}`);
    return null;
  }

  cacheTag(CACHE_TAGS.categories, CACHE_TAGS.category(String(normalizedId)));

  try {
    const response = await CategoryServiceApi.findByIdOrSlug({
      pe_id_taxonomy: normalizedId,
    });

    return CategoryServiceApi.extractCategoryDetails(response);
  } catch (error) {
    logger.error(
      `Failed to fetch category details by ID ${normalizedId}:`,
      error,
    );
    return null;
  }
}

/**
 * Busca detalhes de uma taxonomia por slug com cache.
 */
export async function getCategoryDetailsBySlug(
  taxonomySlug: string,
): Promise<TblTaxonomyFindById | null> {
  "use cache";
  cacheLife("hours");

  const normalizedSlug = taxonomySlug.trim();

  if (normalizedSlug.length === 0) {
    logger.warn("Invalid taxonomy slug: empty value");
    return null;
  }

  cacheTag(CACHE_TAGS.categories, CACHE_TAGS.category(normalizedSlug));

  try {
    const response = await CategoryServiceApi.findByIdOrSlug({
      pe_slug_taxonomy: normalizedSlug,
    });

    return CategoryServiceApi.extractCategoryDetails(response);
  } catch (error) {
    logger.error(
      `Failed to fetch category details by slug ${normalizedSlug}:`,
      error,
    );
    return null;
  }
}
