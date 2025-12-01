import {
  extractCategoryMap,
  extractUniqueCategories,
  transformProducts,
} from "@/lib/product-utils";
import type { Category, RawProduct } from "@/types/product";
import { ProductListingClient } from "./components/ProductListingClient";

interface ProductListingProps {
  initialProducts: RawProduct[];
  categories: Category[];
}

export function ProductListing({
  initialProducts,
  categories,
}: ProductListingProps) {
  // Transformação de dados no servidor
  const transformedProducts = transformProducts(initialProducts, categories);
  const uniqueCategories = extractUniqueCategories(initialProducts, categories);
  const categoryMap = extractCategoryMap(initialProducts, categories);

  return (
    <ProductListingClient
      products={transformedProducts}
      categories={uniqueCategories}
      categoryMap={categoryMap}
    />
  );
}
