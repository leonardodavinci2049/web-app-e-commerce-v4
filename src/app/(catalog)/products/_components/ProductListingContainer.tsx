import {
  fetchCategoriesAction,
  fetchProductsAction,
} from "@/app/actions/product";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/seo";
import { getProductPath } from "@/lib/slug";
import { toTitleCase } from "@/lib/text-utils";
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
    <>
      {/* Breadcrumb JSON-LD para rich results */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Todos os Produtos", url: "/products" },
        ]}
      />
      {/* ItemList JSON-LD para rich results de listagem */}
      {products.length > 0 && (
        <ItemListJsonLd
          name="Todos os Produtos"
          items={products.slice(0, 30).map((p, i) => ({
            name: toTitleCase(p.name),
            url: getProductPath(p.name, p.id),
            position: i + 1,
          }))}
        />
      )}
      <ProductListing
        initialProducts={products}
        categories={categories}
        searchTerm={searchTerm}
      />
    </>
  );
}
