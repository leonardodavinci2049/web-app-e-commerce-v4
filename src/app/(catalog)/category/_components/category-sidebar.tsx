"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/data/mock-data";
import { cn } from "@/lib/utils";

export function CategorySidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 hidden lg:block space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight">Categorias</h2>
        <nav className="flex flex-col gap-2">
          {CATEGORIES.map((category) => {
            const isActive = pathname.startsWith(category.href);
            const Icon = category.icon;

            return (
              <div key={category.id} className="space-y-1">
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
          })}
        </nav>
      </div>
    </aside>
  );
}
