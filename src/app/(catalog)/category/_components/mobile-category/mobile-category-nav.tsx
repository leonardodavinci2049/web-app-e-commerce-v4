import { MobileNavSheet } from "./mobile-nav-sheet";

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

interface MobileCategoryNavProps {
  categories: Category[];
}

export function MobileCategoryNav({ categories }: MobileCategoryNavProps) {
  return (
    <div className="lg:hidden mb-4">
      <MobileNavSheet categories={categories} />
    </div>
  );
}
