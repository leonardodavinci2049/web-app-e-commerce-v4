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

export function ProductImageGallery({
  galleryImages,
  fallbackImage,
  productName,
}: ProductImageGalleryProps) {
  // Transforma GalleryImage[] para GalleryImageData[]
  let displayImages: GalleryImageData[];

  if (galleryImages.length > 0) {
    // Usa imagens da galeria da API
    displayImages = galleryImages.map((img) => ({
      id: img.id,
      originalName: img.originalName,
      urls: img.urls,
      isPrimary: img.isPrimary,
    }));
  } else if (fallbackImage) {
    // Fallback para imagem principal do produto
    displayImages = [
      {
        id: "fallback",
        originalName: "product-image",
        urls: {
          original: fallbackImage,
          preview: fallbackImage,
          medium: fallbackImage,
          thumbnail: fallbackImage,
        },
        isPrimary: true,
      },
    ];
  } else {
    // Placeholder quando não há imagens
    displayImages = [
      {
        id: "placeholder",
        originalName: "no-image",
        urls: {
          original: "/images/product/no-image.jpeg",
          preview: "/images/product/no-image.jpeg",
          medium: "/images/product/no-image.jpeg",
          thumbnail: "/images/product/no-image.jpeg",
        },
        isPrimary: true,
      },
    ];
  }

  return (
    <ImageGalleryClient images={displayImages} productName={productName} />
  );
}
