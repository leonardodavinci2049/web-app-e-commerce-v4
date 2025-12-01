import { ProductCard } from "@/app/(home)/_components/product/ProductCard";
import { LoadMoreProducts } from "@/components/product/LoadMoreProducts";

interface ProductGridProps {
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
  subcategoryId?: string;
  initialCount?: number;
}

const ITEMS_PER_PAGE = 20;

/**
 * Server Component for category product grid
 * Uses LoadMoreProducts client island for pagination
 */
export function ProductGrid({
  products,
  categoryId,
  subcategoryId,
  initialCount = ITEMS_PER_PAGE,
}: ProductGridProps) {
  const displayedProducts = products.slice(0, initialCount);
  const totalCount = products.length;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          Nenhum produto encontrado nesta categoria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <div key={product.id} className="h-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Client Island for pagination */}
      <LoadMoreProducts
        categoryId={categoryId}
        subcategoryId={subcategoryId}
        initialCount={initialCount}
        totalCount={totalCount}
        pageSize={ITEMS_PER_PAGE}
      />

      <div className="text-center text-sm text-muted-foreground">
        Mostrando {displayedProducts.length} de {totalCount} produtos
      </div>
    </div>
  );
}
