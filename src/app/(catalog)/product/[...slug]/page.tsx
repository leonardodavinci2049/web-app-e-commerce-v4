"use client";

import { notFound, useParams } from "next/navigation";
import { PRODUCTS } from "@/data/mock-data";
import { findProductBySlug } from "@/lib/slug";
import { ProductImageGallery } from "../_components/ProductImageGallery";
import { ProductInfo } from "../_components/ProductInfo";
import { ProductTabs } from "../_components/ProductTabs";
import { RelatedProducts } from "../_components/RelatedProducts";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string[];

  const product = findProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Produtos relacionados (mesma categoria, excluindo o atual)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );

  // Dados padrão para especificações e entrega se não existirem
  const defaultSpecifications = {
    Marca: product.brand || "Genérica",
    Categoria: product.category,
    Subcategoria: product.subcategory,
    Condição: product.isNew ? "Novo" : "Usado",
  };

  const defaultShipping = {
    freeShippingMinValue: 199.9,
    estimatedDays: "3 a 7 dias úteis",
    returnDays: 7,
  };

  return (
    <div className="min-h-screen bg-background font-sans pb-12">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap">
          <a href="/" className="hover:text-primary transition-colors">
            Home
          </a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-primary transition-colors">
            Produtos
          </a>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Galeria de Imagens */}
          <ProductImageGallery
            images={product.image ? [product.image] : []}
            productName={product.name}
          />

          {/* Informações do Produto */}
          <ProductInfo product={product} />
        </div>

        {/* Tabs de Informações */}
        <div className="mb-16">
          <ProductTabs
            description={product.description || "Sem descrição disponível."}
            specifications={product.specifications || defaultSpecifications}
            shipping={product.shipping || defaultShipping}
          />
        </div>

        {/* Produtos Relacionados */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
