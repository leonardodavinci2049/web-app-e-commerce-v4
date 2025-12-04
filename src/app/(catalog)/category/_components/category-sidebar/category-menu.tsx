"use client";

import {
  Cable,
  Camera,
  Cpu,
  Gamepad2,
  Grid,
  HardDrive,
  Headphones,
  Keyboard,
  Laptop,
  type LucideIcon,
  Monitor,
  Mouse,
  Network,
  Printer,
  Smartphone,
  Speaker,
  Tablet,
  Tv,
  Watch,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, useCallback } from "react";
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

interface ExpandedState {
  level1: string | undefined;
  level2: string | undefined;
}

// Helper to map category names to icons
const getCategoryIcon = (name: string): LucideIcon => {
  const normalized = name.toLowerCase();
  if (normalized.includes("hardware")) return Cpu;
  if (normalized.includes("monitor") || normalized.includes("tela"))
    return Monitor;
  if (normalized.includes("periférico")) return Mouse;
  if (normalized.includes("mouse")) return Mouse;
  if (normalized.includes("teclado")) return Keyboard;
  if (
    normalized.includes("audio") ||
    normalized.includes("som") ||
    normalized.includes("fone")
  )
    return Headphones;
  if (normalized.includes("caixa de som")) return Speaker;
  if (
    normalized.includes("armazenamento") ||
    normalized.includes("hd") ||
    normalized.includes("ssd")
  )
    return HardDrive;
  if (normalized.includes("computador") || normalized.includes("pc"))
    return Laptop;
  if (normalized.includes("notebook") || normalized.includes("laptop"))
    return Laptop;
  if (normalized.includes("celular") || normalized.includes("smartphone"))
    return Smartphone;
  if (normalized.includes("tablet")) return Tablet;
  if (normalized.includes("impressora")) return Printer;
  if (
    normalized.includes("game") ||
    normalized.includes("jogo") ||
    normalized.includes("console")
  )
    return Gamepad2;
  if (normalized.includes("cabo") || normalized.includes("adaptador"))
    return Cable;
  if (normalized.includes("rede") || normalized.includes("internet"))
    return Network;
  if (normalized.includes("camera") || normalized.includes("foto"))
    return Camera;
  if (normalized.includes("smartwatch") || normalized.includes("relógio"))
    return Watch;
  if (normalized.includes("tv") || normalized.includes("televisão")) return Tv;

  return Grid; // Default icon
};

/**
 * Derives the expanded accordion state from the current URL pathname.
 * Searches through the category hierarchy to find which categories
 * should be expanded based on the active URL.
 */
export function getExpandedCategoriesFromPath(
  pathname: string,
  categories: UICategory[]
): ExpandedState {
  // Extract the last segment of the URL (the active category slug)
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length < 2 || segments[0] !== "category") {
    return { level1: undefined, level2: undefined };
  }

  const activeSlug = segments[segments.length - 1];

  // Search through the hierarchy to find the active category
  for (const category of categories) {
    // Check if Level 1 is active
    if (category.slug === activeSlug) {
      return { level1: category.id, level2: undefined };
    }

    // Check Level 2 (subcategories)
    if (category.subcategories) {
      for (const subcategory of category.subcategories) {
        if (subcategory.slug === activeSlug) {
          return { level1: category.id, level2: subcategory.id };
        }

        // Check Level 3 (children of subcategories)
        if (subcategory.children) {
          for (const child of subcategory.children) {
            if (child.slug === activeSlug) {
              return { level1: category.id, level2: subcategory.id };
            }
          }
        }
      }
    }
  }

  return { level1: undefined, level2: undefined };
}

/**
 * Checks if a category is an ancestor of the currently active category.
 */
function isParentOfActive(
  categoryHref: string,
  pathname: string,
  isExactMatch: boolean
): boolean {
  if (isExactMatch) return false;
  return pathname.startsWith(categoryHref) && pathname !== categoryHref;
}

export function CategoryMenu({ categories, onNavigate }: CategoryMenuProps) {
  const pathname = usePathname();

  // Derive expanded state from URL
  const expandedFromUrl = useMemo(
    () => getExpandedCategoriesFromPath(pathname, categories),
    [pathname, categories]
  );

  // Local state for manual expansion (allows user to expand other items)
  const [manualExpanded, setManualExpanded] = useState<string | undefined>(
    undefined
  );

  // Use URL-derived state, but allow manual override
  const effectiveLevel1 = manualExpanded ?? expandedFromUrl.level1;

  const handleLevel1Change = useCallback((value: string | undefined) => {
    setManualExpanded(value);
  }, []);

  // Helper to check if a specific item is exactly selected
  const isSelected = useCallback(
    (href: string) => pathname === href,
    [pathname]
  );

  // Helper to check if category is parent of active
  const isParent = useCallback(
    (href: string) => {
      const selected = isSelected(href);
      return isParentOfActive(href, pathname, selected);
    },
    [pathname, isSelected]
  );

  return (
    <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
      <Accordion
        type="single"
        collapsible
        value={effectiveLevel1}
        onValueChange={handleLevel1Change}
        className="w-full divide-y"
      >
        {categories.map((category) => {
          const Icon = getCategoryIcon(category.name);
          const selected = isSelected(category.href);
          const parentOfActive = isParent(category.href);

          return (
            <AccordionItem
              key={category.id}
              value={category.id}
              className="border-b-0 px-0"
            >
              <div
                className={cn(
                  "flex items-center justify-between py-3 px-4 transition-colors",
                  selected && "bg-primary/10 border-l-4 border-l-primary pl-3",
                  parentOfActive &&
                    !selected &&
                    "bg-muted/40 border-l-2 border-l-primary/50 pl-3.5",
                  !selected && !parentOfActive && "hover:bg-muted/50"
                )}
              >
                <Link
                  href={category.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex-1 flex items-center gap-3 text-sm transition-colors",
                    selected && "text-primary font-bold",
                    parentOfActive && !selected && "text-foreground font-medium",
                    !selected && !parentOfActive && "text-foreground font-medium"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      selected && "text-primary",
                      parentOfActive && !selected && "text-primary/70",
                      !selected && !parentOfActive && "text-muted-foreground"
                    )}
                  />
                  {category.name}
                </Link>
                {category.subcategories &&
                  category.subcategories.length > 0 && (
                    <AccordionTrigger className="py-0 flex-none w-8 h-8 flex items-center justify-center hover:no-underline text-muted-foreground" />
                  )}
              </div>

              {category.subcategories && category.subcategories.length > 0 && (
                <AccordionContent className="pb-0 pt-0 border-t bg-muted/20">
                  <Level2Categories
                    subcategories={category.subcategories}
                    pathname={pathname}
                    expandedFromUrl={expandedFromUrl.level2}
                    onNavigate={onNavigate}
                  />
                </AccordionContent>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}


function Level2Categories({
  subcategories,
  pathname,
  expandedFromUrl,
  onNavigate,
}: {
  subcategories: UISubcategory[];
  pathname: string;
  expandedFromUrl: string | undefined;
  onNavigate?: () => void;
}) {
  // Local state for manual expansion at level 2
  const [manualExpanded, setManualExpanded] = useState<string | undefined>(
    undefined
  );

  // Use URL-derived state, but allow manual override
  const effectiveLevel2 = manualExpanded ?? expandedFromUrl;

  const handleLevel2Change = useCallback((value: string | undefined) => {
    setManualExpanded(value);
  }, []);

  const isSelected = useCallback(
    (href: string) => pathname === href,
    [pathname]
  );

  const isParent = useCallback(
    (href: string) => {
      const selected = pathname === href;
      return !selected && pathname.startsWith(href) && pathname !== href;
    },
    [pathname]
  );

  return (
    <Accordion
      type="single"
      collapsible
      value={effectiveLevel2}
      onValueChange={handleLevel2Change}
      className="w-full"
    >
      {subcategories.map((subcategory) => {
        const selected = isSelected(subcategory.href);
        const parentOfActive = isParent(subcategory.href);

        return (
          <AccordionItem
            key={subcategory.id}
            value={subcategory.id}
            className="border-b-0"
          >
            <div
              className={cn(
                "flex items-center justify-between py-2 pl-10 pr-4 transition-colors",
                selected && "bg-primary/10 border-l-4 border-l-primary pl-9",
                parentOfActive &&
                  !selected &&
                  "bg-muted/30 border-l-2 border-l-primary/40 pl-9.5",
                !selected && !parentOfActive && "hover:bg-muted/50"
              )}
            >
              <Link
                href={subcategory.href}
                onClick={onNavigate}
                className={cn(
                  "flex-1 text-sm transition-colors",
                  selected && "text-primary font-semibold",
                  parentOfActive && !selected && "text-foreground font-medium",
                  !selected && !parentOfActive && "text-muted-foreground"
                )}
              >
                {subcategory.name}
              </Link>
              {subcategory.children && subcategory.children.length > 0 && (
                <AccordionTrigger className="py-0 flex-none w-6 h-6 flex items-center justify-center hover:no-underline text-muted-foreground" />
              )}
            </div>

            {subcategory.children && subcategory.children.length > 0 && (
              <AccordionContent className="pb-2 pt-0">
                <Level3Categories
                  subcategories={subcategory.children}
                  pathname={pathname}
                  onNavigate={onNavigate}
                />
              </AccordionContent>
            )}
          </AccordionItem>
        );
      })}
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
  const isSelected = useCallback(
    (href: string) => pathname === href,
    [pathname]
  );

  return (
    <div className="flex flex-col">
      {subcategories.map((subcategory) => {
        const selected = isSelected(subcategory.href);
        return (
          <Link
            key={subcategory.id}
            href={subcategory.href}
            onClick={onNavigate}
            className={cn(
              "text-sm py-2 pl-14 pr-4 transition-colors border-l-2",
              selected
                ? "text-primary font-semibold bg-primary/10 border-l-primary"
                : "text-muted-foreground border-transparent hover:bg-muted/50"
            )}
          >
            {subcategory.name}
          </Link>
        );
      })}
    </div>
  );
}
