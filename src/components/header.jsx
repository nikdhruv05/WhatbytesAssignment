"use client";

import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/cart-context";

/**
 * Site header: logo, centered search, cart + profile.
 * Search is local state for now; hook it to URL/listing when those ship.
 */
export function Header() {
  const [query, setQuery] = useState("");
  const { itemCount } = useCart();

  return (
    <header className="bg-[#2b5a9e] shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 text-xl font-bold tracking-tight text-white"
        >
          Logo
        </Link>

        <div className="relative mx-auto hidden min-w-0 flex-1 md:block md:max-w-xl lg:max-w-2xl">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/80"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-white/90 bg-transparent py-2.5 pl-12 pr-4 text-sm text-white placeholder:text-white/60 outline-none ring-white/30 focus:ring-2"
            aria-label="Search products"
          />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-xl bg-[#1a2b4b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#243556]"
          >
            <ShoppingCart className="h-5 w-5" aria-hidden />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-[#1a2b4b]">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/40 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Account"
          >
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 pb-4 md:hidden">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/80"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-white/90 bg-transparent py-2.5 pl-12 pr-4 text-sm text-white placeholder:text-white/60 outline-none"
            aria-label="Search products"
          />
        </div>
      </div>
    </header>
  );
}
