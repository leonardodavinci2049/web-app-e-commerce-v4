import type { UICategory } from "@/lib/transformers";
import { MobileNavSheet } from "./mobile-nav-sheet";

interface MobileCategoryNavProps {
  categories: UICategory[];
}

export function MobileCategoryNav({ categories }: MobileCategoryNavProps) {
  return (
    <div className="lg:hidden mb-4">
      <MobileNavSheet categories={categories} />
    </div>
  );
}
