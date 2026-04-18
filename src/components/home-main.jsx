"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PRICE_SLIDER_BOUNDS,
  PRODUCTS,
} from "@/data/products";
import { FilterSidebar } from "@/components/filter-sidebar";

function brandsForCategory(categoryId) {
  const list =
    categoryId === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === categoryId);
  return [...new Set(list.map((p) => p.brand))].sort();
}

function countMatching({ category, priceMin, priceMax, brands }) {
  return PRODUCTS.filter((p) => {
    if (category !== "all" && p.category !== category) return false;
    if (p.price < priceMin || p.price > priceMax) return false;
    if (brands.length > 0 && !brands.includes(p.brand)) return false;
    return true;
  }).length;
}

export function HomeMain() {
  const [category, setCategory] = useState("all");
  const [priceMin, setPriceMin] = useState(PRICE_SLIDER_BOUNDS.min);
  const [priceMax, setPriceMax] = useState(PRICE_SLIDER_BOUNDS.max);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const availableBrands = useMemo(
    () => brandsForCategory(category),
    [category],
  );

  useEffect(() => {
    setSelectedBrands((prev) =>
      prev.filter((b) => availableBrands.includes(b)),
    );
  }, [category, availableBrands]);

  const matchCount = useMemo(
    () =>
      countMatching({
        category,
        priceMin,
        priceMax,
        brands: selectedBrands,
      }),
    [category, priceMin, priceMax, selectedBrands],
  );

  const onPriceRangeChange = (min, max) => {
    setPriceMin(min);
    setPriceMax(max);
  };

  const onBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand],
    );
  };

  return (
    <main className="flex flex-1 flex-col bg-zinc-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:flex-row lg:items-start">
        <FilterSidebar
          selectedCategory={category}
          onCategoryChange={setCategory}
          priceMin={priceMin}
          priceMax={priceMax}
          priceBoundsMin={PRICE_SLIDER_BOUNDS.min}
          priceBoundsMax={PRICE_SLIDER_BOUNDS.max}
          onPriceRangeChange={onPriceRangeChange}
          availableBrands={availableBrands}
          selectedBrands={selectedBrands}
          onBrandToggle={onBrandToggle}
          onClearBrands={() => setSelectedBrands([])}
        />

        <section className="min-w-0 flex-1 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-[#1a2b4b]">Product listing</h1>
          <p className="mt-2 text-zinc-600">
            <span className="font-medium text-[#2b5a9e]">{matchCount}</span>{" "}
            {matchCount === 1 ? "product matches" : "products match"} your
            filters. Product cards will appear here next.
          </p>
        </section>
      </div>
    </main>
  );
}
