import { fetchProductGalleryAction } from "@/app/actions/product";
import { ProductImageGallery } from "./ProductImageGallery";

interface ProductGalleryWrapperProps {
  productId: string;
  fallbackImage?: string;
  productName: string;
}

/**
 * Async wrapper for ProductImageGallery that enables streaming.
 * This component fetches gallery data independently, allowing the rest of
 * the page to render while the gallery loads.
 */
export async function ProductGalleryWrapper({
  productId,
  fallbackImage,
  productName,
}: ProductGalleryWrapperProps) {
  // Fetch happens inside this async component, enabling Suspense streaming
  const galleryImages = await fetchProductGalleryAction(productId);

  return (
    <ProductImageGallery
      galleryImages={galleryImages}
      fallbackImage={fallbackImage}
      productName={productName}
    />
  );
}
