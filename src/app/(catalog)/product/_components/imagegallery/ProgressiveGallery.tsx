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
 * - T0 (Initial): Shows fallbackImage with 4 temporary thumbnails to prevent layout shift
 * - T1 (Transition): Gallery data arrives, prepares for smooth transition
 * - T2 (Complete): Full gallery with real thumbnails and navigation
 *
 * Layout Shift Prevention:
 * - Creates temporary thumbnails using the fallback image
 * - Ensures consistent layout between initial load and full gallery
 * - Prevents jarring resize when real images load
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
    // Initial state: show fallback image with temporary thumbnails (T0)
    // Creates 4 temporary thumbnails to prevent layout shift when real images load
    if (fallbackImage) {
      return Array.from({ length: 4 }, (_, index) => ({
        id: `fallback-temp-${index}`,
        originalName: "product-image",
        urls: {
          original: fallbackImage,
          preview: fallbackImage,
          medium: fallbackImage,
          thumbnail: fallbackImage,
        },
        isPrimary: index === 0,
      }));
    }
    // No fallback available, show placeholder with temporary thumbnails
    return Array.from({ length: 4 }, (_, index) => ({
      id: `placeholder-temp-${index}`,
      originalName: "no-image",
      urls: {
        original: "/images/product/no-image.jpeg",
        preview: "/images/product/no-image.jpeg",
        medium: "/images/product/no-image.jpeg",
        thumbnail: "/images/product/no-image.jpeg",
      },
      isPrimary: index === 0,
    }));
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

    // Gallery is empty but we have fallback - keep showing fallback with temporary thumbnails
    if (galleryImages.length === 0 && fallbackImage) {
      setDisplayImages(
        Array.from({ length: 4 }, (_, index) => ({
          id: `fallback-${index}`,
          originalName: "product-image",
          urls: {
            original: fallbackImage,
            preview: fallbackImage,
            medium: fallbackImage,
            thumbnail: fallbackImage,
          },
          isPrimary: index === 0,
        })),
      );
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
