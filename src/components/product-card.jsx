"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { StarRating } from "@/components/star-rating";

export function ProductCard({ product, showRating = true }) {
  const { addItem } = useCart();
  const imageUrl = product.images[0];

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm transition hover:shadow-md">
      <Link
        href={`/product/${product.id}`}
        className="relative block aspect-square bg-zinc-50"
      >
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/product/${product.id}`}>
          <h2 className="text-lg font-bold text-[#1a2b4b] hover:underline">
            {product.title}
          </h2>
        </Link>
        <p className="mt-1 text-lg font-bold text-[#1a2b4b]">${product.price}</p>
        {showRating && typeof product.rating === "number" && (
          <StarRating rating={product.rating} className="mt-2" size={16} />
        )}
        <button
          type="button"
          onClick={() => addItem(product.id, 1)}
          className="mt-4 w-full rounded-lg bg-[#2b5a9e] py-2.5 text-sm font-semibold text-white transition hover:bg-[#234a84]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
