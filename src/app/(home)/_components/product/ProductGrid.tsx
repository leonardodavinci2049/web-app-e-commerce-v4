import {
  fetchCategoriesAction,
  fetchProductsAction,
} from "@/app/actions/product";
import { cn } from "@/lib/utils";
import { ProductCardHome } from "./components/ProductCardHome";

interface ProductGridProps {
  title: string;
  categoryId?: string;
  limit?: number;
  className?: string;
}

/**
 * Async Server Component - fetches products via Server Action
 * Cacheable with granular invalidation via cache tags
 */
export async function ProductGrid({
  title,
  categoryId,
  limit = 8,
  className,
}: ProductGridProps) {
  // Fetch products and categories via Server Actions
  const [allProducts, categories] = await Promise.all([
    fetchProductsAction(),
    fetchCategoriesAction(),
  ]);

  // Filter by category if specified
  let products = categoryId
    ? allProducts.filter((p) => p.categoryId === categoryId)
    : allProducts;

  // Apply limit
  products = products.slice(0, limit);

  // Map category names
  const getCategoryName = (catId?: string) =>
    categories.find((c) => c.id === catId)?.name || "—";

  // Transform products to include category name
  const productsWithCategory = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    isNew: product.isNew,
    discount: product.discount,
    category: getCategoryName(product.categoryId),
  }));

  return (
    <section className={cn("py-12 bg-background", className)}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-foreground relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-1 after:bg-primary after:rounded-full">
            {title}
          </h2>
          <a
            href="/products"
            className="text-primary hover:underline font-medium text-sm"
          >
            Ver todos
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsWithCategory.map((product) => (
            <ProductCardHome key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
