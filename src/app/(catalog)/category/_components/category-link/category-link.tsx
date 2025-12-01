"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  href: string;
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
  const isActive = pathname.startsWith(href);

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
        {isActive && <ChevronRight className="w-4 h-4" />}
      </Link>

      {isActive && subcategories && (
        <div className="ml-9 flex flex-col gap-1 border-l border-border pl-3">
          {subcategories.map((sub) => {
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
