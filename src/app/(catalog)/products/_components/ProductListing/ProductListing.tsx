import { transformProducts } from "@/lib/product-utils";
import type { Category, RawProduct } from "@/types/product";
import { ProductListingClient } from "./components/ProductListingClient";

interface ProductListingProps {
  initialProducts: RawProduct[];
  categories: Category[];
  searchTerm?: string;
}

export function ProductListing({
  initialProducts,
  categories,
  searchTerm,
}: ProductListingProps) {
  // Transformação de dados no servidor
  const transformedProducts = transformProducts(initialProducts, categories);

  return (
    <ProductListingClient
      products={transformedProducts}
      searchTerm={searchTerm}
    />
  );
}
