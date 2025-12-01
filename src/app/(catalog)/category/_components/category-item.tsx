import {
  Camera,
  Home,
  type LucideIcon,
  Monitor,
  Smartphone,
  Star,
  Sun,
} from "lucide-react";
import { CategoryLink } from "./category-link/category-link";

// Mapeamento de nomes de ícones para componentes
const iconMap: Record<string, LucideIcon> = {
  Camera,
  Monitor,
  Smartphone,
  Star,
  Home,
  Sun,
};

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  href: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  href: string;
  subcategories?: Subcategory[];
}

interface CategoryItemProps {
  category: Category;
}

export function CategoryItem({ category }: CategoryItemProps) {
  const Icon = iconMap[category.iconName];

  if (!Icon) {
    console.warn(`Icon "${category.iconName}" not found in iconMap`);
    return null;
  }

  return (
    <CategoryLink
      href={category.href}
      icon={<Icon className="w-4 h-4" />}
      name={category.name}
      subcategories={category.subcategories}
    />
  );
}
