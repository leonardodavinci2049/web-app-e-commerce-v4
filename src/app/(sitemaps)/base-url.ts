import { envs } from "@/core/config/envs";

export function getSitemapBaseUrl(request: Request): string {
  const configuredBaseUrl = envs.NEXT_PUBLIC_BASE_URL_APP.trim();

  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/$/, "");
  }

  return new URL(request.url).origin;
}
