"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

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

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          } ${slide.bg}`}
        >
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="grid md:grid-cols-2 gap-8 items-center w-full">
              <div className="text-white space-y-6 z-10">
                <h2 className="text-4xl md:text-6xl font-bold leading-tight animate-in slide-in-from-left duration-500">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl opacity-90 animate-in slide-in-from-left duration-700 delay-100">
                  {slide.subtitle}
                </p>
                <button
                  type="button"
                  className="bg-accent text-accent-foreground px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform animate-in fade-in duration-1000 delay-200"
                >
                  {slide.cta}
                </button>
              </div>
              <div className="hidden md:block relative h-[400px]">
                {/* Image placeholder or actual image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="object-contain w-full h-full drop-shadow-2xl animate-in zoom-in duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            type="button"
            key={_.id}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
