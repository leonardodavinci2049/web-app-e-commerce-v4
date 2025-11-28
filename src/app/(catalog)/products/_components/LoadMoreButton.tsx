"use client";

import { Loader2 } from "lucide-react";

interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
  hasMore: boolean;
}

export function LoadMoreButton({
  onClick,
  loading,
  hasMore,
}: LoadMoreButtonProps) {
  if (!hasMore) {
    return null;
  }

  return (
    <div className="flex justify-center py-8">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Carregando...
          </>
        ) : (
          "Carregar Mais Produtos"
        )}
      </button>
    </div>
  );
}
