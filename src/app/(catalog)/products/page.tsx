"use client";

import { useMemo, useState } from "react";
import { PRODUCTS } from "@/data/mock-data";
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

  // Extrair categorias únicas
  const categories = useMemo(() => {
    const uniqueCategories = new Set(PRODUCTS.map((p) => p.category));
    return Array.from(uniqueCategories).sort();
  }, []);

  // Extrair subcategorias da categoria selecionada
  const subcategories = useMemo(() => {
    if (!selectedCategory) return [];
    const uniqueSubcategories = new Set(
      PRODUCTS.filter((p) => p.category === selectedCategory).map(
        (p) => p.subcategory,
      ),
    );
    return Array.from(uniqueSubcategories).sort();
  }, [selectedCategory]);

  // Filtrar produtos
  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedSubcategory) {
      filtered = filtered.filter((p) => p.subcategory === selectedSubcategory);
    }

    return filtered;
  }, [selectedCategory, selectedSubcategory]);

  // Produtos a exibir (com paginação)
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, displayCount);
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
