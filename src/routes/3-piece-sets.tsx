import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { getProductsByCategory } from "@/lib/products";

export const Route = createFileRoute("/3-piece-sets")({
  head: () => ({
    meta: [
      { title: "3-Piece Sets — Shruthi's Choice" },
      { name: "description", content: "Shop embroidered anarkali and festive 3-piece sets at Shruthi's Choice." },
      { property: "og:title", content: "3-Piece Sets — Shruthi's Choice" },
      { property: "og:description", content: "Festive 3-piece sets for celebrations and occasions." },
    ],
  }),
  component: () => (
    <CategoryPage
      title="3-Piece Sets"
      breadcrumb="3-Piece Sets"
      products={getProductsByCategory("3-piece-sets")}
    />
  ),
});
