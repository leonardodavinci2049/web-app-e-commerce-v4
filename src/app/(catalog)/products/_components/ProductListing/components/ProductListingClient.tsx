"use client";

import { useState } from "react";
import type { CategoryMap, TransformedProduct } from "@/types/product";
import { LoadMoreButton } from "../../LoadMoreButton";
import { ProductGrid } from "../../ProductGrid";
import { ProductFilters } from "./ProductFilters";

const PRODUCTS_PER_PAGE = 20;

import { ProductSorter } from "@/components/product/ProductSorter";
import { StockFilter } from "@/components/product/StockFilter";
import { ViewToggle } from "@/components/product/ViewToggle";

interface ProductListingClientProps {
  products: TransformedProduct[];
  categories: string[];
  categoryMap: CategoryMap;
  searchTerm?: string;
}

// ... existing imports

export function ProductListingClient({
  products,
  categories,
  categoryMap,
  searchTerm,
}: ProductListingClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [displayCount, setDisplayCount] = useState(PRODUCTS_PER_PAGE);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory("");
    setDisplayCount(PRODUCTS_PER_PAGE);
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setDisplayCount(PRODUCTS_PER_PAGE);
  };

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + PRODUCTS_PER_PAGE);
      setLoading(false);
    }, 500);
  };

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
      <ProductFilters
        categories={categories}
        subcategories={subcategories}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        onCategoryChange={handleCategoryChange}
        onSubcategoryChange={handleSubcategoryChange}
      />

      {/* Contador de Produtos e Toggle de Visualização */}
      <section className="bg-background py-4 border-b border-border">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Mostrando {displayedProducts.length} de {filteredProducts.length}{" "}
            produtos
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <StockFilter />
            <ProductSorter />
            <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
          </div>
        </div>
      </section>

      {/* Grid de Produtos */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {displayedProducts.length > 0 ? (
            <>
              <ProductGrid products={displayedProducts} viewMode={viewMode} />
              <LoadMoreButton
                onClick={loadMore}
                loading={loading}
                hasMore={hasMore}
              />
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                {searchTerm
                  ? `Nenhum produto encontrado para "${searchTerm}".`
                  : "Nenhum produto encontrado com os filtros selecionados."}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
