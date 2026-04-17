import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Derives a smaller variant URL from an assets API image URL.
 * Replaces `-original.jpg` suffix with the requested variant (e.g. `-medium.jpg`).
 * Returns the original URL unchanged if the pattern doesn't match.
 */
export function getImageVariantUrl(
  imageUrl: string,
  variant: "medium" | "thumbnail",
): string {
  if (!imageUrl) return imageUrl;
  return imageUrl.replace(/-original\.(jpg|jpeg|png|webp)$/i, `-${variant}.$1`);
}

export function formatCurrencyBRL(
  value: number,
  options?: { withSymbol?: boolean },
): string {
  const safeValue = Number.isFinite(value) ? value : 0;
  const formatted = safeValue.toFixed(2).replace(".", ",");

  if (options?.withSymbol === false) {
    return formatted;
  }

  return `R$ ${formatted}`;
}
