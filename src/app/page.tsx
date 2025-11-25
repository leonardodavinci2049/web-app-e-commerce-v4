import { TopBar } from "./components/TopBar";
import { MainHeader } from "./components/MainHeader";
import { NavigationMenu } from "./components/NavigationMenu";
import { HeroBanner } from "./components/HeroBanner";
import { DepartmentNavigation } from "./components/DepartmentNavigation";
import { ProductGrid } from "./components/ProductGrid";
import { PromoBanner } from "./components/PromoBanner";
import { SpecificCategory } from "./components/SpecificCategory";
import { PromoBannersGrid } from "./components/PromoBannersGrid";
import { Testimonials } from "./components/Testimonials";
import { Advantages } from "./components/Advantages";
import { AboutSection } from "./components/AboutSection";
import { LocationMap } from "./components/LocationMap";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
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
      <MainHeader />
      <NavigationMenu />

      <main className="flex-grow">
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
    </div>
  );
}
