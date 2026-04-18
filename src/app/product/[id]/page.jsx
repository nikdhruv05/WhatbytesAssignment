import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/data/products";
import { ProductDetailClient } from "@/components/product-detail-client";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Link
        href="/"
        className="text-sm font-semibold text-[#2b5a9e] hover:underline"
      >
        ← Back to listing
      </Link>
      <ProductDetailClient product={product} />
    </main>
  );
}
