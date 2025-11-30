"use server";

import { revalidateTag } from "next/cache";
import { CACHE_DURATIONS, CACHE_TAGS } from "@/lib/cache-config";

/**
 * Safe wrapper for revalidateTag with error handling
 */
export async function safeRevalidateTag(
  tag: string,
  profile: string | { expire?: number } = "default",
): Promise<{ success: boolean; error?: string }> {
  try {
    revalidateTag(tag, profile);
    return { success: true };
  } catch (error) {
    console.error(`Failed to revalidate tag ${tag}:`, error);
    return { success: false, error: String(error) };
  }
}

/**
 * Revalidate a specific product and the products list
 */
export async function revalidateProductAction(
  productId: string,
): Promise<void> {
  revalidateTag(CACHE_TAGS.product(productId), {
    expire: CACHE_DURATIONS.products,
  });
  revalidateTag(CACHE_TAGS.products, { expire: CACHE_DURATIONS.products });
}

/**
 * Revalidate a specific category and the categories list
 */
export async function revalidateCategoryAction(
  categoryId: string,
): Promise<void> {
  revalidateTag(CACHE_TAGS.category(categoryId), {
    expire: CACHE_DURATIONS.navigation,
  });
  revalidateTag(CACHE_TAGS.categories, { expire: CACHE_DURATIONS.navigation });
}

/**
 * Revalidate navigation and categories cache
 */
export async function revalidateNavigationAction(): Promise<void> {
  revalidateTag(CACHE_TAGS.navigation, { expire: CACHE_DURATIONS.navigation });
  revalidateTag(CACHE_TAGS.categories, { expire: CACHE_DURATIONS.navigation });
}

/**
 * Revalidate banners cache
 */
export async function revalidateBannersAction(): Promise<void> {
  revalidateTag(CACHE_TAGS.banners, { expire: CACHE_DURATIONS.banners });
}
