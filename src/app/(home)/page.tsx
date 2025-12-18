import { Suspense } from "react";
import {
  HeroBannerSkeleton,
  NavigationSkeleton,
  ProductGridSkeleton,
} from "@/components/skeletons";
import { envs } from "@/core/config/envs";
import { PromoBanner } from "./_components/banner/PromoBanner";
import { PromoBannersGrid } from "./_components/banner/PromoBannersGrid";

import FooterHome from "./_components/footer/FooterHome";
import { MobileBottomMenu } from "./_components/footer/MobileBottomMenu";
import { MainHeader } from "./_components/header/MainHeader";
import { MobileMainHeader } from "./_components/header/MobileMainHeader";
import { HeroBanner } from "./_components/hero/HeroBanner";
import { DepartmentNavigation } from "./_components/navegation/DepartmentNavigation";
import { NavigationMenu } from "./_components/navegation/NavigationMenu";
import ProductSectionCat01 from "./_components/product/ProductSectionCat01";
import ProductSectionCat02 from "./_components/product/ProductSectionCat02";
import ProductSectionCat03 from "./_components/product/ProductSectionCat03";
import ProductSectionCat04 from "./_components/product/ProductSectionCat04";
import ProductSectionCat05 from "./_components/product/ProductSectionCat05";
import ProductSectionHighlights from "./_components/product/ProductSectionHighlights";
import ProductSectionNewReleases from "./_components/product/ProductSectionNewReleases";
import ProductsSection from "./_components/product/ProductsSection";
import { SpecificCategoryWrapper } from "./_components/product/SpecificCategoryWrapper";
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

        {/* Product Category Sections 2 */}
        <Suspense
          fallback={renderLoadingSection(
            "home-produtos-categoria-2",
            envs.HOME_SECTION_5_TITLE,
          )}
        >
          <ProductSectionCat02 />
        </Suspense>

        {/* Product Category Sections 3*/}
        <Suspense
          fallback={renderLoadingSection(
            "home-produtos-categoria-3",
            envs.HOME_SECTION_6_TITLE,
          )}
        >
          <ProductSectionCat03 />
        </Suspense>

        {/* Product Category Sections5*/}
        <Suspense
          fallback={renderLoadingSection(
            "home-produtos-categoria-3",
            envs.HOME_SECTION_7_TITLE,
          )}
        >
          <ProductSectionCat04 />
        </Suspense>

        {/* Product Category Sections 5*/}
        <Suspense
          fallback={renderLoadingSection(
            "home-produtos-categoria-3",
            envs.HOME_SECTION_4_TITLE,
          )}
        >
          <ProductSectionCat05 />
        </Suspense>

        <PromoBanner />

        {/* 6. Featured Products Section */}
        <Suspense
          fallback={renderLoadingSection(
            "home-produtos-destaque",
            envs.HOME_SECTION_1_TITLE,
          )}
        >
          <ProductSectionHighlights />
        </Suspense>

        {/* SpecificCategory needs products passed - keeping static for now */}
        <Suspense fallback={<ProductGridSkeleton count={4} />}>
          <SpecificCategoryWrapper />
        </Suspense>

        {/* 6. Featured Products Section */}
        <Suspense
          fallback={renderLoadingSection(
            "home-produtos-destaque",
            envs.HOME_SECTION_3_TITLE,
          )}
        >
          <ProductSectionNewReleases />
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
