export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  image: string;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
  brand?: string;
  specifications?: Record<string, string>;
  shipping?: {
    freeShippingMinValue: number;
    estimatedDays: string;
    returnDays: number;
  };
}

export interface ProductHome {
  id: string;
  name: string;
  sku: string; // SKU should be string (alphanumeric codes)
  image: string;
  normalPrice: number;
  promotionalPrice?: number;
  wholesalePrice: number; // NEW: VL_ATACADO
  corporatePrice: number; // NEW: VL_CORPORATIVO
  stock: number;
  category: string;
  brand: string; // Changed from optional to required (MARCA_NOME always available)
  warrantyDays: number; // NEW: TEMPODEGARANTIA_DIA
  isPromotion: boolean; // NEW: PROMOCAO flag
  isImported: boolean; // NEW: IMPORTADO flag
  isNew: boolean; // NEW: LANCAMENTO flag
  createdAt: Date;
}
export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  subcategories?: string[];
}

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  brand?: string;
  inStock?: boolean;
}

// Tipos para otimização do ProductListing (Server/Client split)
export interface RawProduct {
  id: string;
  sku?: string;
  name: string;
  description: string | null;
  price: number;
  image: string;
  categoryId: string;
  subcategoryId?: string;
  inStock: boolean;
  brand?: string;
  discount?: number;
  isNew?: boolean;
  specifications?: Record<string, string | unknown>;
  shipping?:
    | {
        freeShippingMinValue: number;
        estimatedDays: string;
        returnDays: number;
      }
    | Record<string, unknown>;
}

export interface TransformedProduct {
  id: string;
  sku?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory: string;
  inStock: boolean;
  brand?: string;
  discount?: number;
  isNew?: boolean;
  specifications?: Record<string, string>;
  shipping?: {
    freeShippingMinValue: number;
    estimatedDays: string;
    returnDays: number;
  };
}

export interface Category {
  id: string;
  name: string;
  subcategories?: { id: string; name: string }[];
}

export interface CategoryMap {
  [categoryName: string]: string[];
}

export interface ProductWithMetadata extends Product {
  sku?: number;
  stock?: number;
  warranty?: number;
  badge?: string;
  isImported?: boolean;
  isPromotion?: boolean;
  isLaunch?: boolean;
  createdAt?: string;
  slug?: string;
}
