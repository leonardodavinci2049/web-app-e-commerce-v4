"use client";

import { useEffect, useState } from "react";
import type { GalleryImage } from "@/types/api-assets";
import { ImageGalleryClient } from "./componets/ImageGalleryClient";
import type { GalleryImageData } from "./ProductImageGallery";

interface ProgressiveGalleryProps {
  galleryImages: GalleryImage[];
  fallbackImage?: string;
  productName: string;
}

/**
 * ProgressiveGallery - Handles progressive image loading for product gallery
 *
 * Loading States:
 * - T0 (Initial): Shows fallbackImage immediately as placeholder
 * - T1 (Transition): Gallery data arrives, prepares for smooth transition
 * - T2 (Complete): Full gallery with thumbnails and navigation
 *
 * This component ensures users see content immediately while the full
 * gallery loads in the background.
 */
export function ProgressiveGallery({
  galleryImages,
  fallbackImage,
  productName,
}: ProgressiveGalleryProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayImages, setDisplayImages] = useState<GalleryImageData[]>(() => {
    // Initial state: show fallback image immediately (T0)
    if (fallbackImage) {
      return [
        {
          id: "fallback-initial",
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
    }
    // No fallback available, show placeholder
    return [
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
  });

  useEffect(() => {
    // T1/T2: Gallery data has arrived from server
    if (galleryImages.length > 0) {
      // Transform gallery images to display format
      const transformedImages: GalleryImageData[] = galleryImages.map(
        (img) => ({
          id: img.id,
          originalName: img.originalName,
          urls: img.urls,
          isPrimary: img.isPrimary,
        }),
      );

      // Smooth transition to full gallery
      setIsTransitioning(true);

      // Small delay for smooth visual transition
      const timer = setTimeout(() => {
        setDisplayImages(transformedImages);
        setIsTransitioning(false);
      }, 150);

      return () => clearTimeout(timer);
    }

    // Gallery is empty but we have fallback - keep showing fallback
    if (galleryImages.length === 0 && fallbackImage) {
      setDisplayImages([
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
      ]);
    }
  }, [galleryImages, fallbackImage]);

  return (
    <div
      className={`transition-opacity duration-200 ${isTransitioning ? "opacity-90" : "opacity-100"}`}
    >
      <ImageGalleryClient images={displayImages} productName={productName} />
    </div>
  );
}
