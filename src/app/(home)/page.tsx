import { Suspense } from "react";
import {
  HeroBannerSkeleton,
  NavigationSkeleton,
  ProductGridSkeleton,
} from "@/components/skeletons";
import { envs } from "@/core/config/envs";
import { PromoBanner } from "./_components/banner/PromoBanner";
import { PromoBannersGrid } from "./_components/banner/PromoBannersGrid";
import { SpecificCategory } from "./_components/banner/SpecificCategory";
import FooterHome from "./_components/footer/FooterHome";
import { MobileBottomMenu } from "./_components/footer/MobileBottomMenu";
import { MainHeader } from "./_components/header/MainHeader";
import { MobileMainHeader } from "./_components/header/MobileMainHeader";
import { HeroBanner } from "./_components/hero/HeroBanner";
import { DepartmentNavigation } from "./_components/navegation/DepartmentNavigation";
import { NavigationMenu } from "./_components/navegation/NavigationMenu";
import { ProductGrid } from "./_components/product/ProductGrid";
import ProductSectionCat01 from "./_components/product/ProductSectionCat01";
import ProductsSection from "./_components/product/ProductsSection";
import { AboutSection } from "./_components/sections/AboutSection";
import Advantages from "./_components/sections/advantages";
import { LocationSectionV1 } from "./_components/sections/LocationSectionV1";
import { MethodsSection } from "./_components/sections/MethodsSection";
import { Testimonials } from "./_components/sections/Testimonials";
/**
 * Home page with Suspense boundaries for async Server Components
 * Static page shell is cached, async components stream in
 */
export default async function HomePage() {
  const renderLoadingSection = (id: string, title: string) => (
    <ProductsSection id={id} title={title} isLoading />
  );

  const { fetchCategoriesAction } = await import("@/app/actions/product");
  const categories = await fetchCategoriesAction();
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Static header components */}
      {/* <TopBar /> */}
      <MobileMainHeader />
      <MainHeader />
      <NavigationMenu />

      <main className="grow">
        {/* Hero Banner with Suspense */}
        <Suspense fallback={<HeroBannerSkeleton />}>
          <HeroBanner />
        </Suspense>

        {/* Department Navigation with Suspense */}
        <Suspense fallback={<NavigationSkeleton />}>
          <DepartmentNavigation />
        </Suspense>

        {/* Product Category Sections 1 */}
        <Suspense
          fallback={renderLoadingSection(
            "home-produtos-categoria-1",
            envs.HOME_SECTION_4_TITLE,
          )}
        >
          <ProductSectionCat01 />
        </Suspense>

        {/* Product Grids with Suspense */}
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <ProductGrid title="Lançamentos" limit={8} className="bg-muted/30" />
        </Suspense>

        <PromoBanner />

        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <ProductGrid
            title="Destaques da Semana"
            limit={8}
            className="bg-muted/30"
          />
        </Suspense>

        {/* SpecificCategory needs products passed - keeping static for now */}
        <Suspense fallback={<ProductGridSkeleton count={4} />}>
          <SpecificCategoryWrapper />
        </Suspense>

        <PromoBannersGrid className="bg-muted/30" />
        <Testimonials className="bg-background" />
        <Advantages className="bg-muted/30" />
        <AboutSection className="bg-background" />
        <LocationSectionV1 className="bg-muted/50" />
        <MethodsSection />
      </main>
      <Suspense fallback={<div>Loading...</div>}>
        <FooterHome />
      </Suspense>
      <MobileBottomMenu categories={categories} />
    </div>
  );
}

// Wrapper component for SpecificCategory to fetch data
async function SpecificCategoryWrapper() {
  const { fetchProductsAction, fetchCategoriesAction } = await import(
    "@/app/actions/product"
  );

  const [products, categories] = await Promise.all([
    fetchProductsAction(),
    fetchCategoriesAction(),
  ]);

  const withCategoryName = (p: (typeof products)[number]) => ({
    ...p,
    category: categories.find((c) => c.id === p.categoryId)?.name || "",
  });

  // Filter for gamer products
  const gamerProducts = products
    .filter((p) => {
      const categoryName = categories.find((c) => c.id === p.categoryId)?.name;
      return categoryName === "Gamer" || categoryName === "Periféricos";
    })
    .map(withCategoryName);

  // If no gamer products, show some featured ones
  const displayProducts =
    gamerProducts.length > 0
      ? gamerProducts
      : products.slice(0, 4).map(withCategoryName);

  return (
    <SpecificCategory
      title="Mundo Gamer"
      products={displayProducts}
      className="bg-background"
    />
  );
}
