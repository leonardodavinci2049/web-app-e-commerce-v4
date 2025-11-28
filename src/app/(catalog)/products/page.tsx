"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS } from "@/data/mock-data";
import { Footer } from "../../(home)/_components/Footer";
import { MobileBottomMenu } from "../../(home)/_components/MobileBottomMenu";
import { LoadMoreButton } from "./_components/LoadMoreButton";
import { ProductFilters } from "./_components/ProductFilters";
import { ProductGrid } from "./_components/ProductGrid";

const PRODUCTS_PER_PAGE = 20;

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [displayCount, setDisplayCount] = useState(PRODUCTS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  // Extrair nomes únicos de categorias a partir dos IDs
  const categories = useMemo(() => {
    const uniqueCategoryIds = new Set(PRODUCTS.map((p) => p.categoryId));
    const names = Array.from(uniqueCategoryIds)
      .map((id) => CATEGORIES.find((c) => c.id === id)?.name || "—")
      .filter((name) => name !== "—");
    return names.sort();
  }, []);

  // Extrair nomes de subcategorias a partir do nome da categoria selecionada
  const subcategories = useMemo(() => {
    if (!selectedCategory) return [];
    // Encontrar o id da categoria pelo nome
    const categoryObj = CATEGORIES.find((c) => c.name === selectedCategory);
    if (!categoryObj) return [];
    const uniqueSubcategoryIds = new Set(
      PRODUCTS.filter((p) => p.categoryId === categoryObj.id).map(
        (p) => p.subcategoryId,
      ),
    );
    const names = Array.from(uniqueSubcategoryIds)
      .map(
        (subId) =>
          categoryObj.subcategories?.find((s) => s.id.endsWith(`-${subId}`))
            ?.name || "—",
      )
      .filter((name) => name !== "—");
    return names.sort();
  }, [selectedCategory]);

  // Filtrar produtos por nome da categoria e subcategoria
  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS;

    if (selectedCategory) {
      const categoryObj = CATEGORIES.find((c) => c.name === selectedCategory);
      if (categoryObj) {
        filtered = filtered.filter((p) => p.categoryId === categoryObj.id);
      }
    }

    if (selectedSubcategory && selectedCategory) {
      const categoryObj = CATEGORIES.find((c) => c.name === selectedCategory);
      if (categoryObj) {
        // Procurar subcategoria pelo nome
        const subObj = categoryObj.subcategories?.find(
          (s) => s.name === selectedSubcategory,
        );
        if (subObj) {
          const subId = subObj.id.split("-")[1];
          filtered = filtered.filter((p) => p.subcategoryId === subId);
        }
      }
    }

    return filtered;
  }, [selectedCategory, selectedSubcategory]);

  // Produtos a exibir (com paginação), adaptando para garantir category/subcategory como nome
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, displayCount).map((p) => {
      // Buscar nomes
      const categoryObj = CATEGORIES.find((c) => c.id === p.categoryId);
      const categoryName = categoryObj?.name || "";
      let subcategoryName = "";
      if (categoryObj?.subcategories) {
        const subObj = categoryObj.subcategories.find((s) =>
          s.id.endsWith(`-${p.subcategoryId}`),
        );
        subcategoryName = subObj?.name || "";
      }
      return {
        ...p,
        category: categoryName,
        subcategory: subcategoryName,
      };
    });
  }, [filteredProducts, displayCount]);

  // Verificar se há mais produtos
  const hasMore = displayCount < filteredProducts.length;

  // Handler para carregar mais produtos
  const handleLoadMore = () => {
    setLoading(true);
    // Simular delay de carregamento
    setTimeout(() => {
      setDisplayCount((prev) => prev + PRODUCTS_PER_PAGE);
      setLoading(false);
    }, 500);
  };

  // Handler para mudança de categoria
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory("");
    setDisplayCount(PRODUCTS_PER_PAGE);
  };

  // Handler para mudança de subcategoria
  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setDisplayCount(PRODUCTS_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <main className="grow">
        {/* Título */}
        <section className="bg-background py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Nossos Produtos
            </h1>
          </div>
        </section>

        {/* Filtros */}
        <ProductFilters
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          onCategoryChange={handleCategoryChange}
          onSubcategoryChange={handleSubcategoryChange}
          categories={categories}
          subcategories={subcategories}
        />

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
                  onClick={handleLoadMore}
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
      </main>

      <Footer />
      <MobileBottomMenu />
    </div>
  );
}
