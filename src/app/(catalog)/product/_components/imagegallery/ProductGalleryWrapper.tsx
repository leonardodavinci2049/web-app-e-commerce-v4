import { fetchProductGalleryAction } from "@/app/actions/product";
import { ProgressiveGallery } from "./ProgressiveGallery";

interface ProductGalleryWrapperProps {
  productId: string;
  fallbackImage?: string;
  productName: string;
}

/**
 * Async wrapper for ProductImageGallery that enables streaming with progressive loading.
 *
 * Progressive Loading Strategy:
 * 1. T0: Immediately shows fallbackImage (PATH_IMAGE) as placeholder
 * 2. T1: Gallery API loads in background while user sees the main image
 * 3. T2: When gallery loads, smoothly transitions to full gallery with thumbnails
 *
 * This improves perceived performance by showing content immediately.
 */
export async function ProductGalleryWrapper({
  productId,
  fallbackImage,
  productName,
}: ProductGalleryWrapperProps) {
  // Fetch happens inside this async component, enabling Suspense streaming
  const galleryImages = await fetchProductGalleryAction(productId);

  return (
    <ProgressiveGallery
      galleryImages={galleryImages}
      fallbackImage={fallbackImage}
      productName={productName}
    />
  );
}
