import type { TransformedProduct } from "@/types/product";
import { ProductCard } from "../../category/_components/products/components/ProductCard";

interface ProductGridProps {
  products: TransformedProduct[];
  viewMode?: "grid" | "list";
}

export function ProductGrid({ products, viewMode = "grid" }: ProductGridProps) {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          : "flex flex-col gap-4"
      }
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={{
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            isNew: product.isNew,
            discount: product.discount,
            category: product.category,
          }}
          variant={viewMode}
        />
      ))}
    </div>
  );
}
