import { ImageGalleryClient } from "./componets/ImageGalleryClient";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  // Se não houver imagens, usar placeholder
  const displayImages =
    images.length > 0 ? images : ["/images/product/no-image.jpeg"];

  return (
    <ImageGalleryClient images={displayImages} productName={productName} />
  );
}
