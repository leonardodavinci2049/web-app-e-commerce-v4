import {
  fetchCategoriesAction,
  fetchProductsAction,
} from "@/app/actions/product";
import { ProductListing } from "./ProductListing/ProductListing";

interface ProductListingContainerProps {
  searchTerm?: string;
}

export async function ProductListingContainer({
  searchTerm,
}: ProductListingContainerProps) {
  const [products, categories] = await Promise.all([
    fetchProductsAction({ searchTerm }),
    fetchCategoriesAction(),
  ]);

  return (
    <ProductListing
      initialProducts={products}
      categories={categories}
      searchTerm={searchTerm}
    />
  );
}
