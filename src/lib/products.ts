import sareeBeige from "@/assets/p-saree-beige.jpg";
import sareeNavy from "@/assets/p-saree-navy.jpg";
import kurthaRed from "@/assets/p-kurtha-red.jpg";
import kurthaMustard from "@/assets/p-kurtha-mustard.jpg";
import setGreen from "@/assets/p-set-green.jpg";
import setMaroon from "@/assets/p-set-maroon.jpg";

export type CategorySlug = "sarees" | "kurthas" | "3-piece-sets";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  categoryLabel: string;
  price: number;
  oldPrice?: number;
  image: string;
  gallery: string[];
  colors: ProductColor[];
  sizes: string[];
  outOfStockSizes?: string[];
  badge?: "new" | "bestseller" | "sale";
  soldOut?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  fabric: string;
  description: string;
  care: string;
}

const SUBLABEL = "SHRUTHI'S CHOICE";
export const BRAND_SUBLABEL = SUBLABEL;

const baseSizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const products: Product[] = [
  {
    slug: "beige-chanderi-silk-saree",
    name: "Beige Chanderi Silk Saree",
    category: "sarees",
    categoryLabel: "Sarees",
    price: 2499,
    image: sareeBeige,
    gallery: [sareeBeige, sareeNavy],
    colors: [{ name: "Beige", hex: "#d9c39c" }, { name: "Navy", hex: "#1f2d52" }],
    sizes: baseSizes,
    badge: "new",
    isNew: true,
    fabric: "Pure Chanderi Silk",
    description:
      "A timeless beige chanderi silk saree with a delicate woven border. Lightweight, breathable and effortlessly elegant for festive occasions and celebrations.",
    care: "Dry clean only. Store wrapped in muslin cloth away from direct sunlight.",
  },
  {
    slug: "navy-blue-banarasi-silk-saree",
    name: "Navy Blue Banarasi Silk Saree",
    category: "sarees",
    categoryLabel: "Sarees",
    price: 3999,
    image: sareeNavy,
    gallery: [sareeNavy, sareeBeige],
    colors: [{ name: "Navy", hex: "#1f2d52" }, { name: "Maroon", hex: "#6e1f2c" }],
    sizes: baseSizes,
    badge: "bestseller",
    bestseller: true,
    fabric: "Banarasi Silk with Zari",
    description:
      "An opulent navy blue banarasi silk saree adorned with intricate golden zari motifs. A heirloom-worthy drape for weddings and grand festivities.",
    care: "Dry clean only. Avoid contact with perfume and water.",
  },
  {
    slug: "red-block-print-cotton-kurtha",
    name: "Red Block Print Cotton Kurtha",
    category: "kurthas",
    categoryLabel: "Kurthas",
    price: 1299,
    image: kurthaRed,
    gallery: [kurthaRed, kurthaMustard],
    colors: [{ name: "Red", hex: "#d22f48" }, { name: "Mustard", hex: "#e0a92e" }],
    sizes: baseSizes,
    outOfStockSizes: ["XS"],
    badge: "new",
    isNew: true,
    fabric: "Pure Cotton",
    description:
      "A vibrant red block print cotton kurtha with traditional hand-crafted motifs. Comfortable everyday wear with a fashion-forward silhouette.",
    care: "Machine wash cold. Do not bleach. Iron on medium heat.",
  },
  {
    slug: "mustard-floral-printed-kurtha",
    name: "Mustard Floral Printed Kurtha",
    category: "kurthas",
    categoryLabel: "Kurthas",
    price: 999,
    oldPrice: 1299,
    image: kurthaMustard,
    gallery: [kurthaMustard, kurthaRed],
    colors: [{ name: "Mustard", hex: "#e0a92e" }, { name: "Red", hex: "#d22f48" }],
    sizes: baseSizes,
    badge: "sale",
    isNew: false,
    fabric: "Cotton Blend",
    description:
      "A cheerful mustard floral printed kurtha in a relaxed fit. Soft, breathable fabric perfect for warm days and casual outings.",
    care: "Machine wash cold. Tumble dry low. Warm iron if needed.",
  },
  {
    slug: "green-embroidered-anarkali-set",
    name: "Green Embroidered Anarkali Set",
    category: "3-piece-sets",
    categoryLabel: "3-Piece Sets",
    price: 3499,
    image: setGreen,
    gallery: [setGreen, setMaroon],
    colors: [{ name: "Green", hex: "#8bbf4d" }, { name: "Maroon", hex: "#6e1f2c" }],
    sizes: baseSizes,
    badge: "bestseller",
    bestseller: true,
    fabric: "Cotton Silk with Embroidery",
    description:
      "An elegant green embroidered anarkali 3-piece set with delicate threadwork. Comes with a flowing kurta, coordinated bottoms and a sheer dupatta.",
    care: "Dry clean recommended. Gentle hand wash for the inner layers.",
  },
  {
    slug: "maroon-chiffon-3-piece-set",
    name: "Maroon Chiffon 3-Piece Set",
    category: "3-piece-sets",
    categoryLabel: "3-Piece Sets",
    price: 2999,
    oldPrice: 3999,
    image: setMaroon,
    gallery: [setMaroon, setGreen],
    colors: [{ name: "Maroon", hex: "#6e1f2c" }, { name: "Green", hex: "#8bbf4d" }],
    sizes: baseSizes,
    outOfStockSizes: ["XXL"],
    badge: "sale",
    bestseller: true,
    fabric: "Flowing Chiffon",
    description:
      "A graceful maroon chiffon 3-piece set with a fluid drape. Modern tailoring meets traditional charm for an unforgettable festive look.",
    care: "Dry clean only. Steam to remove creases.",
  },
];

export const categories: { slug: CategorySlug; label: string; image: string }[] = [
  { slug: "sarees", label: "Sarees", image: sareeBeige },
  { slug: "kurthas", label: "Kurthas", image: kurthaRed },
  { slug: "3-piece-sets", label: "3-Piece Sets", image: setGreen },
];

export function getProductsByCategory(slug: CategorySlug): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

// Featured rows — ordered so new/bestselling pieces lead, padded to fill grids.
export const newArrivals = [...products].sort(
  (a, b) => Number(b.isNew || b.badge === "new") - Number(a.isNew || a.badge === "new"),
);
export const bestSellers = [...products].sort(
  (a, b) => Number(b.bestseller) - Number(a.bestseller),
);
export const saleProducts = products.filter((p) => p.oldPrice);

export const CATEGORY_LABELS: Record<CategorySlug, string> = {
  sarees: "Sarees",
  kurthas: "Kurthas",
  "3-piece-sets": "3-Piece Sets",
};
