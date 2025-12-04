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
 * Returns a placeholder if no products are available (required by Next.js Cache Components)
 */
export async function generateStaticParams() {
  try {
    const products = await fetchProductsAction();

    // If no products, return a placeholder to satisfy Next.js requirement
    if (!products || products.length === 0) {
      return [{ slug: ["placeholder-0"] }];
    }

    return products.map((product) => ({
      slug: [generateSlug(product.name, product.id)],
    }));
  } catch (error) {
    // Return placeholder on error to satisfy Next.js requirement
    return [{ slug: ["placeholder-0"] }];
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
