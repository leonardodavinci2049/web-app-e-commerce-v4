"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageGalleryClientProps {
  images: string[];
  productName: string;
}

export function ImageGalleryClient({
  images,
  productName,
}: ImageGalleryClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Imagem Principal */}
      <div className="relative aspect-square bg-white rounded-lg border border-border overflow-hidden">
        <Image
          src={images[selectedImage]}
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
