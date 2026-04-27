import { envs } from "@/core/config/envs";
import { BenefitsSection } from "./_components/sections/benefits";
import { ContactSection } from "./_components/sections/contact";
import { CTASection } from "./_components/sections/cta";
import { FAQSection } from "./_components/sections/faq";
import { HeroSlider } from "./_components/sections/hero-slider";
import { LocationSection } from "./_components/sections/location";
import { ProductsSection } from "./_components/sections/products";
import { StatsSection } from "./_components/sections/stats";
import { WhyChooseUsSection } from "./_components/sections/why-choose-us";

const ResellerPage = () => {
  return (
    <main className="bg-background">
      <h1 className="sr-only">
        {envs.NEXT_PUBLIC_COMPANY_NAME} revenda atacadista e varejo
      </h1>
      <HeroSlider />
      <StatsSection />
      <ProductsSection />
      <WhyChooseUsSection />
      <BenefitsSection />
      <FAQSection />
      <LocationSection />
      <CTASection />
      <ContactSection />
    </main>
  );
};

export default ResellerPage;
