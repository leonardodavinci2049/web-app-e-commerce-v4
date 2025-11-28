"use client";

import { useState } from "react";
import { ProductCard } from "@/app/(home)/_components/ProductCard";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}

const ITEMS_PER_PAGE = 20;

export function ProductGrid({ products }: ProductGridProps) {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  const displayedProducts = products.slice(0, displayCount);
  const hasMore = displayCount < products.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  };

  if (products.length === 0) {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <div key={product.id} className="h-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button onClick={handleLoadMore} variant="outline" size="lg">
            Carregar Mais Produtos
          </Button>
        </div>
      )}

      <div className="text-center text-sm text-muted-foreground">
        Mostrando {displayedProducts.length} de {products.length} produtos
      </div>
    </div>
  );
}
