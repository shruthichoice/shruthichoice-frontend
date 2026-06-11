import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { getProductsByCategory } from "@/lib/products";

export const Route = createFileRoute("/kurthas")({
  head: () => ({
    meta: [
      { title: "Kurthas — Shruthi's Choice" },
      { name: "description", content: "Shop printed and embroidered cotton kurthas at Shruthi's Choice." },
      { property: "og:title", content: "Kurthas — Shruthi's Choice" },
      { property: "og:description", content: "Breathable, everyday kurthas with a fashion-forward edge." },
    ],
  }),
  component: () => (
    <CategoryPage title="Kurthas" breadcrumb="Kurthas" products={getProductsByCategory("kurthas")} />
  ),
});
