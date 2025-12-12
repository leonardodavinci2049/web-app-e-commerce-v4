"use client";

import { useEffect, useState } from "react";
import { LoadMoreProducts } from "@/app/(catalog)/category/_components/products/components/LoadMoreProducts";
import { ProductCard } from "@/app/(catalog)/category/_components/products/components/ProductCard";
import type { UIProduct } from "@/lib/transformers";

interface ProductGridProps {
  products: UIProduct[];
  categoryId: string;
  taxonomyId?: number;
  subcategoryId?: string;
  viewMode?: "grid" | "list";
  sortCol?: number;
  sortOrd?: number;
  stockOnly?: boolean;
}

const ITEMS_PER_PAGE = 30;

/**
 * Client Component for category product grid
 * Uses LoadMoreProducts client island for pagination
 */
export function ProductGrid({
  products: initialProducts,
  categoryId,
  taxonomyId,
  subcategoryId,
  sortCol,
  sortOrd,
  stockOnly,
  viewMode = "grid",
}: ProductGridProps) {
  const [allProducts, setAllProducts] = useState(initialProducts);
  const [hasMore, setHasMore] = useState(
    initialProducts.length >= ITEMS_PER_PAGE,
  );

  // Important: `allProducts` is derived from props, so it must reset when the
  // server sends a new product list (e.g. changing `stock=1` or sort params).
  useEffect(() => {
    setAllProducts(initialProducts);
    setHasMore(initialProducts.length >= ITEMS_PER_PAGE);
  }, [initialProducts]);

  const handleLoadMore = (newProducts: UIProduct[]) => {
    setAllProducts((prev) => [...prev, ...newProducts]);
    // Se retornou menos que ITEMS_PER_PAGE, não há mais produtos
    setHasMore(newProducts.length >= ITEMS_PER_PAGE);
  };

  if (allProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          Nenhum produto encontrado nesta categoria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6"
            : "flex flex-col gap-4"
        }
      >
        {allProducts.map((product) => (
          <div
            key={product.id}
            className={viewMode === "list" ? "h-auto" : "h-full"}
          >
            <ProductCard product={product} variant={viewMode} />
          </div>
        ))}
      </div>

      {/* Client Island for pagination */}
      {hasMore && (
        <LoadMoreProducts
          key={`${categoryId}:${taxonomyId ?? ""}:${sortCol ?? ""}:${sortOrd ?? ""}:${stockOnly ? "1" : "0"}`}
          categoryId={categoryId}
          taxonomyId={taxonomyId}
          _subcategoryId={subcategoryId}
          pageSize={ITEMS_PER_PAGE}
          sortCol={sortCol}
          sortOrd={sortOrd}
          stockOnly={stockOnly}
          onLoadMore={handleLoadMore}
        />
      )}

      <div className="text-center text-sm text-muted-foreground">
        Mostrando {allProducts.length} produto
        {allProducts.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
