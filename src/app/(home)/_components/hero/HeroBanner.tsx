import Image from "next/image";
import { BannerCarousel } from "@/components/banner/BannerCarousel";

// Static slide data - could be fetched from CMS/API in the future
const slides = [
  {
    id: 1,
    title: "Compre online e retire na loja!",
    subtitle: "Mais comodidade para o seu dia a dia",
    cta: "Conheça a promoção",
    image: "/slides/image1.png",
    bg: "bg-gradient-to-r from-primary to-blue-600",
  },
  {
    id: 2,
    title: "Ofertas de Hardware",
    subtitle: "Os melhores componentes para o seu PC",
    cta: "Ver Ofertas",
    image: "/slides/image2a.png",
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
          className={`relative h-full w-full shrink-0 overflow-hidden ${slide.bg}`}
        >
          <div className="absolute inset-0 bg-black/25 dark:bg-black/40" />
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="grid md:grid-cols-2 gap-8 items-center w-full">
              <div className="z-10 space-y-6 text-white">
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl text-white/90">
                  {slide.subtitle}
                </p>
                <button
                  type="button"
                  className="rounded-full border border-white/30 bg-white/92 px-8 py-3 font-bold text-slate-950 shadow-lg transition-transform hover:scale-105 hover:bg-white dark:bg-white/12 dark:text-white dark:hover:bg-white/18"
                >
                  {slide.cta}
                </button>
              </div>
              <div className="relative hidden h-100 md:block">
                <div className="relative w-full h-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 0px"
                    className="object-contain drop-shadow-2xl"
                    priority
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
