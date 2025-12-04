"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  href: string;
  children?: Subcategory[];
}

interface CategoryLinkProps {
  href: string;
  icon: ReactNode;
  name: string;
  subcategories?: Subcategory[];
}

export function CategoryLink({
  href,
  icon,
  name,
  subcategories,
}: CategoryLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href) || pathname.includes(`/category/${name.toLowerCase().replace(/\s+/g, "-")}`);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

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

  // Check if any subcategory or its children match the current path
  const isSubcategoryActive = (sub: Subcategory): boolean => {
    if (pathname === sub.href || pathname.includes(`/${sub.slug}`)) return true;
    if (sub.children) {
      return sub.children.some((child) => pathname === child.href || pathname.includes(`/${child.slug}`));
    }
    return false;
  };

  return (
    <div className="space-y-1">
      <Link
        href={href}
        className={cn(
          "flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        <div className="flex items-center gap-3">
          {icon}
          {name}
        </div>
        {isActive && subcategories && <ChevronRight className="w-4 h-4" />}
      </Link>

      {isActive && subcategories && (
        <div className="ml-6 flex flex-col gap-0.5 border-l border-border pl-3">
          {subcategories.map((sub) => {
            const isSubActive = isSubcategoryActive(sub);
            const hasChildren = sub.children && sub.children.length > 0;
            const isExpanded = expandedGroups.has(sub.id) || isSubActive;

            return (
              <div key={sub.id} className="space-y-0.5">
                <div className="flex items-center gap-1">
                  {hasChildren && (
                    <button
                      type="button"
                      onClick={() => toggleGroup(sub.id)}
                      className="p-0.5 hover:bg-muted rounded"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-3 h-3" />
                      ) : (
                        <ChevronRight className="w-3 h-3" />
                      )}
                    </button>
                  )}
                  <Link
                    href={sub.href}
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
                {hasChildren && isExpanded && (
                  <div className="ml-4 flex flex-col gap-0.5 border-l border-border/50 pl-2">
                    {sub.children?.map((child) => {
                      const isChildActive = pathname === child.href || pathname.includes(`/${child.slug}`);
                      return (
                        <Link
                          key={child.id}
                          href={child.href}
                          className={cn(
                            "text-xs py-0.5 transition-colors block",
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
