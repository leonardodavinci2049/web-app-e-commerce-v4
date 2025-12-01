import type { Product } from "@/types/product";
import { ProductCard } from "../../../(home)/_components/product/ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
        />
      ))}
    </div>
  );
}
