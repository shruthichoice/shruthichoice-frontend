import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Heart, Minus, Plus, ChevronDown, Truck } from "lucide-react";
import { useStore } from "@/context/store";
import { formatPrice, discountPercent } from "@/lib/format";
import {
  getProductBySlug,
  products,
  BRAND_SUBLABEL,
  type Product,
} from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: p
        ? [
            { title: `${p.name} — Shruthi's Choice` },
            { name: "description", content: p.description },
            { property: "og:title", content: `${p.name} — Shruthi's Choice` },
            { property: "og:description", content: p.description },
            { property: "og:type", content: "product" },
            { property: "og:image", content: p.image },
          ]
        : [{ title: "Product — Shruthi's Choice" }],
    };
  },
  notFoundComponent: () => (
    <div className="py-32 text-center">
      <h1 className="font-display text-2xl uppercase tracking-wider">Product not found</h1>
      <Link to="/" className="link-underline mt-4 inline-block text-sm">Back to home</Link>
    </div>
  ),
  component: ProductDetail,
});

const ACCORDIONS = ["Product Details", "Fabric & Care", "Shipping & Returns"] as const;

function ProductDetail() {
  const { product } = Route.useLoaderData();
  return <ProductView key={product.slug} product={product} />;
}

function ProductView({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted, addRecentlyViewed } = useStore();
  const navigate = useNavigate();

  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(product.colors[0]?.name ?? "Default");
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pinResult, setPinResult] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>("Product Details");

  useEffect(() => {
    addRecentlyViewed(product.slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);

  const off = discountPercent(product.price, product.oldPrice);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  const buildItem = () => ({
    slug: product.slug,
    name: product.name,
    image: product.image,
    price: product.price,
    oldPrice: product.oldPrice,
    size: size ?? "M",
    color,
    qty,
  });

  const handleAdd = () => {
    if (!size) return;
    addToCart(buildItem());
  };

  const handleBuyNow = () => {
    if (!size) return;
    addToCart(buildItem());
    navigate({ to: "/checkout" });
  };

  const checkPin = () => {
    if (pincode.length === 6) {
      setPinResult("Delivery available — arrives in 4–6 business days.");
    } else {
      setPinResult("Please enter a valid 6-digit pincode.");
    }
  };

  const accordionBody: Record<string, React.ReactNode> = {
    "Product Details": <p>{product.description}</p>,
    "Fabric & Care": (
      <div className="space-y-2">
        <p><span className="font-medium text-foreground">Fabric:</span> {product.fabric}</p>
        <p>{product.care}</p>
      </div>
    ),
    "Shipping & Returns": (
      <p>
        Free shipping on orders above ₹999. Easy 7-day returns and exchanges. Cash on
        delivery available across India.
      </p>
    ),
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 md:px-6">
      <nav className="text-[12px] text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-1.5">/</span>
        <Link
          to={product.category === "sarees" ? "/sarees" : product.category === "kurthas" ? "/kurthas" : "/3-piece-sets"}
          className="uppercase hover:text-foreground"
        >
          {product.categoryLabel}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-3 md:flex-row">
          <div className="flex gap-3 overflow-x-auto md:flex-col">
            {product.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`h-20 w-16 flex-shrink-0 overflow-hidden border ${
                  activeImg === i ? "border-foreground" : "border-border"
                }`}
              >
                <img src={img} alt={`${product.name} view ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
          <div className="relative flex-1 overflow-hidden bg-secondary">
            {product.soldOut && (
              <span className="absolute left-0 top-0 z-10 bg-foreground px-3 py-1.5 text-[11px] uppercase tracking-wider text-background">
                Sold Out
              </span>
            )}
            <img
              src={product.gallery[activeImg]}
              alt={`${product.name} — ${BRAND_SUBLABEL}`}
              width={960}
              height={1280}
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <p className="text-[10px] uppercase tracking-[0.15em] text-sublabel">{BRAND_SUBLABEL}</p>
          <h1 className="mt-1.5 font-display text-xl font-normal md:text-2xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-lg">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="text-sm text-sublabel line-through">{formatPrice(product.oldPrice)}</span>
                {off && (
                  <span className="bg-brand px-2 py-0.5 text-[11px] font-medium text-brand-foreground">
                    {off}% OFF
                  </span>
                )}
              </>
            )}
          </div>

          <div className="my-5 h-px bg-border" />

          {/* Color */}
          <div>
            <p className="text-[12px] uppercase tracking-wider">
              Color: <span className="text-muted-foreground">{color}</span>
            </p>
            <div className="mt-2.5 flex gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={`h-8 w-8 rounded-full border-2 ${color === c.name ? "border-foreground" : "border-border"}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <p className="text-[12px] uppercase tracking-wider">Select Size</p>
              <button className="link-underline text-[11px] text-muted-foreground">Size Guide</button>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const oos = product.outOfStockSizes?.includes(s);
                return (
                  <button
                    key={s}
                    disabled={oos}
                    onClick={() => setSize(s)}
                    className={`h-10 w-12 border text-[13px] transition-colors ${
                      oos
                        ? "cursor-not-allowed border-border text-muted-foreground line-through"
                        : size === s
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            {!size && <p className="mt-2 text-[11px] text-destructive">Please select a size.</p>}
          </div>

          <div className="my-5 h-px bg-border" />

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <p className="text-[12px] uppercase tracking-wider">Qty</p>
            <div className="flex items-center border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2" aria-label="Decrease">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2" aria-label="Increase">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 space-y-2.5">
            {product.soldOut ? (
              <button className="w-full border border-foreground py-3.5 text-[13px] font-medium uppercase tracking-[0.15em]">
                Notify Me
              </button>
            ) : (
              <>
                <button
                  onClick={handleAdd}
                  className="w-full bg-foreground py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] text-background transition-opacity hover:opacity-90"
                >
                  Add to Bag
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-brand py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] text-brand-foreground transition-opacity hover:opacity-90"
                >
                  Buy Now
                </button>
              </>
            )}
            <button
              onClick={() => toggleWishlist(product.slug)}
              className="flex w-full items-center justify-center gap-2 py-2 text-[12px] uppercase tracking-wider"
            >
              <Heart className="h-4 w-4" strokeWidth={1.5} fill={isWishlisted(product.slug) ? "currentColor" : "none"} />
              Wishlist
            </button>
          </div>

          <div className="my-5 h-px bg-border" />

          {/* Pincode */}
          <div>
            <p className="flex items-center gap-2 text-[12px] uppercase tracking-wider">
              <Truck className="h-4 w-4" strokeWidth={1.5} /> Delivery
            </p>
            <div className="mt-2.5 flex items-center border border-border">
              <input
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="Enter pincode"
                className="w-full px-3 py-2.5 text-sm outline-none"
              />
              <button onClick={checkPin} className="px-4 text-[12px] font-medium uppercase tracking-wider">
                Check
              </button>
            </div>
            {pinResult && <p className="mt-2 text-[12px] text-muted-foreground">{pinResult}</p>}
          </div>

          {/* Accordions */}
          <div className="mt-6 border-t border-border">
            {ACCORDIONS.map((a) => (
              <div key={a} className="border-b border-border">
                <button
                  onClick={() => setOpen(open === a ? null : a)}
                  className="flex w-full items-center justify-between py-4 text-[12px] uppercase tracking-wider"
                >
                  {a}
                  <ChevronDown className={`h-4 w-4 transition-transform ${open === a ? "rotate-180" : ""}`} />
                </button>
                {open === a && (
                  <div className="pb-4 text-[13px] leading-relaxed text-muted-foreground">
                    {accordionBody[a]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* You may also like */}
      <section className="mt-20">
        <SectionTitle title="You May Also Like" />
        <div className="mt-8 grid grid-cols-2 gap-x-[2px] gap-y-6 md:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
