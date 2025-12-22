import { Suspense } from "react";
import { fetchProductsAction } from "@/app/actions/product";
import { ProductDetailSkeleton } from "@/components/skeletons";
import { generateSlug } from "@/lib/slug";
import { ProductDetailContainer } from "../_components/ProductDetailContainer";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

/**
 * Generate static params for all product pages
 * Pre-renders product detail pages at build time for cache warming
 * Returns empty array if API is unavailable (pages will be generated on-demand)
 */
export async function generateStaticParams() {
  try {
    const products = await fetchProductsAction();

    // If no products, return empty array - pages will be generated on-demand
    if (!products || products.length === 0) {
      return [];
    }

    return products.map((product) => ({
      slug: [generateSlug(product.name, product.id)],
    }));
  } catch (_error) {
    // Return empty array on error - pages will be generated on-demand at runtime
    console.warn(
      "[generateStaticParams] Skipping pre-render - API unavailable during build",
    );
    return [];
  }
}

/**
 * Product detail page with Suspense boundary
 * Uses ProductDetailSkeleton as fallback for better UX
 */
export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return (
    <div className="min-h-screen bg-background font-sans pb-12">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailContainer params={params} />
      </Suspense>
    </div>
  );
}
