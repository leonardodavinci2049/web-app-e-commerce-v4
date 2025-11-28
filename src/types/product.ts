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
