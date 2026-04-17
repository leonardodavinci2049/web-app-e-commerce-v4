import type { UIProduct } from "@/lib/transformers";
import { ProductCard } from "../../category/_components/products/components/ProductCard";

interface RelatedProductsProps {
  products: UIProduct[];
}

/**
 * Related Products Section
 * Displays up to 8 related products in a responsive grid
 * Uses the same ProductCard component as /products and /category pages
 */
export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  // Limit to max 8 products
  const displayProducts = products.slice(0, 8);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Produtos Relacionados
        </h2>
        <p className="text-muted-foreground mb-8">
          Outros produtos que podem te interessar
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayProducts.map((product) => (
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
