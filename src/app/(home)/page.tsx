import { PRODUCTS, CATEGORIES } from "../../data/mock-data";
import { AboutSection } from "./_components/AboutSection";
import { Advantages } from "./_components/Advantages";
import { DepartmentNavigation } from "./_components/DepartmentNavigation";
import { Footer } from "./_components/Footer";
import { HeroBanner } from "./_components/HeroBanner";
import { LocationMap } from "./_components/LocationMap";
import { MainHeader } from "./_components/MainHeader";
import { MobileBottomMenu } from "./_components/MobileBottomMenu";
import { MobileMainHeader } from "./_components/MobileMainHeader";
import { NavigationMenu } from "./_components/NavigationMenu";
import { Newsletter } from "./_components/Newsletter";
import { ProductGrid } from "./_components/ProductGrid";
import { PromoBanner } from "./_components/PromoBanner";
import { PromoBannersGrid } from "./_components/PromoBannersGrid";
import { SpecificCategory } from "./_components/SpecificCategory";
import { Testimonials } from "./_components/Testimonials";
import { TopBar } from "./_components/TopBar";

export default function Home() {
  // Helper para adicionar o nome da categoria
  const withCategoryName = (p: (typeof PRODUCTS)[number]) => ({
    ...p,
    category: CATEGORIES.find((c) => c.id === p.categoryId)?.name || "",
  });

  // Filter products for different sections
  const newProducts = PRODUCTS.filter(
    (p) => p.isNew || p.id === "1" || p.id === "5",
  ).map(withCategoryName);
  const featuredProducts = PRODUCTS.slice(0, 8).map(withCategoryName); // Just take first 8 for now
  const gamerProducts = PRODUCTS.filter((p) => {
    const categoryName = CATEGORIES.find((c) => c.id === p.categoryId)?.name;
    return categoryName === "Gamer" || categoryName === "Periféricos";
  }).map(withCategoryName);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <TopBar />
      <MobileMainHeader />
      <MainHeader />
      <NavigationMenu />

      <main className="grow">
        <HeroBanner />
        <DepartmentNavigation />
        <ProductGrid title="Lançamentos" products={newProducts} />
        <PromoBanner />
        <ProductGrid title="Destaques da Semana" products={featuredProducts} />
        <SpecificCategory title="Mundo Gamer" products={gamerProducts} />
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
