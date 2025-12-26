import { envs } from "@/core/config";

/**
 * Componente para dados estruturados da Organização (Schema.org)
 * Melhora o SEO e permite Knowledge Panel no Google
 */
export function OrganizationJsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: envs.NEXT_PUBLIC_COMPANY_NAME,
    url: envs.NEXT_PUBLIC_BASE_URL_APP,
    logo: `${envs.NEXT_PUBLIC_BASE_URL_APP}/images/logo/logo-horizontal-header1.png`,
    description: envs.NEXT_PUBLIC_COMPANY_ABOUT,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: envs.NEXT_PUBLIC_COMPANY_PHONE,
      contactType: "customer service",
      areaServed: "BR",
      availableLanguage: "Portuguese",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: envs.NEXT_PUBLIC_COMPANY_ADDRESS,
      addressLocality: envs.NEXT_PUBLIC_COMPANY_ADDRESS_LOCATION,
      addressCountry: "BR",
    },
    email: envs.NEXT_PUBLIC_COMPANY_EMAIL,
    telephone: envs.NEXT_PUBLIC_COMPANY_PHONE,
    foundingDate: envs.NEXT_PUBLIC_COMPANY_YEAR_FOUNDATION,
    // Redes sociais - adicionar se disponível
    // sameAs: [
    //   "https://www.facebook.com/mundialmegas",
    //   "https://www.instagram.com/mundialmegas",
    // ],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires structured data injection
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
