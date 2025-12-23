"use client";

import Image from "next/image";
import { useState } from "react";
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

  return (
    <div className="space-y-4">
      {/* Imagem Principal */}
      <div className="relative aspect-square bg-white rounded-lg border border-border overflow-hidden">
        <Image
          src={getMainImageUrl(images[selectedImage])}
          alt={productName}
          fill
          className="object-contain p-8"
          priority
        />
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square bg-white rounded-lg border-2 overflow-hidden transition-all ${
                selectedImage === index
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Image
                src={getThumbnailUrl(image)}
                alt={`${productName} - Imagem ${index + 1}`}
                fill
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
