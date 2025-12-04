"use client";

import { CategoryMenuAccordion } from "@/components/category-menu/CategoryMenuAccordion";
import type { UICategory } from "@/lib/transformers";

interface CategoryMenuProps {
  categories: UICategory[];
  onNavigate?: () => void;
}

export function CategoryMenu({ categories, onNavigate }: CategoryMenuProps) {
  return (
    <CategoryMenuAccordion categories={categories} onNavigate={onNavigate} />
  );
}

// Re-export helper function for backwards compatibility
export { getExpandedCategoriesFromPath } from "@/components/category-menu/CategoryMenuAccordion";
