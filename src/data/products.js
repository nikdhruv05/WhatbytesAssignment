const u = (path) => `https://images.unsplash.com${path}?w=800&q=80`;

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "electronics", label: "Electronics" },
  { id: "clothing", label: "Clothing" },
  { id: "home", label: "Home" },
];

export const CATEGORY_LABELS = {
  electronics: "Electronics",
  clothing: "Clothing",
  home: "Home",
};

export const PRODUCTS = [
  {
    id: "1",
    title: "Running Shoes",
    price: 99,
    category: "clothing",
    brand: "Nike",
    rating: 4.5,
    description:
      "Lightweight performance running shoes with breathable mesh and responsive cushioning for daily training and long runs.",
    images: [u("/photo-1542291026-7eec264c27ff")],
  },
  {
    id: "2",
    title: "Wireless Headphones",
    price: 149,
    category: "electronics",
    brand: "Sony",
    rating: 4.8,
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life and studio-quality sound for travel and focus.",
    images: [u("/photo-1505740420928-5e560c06d30e")],
  },
  {
    id: "3",
    title: "Backpack",
    price: 129,
    category: "clothing",
    brand: "Adidas",
    rating: 4.2,
    description:
      "Durable travel backpack with padded laptop sleeve, organizer pockets, and water-resistant fabric for work or weekend trips.",
    images: [u("/photo-1553062407-98eeb64c6a62")],
  },
  {
    id: "4",
    title: "Smartwatch",
    price: 249,
    category: "electronics",
    brand: "Samsung",
    rating: 4.6,
    description:
      "Fitness-focused smartwatch with heart rate monitoring, built-in GPS, sleep tracking, and a bright AMOLED display.",
    images: [u("/photo-1523275335684-37898b6baf30")],
  },
  {
    id: "5",
    title: "Sunglasses",
    price: 149,
    category: "clothing",
    brand: "Ray-Ban",
    rating: 4.4,
    description:
      "Classic polarized lenses with UV protection and a lightweight metal frame for everyday comfort and style.",
    images: [u("/photo-1572635196237-14b3f281503f")],
  },
  {
    id: "6",
    title: "Digital Camera",
    price: 499,
    category: "electronics",
    brand: "Canon",
    rating: 4.7,
    description:
      "Compact mirrorless camera with a 24MP sensor, 4K video recording, and fast hybrid autofocus for photos and content creation.",
    images: [u("/photo-1516035069371-29a1b244ccff")],
  },
  {
    id: "7",
    title: "T-shirt",
    price: 29,
    category: "clothing",
    brand: "Uniqlo",
    rating: 4.1,
    description:
      "Soft cotton crew-neck T-shirt with a relaxed fit—easy to layer and machine washable for everyday wear.",
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
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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

export const REVIEWS_BY_PRODUCT_ID = {
  "8": [
    {
      id: "r1",
      author: "Jamie L.",
      rating: 5,
      body: "Excellent display and battery life. Camera is a big step up from my last phone.",
      date: "Mar 12, 2026",
    },
    {
      id: "r2",
      author: "Ravi K.",
      rating: 4,
      body: "Solid device. Face unlock is fast. Wish the charger was included at this price.",
      date: "Feb 28, 2026",
    },
    {
      id: "r3",
      author: "Sam T.",
      rating: 4,
      body: "Great for everyday use. iOS feels smooth. Shipping was quick.",
      date: "Feb 3, 2026",
    },
  ],
  "2": [
    {
      id: "r1",
      author: "Morgan P.",
      rating: 5,
      body: "ANC is incredible on flights. Comfortable for long sessions.",
      date: "Jan 20, 2026",
    },
    {
      id: "r2",
      author: "Casey D.",
      rating: 4,
      body: "Sound is crisp. App could be simpler but hardware is top tier.",
      date: "Jan 8, 2026",
    },
  ],
};

export function getReviewsForProduct(productId) {
  return REVIEWS_BY_PRODUCT_ID[productId] ?? [];
}
