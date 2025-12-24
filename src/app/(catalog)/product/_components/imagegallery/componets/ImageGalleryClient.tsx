"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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

  // Obtém URL medium para miniaturas - boa qualidade para thumbnails
  const getThumbnailUrl = (img: GalleryImageData) => {
    return img.urls.medium || img.urls.preview || img.urls.original;
  };

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-row gap-2 md:gap-4">
      {/* Miniaturas - Visible on Left for both Mobile and Desktop */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2 w-16 md:w-20 shrink-0 h-[300px] md:h-[500px] overflow-y-auto no-scrollbar scroll-smooth">
          {images.map((image, index) => (
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
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}

      {/* Imagem Principal */}
      <div className="relative flex-1 aspect-square bg-white rounded-lg border border-border overflow-hidden group">
        <Image
          src={getMainImageUrl(images[selectedImage])}
          alt={productName}
          fill
          className="object-contain p-4 md:p-8"
          priority
        />

        {/* Setas de Navegação - Positioned at bottom to avoid blocking view */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 bottom-8 opacity-80 hover:opacity-100 transition-opacity rounded-full shadow-md z-10"
              onClick={handlePrevious}
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 bottom-8 opacity-80 hover:opacity-100 transition-opacity rounded-full shadow-md z-10"
              onClick={handleNext}
              aria-label="Próxima imagem"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Paginação Mobile (Dots) */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {images.map((image, index) => (
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
      </div>
    </div>
  );
}
