import {
  Cpu,
  Gamepad2,
  Headphones,
  Headset,
  Home,
  Mouse,
  Smartphone,
  Star,
  Tag,
  Truck,
} from "lucide-react";

export const PRODUCTS = [
  {
    id: "1",
    name: "Smartphone Galaxy S24 Ultra 512GB",
    price: 6999.0,
    image:
      "https://images.unsplash.com/photo-1610945265078-3858a082d22a?auto=format&fit=crop&q=80&w=500",
    isNew: true,
    category: "Smartphones",
  },
  {
    id: "2",
    name: "Notebook Dell XPS 15 i9 32GB",
    price: 12500.0,
    image:
      "https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&q=80&w=500",
    category: "Informática",
  },
  {
    id: "3",
    name: "Headset Gamer HyperX Cloud II",
    price: 499.9,
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=500",
    discount: 15,
    category: "Gamer",
  },
  {
    id: "4",
    name: "Teclado Mecânico Keychron K2",
    price: 750.0,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&q=80&w=500",
    category: "Periféricos",
  },
  {
    id: "5",
    name: 'Monitor LG UltraGear 27" 144Hz',
    price: 1899.0,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=500",
    isNew: true,
    category: "Monitores",
  },
  {
    id: "6",
    name: "Mouse Logitech MX Master 3S",
    price: 650.0,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=500",
    category: "Periféricos",
  },
  {
    id: "7",
    name: "Cadeira Gamer DX Racer",
    price: 2200.0,
    image:
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=500",
    category: "Gamer",
  },
  {
    id: "8",
    name: "Placa de Vídeo RTX 4070 Ti",
    price: 5499.0,
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=500",
    category: "Hardware",
  },
];

export const CATEGORIES = [
  {
    id: "1",
    name: "Smartphones",
    icon: Smartphone,
    href: "/categoria/smartphones",
  },
  { id: "2", name: "Hardware", icon: Cpu, href: "/categoria/hardware" },
  { id: "3", name: "Periféricos", icon: Mouse, href: "/categoria/perifericos" },
  { id: "4", name: "Games", icon: Gamepad2, href: "/categoria/games" },
  {
    id: "5",
    name: "Casa Inteligente",
    icon: Home,
    href: "/categoria/casa-inteligente",
  },
  { id: "6", name: "Áudio", icon: Headphones, href: "/categoria/audio" },
];

export const ADVANTAGES = [
  {
    id: "1",
    title: "Entrega Rápida",
    icon: Truck,
    description: "Para todo o Brasil",
  },
  {
    id: "2",
    title: "Melhor Preço",
    icon: Tag,
    description: "Garantia de economia",
  },
  {
    id: "3",
    title: "Atendimento",
    icon: Headset,
    description: "Suporte especializado",
  },
  {
    id: "4",
    title: "Qualidade",
    icon: Star,
    description: "Produtos originais",
  },
];

export const TESTIMONIALS = [
  {
    id: "1",
    title: "Pessoa Física",
    description: "Ferramentas para uso doméstico com o melhor custo-benefício.",
  },
  {
    id: "2",
    title: "Pequenas Empresas",
    description: "Equipamentos profissionais para alavancar seu negócio.",
  },
  {
    id: "3",
    title: "Grandes Empresas",
    description: "Soluções industriais completas com faturamento facilitado.",
  },
];
