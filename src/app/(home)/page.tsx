import { Suspense } from "react";
import {
  HeroBannerSkeleton,
  NavigationSkeleton,
  ProductGridSkeleton,
} from "@/components/skeletons";
import { PromoBanner } from "./_components/banner/PromoBanner";
import { PromoBannersGrid } from "./_components/banner/PromoBannersGrid";
import { SpecificCategory } from "./_components/banner/SpecificCategory";
import { Footer } from "./_components/footer/Footer";
import { MobileBottomMenu } from "./_components/footer/MobileBottomMenu";
import { MainHeader } from "./_components/header/MainHeader";
import { MobileMainHeader } from "./_components/header/MobileMainHeader";

import { HeroBanner } from "./_components/hero/HeroBanner";
import { DepartmentNavigation } from "./_components/navegation/DepartmentNavigation";
import { NavigationMenu } from "./_components/navegation/NavigationMenu";
import { ProductGrid } from "./_components/product/ProductGrid";
import { AboutSection } from "./_components/sections/AboutSection";
import { Advantages } from "./_components/sections/Advantages";
import { LocationMap } from "./_components/sections/LocationMap";
import { Newsletter } from "./_components/sections/Newsletter";
import { Testimonials } from "./_components/sections/Testimonials";

/**
 * Home page with Suspense boundaries for async Server Components
 * Static page shell is cached, async components stream in
 */
export default function Home() {
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

        {/* Product Grids with Suspense */}
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <ProductGrid title="Lançamentos" limit={8} />
        </Suspense>

        <PromoBanner />

        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <ProductGrid title="Destaques da Semana" limit={8} />
        </Suspense>

        {/* SpecificCategory needs products passed - keeping static for now */}
        <Suspense fallback={<ProductGridSkeleton count={4} />}>
          <SpecificCategoryWrapper />
        </Suspense>

        <PromoBannersGrid />
        <Testimonials />
        <Advantages />
        <AboutSection />
        <LocationMap />
        <Newsletter />
      </main>

      <Footer />
      <MobileBottomMenu />
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

  return <SpecificCategory title="Mundo Gamer" products={displayProducts} />;
}
