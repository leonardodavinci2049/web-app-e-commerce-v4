"use client";

import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { fetchProductsByCategoryAction } from "@/app/actions/product";

interface LoadMoreProductsProps {
  categoryId: string;
  subcategoryId?: string;
  initialCount: number;
  totalCount: number;
  pageSize?: number;
}

/**
 * Client component for pagination
 * Fetches more products on demand via Server Action
 */
export function LoadMoreProducts({
  categoryId,
  subcategoryId,
  initialCount,
  totalCount,
  pageSize = 8,
}: LoadMoreProductsProps) {
  const [displayedCount, setDisplayedCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();

  const hasMore = displayedCount < totalCount;

  const handleLoadMore = () => {
    startTransition(async () => {
      // Simulate loading more products
      // In a real app, this would fetch the next page
      await fetchProductsByCategoryAction(categoryId, subcategoryId);
      setDisplayedCount((prev) => Math.min(prev + pageSize, totalCount));
    });
  };

  if (!hasMore) {
    return null;
  }

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
          `Carregar mais (${totalCount - displayedCount} restantes)`
        )}
      </button>
    </div>
  );
}
