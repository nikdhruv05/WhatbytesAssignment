"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PRICE_SLIDER_BOUNDS,
  PRODUCTS,
} from "@/data/products";
import { FilterSidebar } from "@/components/filter-sidebar";
import { ProductCard } from "@/components/product-card";

/** "Home" shows the full catalog on the home page (no dedicated home SKUs yet). */
function categoryMatchesFilter(categoryId, productCategory) {
  if (categoryId === "all" || categoryId === "home") return true;
  return productCategory === categoryId;
}

function brandsForCategory(categoryId) {
  const list =
    categoryId === "all" || categoryId === "home"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === categoryId);
  return [...new Set(list.map((p) => p.brand))].sort();
}

function getFilteredProducts({ category, priceMin, priceMax, brands }) {
  return PRODUCTS.filter((p) => {
    if (!categoryMatchesFilter(category, p.category)) return false;
    if (p.price < priceMin || p.price > priceMax) return false;
    if (brands.length > 0 && !brands.includes(p.brand)) return false;
    return true;
  });
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

  const filteredProducts = useMemo(
    () =>
      getFilteredProducts({
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
          <p className="mt-1 text-sm text-zinc-600">
            <span className="font-semibold text-[#2b5a9e]">
              {filteredProducts.length}
            </span>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>

          {filteredProducts.length === 0 ? (
            <p className="mt-10 text-center text-zinc-500">
              No products match your filters. Try adjusting category, price, or
              brand.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} showRating />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
