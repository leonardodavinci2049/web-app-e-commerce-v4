import type { GalleryImage } from "@/types/api-assets";
import { ImageGalleryClient } from "./componets/ImageGalleryClient";

// Tipo simplificado para o cliente de galeria
export interface GalleryImageData {
  id: string;
  originalName: string;
  urls: {
    original: string;
    preview?: string;
    medium?: string;
    thumbnail?: string;
  };
  isPrimary: boolean;
}

interface ProductImageGalleryProps {
  galleryImages: GalleryImage[];
  fallbackImage?: string;
  productName: string;
}

const DEFAULT_IMAGE_URL = "/images/product/no-image.jpeg";

export function ProductImageGallery({
  galleryImages,
  fallbackImage,
  productName,
}: ProductImageGalleryProps) {
  const mainImageUrl = fallbackImage || DEFAULT_IMAGE_URL;

  const mainDisplayImage: GalleryImageData = {
    id: "main-fallback",
    originalName: fallbackImage ? "product-image" : "no-image",
    urls: {
      original: mainImageUrl,
      preview: mainImageUrl,
      medium: mainImageUrl,
      thumbnail: mainImageUrl,
    },
    isPrimary: true,
  };

  const apiImages = galleryImages.map((img) => ({
    id: img.id,
    originalName: img.originalName,
    urls: img.urls,
    isPrimary: img.isPrimary,
  }));

  // Mantém a miniatura da imagem principal sempre visível e evita duplicar
  // miniaturas idênticas quando a API devolve a mesma URL do fallback.
  const normalizedMainUrls = new Set(
    [
      mainDisplayImage.urls.original,
      mainDisplayImage.urls.preview,
      mainDisplayImage.urls.medium,
      mainDisplayImage.urls.thumbnail,
    ].filter((url): url is string => Boolean(url)),
  );

  const uniqueApiImages = apiImages.filter((image) => {
    const candidateUrl =
      image.urls.original ||
      image.urls.preview ||
      image.urls.medium ||
      image.urls.thumbnail;

    if (!candidateUrl) {
      return true;
    }

    return !normalizedMainUrls.has(candidateUrl);
  });

  const displayImages = [mainDisplayImage, ...uniqueApiImages];

  return (
    <ImageGalleryClient images={displayImages} productName={productName} />
  );
}
