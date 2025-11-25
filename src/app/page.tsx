import { AboutSection } from "./components/AboutSection";
import { Advantages } from "./components/Advantages";
import { DepartmentNavigation } from "./components/DepartmentNavigation";
import { Footer } from "./components/Footer";
import { HeroBanner } from "./components/HeroBanner";
import { LocationMap } from "./components/LocationMap";
import { MainHeader } from "./components/MainHeader";
import { MobileBottomMenu } from "./components/MobileBottomMenu";
import { MobileMainHeader } from "./components/MobileMainHeader";
import { NavigationMenu } from "./components/NavigationMenu";
import { Newsletter } from "./components/Newsletter";
import { ProductGrid } from "./components/ProductGrid";
import { PromoBanner } from "./components/PromoBanner";
import { PromoBannersGrid } from "./components/PromoBannersGrid";
import { SpecificCategory } from "./components/SpecificCategory";
import { Testimonials } from "./components/Testimonials";
import { TopBar } from "./components/TopBar";
import { PRODUCTS } from "./data/mock-data";

export default function Home() {
  // Filter products for different sections
  const newProducts = PRODUCTS.filter(
    (p) => p.isNew || p.id === "1" || p.id === "5",
  );
  const featuredProducts = PRODUCTS.slice(0, 8); // Just take first 8 for now
  const gamerProducts = PRODUCTS.filter(
    (p) => p.category === "Gamer" || p.category === "Periféricos",
  );

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
