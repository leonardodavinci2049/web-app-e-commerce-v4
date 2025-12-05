import {
  fetchCategoriesAction,
  fetchProductsAction,
} from "@/app/actions/product";
import { ProductListing } from "./ProductListing/ProductListing";

interface ProductListingContainerProps {
  searchTerm?: string;
  sortCol?: number;
  sortOrd?: number;
}

export async function ProductListingContainer({
  searchTerm,
  sortCol,
  sortOrd,
}: ProductListingContainerProps) {
  const [products, categories] = await Promise.all([
    fetchProductsAction({ searchTerm, sortCol, sortOrd }),
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
