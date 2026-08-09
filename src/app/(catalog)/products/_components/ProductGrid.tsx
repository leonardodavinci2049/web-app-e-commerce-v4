import type { TransformedProduct } from "@/types/product";
import { ProductCard } from "../../category/_components/products/components/ProductCard";

interface ProductGridProps {
  products: TransformedProduct[];
  viewMode?: "grid" | "list";
  trackingListId?: string;
  trackingListName?: string;
}

export function ProductGrid({
  products,
  viewMode = "grid",
  trackingListId,
  trackingListName,
}: ProductGridProps) {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
          : "flex flex-col gap-4"
      }
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={{
            id: product.id,
            sku: product.sku,
            name: product.name,
            price: product.price,
            image: product.image,
            isNew: product.isNew,
            discount: product.discount,
            category: product.category,
            brand: product.brand,
            inStock: product.inStock,
          }}
          variant={viewMode}
          priority={index < 4}
          trackingListId={trackingListId}
          trackingListName={trackingListName}
        />
      ))}
    </div>
  );
}
