"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MobileCategoryItem } from "./mobile-category-item";

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

interface MobileNavSheetProps {
  categories: Category[];
}

export function MobileNavSheet({ categories }: MobileNavSheetProps) {
  const [open, setOpen] = useState(false);

  const handleNavigate = () => {
    setOpen(false);
  };

  return (
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
          {categories.map((category) => (
            <MobileCategoryItem
              key={category.id}
              category={category}
              onNavigate={handleNavigate}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
