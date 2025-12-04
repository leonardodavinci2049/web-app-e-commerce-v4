"use client";

import {
  Camera,
  ChevronDown,
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
  children?: Subcategory[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  iconName?: string;
  href: string;
  subcategories?: Subcategory[];
}

interface MobileCategoryItemProps {
  category: Category;
  onNavigate: () => void;
}

// Ícone padrão quando não há iconName definido
const DefaultIcon = Star;

export function MobileCategoryItem({
  category,
  onNavigate,
}: MobileCategoryItemProps) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const isActive =
    pathname.startsWith(category.href) ||
    pathname.includes(`/${category.slug}`);
  const Icon = category.iconName
    ? iconMap[category.iconName] || DefaultIcon
    : DefaultIcon;

  // Auto-expand if active
  const shouldExpand = isExpanded || isActive;

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

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
            const isSubActive =
              pathname === sub.href || pathname.includes(`/${sub.slug}`);
            const hasChildren = sub.children && sub.children.length > 0;
            const isGroupExpanded = expandedGroups.has(sub.id) || isSubActive;

            return (
              <div key={sub.id} className="space-y-1">
                <div className="flex items-center gap-1">
                  {hasChildren && (
                    <button
                      type="button"
                      onClick={() => toggleGroup(sub.id)}
                      className="p-1 hover:bg-muted rounded"
                    >
                      {isGroupExpanded ? (
                        <ChevronDown className="w-3 h-3" />
                      ) : (
                        <ChevronRight className="w-3 h-3" />
                      )}
                    </button>
                  )}
                  <Link
                    href={sub.href}
                    onClick={onNavigate}
                    className={cn(
                      "text-sm py-1 transition-colors block flex-1",
                      isSubActive
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground",
                      !hasChildren && "ml-4",
                    )}
                  >
                    {sub.name}
                  </Link>
                </div>

                {/* Level 3 - Subgrupos */}
                {hasChildren && isGroupExpanded && (
                  <div className="ml-4 flex flex-col gap-0.5 border-l border-border/50 pl-2">
                    {sub.children?.map((child) => {
                      const isChildActive =
                        pathname === child.href ||
                        pathname.includes(`/${child.slug}`);
                      return (
                        <Link
                          key={child.id}
                          href={child.href}
                          onClick={onNavigate}
                          className={cn(
                            "text-xs py-1 transition-colors block",
                            isChildActive
                              ? "text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
