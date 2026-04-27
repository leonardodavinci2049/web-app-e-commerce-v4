import Link from "next/link";

interface PaginationNavProps {
  currentPage: number;
  hasNextPage: boolean;
  basePath: string;
  totalPages?: number;
  params?: Record<string, string | undefined>;
}

type PaginationItem = number | "ellipsis";

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

function buildPaginationItems(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): PaginationItem[] {
  const totalNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!showLeftEllipsis) {
    const leftRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, index) => index + 1,
    );

    return [...leftRange, "ellipsis", totalPages];
  }

  if (!showRightEllipsis) {
    const rightRangeStart = totalPages - (2 + siblingCount * 2);
    const rightRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, index) => rightRangeStart + index,
    );

    return [1, "ellipsis", ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, index) => leftSiblingIndex + index,
  );

  return [1, "ellipsis", ...middleRange, "ellipsis", totalPages];
}

function renderPaginationItems(
  items: PaginationItem[],
  currentPage: number,
  basePath: string,
  params: Record<string, string | undefined>,
) {
  return items.map((item, index) => {
    if (item === "ellipsis") {
      const previousItem = items[index - 1] ?? "start";
      const nextItem = items[index + 1] ?? "end";

      return (
        <span
          key={`ellipsis-${previousItem}-${nextItem}`}
          className="px-1 text-sm text-muted-foreground"
          aria-hidden="true"
        >
          …
        </span>
      );
    }

    const isCurrentPage = item === currentPage;

    return (
      <Link
        key={item}
        href={buildPageUrl(basePath, item, params)}
        className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isCurrentPage
            ? "bg-primary text-primary-foreground pointer-events-none"
            : "border border-border bg-background hover:bg-muted"
        }`}
        aria-current={isCurrentPage ? "page" : undefined}
        aria-label={
          isCurrentPage ? `Página atual, ${item}` : `Ir para página ${item}`
        }
      >
        {item}
      </Link>
    );
  });
}

export function PaginationNav({
  currentPage,
  hasNextPage,
  basePath,
  totalPages,
  params = {},
}: PaginationNavProps) {
  const resolvedTotalPages = totalPages
    ? Math.max(1, totalPages)
    : currentPage + (hasNextPage ? 1 : 0);
  const hasPrevPage = currentPage > 1;
  const canGoNext = currentPage < resolvedTotalPages;

  if (resolvedTotalPages <= 1 && !hasPrevPage && !canGoNext) return null;

  const mobileItems = buildPaginationItems(currentPage, resolvedTotalPages, 1);
  const desktopItems = buildPaginationItems(currentPage, resolvedTotalPages, 2);

  return (
    <nav
      aria-label="Paginação de produtos"
      className="flex flex-col items-center gap-4 py-8"
    >
      <p className="text-sm text-muted-foreground">
        Página {currentPage} de {resolvedTotalPages}
      </p>

      <div className="flex w-full max-w-4xl items-center justify-center gap-2">
        {hasPrevPage && (
          <Link
            href={buildPageUrl(basePath, currentPage - 1, params)}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted sm:px-4"
            rel="prev"
            aria-label="Ir para página anterior"
          >
            <span className="sm:hidden">←</span>
            <span className="hidden sm:inline">← Anterior</span>
          </Link>
        )}

        <div className="flex flex-wrap items-center justify-center gap-2 md:hidden">
          {renderPaginationItems(mobileItems, currentPage, basePath, params)}
        </div>

        <div className="hidden flex-wrap items-center justify-center gap-2 md:flex">
          {renderPaginationItems(desktopItems, currentPage, basePath, params)}
        </div>

        {canGoNext && (
          <Link
            href={buildPageUrl(basePath, currentPage + 1, params)}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted sm:px-4"
            rel="next"
            aria-label="Ir para próxima página"
          >
            <span className="sm:hidden">→</span>
            <span className="hidden sm:inline">Próxima →</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
