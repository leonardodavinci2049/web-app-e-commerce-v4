"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { UICategory, UISubcategory } from "@/lib/transformers";
import { cn } from "@/lib/utils";

interface CategoryMenuProps {
  categories: UICategory[];
  onNavigate?: () => void;
}

export function CategoryMenu({ categories, onNavigate }: CategoryMenuProps) {
  const pathname = usePathname();

  // Helper to check if a category or any of its descendants is active
  const isCategoryActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Helper to check if a specific item is exactly selected
  const isSelected = (href: string) => {
    return pathname === href;
  };

  // Determine default open value for Level 1
  // We find the category that contains the current path
  const defaultOpenLevel1 = categories.find((cat) =>
    isCategoryActive(cat.href),
  )?.id;

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpenLevel1}
      className="w-full"
    >
      {categories.map((category) => (
        <AccordionItem
          key={category.id}
          value={category.id}
          className="border-b-0"
        >
          <div className="flex items-center justify-between py-2">
            <Link
              href={category.href}
              onClick={onNavigate}
              className={cn(
                "flex-1 text-sm font-medium hover:underline transition-colors",
                isSelected(category.href)
                  ? "text-primary font-bold"
                  : "text-muted-foreground",
              )}
            >
              {category.name}
            </Link>
            {category.subcategories && category.subcategories.length > 0 && (
              <AccordionTrigger className="py-0 flex-none w-8 h-8 flex items-center justify-center hover:no-underline" />
            )}
          </div>

          {category.subcategories && category.subcategories.length > 0 && (
            <AccordionContent className="pb-2 pl-4">
              <Level2Categories
                subcategories={category.subcategories}
                pathname={pathname}
                onNavigate={onNavigate}
              />
            </AccordionContent>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function Level2Categories({
  subcategories,
  pathname,
  onNavigate,
}: {
  subcategories: UISubcategory[];
  pathname: string;
  onNavigate?: () => void;
}) {
  const isCategoryActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isSelected = (href: string) => {
    return pathname === href;
  };

  const defaultOpenLevel2 = subcategories.find((sub) =>
    isCategoryActive(sub.href),
  )?.id;

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpenLevel2}
      className="w-full"
    >
      {subcategories.map((subcategory) => (
        <AccordionItem
          key={subcategory.id}
          value={subcategory.id}
          className="border-b-0"
        >
          <div className="flex items-center justify-between py-2">
            <Link
              href={subcategory.href}
              onClick={onNavigate}
              className={cn(
                "flex-1 text-sm hover:underline transition-colors",
                isSelected(subcategory.href)
                  ? "text-primary font-bold"
                  : "text-muted-foreground",
              )}
            >
              {subcategory.name}
            </Link>
            {subcategory.children && subcategory.children.length > 0 && (
              <AccordionTrigger className="py-0 flex-none w-8 h-8 flex items-center justify-center hover:no-underline" />
            )}
          </div>

          {subcategory.children && subcategory.children.length > 0 && (
            <AccordionContent className="pb-2 pl-4">
              <Level3Categories
                subcategories={subcategory.children}
                pathname={pathname}
                onNavigate={onNavigate}
              />
            </AccordionContent>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function Level3Categories({
  subcategories,
  pathname,
  onNavigate,
}: {
  subcategories: UISubcategory[];
  pathname: string;
  onNavigate?: () => void;
}) {
  const isSelected = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="flex flex-col gap-2">
      {subcategories.map((subcategory) => (
        <Link
          key={subcategory.id}
          href={subcategory.href}
          onClick={onNavigate}
          className={cn(
            "text-sm hover:underline transition-colors py-1",
            isSelected(subcategory.href)
              ? "text-primary font-bold"
              : "text-muted-foreground",
          )}
        >
          {subcategory.name}
        </Link>
      ))}
    </div>
  );
}
