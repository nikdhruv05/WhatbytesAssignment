"use client";

import { CATEGORIES } from "@/data/products";

/**
 * @param {object} props
 * @param {string} props.selectedCategory
 * @param {(id: string) => void} props.onCategoryChange
 * @param {number} props.priceMin
 * @param {number} props.priceMax
 * @param {number} props.priceBoundsMin
 * @param {number} props.priceBoundsMax
 * @param {(min: number, max: number) => void} props.onPriceRangeChange
 * @param {string[]} props.availableBrands
 * @param {string[]} props.selectedBrands
 * @param {(brand: string) => void} props.onBrandToggle
 * @param {() => void} [props.onClearBrands]
 */
export function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  priceMin,
  priceMax,
  priceBoundsMin,
  priceBoundsMax,
  onPriceRangeChange,
  availableBrands,
  selectedBrands,
  onBrandToggle,
  onClearBrands,
}) {
  const step = 10;

  const setMin = (v) => {
    const next = Math.min(Math.max(priceBoundsMin, v), priceMax);
    onPriceRangeChange(next, priceMax);
  };

  const setMax = (v) => {
    const next = Math.max(Math.min(priceBoundsMax, v), priceMin);
    onPriceRangeChange(priceMin, next);
  };

  return (
    <aside className="w-full shrink-0 rounded-2xl bg-[#1a2b4b] p-6 text-white shadow-lg lg:w-72">
      <h2 className="text-lg font-semibold tracking-tight">Filters</h2>

      <section className="mt-6 border-t border-white/10 pt-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
          Category
        </h3>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Category">
          {CATEGORIES.map(({ id, label }) => {
            const active = selectedCategory === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onCategoryChange(id)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                  active
                    ? "border-white bg-white text-[#1a2b4b]"
                    : "border-white/30 bg-white/5 text-white hover:border-white/50 hover:bg-white/10"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-6 border-t border-white/10 pt-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
          Price
        </h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-xs text-white/70" htmlFor="price-min">
              Min
            </label>
            <input
              id="price-min"
              type="range"
              min={priceBoundsMin}
              max={Math.min(priceMax, priceBoundsMax)}
              step={step}
              value={priceMin}
              onChange={(e) => setMin(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-white"
              aria-valuemin={priceBoundsMin}
              aria-valuemax={priceBoundsMax}
              aria-valuenow={priceMin}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/70" htmlFor="price-max">
              Max
            </label>
            <input
              id="price-max"
              type="range"
              min={Math.max(priceMin, priceBoundsMin)}
              max={priceBoundsMax}
              step={step}
              value={priceMax}
              onChange={(e) => setMax(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-white"
              aria-valuemin={priceBoundsMin}
              aria-valuemax={priceBoundsMax}
              aria-valuenow={priceMax}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-between text-sm font-medium tabular-nums">
          <span>${priceMin}</span>
          <span>${priceMax}</span>
        </div>
      </section>

      <section className="mt-6 border-t border-white/10 pt-6">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Brand
          </h3>
          {selectedBrands.length > 0 && onClearBrands && (
            <button
              type="button"
              onClick={onClearBrands}
              className="text-xs font-medium text-white/70 underline decoration-white/30 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
        {availableBrands.length === 0 ? (
          <p className="mt-3 text-sm text-white/60">No brands in this category.</p>
        ) : (
          <ul className="mt-3 max-h-48 space-y-2 overflow-y-auto pr-1">
            {availableBrands.map((brand) => {
              const checked = selectedBrands.includes(brand);
              return (
                <li key={brand}>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg py-1.5 pl-1 hover:bg-white/5">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onBrandToggle(brand)}
                      className="h-4 w-4 rounded border-white/40 bg-white/10 text-[#2b5a9e] focus:ring-2 focus:ring-white/40"
                    />
                    <span className="text-sm font-medium">{brand}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </aside>
  );
}
