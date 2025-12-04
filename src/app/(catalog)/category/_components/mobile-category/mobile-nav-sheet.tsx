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
import type { UICategory } from "@/lib/transformers";
import { CategoryMenu } from "../category-sidebar/category-menu";

interface MobileNavSheetProps {
  categories: UICategory[];
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
        <div className="mt-4">
          <CategoryMenu categories={categories} onNavigate={handleNavigate} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
