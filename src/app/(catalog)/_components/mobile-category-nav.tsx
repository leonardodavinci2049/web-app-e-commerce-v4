"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/data/mock-data";
import { cn } from "@/lib/utils";
import { Menu, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileCategoryNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  return (
    <div className="lg:hidden mb-4">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full justify-start gap-2">
            <Menu className="w-4 h-4" />
            Navegar por Categorias
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[300px] sm:w-[400px] overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle>Categorias</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-2 mt-4">
            {CATEGORIES.map((category) => {
              const isActive = pathname.startsWith(category.href);
              const isExpanded =
                expandedCategories.includes(category.id) || isActive;
              const Icon = category.icon;

              return (
                <div key={category.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={category.href}
                      onClick={() => setOpen(false)}
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
                        onClick={() => toggleCategory(category.id)}
                        className="p-2 hover:bg-muted rounded-md"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>

                  {isExpanded && category.subcategories && (
                    <div className="ml-9 flex flex-col gap-1 border-l border-border pl-3">
                      {category.subcategories.map((sub) => {
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.id}
                            href={sub.href}
                            onClick={() => setOpen(false)}
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
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
