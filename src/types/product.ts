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
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  subcategoryId: string;
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

export interface TransformedProduct {
  id: string;
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
