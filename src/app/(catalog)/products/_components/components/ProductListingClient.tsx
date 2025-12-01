"use client";

import { useProductStore } from "@/store/useProductStore";
import type { CategoryMap, TransformedProduct } from "@/types/product";
import { LoadMoreButton } from "../LoadMoreButton";
import { ProductFilters } from "../ProductFilters";
import { ProductGrid } from "../ProductGrid";

interface ProductListingClientProps {
  products: TransformedProduct[];
  categories: string[];
  categoryMap: CategoryMap;
}

export function ProductListingClient({
  products,
  categories,
  categoryMap,
}: ProductListingClientProps) {
  const {
    selectedCategory,
    selectedSubcategory,
    displayCount,
    loading,
    loadMore,
  } = useProductStore();

  // Subcategorias baseadas na categoria selecionada
  const subcategories = selectedCategory
    ? categoryMap[selectedCategory] || []
    : [];

  // Filtrar produtos por categoria e subcategoria
  let filteredProducts = products;

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory,
    );
  }

  if (selectedSubcategory && selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.subcategory === selectedSubcategory,
    );
  }

  // Produtos a exibir (com paginação)
  const displayedProducts = filteredProducts.slice(0, displayCount);

  // Verificar se há mais produtos
  const hasMore = displayCount < filteredProducts.length;

  return (
    <>
      {/* Filtros */}
      <ProductFilters categories={categories} subcategories={subcategories} />

      {/* Contador de Produtos */}
      <section className="bg-background py-4 border-b border-border">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground">
            Mostrando {displayedProducts.length} de {filteredProducts.length}{" "}
            produtos
          </p>
        </div>
      </section>

      {/* Grid de Produtos */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {displayedProducts.length > 0 ? (
            <>
              <ProductGrid products={displayedProducts} />
              <LoadMoreButton
                onClick={loadMore}
                loading={loading}
                hasMore={hasMore}
              />
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                Nenhum produto encontrado com os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
