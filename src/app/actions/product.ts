"use server";

import { productService } from "@/services/product";

export async function fetchProductsAction() {
  return await productService.getProducts();
}

export async function fetchCategoriesAction() {
  return await productService.getCategories();
}

export async function fetchProductBySlugAction(slug: string[]) {
  return await productService.getProductBySlug(slug);
}

export async function fetchRelatedProductsAction(
  productId: string,
  categoryId: string,
) {
  return await productService.getRelatedProducts(productId, categoryId);
}

export async function fetchCategoryBySlugAction(
  categorySlug: string,
  subcategorySlug?: string,
) {
  return await productService.getCategoryBySlug(categorySlug, subcategorySlug);
}

export async function fetchProductsByCategoryAction(
  categoryId: string,
  subcategoryId?: string,
) {
  return await productService.getProductsByCategory(categoryId, subcategoryId);
}
