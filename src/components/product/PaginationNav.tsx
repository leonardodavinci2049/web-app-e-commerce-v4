import Link from "next/link";

interface PaginationNavProps {
  currentPage: number;
  hasNextPage: boolean;
  basePath: string;
  params?: Record<string, string | undefined>;
}

function buildPageUrl(
  basePath: string,
  page: number,
  params: Record<string, string | undefined> = {},
): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      searchParams.set(key, value);
    }
  }
  if (page > 1) {
    searchParams.set("page", String(page));
  }
  const qs = searchParams.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function PaginationNav({
  currentPage,
  hasNextPage,
  basePath,
  params = {},
}: PaginationNavProps) {
  const hasPrevPage = currentPage > 1;

  if (!hasPrevPage && !hasNextPage) return null;

  const pages: number[] = [];
  const rangeStart = Math.max(1, currentPage - 2);
  const rangeEnd = hasNextPage ? currentPage + 1 : currentPage;

  if (rangeStart > 1) {
    pages.push(1);
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  return (
    <nav
      aria-label="Paginação de produtos"
      className="flex justify-center items-center gap-2 py-8"
    >
      {hasPrevPage && (
        <Link
          href={buildPageUrl(basePath, currentPage - 1, params)}
          className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
          rel="prev"
        >
          ← Anterior
        </Link>
      )}

      {pages.length > 0 && pages[0] > 1 && (
        <span className="px-2 text-muted-foreground">…</span>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={buildPageUrl(basePath, page, params)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            page === currentPage
              ? "bg-primary text-primary-foreground pointer-events-none"
              : "border border-border hover:bg-muted"
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </Link>
      ))}

      {hasNextPage && (
        <Link
          href={buildPageUrl(basePath, currentPage + 1, params)}
          className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
          rel="next"
        >
          Próxima →
        </Link>
      )}
    </nav>
  );
}
