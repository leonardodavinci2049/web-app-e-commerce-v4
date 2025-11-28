/**
 * Types for Homepage E-commerce
 * All interfaces for products, categories, banners, etc.
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  discount?: number;
  category: string;
  subcategory?: string;
  badge?: string;
  description?: string;
  inStock?: boolean;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  slug?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  href: string;
  description?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: Category[];
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaLink: string;
  image?: string;
  type: "primary" | "secondary" | "accent" | "muted";
}

export interface Testimonial {
  id: string;
  title: string;
  description: string;
  icon: string;
  ctaText: string;
  ctaLink: string;
}

export interface Advantage {
  id: string;
  title: string;
  description: string;
  icon: string;
}
