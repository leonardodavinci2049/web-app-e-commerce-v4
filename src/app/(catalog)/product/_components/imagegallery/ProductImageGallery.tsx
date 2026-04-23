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

function toComparableImageKey(url: string): string {
  const safeUrl = url.trim();
  if (!safeUrl) {
    return "";
  }

  // Supports absolute and relative URLs used by the gallery.
  const parsed = new URL(safeUrl, "http://localhost");
  const pathname = parsed.pathname.toLowerCase();
  const fileName = pathname.split("/").pop() || pathname;

  return fileName
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/-(thumbnail|medium|preview|original)$/i, "");
}

function getImageComparableKeys(urls: GalleryImageData["urls"]): string[] {
  return [urls.original, urls.preview, urls.medium, urls.thumbnail]
    .filter((url): url is string => Boolean(url))
    .map((url) => toComparableImageKey(url))
    .filter(Boolean);
}

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

  // Keeps fallback thumbnail always visible while avoiding duplicated first image
  // when PATH_IMAGEM and API URLs are different versions of the same asset.
  const seenImageKeys = new Set(getImageComparableKeys(mainDisplayImage.urls));

  const uniqueApiImages = apiImages.filter((image) => {
    const imageKeys = getImageComparableKeys(image.urls);

    if (imageKeys.length === 0) {
      return true;
    }

    const isDuplicate = imageKeys.some((key) => seenImageKeys.has(key));
    if (isDuplicate) {
      return false;
    }

    for (const key of imageKeys) {
      seenImageKeys.add(key);
    }

    return true;
  });

  const displayImages = [mainDisplayImage, ...uniqueApiImages];

  return (
    <ImageGalleryClient images={displayImages} productName={productName} />
  );
}
