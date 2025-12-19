import Image from "next/image";
import { cn } from "@/lib/utils";

interface PromoBannersGridProps {
  className?: string;
}

export function PromoBannersGrid({ className }: PromoBannersGridProps) {
  const banners = [
    {
      id: 1,
      title: "Smartphones",
      subtitle: "10% OFF no PIX",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=500",
      bg: "bg-blue-900",
    },
    {
      id: 2,
      title: "Monte seu PC",
      subtitle: "Hardware High-End",
      image:
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=500",
      bg: "bg-purple-900",
    },
    {
      id: 3,
      title: "Perfumes",
      subtitle: "Importados Originais",
      image:
        "https://images.unsplash.com/photo-1659343796661-984a0d8246a0?auto=format&fit=crop&q=80&w=500",
      bg: "bg-rose-900",
    },
  ];

  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`relative h-48 rounded-xl overflow-hidden group cursor-pointer ${banner.bg}`}
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">{banner.title}</h3>
                <p className="text-sm opacity-90">{banner.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
