export type CatalogSearchParams = Record<string, string | string[] | undefined>;

const POSITIVE_INTEGER_PATTERN = /^[1-9]\d*$/;
const CATALOG_VARIANT_PARAMS = ["q", "sort_col", "sort_ord", "stock"];

export function parseCatalogPage(
  value: string | string[] | undefined,
): number | null {
  if (value === undefined) {
    return 1;
  }

  if (typeof value !== "string" || !POSITIVE_INTEGER_PATTERN.test(value)) {
    return null;
  }

  const page = Number(value);
  return Number.isSafeInteger(page) ? page : null;
}

export function hasCatalogVariant(params: CatalogSearchParams): boolean {
  return CATALOG_VARIANT_PARAMS.some((key) => params[key] !== undefined);
}

export function buildPaginatedCanonical(path: string, page: number): string {
  return page > 1 ? `${path}?page=${page}` : path;
}
