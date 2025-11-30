/**
 * Skeleton component for DepartmentNavigation - used as Suspense fallback
 * Matches the layout of DepartmentNavigation for smooth loading transitions
 */
export function NavigationSkeleton() {
  return (
    <section className="py-12 animate-pulse">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="h-8 bg-muted rounded w-64 mb-8" />

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton that never reorders
              key={`nav-skeleton-${index}`}
              className="flex flex-col items-center p-6 rounded-lg"
            >
              {/* Icon circle */}
              <div className="w-16 h-16 bg-muted rounded-full mb-4" />
              {/* Category name */}
              <div className="h-4 bg-muted rounded w-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
