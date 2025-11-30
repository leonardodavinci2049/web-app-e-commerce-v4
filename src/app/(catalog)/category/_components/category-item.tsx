"use client";

import {
  Camera,
  ChevronRight,
  Home,
  type LucideIcon,
  Monitor,
  Smartphone,
  Star,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
  iconName: string; // ← Mudou de 'icon' para 'iconName'
  href: string;
  subcategories?: Subcategory[];
}

interface CategoryItemProps {
  category: Category;
}

export function CategoryItem({ category }: CategoryItemProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(category.href);
  const Icon = iconMap[category.iconName]; // ← Busca o ícone pelo nome

  if (!Icon) {
    console.warn(`Icon "${category.iconName}" not found in iconMap`);
    return null;
  }

  return (
    <div className="space-y-1">
      <Link
        href={category.href}
        className={cn(
          "flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-4 h-4" />
          {category.name}
        </div>
        {isActive && <ChevronRight className="w-4 h-4" />}
      </Link>

      {isActive && category.subcategories && (
        <div className="ml-9 flex flex-col gap-1 border-l border-border pl-3">
          {category.subcategories.map((sub) => {
            const isSubActive = pathname === sub.href;
            return (
              <Link
                key={sub.id}
                href={sub.href}
                className={cn(
                  "text-sm py-1 transition-colors block",
                  isSubActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {sub.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
