"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Se não houver imagens, usar placeholder
  const displayImages =
    images.length > 0 ? images : ["/images/product/no-image.jpeg"];

  return (
    <div className="space-y-4">
      {/* Imagem Principal */}
      <div className="relative aspect-square bg-white rounded-lg border border-border overflow-hidden">
        <Image
          src={displayImages[selectedImage]}
          alt={productName}
          fill
          className="object-contain p-8"
          priority
        />
      </div>

      {/* Miniaturas */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {displayImages.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square bg-white rounded-lg border-2 overflow-hidden transition-all ${
                selectedImage === index
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Image
                src={image}
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
