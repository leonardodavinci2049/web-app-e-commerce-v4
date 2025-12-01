import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  cacheLife: {
    // Perfil para dados que mudam com pouca frequência (1 hora)
    hours: {
      stale: 3600, // 1 hora - serve do cache
      revalidate: 900, // 15 min - revalida em background
      expire: 3600, // 1 hora - expira completamente
    },
    // Perfil para dados que mudam frequentemente (5 minutos)
    frequent: {
      stale: 300, // 5 minutos
      revalidate: 60, // 1 minuto
      expire: 300,
    },
    // Perfil para dados quase estáticos (24 horas)
    daily: {
      stale: 86400, // 24 horas
      revalidate: 3600, // 1 hora
      expire: 86400,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
