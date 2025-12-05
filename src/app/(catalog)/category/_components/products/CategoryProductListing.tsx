"use client";

import { useState } from "react";
import { ProductSorter } from "@/components/product/ProductSorter";
import { StockFilter } from "@/components/product/StockFilter";
import { ViewToggle } from "@/components/product/ViewToggle";
import { ProductGrid } from "./product-grid";

interface CategoryProductListingProps {
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    isNew?: boolean;
    discount?: number;
    category: string;
    categoryId?: string;
    subcategoryId?: string;
  }>;
  categoryId: string;
  taxonomyId?: number;
  initialCount?: number;
}

export function CategoryProductListing({
  products,
  categoryId,
  taxonomyId,
  initialCount,
}: CategoryProductListingProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-background py-2 border-b border-border">
        <p className="text-sm text-muted-foreground">
          {products.length} produtos encontrados
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <StockFilter />
          <ProductSorter />
          <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
        </div>
      </div>

      <ProductGrid
        products={products}
        categoryId={categoryId}
        taxonomyId={taxonomyId}
        initialCount={initialCount}
        viewMode={viewMode}
      />
    </div>
  );
}
