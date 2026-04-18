"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { CATEGORY_LABELS, getReviewsForProduct } from "@/data/products";
import { StarRating } from "@/components/star-rating";
import { useCart } from "@/context/cart-context";

const QTY_MAX = 99;

export function ProductDetailClient({ product }) {
  const { addItem } = useCart();
  const images = product.images ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedFlash, setAddedFlash] = useState(false);

  const safeIndex = Math.min(activeIndex, Math.max(0, images.length - 1));
  const currentSrc = images[safeIndex] ?? images[0];
  const hasMultiple = images.length > 1;
  const categoryLabel =
    CATEGORY_LABELS[product.category] ?? product.category;
  const reviews = getReviewsForProduct(product.id);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i >= images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  const decQty = () => setQuantity((q) => Math.max(1, q - 1));
  const incQty = () => setQuantity((q) => Math.min(QTY_MAX, q + 1));

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    setAddedFlash(true);
    window.setTimeout(() => setAddedFlash(false), 1600);
  };

  return (
    <div className="mt-8 space-y-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
        <div className="min-w-0">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-100">
            {currentSrc && (
              <Image
                key={currentSrc}
                src={currentSrc}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            )}
            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#1a2b4b] shadow-md transition hover:bg-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#1a2b4b] shadow-md transition hover:bg-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
          {hasMultiple && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 transition sm:h-20 sm:w-20 ${
                    i === safeIndex
                      ? "border-[#2b5a9e] ring-2 ring-[#2b5a9e]/30"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col">
          <h1 className="text-3xl font-bold tracking-tight text-[#1a2b4b] md:text-4xl">
            {product.title}
          </h1>
          <p className="mt-3 text-2xl font-bold text-[#1a2b4b]">${product.price}</p>
          {typeof product.rating === "number" && (
            <StarRating rating={product.rating} className="mt-3" size={20} />
          )}
          <p className="mt-6 leading-relaxed text-zinc-600">
            {product.description}
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            <span className="font-semibold text-[#2b5a9e]">Category:</span>{" "}
            <span className="font-medium text-[#1a2b4b]">{categoryLabel}</span>
            {product.brand && (
              <>
                {" "}
                <span className="text-zinc-400">·</span>{" "}
                <span className="font-semibold text-[#2b5a9e]">Brand:</span>{" "}
                <span className="font-medium text-[#1a2b4b]">
                  {product.brand}
                </span>
              </>
            )}
          </p>

          <div className="mt-8">
            <span
              id="qty-label"
              className="text-sm font-semibold text-[#1a2b4b]"
            >
              Quantity
            </span>
            <div
              className="mt-2 flex w-fit items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50 p-1"
              role="group"
              aria-labelledby="qty-label"
            >
              <button
                type="button"
                onClick={decQty}
                disabled={quantity <= 1}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-semibold text-[#1a2b4b] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="min-w-10 text-center text-base font-semibold tabular-nums text-[#1a2b4b]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={incQty}
                disabled={quantity >= QTY_MAX}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-semibold text-[#1a2b4b] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-8 w-full rounded-xl bg-[#2b5a9e] py-3.5 text-base font-semibold text-white transition hover:bg-[#234a84] sm:max-w-sm"
          >
            Add to Cart
          </button>
          {addedFlash && (
            <p className="mt-3 text-sm font-medium text-emerald-600" role="status">
              Added {quantity} to cart
            </p>
          )}
        </div>
      </div>

      {reviews.length > 0 && (
        <section className="border-t border-zinc-200 pt-10" aria-labelledby="reviews-heading">
          <h2
            id="reviews-heading"
            className="text-xl font-bold text-[#1a2b4b]"
          >
            Customer reviews
          </h2>
          <ul className="mt-6 space-y-6">
            {reviews.map((r) => (
              <li
                key={r.id}
                className="rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-5"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <StarRating rating={r.rating} size={16} />
                  <span className="font-semibold text-[#1a2b4b]">{r.author}</span>
                  <span className="text-sm text-zinc-500">{r.date}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                  {r.body}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
