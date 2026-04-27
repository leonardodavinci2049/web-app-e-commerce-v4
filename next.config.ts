import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  async rewrites() {
    return [
      {
        source: "/sitemap-products-:id.xml",
        destination: "/sitemap-products/:id",
      },
    ];
  },
  cacheLife: {
    // Perfil para produtos e listagens (10 minutos)
    hours: {
      stale: 600, // 10 min - serve do cache
      revalidate: 120, // 2 min - revalida em background
      expire: 600, // 10 min - expira completamente
    },
    // Perfil para menu de categorias (15 minutos)
    quarter: {
      stale: 900, // 15 minutos - serve do cache
      revalidate: 300, // 5 min - revalida em background
      expire: 900, // 15 minutos - expira completamente
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
    qualities: [75, 100],
    minimumCacheTTL: 86400, // Cache de imagens otimizadas por 24h (reduz re-fetches do servidor de assets)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "mundialmegastore.com.br",
        port: "",
        pathname: "/**",
      },
      // Production assets domain
      {
        protocol: "https",
        hostname: "assents01.comsuporte.com.br",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5573",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
