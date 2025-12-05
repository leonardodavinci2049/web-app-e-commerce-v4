import { LoadMoreProducts } from "@/app/(catalog)/category/_components/products/components/LoadMoreProducts";
import { ProductCard } from "@/app/(catalog)/category/_components/products/components/ProductCard";

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
  taxonomyId?: number;
  subcategoryId?: string;
  initialCount?: number;
  viewMode?: "grid" | "list";
}

const ITEMS_PER_PAGE = 20;

/**
 * Server Component for category product grid
 * Uses LoadMoreProducts client island for pagination
 */
export function ProductGrid({
  products,
  categoryId,
  taxonomyId,
  subcategoryId,
  initialCount = ITEMS_PER_PAGE,
  viewMode = "grid",
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
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className={viewMode === "list" ? "h-auto" : "h-full"}
          >
            <ProductCard product={product} variant={viewMode} />
          </div>
        ))}
      </div>

      {/* Client Island for pagination */}
      <LoadMoreProducts
        categoryId={categoryId}
        taxonomyId={taxonomyId}
        _subcategoryId={subcategoryId}
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
