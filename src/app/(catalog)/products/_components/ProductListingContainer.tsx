import { notFound } from "next/navigation";
import {
  fetchCategoriesAction,
  fetchProductsForListingAction,
} from "@/app/actions/product";
import { PaginationNav } from "@/components/product/PaginationNav";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/seo";
import { getProductPath } from "@/lib/slug";
import { toTitleCase } from "@/lib/text-utils";
import { ProductListing } from "./ProductListing/ProductListing";

const PRODUCTS_PER_PAGE = 30;

interface ProductListingContainerProps {
  searchTerm?: string;
  sortCol?: number;
  sortOrd?: number;
  stockOnly?: boolean;
  page?: number;
}

export async function ProductListingContainer({
  searchTerm,
  sortCol,
  sortOrd,
  stockOnly,
  page = 1,
}: ProductListingContainerProps) {
  const [productsRaw, categories] = await Promise.all([
    fetchProductsForListingAction({
      searchTerm,
      sortCol,
      sortOrd,
      stockOnly,
      limit: PRODUCTS_PER_PAGE + 1,
      page,
    }),
    fetchCategoriesAction(),
  ]);

  const hasNextPage = productsRaw.length > PRODUCTS_PER_PAGE;
  const products = hasNextPage
    ? productsRaw.slice(0, PRODUCTS_PER_PAGE)
    : productsRaw;

  if (page > 1 && products.length === 0) {
    notFound();
  }

  // Build params to preserve in pagination URLs
  const paginationParams: Record<string, string | undefined> = {};
  if (searchTerm) paginationParams.q = searchTerm;
  if (sortCol !== undefined) paginationParams.sort_col = String(sortCol);
  if (sortOrd !== undefined) paginationParams.sort_ord = String(sortOrd);
  if (stockOnly) paginationParams.stock = "1";

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
            image: p.image,
            position: (page - 1) * PRODUCTS_PER_PAGE + i + 1,
          }))}
        />
      )}
      <ProductListing
        initialProducts={products}
        categories={categories}
        searchTerm={searchTerm}
      />
      <PaginationNav
        currentPage={page}
        hasNextPage={hasNextPage}
        basePath="/products"
        params={paginationParams}
      />
    </>
  );
}
