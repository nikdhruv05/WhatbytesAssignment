import type { CategoryId } from "@/types/product";

const CATEGORIES: CategoryId[] = ["all", "electronics", "clothing", "home"];

export function parseCategory(raw: string | null | undefined): CategoryId {
  if (!raw) return "all";
  const v = raw.toLowerCase();
  return CATEGORIES.includes(v as CategoryId) ? (v as CategoryId) : "all";
}

export function parsePriceRange(
  raw: string | null | undefined,
  fallback: { min: number; max: number },
): { min: number; max: number } {
  if (!raw || !raw.includes("-")) return fallback;
  const [a, b] = raw.split("-").map((x) => Number.parseFloat(x.trim()));
  if (Number.isNaN(a) || Number.isNaN(b)) return fallback;
  return { min: Math.min(a, b), max: Math.max(a, b) };
}

export function parseBrands(raw: string | null | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function buildFilterQuery(params: {
  category?: CategoryId;
  priceMin?: number;
  priceMax?: number;
  q?: string;
  brands?: string[];
}): string {
  const sp = new URLSearchParams();
  if (params.category && params.category !== "all") {
    sp.set("category", params.category);
  }
  if (
    params.priceMin !== undefined &&
    params.priceMax !== undefined &&
    !(params.priceMin === 0 && params.priceMax === 5000)
  ) {
    sp.set("price", `${params.priceMin}-${params.priceMax}`);
  }
  if (params.q?.trim()) sp.set("q", params.q.trim());
  if (params.brands?.length) sp.set("brands", params.brands.join(","));
  const s = sp.toString();
  return s ? `?${s}` : "";
}
