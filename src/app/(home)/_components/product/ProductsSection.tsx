/**
 * ProductsSection Component
 * Grid section for displaying products
 */

import type { Product } from "@/types/home";
import { ProductCardHome } from "./components/ProductCardHome";

interface ProductsSectionProps {
  title: string;
  subtitle?: string;
  products?: Product[];
  id?: string;
  emptyMessage?: string;
  isLoading?: boolean;
}

export default function ProductsSection({
  title,
  subtitle,
  products = [],
  id,
  emptyMessage = "Nenhum produto disponivel no momento.",
  isLoading = false,
}: ProductsSectionProps) {
  const skeletonItems = Array.from({ length: 8 }, (_, index) => ({
    id: index,
  }));

  if (isLoading) {
    return (
      <section id={id} className="py-12 px-4 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {title}
            </h2>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {skeletonItems.map((item) => (
              <div
                key={`skeleton-${item.id}`}
                className="bg-card border border-border rounded-lg overflow-hidden shadow-sm animate-pulse"
              >
                <div className="aspect-square bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-9 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section id={id} className="py-12 px-4 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {title}
            </h2>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>

          <div className="border border-dashed border-border rounded-lg p-10 text-center">
            <p className="text-muted-foreground text-sm md:text-base">
              {emptyMessage}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="py-12 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {title}
          </h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>

        {/* Products Grid - Responsive */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCardHome key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
