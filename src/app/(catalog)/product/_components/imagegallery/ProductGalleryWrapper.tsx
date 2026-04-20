import { fetchProductGalleryAction } from "@/app/actions/product";
import { ProductImageGallery } from "./ProductImageGallery";

interface ProductGalleryWrapperProps {
  productId: string;
  fallbackImage?: string;
  productName: string;
}

/**
 * Async wrapper for ProductImageGallery that enables streaming via Suspense.
 *
 * Loading strategy:
 * 1. During fetch: Suspense shows GallerySkeleton with the product's main image
 * 2. On resolve: ProductImageGallery renders the correct gallery layout server-side
 *    (with real thumbnails if available, single image otherwise)
 *
 * This avoids fake placeholder thumbnails that cause layout shift and hurt SEO.
 */
export async function ProductGalleryWrapper({
  productId,
  fallbackImage,
  productName,
}: ProductGalleryWrapperProps) {
  const galleryImages = await fetchProductGalleryAction(productId);

  return (
    <ProductImageGallery
      galleryImages={galleryImages}
      fallbackImage={fallbackImage}
      productName={productName}
    />
  );
}
