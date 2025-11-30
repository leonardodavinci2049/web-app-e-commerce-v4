import { ProductCardSkeleton } from "./ProductCardSkeleton";

interface ProductGridSkeletonProps {
  count?: number;
}

/**
 * Skeleton component for ProductGrid - used as Suspense fallback
 * Renders multiple ProductCardSkeleton components in a grid
 */
export function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton that never reorders
        <ProductCardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
}
