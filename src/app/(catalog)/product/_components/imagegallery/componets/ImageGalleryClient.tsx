"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { GalleryImageData } from "../ProductImageGallery";

interface ImageGalleryClientProps {
  images: GalleryImageData[];
  productName: string;
}

export function ImageGalleryClient({
  images,
  productName,
}: ImageGalleryClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Obtém URL preview (1000x1000px) para imagem principal - maior qualidade
  const getMainImageUrl = (img: GalleryImageData) => {
    return img.urls.preview || img.urls.original;
  };

  // Obtém URL thumbnail para miniaturas - tamanho adequado para exibição pequena
  const getThumbnailUrl = (img: GalleryImageData) => {
    return (
      img.urls.thumbnail ||
      img.urls.medium ||
      img.urls.preview ||
      img.urls.original
    );
  };

  // Limita thumbnails a no máximo 5
  const MAX_THUMBNAILS = 5;
  const visibleThumbnails = images.slice(0, MAX_THUMBNAILS);

  return (
    <div className="flex flex-row gap-2 md:gap-4">
      {/* Miniaturas - Visible on Left for both Mobile and Desktop */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2 w-16 md:w-20 shrink-0 h-[300px] md:h-[500px] overflow-y-auto no-scrollbar scroll-smooth">
          {visibleThumbnails.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-square bg-white rounded-lg border-2 overflow-hidden shrink-0 transition-all",
                selectedImage === index
                  ? "border-primary"
                  : "border-border hover:border-primary/50",
              )}
            >
              <Image
                src={getThumbnailUrl(image)}
                alt={`${productName} - Imagem ${index + 1}`}
                fill
                sizes="80px"
                className="object-contain p-1"
                loading="lazy"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}

      {/* Imagem Principal — LCP element */}
      <div className="relative flex-1 aspect-square bg-white rounded-lg border border-border overflow-hidden">
        <Image
          src={getMainImageUrl(images[selectedImage])}
          alt={productName}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain p-4 md:p-8"
          preload
          fetchPriority="high"
          unoptimized
        />

        {/* Paginação Mobile (Dots) */}
        {visibleThumbnails.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {visibleThumbnails.map((image, index) => (
              <div
                key={image.id}
                className={cn(
                  "h-1.5 rounded-full transition-all shadow-sm",
                  selectedImage === index
                    ? "w-4 bg-primary"
                    : "w-1.5 bg-primary/30",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
