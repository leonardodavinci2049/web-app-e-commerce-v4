import {
  fetchCategoriesAction,
  fetchProductsAction,
} from "@/app/actions/product";
import { ProductListing } from "./ProductListing";

export async function ProductListingContainer() {
  const [products, categories] = await Promise.all([
    fetchProductsAction(),
    fetchCategoriesAction(),
  ]);

  // Remove icon component to avoid serialization error
  const serializedCategories = categories.map((c) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { icon, ...rest } = c;
    return rest;
  });

  return (
    <ProductListing
      initialProducts={products}
      categories={serializedCategories}
    />
  );
}
