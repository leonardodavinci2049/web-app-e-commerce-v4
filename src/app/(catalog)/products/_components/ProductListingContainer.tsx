import {
  fetchCategoriesAction,
  fetchProductsAction,
} from "@/app/actions/product";
import { ProductListing } from "./ProductListing/ProductListing";

interface ProductListingContainerProps {
  searchTerm?: string;
  sortCol?: number;
  sortOrd?: number;
  stockOnly?: boolean;
}

export async function ProductListingContainer({
  searchTerm,
  sortCol,
  sortOrd,
  stockOnly,
}: ProductListingContainerProps) {
  const [products, categories] = await Promise.all([
    fetchProductsAction({ searchTerm, sortCol, sortOrd, stockOnly }),
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
