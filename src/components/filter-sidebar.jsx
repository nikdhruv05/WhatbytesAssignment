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
  const span = priceBoundsMax - priceBoundsMin || 1;
  const fillLeft = ((priceMin - priceBoundsMin) / span) * 100;
  const fillWidth = ((priceMax - priceMin) / span) * 100;
  const overlap = priceMax - priceMin < step * 3;
  const zMin = overlap ? 5 : 3;
  const zMax = overlap ? 4 : 5;

  const onMinInput = (v) => {
    const next = Math.min(Math.max(priceBoundsMin, v), priceMax);
    onPriceRangeChange(next, priceMax);
  };

  const onMaxInput = (v) => {
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
          Price range
        </h3>
        <div className="dual-range-slider mt-4">
          <div className="dual-range-track-bg" aria-hidden />
          <div
            className="dual-range-track-fill"
            style={{ left: `${fillLeft}%`, width: `${fillWidth}%` }}
            aria-hidden
          />
          <input
            id="price-min"
            type="range"
            min={priceBoundsMin}
            max={priceMax}
            step={step}
            value={priceMin}
            onChange={(e) => onMinInput(Number(e.target.value))}
            className="dual-range-input"
            style={{ zIndex: zMin }}
            aria-label="Minimum price"
            aria-valuemin={priceBoundsMin}
            aria-valuemax={priceBoundsMax}
            aria-valuenow={priceMin}
          />
          <input
            id="price-max"
            type="range"
            min={priceMin}
            max={priceBoundsMax}
            step={step}
            value={priceMax}
            onChange={(e) => onMaxInput(Number(e.target.value))}
            className="dual-range-input"
            style={{ zIndex: zMax }}
            aria-label="Maximum price"
            aria-valuemin={priceBoundsMin}
            aria-valuemax={priceBoundsMax}
            aria-valuenow={priceMax}
          />
        </div>
        <div className="mt-3 flex justify-between text-sm font-medium tabular-nums">
          <span>Min ${priceMin}</span>
          <span>Max ${priceMax}</span>
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
