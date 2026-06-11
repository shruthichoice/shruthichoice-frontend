import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { getProductsByCategory } from "@/lib/products";

export const Route = createFileRoute("/sarees")({
  head: () => ({
    meta: [
      { title: "Sarees — Shruthi's Choice" },
      { name: "description", content: "Shop handwoven silk and cotton sarees at Shruthi's Choice." },
      { property: "og:title", content: "Sarees — Shruthi's Choice" },
      { property: "og:description", content: "Handwoven silk and cotton sarees for every occasion." },
    ],
  }),
  component: () => (
    <CategoryPage title="Sarees" breadcrumb="Sarees" products={getProductsByCategory("sarees")} />
  ),
});
