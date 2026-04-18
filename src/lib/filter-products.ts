import type { Product } from "@/types/product";
import type { CategoryId } from "@/types/product";

export type FilterState = {
  category: CategoryId;
  priceMin: number;
  priceMax: number;
  search: string;
  brands: string[];
};

export function filterProducts(
  products: Product[],
  f: FilterState,
  options?: { excludeFeatured?: boolean },
): Product[] {
  let list = products;

  if (options?.excludeFeatured) {
    list = list.filter((p) => !p.featured);
  }

  if (f.category !== "all") {
    list = list.filter((p) => p.category === f.category);
  }

  list = list.filter((p) => p.price >= f.priceMin && p.price <= f.priceMax);

  const q = f.search.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }

  if (f.brands.length > 0) {
    list = list.filter((p) => f.brands.includes(p.brand));
  }

  return list;
}
