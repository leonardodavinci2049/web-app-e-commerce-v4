"use client";

import { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import type { Product } from "@/types/product";
import { LoadMoreButton } from "./LoadMoreButton";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";

// Define RawProduct to match the structure from mock-data/service
interface RawProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  subcategoryId: string;
  inStock: boolean;
  brand?: string;
  discount?: number;
  isNew?: boolean;
  specifications?: Record<string, string>;
  shipping?: {
    freeShippingMinValue: number;
    estimatedDays: string;
    returnDays: number;
  };
}

interface Category {
  id: string;
  name: string;
  subcategories?: { id: string; name: string }[];
}

interface ProductListingProps {
  initialProducts: RawProduct[];
  categories: Category[];
}

export function ProductListing({
  initialProducts,
  categories: allCategories,
}: ProductListingProps) {
  const {
    selectedCategory,
    selectedSubcategory,
    displayCount,
    loading,
    setInitialData,
    loadMore,
  } = useProductStore();

  // Initialize store with data
  useEffect(() => {
    setInitialData(initialProducts as unknown as Product[], allCategories);
  }, [initialProducts, allCategories, setInitialData]);

  // Derived state (moved from useMemo/local logic to here, using store state)
  // Ideally this should be in the store selectors, but for now we keep the logic here
  // sourcing from the store state.

  // Extrair nomes únicos de categorias a partir dos IDs
  const uniqueCategoryIds = new Set(initialProducts.map((p) => p.categoryId));
  const categories = Array.from(uniqueCategoryIds)
    .map((id) => allCategories.find((c) => c.id === id)?.name || "—")
    .filter((name) => name !== "—")
    .sort();

  // Extrair nomes de subcategorias a partir do nome da categoria selecionada
  let subcategories: string[] = [];
  if (selectedCategory) {
    // Encontrar o id da categoria pelo nome
    const categoryObj = allCategories.find((c) => c.name === selectedCategory);
    if (categoryObj) {
      const uniqueSubcategoryIds = new Set(
        initialProducts
          .filter((p) => p.categoryId === categoryObj.id)
          .map((p) => p.subcategoryId),
      );
      subcategories = Array.from(uniqueSubcategoryIds)
        .map(
          (subId) =>
            categoryObj.subcategories?.find((s) => s.id.endsWith(`-${subId}`))
              ?.name || "—",
        )
        .filter((name) => name !== "—")
        .sort();
    }
  }

  // Filtrar produtos por nome da categoria e subcategoria
  let filteredProducts = initialProducts;

  if (selectedCategory) {
    const categoryObj = allCategories.find((c) => c.name === selectedCategory);
    if (categoryObj) {
      filteredProducts = filteredProducts.filter(
        (p) => p.categoryId === categoryObj.id,
      );
    }
  }

  if (selectedSubcategory && selectedCategory) {
    const categoryObj = allCategories.find((c) => c.name === selectedCategory);
    if (categoryObj) {
      // Procurar subcategoria pelo nome
      const subObj = categoryObj.subcategories?.find(
        (s) => s.name === selectedSubcategory,
      );
      if (subObj) {
        const subId = subObj.id.split("-")[1];
        filteredProducts = filteredProducts.filter(
          (p) => p.subcategoryId === subId,
        );
      }
    }
  }

  // Produtos a exibir (com paginação), adaptando para garantir category/subcategory como nome
  const displayedProducts = filteredProducts.slice(0, displayCount).map((p) => {
    // Buscar nomes
    const categoryObj = allCategories.find((c) => c.id === p.categoryId);
    const categoryName = categoryObj?.name || "";
    let subcategoryName = "";
    if (categoryObj?.subcategories) {
      const subObj = categoryObj.subcategories.find((s) =>
        s.id.endsWith(`-${p.subcategoryId}`),
      );
      subcategoryName = subObj?.name || "";
    }

    // Cast to Product since we are adding the missing category/subcategory names
    return {
      ...p,
      category: categoryName,
      subcategory: subcategoryName,
    } as Product;
  });

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
