import { envs } from "@/core/config";
import { SCHEMA_IDS } from "./json-ld";

const HOURS_SEPARATOR = /\s*-\s*/;
const GEO_PATTERN = /@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/;
const POSTAL_CODE_PATTERN = /\b\d{5}-?\d{3}\b/;
const REGION_PATTERN = /,\s*([A-Z]{2})\b/;

function splitOpeningHours(
  hours: string,
  fallbackOpen: string,
  fallbackClose: string,
) {
  const [opens = fallbackOpen, closes = fallbackClose] = hours
    .split(HOURS_SEPARATOR)
    .map((value) => value.trim())
    .filter(Boolean);

  return { opens, closes };
}

function getRegionFromLocation() {
  return envs.NEXT_PUBLIC_COMPANY_ADDRESS_LOCATION.match(REGION_PATTERN)?.[1];
}

function getPostalCodeFromAddress() {
  const match = envs.NEXT_PUBLIC_COMPANY_ADDRESS.match(POSTAL_CODE_PATTERN);

  return match?.[0]?.replace(/(\d{5})(\d{3})/, "$1-$2");
}

function getGeoFromMapsUrl() {
  const match = envs.NEXT_PUBLIC_COMPANY_MAPS_URL.match(GEO_PATTERN);

  if (!match) {
    return undefined;
  }

  return {
    "@type": "GeoCoordinates",
    latitude: Number(match[1]),
    longitude: Number(match[2]),
  };
}

export const COMPANY_LOGO_URL = `${envs.NEXT_PUBLIC_BASE_URL_APP}/images/logo/logo-horizontal-header1.png`;

export const DEFAULT_OG_IMAGE_URL = `${envs.NEXT_PUBLIC_BASE_URL_APP}/opengraph-image`;

export const COMPANY_SAME_AS = [
  envs.NEXT_PUBLIC_COMPANY_FACEBOOK_URL,
  envs.NEXT_PUBLIC_COMPANY_INSTAGRAM_URL,
  envs.NEXT_PUBLIC_COMPANY_LINKTREE_URL,
  envs.NEXT_PUBLIC_COMPANY_WHATSAPP_URL,
].filter(Boolean);

export const COMPANY_POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: envs.NEXT_PUBLIC_COMPANY_ADDRESS,
  addressLocality: envs.NEXT_PUBLIC_COMPANY_ADDRESS_LOCATION,
  addressRegion: getRegionFromLocation(),
  postalCode: getPostalCodeFromAddress(),
  addressCountry: "BR",
};

export const COMPANY_CONTACT_POINTS = [
  {
    "@type": "ContactPoint",
    telephone: envs.NEXT_PUBLIC_COMPANY_PHONE,
    email: envs.NEXT_PUBLIC_COMPANY_EMAIL,
    contactType: "sales",
    areaServed: "BR",
    availableLanguage: ["pt-BR", "Portuguese"],
    url: `${envs.NEXT_PUBLIC_BASE_URL_APP}/contact`,
  },
  {
    "@type": "ContactPoint",
    telephone: envs.NEXT_PUBLIC_COMPANY_WHATSAPP,
    contactType: "customer service",
    areaServed: "BR",
    availableLanguage: ["pt-BR", "Portuguese"],
    url: envs.NEXT_PUBLIC_COMPANY_WHATSAPP_URL,
  },
];

export const COMPANY_OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    ...splitOpeningHours(
      envs.NEXT_PUBLIC_COMPANY_OPENING_HOURS,
      "08:00",
      "18:00",
    ),
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Saturday",
    ...splitOpeningHours(
      envs.NEXT_PUBLIC_COMPANY_OPENING_SATURDAY,
      "08:00",
      "12:00",
    ),
  },
];

export function getCompanyGeo() {
  return getGeoFromMapsUrl();
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": SCHEMA_IDS.organization,
    name: envs.NEXT_PUBLIC_COMPANY_NAME,
    url: envs.NEXT_PUBLIC_BASE_URL_APP,
    logo: COMPANY_LOGO_URL,
    image: COMPANY_LOGO_URL,
    description: envs.NEXT_PUBLIC_COMPANY_ABOUT,
    email: envs.NEXT_PUBLIC_COMPANY_EMAIL,
    telephone: envs.NEXT_PUBLIC_COMPANY_PHONE,
    taxID: envs.NEXT_PUBLIC_COMPANY_CNPJ,
    sameAs: COMPANY_SAME_AS,
    contactPoint: COMPANY_CONTACT_POINTS,
    address: COMPANY_POSTAL_ADDRESS,
    foundingDate: envs.NEXT_PUBLIC_COMPANY_YEAR_FOUNDATION,
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": SCHEMA_IDS.localBusiness,
    name: envs.NEXT_PUBLIC_COMPANY_NAME,
    url: envs.NEXT_PUBLIC_BASE_URL_APP,
    image: COMPANY_LOGO_URL,
    logo: COMPANY_LOGO_URL,
    description: envs.NEXT_PUBLIC_COMPANY_ABOUT,
    email: envs.NEXT_PUBLIC_COMPANY_EMAIL,
    telephone: envs.NEXT_PUBLIC_COMPANY_PHONE,
    taxID: envs.NEXT_PUBLIC_COMPANY_CNPJ,
    address: COMPANY_POSTAL_ADDRESS,
    geo: getCompanyGeo(),
    hasMap: envs.NEXT_PUBLIC_COMPANY_MAPS_URL,
    sameAs: COMPANY_SAME_AS,
    parentOrganization: {
      "@id": SCHEMA_IDS.organization,
    },
    openingHoursSpecification: COMPANY_OPENING_HOURS,
    priceRange: "$$",
    currenciesAccepted: "BRL",
    paymentAccepted: "Pix, Cartao de Credito, Dinheiro",
  };
}
