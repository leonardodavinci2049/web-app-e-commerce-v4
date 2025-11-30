/**
 * Skeleton component for ProductCard - used as Suspense fallback
 * Matches the layout of ProductCard for smooth loading transitions
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col h-full animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-square bg-muted" />

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        {/* Category */}
        <div className="h-3 bg-muted rounded w-1/4 mb-2" />

        {/* Product name */}
        <div className="h-4 bg-muted rounded w-3/4 mb-1" />
        <div className="h-4 bg-muted rounded w-1/2 mb-4" />

        <div className="mt-auto">
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <div className="h-6 bg-muted rounded w-24" />
            <div className="h-4 bg-muted rounded w-16" />
          </div>

          {/* Button */}
          <div className="h-10 bg-muted rounded w-full" />
        </div>
      </div>
    </div>
  );
}
