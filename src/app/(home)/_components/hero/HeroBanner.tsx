import Image from "next/image";
import { BannerCarousel } from "@/components/banner/BannerCarousel";

// Static slide data - could be fetched from CMS/API in the future
const slides = [
  {
    id: 1,
    title: "Compre online e retire na loja!",
    subtitle: "Mais comodidade para o seu dia a dia",
    cta: "Conheça a promoção",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1000",
    bg: "bg-gradient-to-r from-primary to-blue-600",
  },
  {
    id: 2,
    title: "Ofertas de Hardware",
    subtitle: "Os melhores componentes para o seu PC",
    cta: "Ver Ofertas",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
    bg: "bg-gradient-to-r from-slate-800 to-slate-900",
  },
];

/**
 * Server Component - renders static slide content
 * BannerCarousel is imported as Client Island for navigation controls
 */
export function HeroBanner() {
  return (
    <BannerCarousel totalSlides={slides.length}>
      {slides.map((slide) => (
        <div
          key={slide.id}
          className={`flex-shrink-0 w-full h-full ${slide.bg}`}
        >
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="grid md:grid-cols-2 gap-8 items-center w-full">
              <div className="text-white space-y-6 z-10">
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl opacity-90">
                  {slide.subtitle}
                </p>
                <button
                  type="button"
                  className="bg-accent text-accent-foreground px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                >
                  {slide.cta}
                </button>
              </div>
              <div className="hidden md:block relative h-[400px]">
                <div className="relative w-full h-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </BannerCarousel>
  );
}
