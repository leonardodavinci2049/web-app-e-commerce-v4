"use client";

import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { fetchProductsByTaxonomyAction } from "@/app/actions/product";
import type { UIProduct } from "@/lib/transformers";

interface LoadMoreProductsProps {
  categoryId: string;
  taxonomyId?: number;
  _subcategoryId?: string;
  pageSize?: number;
  sortCol?: number;
  sortOrd?: number;
  stockOnly?: boolean;
  onLoadMore: (newProducts: UIProduct[]) => void;
}

/**
 * Client component for pagination
 * Fetches more products on demand via Server Action
 */
export function LoadMoreProducts({
  categoryId,
  taxonomyId,
  _subcategoryId,
  pageSize = 30,
  sortCol,
  sortOrd,
  stockOnly,
  onLoadMore,
}: LoadMoreProductsProps) {
  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState(0);

  const handleLoadMore = () => {
    startTransition(async () => {
      const nextPage = currentPage + 1;

      // Buscar mais produtos da próxima página
      const newProducts = await fetchProductsByTaxonomyAction(
        categoryId,
        taxonomyId,
        pageSize, // limit
        nextPage, // page
        sortCol,
        sortOrd,
        stockOnly,
      );

      if (newProducts && newProducts.length > 0) {
        onLoadMore(newProducts);
        setCurrentPage(nextPage);
      }
    });
  };

  return (
    <div className="flex justify-center mt-8">
      <button
        type="button"
        onClick={handleLoadMore}
        disabled={isPending}
        className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Carregando...
          </>
        ) : (
          "Carregar mais produtos"
        )}
      </button>
    </div>
  );
}
