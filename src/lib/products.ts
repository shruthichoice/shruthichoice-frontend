import sareeBeige from "@/assets/saree_cat.jpg";
import sareeNavy from "@/assets/saree1.jpg";
import  beige from "@/assets/saree2.1.jpg"
import beige2 from "@/assets/saree2.2.jpg"
import kurthaRed from "@/assets/kurti_cat.jpg";
import kurthaMustard from "@/assets/kurti.jpg";
import setGreen from "@/assets/3pc_cat.jpg";
import setMaroon from "@/assets/3pc.jpg";

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
    slug: "Pastel Pink Saree",
    name: "Pastel Pink Saree",
    category: "sarees",
    categoryLabel: "Sarees",
    price: 2499,
    image: sareeBeige,
    gallery: [sareeBeige, sareeNavy],
    colors: [{ name: "Pink", hex: "#ffb6c1" }],
    sizes: baseSizes,
    badge: "new",
    isNew: true,
    fabric: "Pure Chanderi Silk",
    description:
      "A timeless beige chanderi silk saree with a delicate woven border. Lightweight, breathable and effortlessly elegant for festive occasions and celebrations.",
    care: "Dry clean only. Store wrapped in muslin cloth away from direct sunlight.",
  },
  {
    slug: "Beige saree",
    name: "Beige saree",
    category: "sarees",
    categoryLabel: "Sarees",
    price: 3999,
    image: beige,
    gallery: [beige, beige2],
    colors: [{ name: "beige", hex: "#F5F5DC" }],
    sizes: baseSizes,
    badge: "bestseller",
    bestseller: true,
    fabric: "Banarasi Silk with Zari",
    description:
      "An opulent navy blue banarasi silk saree adorned with intricate golden zari motifs. A heirloom-worthy drape for weddings and grand festivities.",
    care: "Dry clean only. Avoid contact with perfume and water.",
  },
  {
    slug: "Black cotton-kurtha",
    name: "Black Cotton Kurtha",
    category: "kurthas",
    categoryLabel: "Kurthas",
    price: 1299,
    image: kurthaRed,
    gallery: [kurthaRed, kurthaMustard],
    colors: [{ name: "black", hex: "#0A0A0A" }, { name: "Mustard", hex: "#e0a92e" }],
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
    slug: "Blue kurtha",
    name: "Blue Kurtha",
    category: "kurthas",
    categoryLabel: "Kurthas",
    price: 999,
    oldPrice: 1299,
    image: kurthaMustard,
    gallery: [kurthaMustard],
    colors: [{ name: "blue", hex: "#000080" }],
    sizes: baseSizes,
    badge: "sale",
    isNew: false,
    fabric: "Cotton Blend",
    description:
      "A cheerful mustard floral printed kurtha in a relaxed fit. Soft, breathable fabric perfect for warm days and casual outings.",
    care: "Machine wash cold. Tumble dry low. Warm iron if needed.",
  },
  {
    slug: "Orange-embroidered-anarkali-set",
    name: "Orange Embroidered Anarkali Set",
    category: "3-piece-sets",
    categoryLabel: "3-Piece Sets",
    price: 3499,
    image: setGreen,
    gallery: [setGreen],
    colors: [{ name: "Orange", hex: "#FFA500" }],
    sizes: baseSizes,
    badge: "bestseller",
    bestseller: true,
    fabric: "Cotton Silk with Embroidery",
    description:
      "An elegant green embroidered anarkali 3-piece set with delicate threadwork. Comes with a flowing kurta, coordinated bottoms and a sheer dupatta.",
    care: "Dry clean recommended. Gentle hand wash for the inner layers.",
  },
  {
    slug: "light blue cotton-3-piece-set",
    name: "Light blue cotton-3-piece-set",
    category: "3-piece-sets",
    categoryLabel: "3-Piece Sets",
    price: 2999,
    oldPrice: 3999,
    image: setMaroon,
    gallery: [setMaroon],
    colors: [{ name: "light blue", hex: "#ADD8E6" }],
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
