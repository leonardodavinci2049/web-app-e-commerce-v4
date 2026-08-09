export function sitemapServiceUnavailable(): Response {
  return new Response("Sitemap temporariamente indisponível.", {
    status: 503,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "Retry-After": "300",
    },
  });
}
