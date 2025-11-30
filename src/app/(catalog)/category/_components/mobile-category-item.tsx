"use client";

import {
  Camera,
  Home,
  Monitor,
  Smartphone,
  Star,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

interface MobileCategoryItemProps {
  category: Category;
  onNavigate: () => void;
}

export function MobileCategoryItem({
  category,
  onNavigate,
}: MobileCategoryItemProps) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = pathname.startsWith(category.href);
  const Icon = iconMap[category.iconName]; // ← Busca o ícone pelo nome

  if (!Icon) {
    console.warn(`Icon "${category.iconName}" not found in iconMap`);
    return null;
  }

  // Auto-expand if active
  const shouldExpand = isExpanded || isActive;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Link
          href={category.href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors grow",
            isActive
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Icon className="w-4 h-4" />
          {category.name}
        </Link>
        {category.subcategories && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-muted rounded-md"
          >
            {shouldExpand ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {shouldExpand && category.subcategories && (
        <div className="ml-9 flex flex-col gap-1 border-l border-border pl-3">
          {category.subcategories.map((sub) => {
            const isSubActive = pathname === sub.href;
            return (
              <Link
                key={sub.id}
                href={sub.href}
                onClick={onNavigate}
                className={cn(
                  "text-sm py-2 transition-colors block",
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
