import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { saleProducts } from "@/lib/products";

export const Route = createFileRoute("/sale")({
  head: () => ({
    meta: [
      { title: "Sale — Shruthi's Choice" },
      { name: "description", content: "Shop discounted traditional wear on sale at Shruthi's Choice." },
      { property: "og:title", content: "Sale — Shruthi's Choice" },
      { property: "og:description", content: "Limited-time offers on curated traditional wear." },
    ],
  }),
  component: () => (
    <CategoryPage title="Sale" breadcrumb="Sale" products={saleProducts} />
  ),
});
