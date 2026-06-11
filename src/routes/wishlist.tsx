import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useStore } from "@/context/store";
import { getProductBySlug } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Shruthi's Choice" },
      { name: "description", content: "Your saved favourites at Shruthi's Choice." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const items = wishlist
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 md:px-6">
      <h1 className="font-display text-2xl uppercase tracking-[0.15em]">Wishlist</h1>

      {items.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
          <Heart className="h-10 w-10" strokeWidth={1} />
          <p className="mt-5 text-sm text-muted-foreground">Your wishlist is empty.</p>
          <Link to="/" className="mt-6 bg-brand px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.15em] text-brand-foreground">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-[2px] gap-y-6 md:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
