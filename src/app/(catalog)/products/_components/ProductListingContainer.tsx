import {
  fetchCategoriesAction,
  fetchProductsAction,
} from "@/app/actions/product";
import { ProductListing } from "./ProductListing/ProductListing";

export async function ProductListingContainer() {
  const [products, categories] = await Promise.all([
    fetchProductsAction(),
    fetchCategoriesAction(),
  ]);

  return <ProductListing initialProducts={products} categories={categories} />;
}
