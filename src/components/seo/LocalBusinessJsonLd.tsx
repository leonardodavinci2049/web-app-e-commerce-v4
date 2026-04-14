import { envs } from "@/core/config";

/**
 * Componente de Dados Estruturados JSON-LD para LocalBusiness
 * Complementa Organization com dados de loja física para SEO local
 *
 * @see https://schema.org/LocalBusiness
 * @see https://developers.google.com/search/docs/appearance/structured-data/local-business
 */
export function LocalBusinessJsonLd() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: envs.NEXT_PUBLIC_COMPANY_NAME,
    url: envs.NEXT_PUBLIC_BASE_URL_APP,
    logo: `${envs.NEXT_PUBLIC_BASE_URL_APP}/images/logo/logo-horizontal-header1.png`,
    image: `${envs.NEXT_PUBLIC_BASE_URL_APP}/images/logo/logo-horizontal-header1.png`,
    description: envs.NEXT_PUBLIC_COMPANY_ABOUT,
    telephone: envs.NEXT_PUBLIC_COMPANY_PHONE,
    email: envs.NEXT_PUBLIC_COMPANY_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: envs.NEXT_PUBLIC_COMPANY_ADDRESS,
      addressLocality: envs.NEXT_PUBLIC_COMPANY_ADDRESS_LOCATION,
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens:
          envs.NEXT_PUBLIC_COMPANY_OPENING_HOURS.split(" - ")[0] || "08:00",
        closes:
          envs.NEXT_PUBLIC_COMPANY_OPENING_HOURS.split(" - ")[1] || "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens:
          envs.NEXT_PUBLIC_COMPANY_OPENING_SATURDAY.split(" - ")[0] || "08:00",
        closes:
          envs.NEXT_PUBLIC_COMPANY_OPENING_SATURDAY.split(" - ")[1] || "12:00",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "BRL",
    paymentAccepted: "Pix, Cartão de Crédito, Dinheiro",
    hasMap: envs.NEXT_PUBLIC_COMPANY_MAPS_URL,
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires structured data injection
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessSchema),
      }}
    />
  );
}
