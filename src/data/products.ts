import type { Product } from "@/types/product";

const u = (path: string) => `https://images.unsplash.com${path}?w=800&q=80`;

export const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Running Shoes",
    price: 99,
    category: "clothing",
    brand: "Nike",
    description:
      "Lightweight performance running shoes with breathable mesh and responsive cushioning for daily training.",
    rating: 4.5,
    images: [u("/photo-1542291026-7eec264c27ff")],
  },
  {
    id: "2",
    title: "Wireless Headphones",
    price: 149,
    category: "electronics",
    brand: "Sony",
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life and studio-quality sound.",
    rating: 4.8,
    images: [u("/photo-1505740420928-5e560c06d30e")],
  },
  {
    id: "3",
    title: "Backpack",
    price: 129,
    category: "clothing",
    brand: "Adidas",
    description:
      "Durable travel backpack with padded laptop sleeve and water-resistant fabric.",
    rating: 4.2,
    images: [u("/photo-1553062407-98eeb64c6a62")],
  },
  {
    id: "4",
    title: "Smartwatch",
    price: 249,
    category: "electronics",
    brand: "Samsung",
    description:
      "Fitness-focused smartwatch with heart rate monitoring, GPS, and AMOLED display.",
    rating: 4.6,
    images: [u("/photo-1523275335684-37898b6baf30")],
  },
  {
    id: "5",
    title: "Sunglasses",
    price: 149,
    category: "clothing",
    brand: "Ray-Ban",
    description:
      "Classic polarized sunglasses with UV protection and lightweight metal frame.",
    rating: 4.4,
    images: [u("/photo-1572635196237-14b3f281503f")],
  },
  {
    id: "6",
    title: "Digital Camera",
    price: 499,
    category: "electronics",
    brand: "Canon",
    description:
      "Mirrorless camera with 24MP sensor, 4K video, and fast hybrid autofocus system.",
    rating: 4.7,
    images: [u("/photo-1516035069371-29a1b244ccff")],
  },
  {
    id: "7",
    title: "T-shirt",
    price: 29,
    category: "clothing",
    brand: "Uniqlo",
    description:
      "Soft cotton crew-neck T-shirt with a relaxed fit for everyday comfort.",
    rating: 4.1,
    images: [u("/photo-1521572163474-6864f9cf17ab")],
  },
  {
    id: "8",
    title: "Smartphone",
    price: 699,
    category: "electronics",
    brand: "Apple",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    rating: 4,
    featured: true,
    images: [
      u("/photo-1511707171634-5f897ff02aa9"),
      u("/photo-1592899677977-9c10ca588bbd"),
      u("/photo-1580910051074-3e6943263915"),
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getBrandsForProducts(products: Product[]): string[] {
  return [...new Set(products.map((p) => p.brand))].sort();
}
