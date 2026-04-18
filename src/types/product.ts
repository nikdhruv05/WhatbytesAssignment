export type CategoryId = "all" | "electronics" | "clothing" | "home";

export type Product = {
  id: string;
  title: string;
  price: number;
  category: Exclude<CategoryId, "all">;
  brand: string;
  description: string;
  rating: number;
  images: string[];
  featured?: boolean;
};
