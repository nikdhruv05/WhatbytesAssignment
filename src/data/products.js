const u = (path) => `https://images.unsplash.com${path}?w=800&q=80`;

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "electronics", label: "Electronics" },
  { id: "clothing", label: "Clothing" },
  { id: "home", label: "Home" },
];

export const PRODUCTS = [
  {
    id: "1",
    title: "Running Shoes",
    price: 99,
    category: "clothing",
    brand: "Nike",
    rating: 4.5,
    images: [u("/photo-1542291026-7eec264c27ff")],
  },
  {
    id: "2",
    title: "Wireless Headphones",
    price: 149,
    category: "electronics",
    brand: "Sony",
    rating: 4.8,
    images: [u("/photo-1505740420928-5e560c06d30e")],
  },
  {
    id: "3",
    title: "Backpack",
    price: 129,
    category: "clothing",
    brand: "Adidas",
    rating: 4.2,
    images: [u("/photo-1553062407-98eeb64c6a62")],
  },
  {
    id: "4",
    title: "Smartwatch",
    price: 249,
    category: "electronics",
    brand: "Samsung",
    rating: 4.6,
    images: [u("/photo-1523275335684-37898b6baf30")],
  },
  {
    id: "5",
    title: "Sunglasses",
    price: 149,
    category: "clothing",
    brand: "Ray-Ban",
    rating: 4.4,
    images: [u("/photo-1572635196237-14b3f281503f")],
  },
  {
    id: "6",
    title: "Digital Camera",
    price: 499,
    category: "electronics",
    brand: "Canon",
    rating: 4.7,
    images: [u("/photo-1516035069371-29a1b244ccff")],
  },
  {
    id: "7",
    title: "T-shirt",
    price: 29,
    category: "clothing",
    brand: "Uniqlo",
    rating: 4.1,
    images: [u("/photo-1521572163474-6864f9cf17ab")],
  },
  {
    id: "8",
    title: "Smartphone",
    price: 699,
    category: "electronics",
    brand: "Apple",
    rating: 4,
    featured: true,
    images: [
      u("/photo-1511707171634-5f897ff02aa9"),
      u("/photo-1592899677977-9c10ca588bbd"),
    ],
  },
];

export const PRICE_SLIDER_BOUNDS = { min: 0, max: 5000 };

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}
