import { envs } from "@/core/config";
import { SCHEMA_IDS } from "./json-ld";

const HOURS_SEPARATOR = /\s*(?:-|às)\s*/i;
const GEO_PATTERN = /@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/;
const EMBED_GEO_PATTERN = /!2d(-?\d+(?:\.\d+)?).*?!3d(-?\d+(?:\.\d+)?)/;
const POSTAL_CODE_PATTERN = /\b\d{5}-?\d{3}\b/;
const LOCATION_PATTERN = /^\s*\d{5}-?\d{3}\s*-\s*(.*?)\s*-\s*([A-Z]{2})\s*$/;
const DISTRICT_PATTERN = /\s*-\s*(Bairro\s+.+?)\s+\d{5}-?\d{3}\b/i;

function normalizeOpeningTime(value: string): string {
  const normalized = value.trim().toLowerCase();
  const match = normalized.match(/^(\d{1,2})(?:h(?:(\d{2}))?)?$/);

  if (!match) {
    return normalized;
  }

  return `${match[1].padStart(2, "0")}:${match[2] ?? "00"}`;
}

function splitOpeningHours(
  hours: string,
  fallbackOpen: string,
  fallbackClose: string,
) {
  const [opens = fallbackOpen, closes = fallbackClose] = hours
    .split(HOURS_SEPARATOR)
    .map((value) => value.trim())
    .filter(Boolean);

  return {
    opens: normalizeOpeningTime(opens),
    closes: normalizeOpeningTime(closes),
  };
}

function getLocationParts() {
  const match =
    envs.NEXT_PUBLIC_COMPANY_ADDRESS_LOCATION.match(LOCATION_PATTERN);

  return {
    city: match?.[1]?.trim(),
    region: match?.[2],
  };
}

function getPostalCodeFromAddress() {
  const match = envs.NEXT_PUBLIC_COMPANY_ADDRESS.match(POSTAL_CODE_PATTERN);

  return match?.[0]?.replace(/(\d{5})(\d{3})/, "$1-$2");
}

function getGeoFromMapsUrl() {
  const directMatch = envs.NEXT_PUBLIC_COMPANY_MAPS_URL.match(GEO_PATTERN);
  const embedMatch = envs.NEXT_PUBLIC_COMPANY_MAPS_URL.match(EMBED_GEO_PATTERN);

  if (!directMatch && !embedMatch) {
    return undefined;
  }

  const latitude = directMatch?.[1] ?? embedMatch?.[2];
  const longitude = directMatch?.[2] ?? embedMatch?.[1];

  if (!latitude || !longitude) {
    return undefined;
  }

  return {
    "@type": "GeoCoordinates",
    latitude: Number(latitude),
    longitude: Number(longitude),
  };
}

function getStreetAddress() {
  const addressWithoutLocation = envs.NEXT_PUBLIC_COMPANY_ADDRESS.split(
    POSTAL_CODE_PATTERN,
  )[0]
    ?.trim()
    .replace(/\s*-\s*$/, "");
  const district =
    envs.NEXT_PUBLIC_COMPANY_ADDRESS.match(DISTRICT_PATTERN)?.[1];

  if (!addressWithoutLocation) {
    return envs.NEXT_PUBLIC_COMPANY_ADDRESS;
  }

  return district && !addressWithoutLocation.includes(district)
    ? `${addressWithoutLocation} - ${district}`
    : addressWithoutLocation;
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
  streetAddress: getStreetAddress(),
  addressLocality: getLocationParts().city,
  addressRegion: getLocationParts().region,
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
