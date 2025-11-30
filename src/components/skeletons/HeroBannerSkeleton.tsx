/**
 * Skeleton component for HeroBanner - used as Suspense fallback
 * Matches the dimensions of HeroBanner for smooth loading transitions
 */
export function HeroBannerSkeleton() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-muted animate-pulse">
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="grid md:grid-cols-2 gap-8 items-center w-full">
          {/* Text content */}
          <div className="space-y-6 z-10">
            {/* Title */}
            <div className="h-12 md:h-16 bg-muted-foreground/20 rounded w-3/4" />
            {/* Subtitle */}
            <div className="h-6 md:h-8 bg-muted-foreground/20 rounded w-2/3" />
            {/* CTA Button */}
            <div className="h-12 bg-muted-foreground/20 rounded-full w-40" />
          </div>

          {/* Image placeholder */}
          <div className="hidden md:block relative h-[400px]">
            <div className="w-full h-full bg-muted-foreground/20 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Navigation buttons placeholder */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-muted-foreground/20 rounded-full" />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-muted-foreground/20 rounded-full" />

      {/* Dots placeholder */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="w-8 h-3 bg-muted-foreground/30 rounded-full" />
        <div className="w-3 h-3 bg-muted-foreground/20 rounded-full" />
      </div>
    </div>
  );
}
