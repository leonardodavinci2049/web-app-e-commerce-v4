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
  const defaultOpenLevel1 = categories.find((cat) =>
    isCategoryActive(cat.href),
  )?.id;

  return (
    <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
      <Accordion
        type="single"
        collapsible
        defaultValue={defaultOpenLevel1}
        className="w-full divide-y"
      >
        {categories.map((category) => {
          const Icon = getCategoryIcon(category.name);
          const selected = isSelected(category.href);

          return (
            <AccordionItem
              key={category.id}
              value={category.id}
              className="border-b-0 px-0"
            >
              <div
                className={cn(
                  "flex items-center justify-between py-3 px-4 transition-colors hover:bg-muted/50",
                  selected && "bg-primary/5 border-l-4 border-l-primary pl-3", // Visual indicator for selected
                )}
              >
                <Link
                  href={category.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex-1 flex items-center gap-3 text-sm font-medium transition-colors",
                    selected ? "text-primary font-bold" : "text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      selected ? "text-primary" : "text-muted-foreground",
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
      {subcategories.map((subcategory) => {
        const selected = isSelected(subcategory.href);

        return (
          <AccordionItem
            key={subcategory.id}
            value={subcategory.id}
            className="border-b-0"
          >
            <div
              className={cn(
                "flex items-center justify-between py-2 pl-10 pr-4 transition-colors hover:bg-muted/50",
                selected && "bg-primary/5 text-primary font-medium",
              )}
            >
              <Link
                href={subcategory.href}
                onClick={onNavigate}
                className={cn(
                  "flex-1 text-sm transition-colors",
                  selected
                    ? "text-primary font-semibold"
                    : "text-muted-foreground",
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
  const isSelected = (href: string) => {
    return pathname === href;
  };

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
              "text-sm py-2 pl-14 pr-4 transition-colors hover:bg-muted/50 border-l-2 border-transparent",
              selected
                ? "text-primary font-medium bg-primary/5 border-l-primary"
                : "text-muted-foreground",
            )}
          >
            {subcategory.name}
          </Link>
        );
      })}
    </div>
  );
}
