import { CategorySidebar } from "@/app/(catalog)/category/_components/category-sidebar/category-sidebar";
import { MobileCategoryNav } from "@/app/(catalog)/category/_components/mobile-category/mobile-category-nav";
import { fetchCategoriesAction } from "@/app/actions/product";
import { ProductListingContainer } from "./ProductListingContainer";

interface ProductsContentProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function ProductsContent({ searchParams }: ProductsContentProps) {
  const params = await searchParams;
  const searchTerm =
    typeof params.q === "string" ? decodeURIComponent(params.q) : undefined;
  const sortCol =
    typeof params.sort_col === "string" ? Number(params.sort_col) : undefined;
  const sortOrd =
    typeof params.sort_ord === "string" ? Number(params.sort_ord) : undefined;
  const stockOnly = params.stock === "1";

  // Fetch categories for sidebar
  const categories = await fetchCategoriesAction();

  // Sanitize search term for display (prevent XSS)
  const sanitizedSearchTerm = searchTerm
    ? searchTerm.replace(/[<>]/g, "")
    : undefined;

  const pageTitle = sanitizedSearchTerm
    ? `Resultados para "${sanitizedSearchTerm}"`
    : "Nossos Produtos";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar (Desktop) */}
        <CategorySidebar categories={categories} />

        <div className="flex-1">
          {/* Mobile Navigation */}
          <MobileCategoryNav categories={categories} />

          {/* Título */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {pageTitle}
            </h1>
          </div>

          <ProductListingContainer
            searchTerm={searchTerm}
            sortCol={sortCol}
            sortOrd={sortOrd}
            stockOnly={stockOnly}
          />
        </div>
      </div>
    </div>
  );
}
