"use client";

import { useState } from "react";
import { ProductSorter } from "@/components/product/ProductSorter";
import { StockFilter } from "@/components/product/StockFilter";
import { ViewToggle } from "@/components/product/ViewToggle";
import type { UIProduct } from "@/lib/transformers";
import { ProductGrid } from "./product-grid";

interface CategoryProductListingProps {
  products: UIProduct[];
  categoryId: string;
  taxonomyId?: number;
  sortCol?: number;
  sortOrd?: number;
  stockOnly?: boolean;
}

export function CategoryProductListing({
  products,
  categoryId,
  taxonomyId,
  sortCol,
  sortOrd,
  stockOnly,
}: CategoryProductListingProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 bg-background py-2 border-b border-border">
        <p className="text-sm text-muted-foreground">
          {products.length} produtos encontrados
        </p>

        <div className="flex items-center justify-between gap-2">
          <StockFilter />
          <ProductSorter />
          <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
        </div>
      </div>

      <ProductGrid
        products={products}
        categoryId={categoryId}
        taxonomyId={taxonomyId}
        sortCol={sortCol}
        sortOrd={sortOrd}
        stockOnly={stockOnly}
        viewMode={viewMode}
      />
    </div>
  );
}
