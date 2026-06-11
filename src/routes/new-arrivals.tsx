import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { newArrivals, products } from "@/lib/products";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — Shruthi's Choice" },
      { name: "description", content: "Discover the latest sarees, kurthas and sets at Shruthi's Choice." },
      { property: "og:title", content: "New Arrivals — Shruthi's Choice" },
      { property: "og:description", content: "The newest additions to our curated collection." },
    ],
  }),
  component: () => (
    <CategoryPage
      title="New Arrivals"
      breadcrumb="New Arrivals"
      products={newArrivals.length ? newArrivals : products}
    />
  ),
});
