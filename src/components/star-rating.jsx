"use client";

import { Star } from "lucide-react";

export function StarRating({
  rating,
  max = 5,
  size = 16,
  className = "",
}) {
  const rounded = Math.round(rating);

  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      aria-label={`${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < rounded
              ? "fill-[#2b5a9e] text-[#2b5a9e]"
              : "text-zinc-300"
          }
          aria-hidden
        />
      ))}
    </div>
  );
}
