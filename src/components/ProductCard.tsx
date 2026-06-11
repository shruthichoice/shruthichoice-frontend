import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useStore } from "@/context/store";
import { formatPrice, discountPercent } from "@/lib/format";
import { BRAND_SUBLABEL, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const wished = isWishlisted(product.slug);
  const off = discountPercent(product.price, product.oldPrice);

  const badgeLabel =
    product.soldOut
      ? "Sold Out"
      : product.badge === "new"
        ? "New"
        : product.badge === "bestseller"
          ? "Bestseller"
          : product.badge === "sale"
            ? "Sale"
            : null;

  const badgeClass =
    product.badge === "bestseller" || product.badge === "sale"
      ? "bg-brand text-brand-foreground"
      : "bg-foreground text-background";

  const quickAdd = () => {
    const firstSize = product.sizes.find((s) => !product.outOfStockSizes?.includes(s)) ?? "M";
    addToCart({
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      oldPrice: product.oldPrice,
      size: firstSize,
      color: product.colors[0]?.name ?? "Default",
      qty: 1,
    });
  };

  return (
    <div className="group relative">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block"
        aria-label={product.name}
      >
        <div className="relative overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={`${product.name} — ${BRAND_SUBLABEL}`}
            width={960}
            height={1280}
            loading="lazy"
            className="aspect-[3/4] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />

          {(badgeLabel || product.soldOut) && (
            <span
              className={`absolute left-0 top-0 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${
                product.soldOut ? "bg-foreground text-background" : badgeClass
              }`}
            >
              {product.soldOut ? "Sold Out" : badgeLabel}
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.slug);
            }}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center bg-background/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            <Heart
              className="h-4 w-4"
              strokeWidth={1.5}
              fill={wished ? "currentColor" : "none"}
            />
          </button>

          {!product.soldOut && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                quickAdd();
              }}
              className="absolute inset-x-0 bottom-0 translate-y-full bg-foreground py-3 text-[11px] font-medium uppercase tracking-[0.15em] text-background transition-transform duration-300 ease-out group-hover:translate-y-0"
            >
              Add to Bag
            </button>
          )}
        </div>

        <div className="pt-2.5">
          <p className="text-[10px] uppercase tracking-[0.15em] text-sublabel">
            {BRAND_SUBLABEL}
          </p>
          <h3 className="mt-1 line-clamp-2 text-sm font-normal leading-snug">
            {product.name}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-xs text-sublabel line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            {off && (
              <span className="text-xs font-medium text-[color:oklch(0.65_0.15_60)]">
                {off}% OFF
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
