import { cache } from "react";
import {
  fetchCategoriesAction,
  fetchProductWithRelatedAction,
} from "@/app/actions/product";
import type { ProductWithRelated } from "@/services/api-main/product/product-web-cached-service";

/**
 * Deduplicates the product data fetch within a single request.
 * Both generateMetadata and ProductDetailContainer call this —
 * React's cache() ensures the API is only called once per render pass.
 *
 * Uses a string key (slug joined) so Object.is comparison works correctly.
 */
export const getProductData = cache(
  async (slugKey: string): Promise<ProductWithRelated | undefined> => {
    const slug = slugKey.split("/");
    return fetchProductWithRelatedAction(slug);
  },
);

/**
 * Deduplicates category fetch within a single request.
 */
export const getCategoriesData = cache(async () => {
  return fetchCategoriesAction();
});
