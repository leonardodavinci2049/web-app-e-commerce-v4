import { ProductGridSkeleton } from "./ProductGridSkeleton";

/**
 * Skeleton component for ProductDetail page - used as Suspense fallback
 * Includes gallery, info, tabs, and related products sections
 */
export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-4 bg-muted rounded w-12" />
        <div className="h-4 bg-muted rounded w-2" />
        <div className="h-4 bg-muted rounded w-16" />
        <div className="h-4 bg-muted rounded w-2" />
        <div className="h-4 bg-muted rounded w-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Gallery Skeleton */}
        <ProductGallerySkeleton />

        {/* Info Skeleton */}
        <ProductInfoSkeleton />
      </div>

      {/* Tabs Skeleton */}
      <div className="mb-16">
        <ProductTabsSkeleton />
      </div>

      {/* Related Products Skeleton */}
      <div>
        <div className="h-8 bg-muted rounded w-48 mb-6" />
        <ProductGridSkeleton count={4} />
      </div>
    </div>
  );
}

function ProductGallerySkeleton() {
  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-square bg-muted rounded-lg" />
      {/* Thumbnails */}
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton that never reorders
          <div key={`thumb-${i}`} className="w-20 h-20 bg-muted rounded" />
        ))}
      </div>
    </div>
  );
}

function ProductInfoSkeleton() {
  return (
    <div className="space-y-6">
      {/* Category */}
      <div className="h-4 bg-muted rounded w-24" />
      {/* Title */}
      <div className="h-8 bg-muted rounded w-3/4" />
      {/* Rating */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton that never reorders
          <div key={`star-${i}`} className="w-5 h-5 bg-muted rounded" />
        ))}
        <div className="h-5 bg-muted rounded w-16 ml-2" />
      </div>
      {/* Price */}
      <div className="space-y-2">
        <div className="h-10 bg-muted rounded w-32" />
        <div className="h-5 bg-muted rounded w-24" />
      </div>
      {/* Quantity selector */}
      <div className="flex items-center gap-4">
        <div className="h-10 bg-muted rounded w-32" />
      </div>
      {/* Buttons */}
      <div className="space-y-3">
        <div className="h-12 bg-muted rounded w-full" />
        <div className="h-12 bg-muted rounded w-full" />
      </div>
      {/* Shipping info */}
      <div className="h-20 bg-muted rounded w-full" />
    </div>
  );
}

function ProductTabsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Tab headers */}
      <div className="flex gap-4 border-b border-border pb-2">
        <div className="h-8 bg-muted rounded w-24" />
        <div className="h-8 bg-muted rounded w-32" />
        <div className="h-8 bg-muted rounded w-20" />
      </div>
      {/* Tab content */}
      <div className="space-y-3 pt-4">
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-4 bg-muted rounded w-4/6" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-3/4" />
      </div>
    </div>
  );
}
