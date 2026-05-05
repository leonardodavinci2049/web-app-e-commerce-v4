import { cacheLife } from "next/cache";
import {
  fetchCategoriesAction,
  fetchProductWithRelatedAction,
} from "@/app/actions/product";
import type { ProductWithRelated } from "@/services/api-main/product/product-web-cached-service";

/**
 * Cached product detail fetch shared by metadata, canonical redirect and UI.
 * Uses a string key (slug joined) so the cache key stays serializable.
 */
export async function getProductData(
  slugKey: string,
): Promise<ProductWithRelated | undefined> {
  "use cache";
  cacheLife("hours");

  const slug = slugKey.split("/");
  return fetchProductWithRelatedAction(slug);
}

/**
 * Cached category fetch shared by product detail sections.
 */
export async function getCategoriesData() {
  "use cache";
  cacheLife("hours");

  return fetchCategoriesAction();
}
