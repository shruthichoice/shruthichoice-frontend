import { Link } from "@tanstack/react-router";
import { formatPrice, discountPercent } from "@/lib/format";
import { BRAND_SUBLABEL, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
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
            className="aspect-[3/4] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
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

          <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-foreground/90 py-3 text-center text-[11px] font-medium uppercase tracking-[0.15em] text-background transition-transform duration-300 ease-out group-hover:translate-y-0">
            View Product
          </span>
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
