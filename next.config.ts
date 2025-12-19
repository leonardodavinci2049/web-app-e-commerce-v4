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
  async redirects() {
    return [
      {
        // Redireciona URLs antigas de produtos (na raiz) para a home
        // Exemplo: /perfume-afnan-9pm-masculino-edp-100ml-arabe -> /
        // Não afeta rotas válidas: /product/*, /category/*, /products/*, etc
        // Não afeta arquivos estáticos ou rotas do Next.js
        source:
          "/:path((?!product|category|products|_next|api|images|slides|favicon\\.ico|icon\\.png|robots\\.txt|sitemap\\.xml)[a-zA-Z0-9-]+)",
        destination: "/",
        permanent: true, // 308 redirect - mudança permanente
      },
    ];
  },
};

export default nextConfig;
