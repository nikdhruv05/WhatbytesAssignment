import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/data/products";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/"
        className="text-sm font-medium text-[#2b5a9e] hover:underline"
      >
        ← Back to listing
      </Link>
      <h1 className="mt-6 text-3xl font-bold text-[#1a2b4b]">{product.title}</h1>
      <p className="mt-2 text-xl font-semibold text-[#1a2b4b]">${product.price}</p>
      <p className="mt-4 text-zinc-600">
        Full product detail layout can be expanded here.
      </p>
    </main>
  );
}
