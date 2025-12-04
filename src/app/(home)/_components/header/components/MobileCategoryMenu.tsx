"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { CategoryMenuAccordion } from "@/components/category-menu/CategoryMenuAccordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { UICategory } from "@/lib/transformers";

interface MobileCategoryMenuProps {
  categories: UICategory[];
}

export function MobileCategoryMenu({ categories }: MobileCategoryMenuProps) {
  const [open, setOpen] = useState(false);

  const handleNavigate = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Abrir menu de categorias"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background p-2 text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle>Todas as Categorias</SheetTitle>
        </SheetHeader>
        <div className="px-4 py-4 overflow-y-auto max-h-[calc(100vh-80px)]">
          <CategoryMenuAccordion
            categories={categories}
            onNavigate={handleNavigate}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
