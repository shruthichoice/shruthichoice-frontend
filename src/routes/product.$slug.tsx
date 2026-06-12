import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ChevronDown, ChevronLeft, ChevronRight, X, Star } from "lucide-react";
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

// Define a structured layout for user text feedback reviews
interface ReviewMock {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

const MOCK_REVIEWS: ReviewMock[] = [
  {
    id: "rev-1",
    author: "Priya R.",
    rating: 5,
    date: "May 12, 2026",
    title: "Stunning Craftsmanship",
    body: "The fabric quality exceeded my expectations. The zari work is incredibly clean and light, making it very elegant to carry during long family events. Absolutely beautiful collection piece.",
    verified: true
  },
  {
    id: "rev-2",
    author: "Anjali S.",
    rating: 5,
    date: "April 28, 2026",
    title: "Perfect Fit & Pure Comfort",
    body: "Extremely breathable cotton material and beautiful block print details. Got so many compliments the first day I wore it out. Will definitely purchase another set soon.",
    verified: true
  },
  {
    id: "rev-3",
    author: "Meera Krishnan",
    rating: 4,
    date: "March 15, 2026",
    title: "Elegant Design",
    body: "Very sophisticated and true to the pictures shown online. Shipping was swift and packaging felt premium, like unboxing a handpicked gift.",
    verified: true
  }
];

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
  const { addToCart, addRecentlyViewed } = useStore();
  const navigate = useNavigate();

  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(product.colors[0]?.name ?? "Default");
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState<string | null>("Product Details");
  const [showSizeError, setShowSizeError] = useState(false);
  
  // Lightbox view state manager
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    addRecentlyViewed(product.slug);
  }, [product.slug]);

  useEffect(() => {
    if (size) setShowSizeError(false);
  }, [size]);

  // Trap window keyboard hits to safely collapse fullscreen modals on 'Esc' key clicks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const off = discountPercent(product.price, product.oldPrice);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  const nextImage = () => {
    setActiveImg((prev) => (prev + 1) % product.gallery.length);
  };

  const prevImage = () => {
    setActiveImg((prev) => (prev - 1 + product.gallery.length) % product.gallery.length);
  };

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
    if (!size) {
      setShowSizeError(true);
      return;
    }
    addToCart(buildItem());
  };

  const handleBuyNow = () => {
    if (!size) {
      setShowSizeError(true);
      return;
    }
    addToCart(buildItem());
    navigate({ to: "/checkout" });
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
    <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-6 relative">
      
      {/* Breadcrumbs */}
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

      {/* Main Grid Matrix */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] items-start">
        
        {/* ================= GALLERY DISPLAY SYSTEM ================= */}
        <div className="flex flex-col gap-3 md:flex-row md:sticky md:top-24">
          
          {/* Vertical Thumbnails — Hidden completely on mobile viewports */}
          <div className="hidden md:flex flex-col gap-2.5 shrink-0">
            {product.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`h-20 w-15 overflow-hidden border transition-colors bg-secondary sharp-edges ${
                  activeImg === i ? "border-foreground" : "border-border hover:border-muted-foreground"
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-contain" />
              </button>
            ))}
          </div>

          {/* Main Visual Display Frame Container */}
          <div className="relative flex-1 overflow-hidden bg-white border border-border group select-none flex items-center justify-center h-[50vh] sm:h-[480px]">
            {product.soldOut && (
              <span className="absolute left-0 top-0 z-10 bg-foreground px-3 py-1.5 text-[10px] uppercase tracking-wider text-background sharp-edges">
                Sold Out
              </span>
            )}
            
            {/* Interactive Image Pointer: Triggers the absolute full view overlay zoom modal */}
            <img
              src={product.gallery[activeImg]}
              alt={`${product.name} product photo view`}
              onClick={() => setLightboxOpen(true)}
              className="w-full h-full object-contain max-h-full cursor-zoom-in"
              title="Click to view full image zoom modal"
            />

            {/* Mobile View Indicator Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden z-10">
              {product.gallery.map((_, i) => (
                <span 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all ${activeImg === i ? "w-4 bg-[#F5C800]" : "w-1.5 bg-black/30"}`} 
                />
              ))}
            </div>

            {/* Slide Toggle Arrows */}
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/90 text-foreground border border-border p-2 shadow-sm transition-opacity hover:bg-background sharp-edges md:opacity-0 md:group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/90 text-foreground border border-border p-2 shadow-sm transition-opacity hover:bg-background sharp-edges md:opacity-0 md:group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ================= DATA LABELS INFO STREAM ================= */}
        <div className="space-y-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-sublabel font-bold">{BRAND_SUBLABEL}</p>
            <h1 className="mt-1 font-poppins text-xl font-medium tracking-tight text-foreground md:text-2xl">{product.name}</h1>

            <div className="mt-3 flex items-center gap-3 font-poppins">
              <span className="text-lg font-semibold text-foreground">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <>
                  <span className="text-sm text-sublabel line-through">{formatPrice(product.oldPrice)}</span>
                  {off && (
                    <span className="bg-brand px-2 py-0.5 text-[10px] font-bold text-brand-foreground sharp-edges">
                      {off}% OFF
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Color Matrix */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-foreground">
              Color: <span className="text-muted-foreground font-normal normal-case ml-1">{color}</span>
            </p>
            <div className="mt-2.5 flex gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={`h-7 w-7 rounded-full border-2 transition-transform ${color === c.name ? "border-foreground scale-105" : "border-border"}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size Select Blocks */}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-wider text-foreground">Select Size</p>
              <button className="link-underline text-[11px] text-muted-foreground">Size Guide</button>
            </div>
            
            <div className={`mt-2.5 flex flex-wrap gap-2 p-1 transition-colors duration-200 ${
              showSizeError ? "bg-destructive/10 border border-destructive" : ""
            }`}>
              {product.sizes.map((s) => {
                const oos = product.outOfStockSizes?.includes(s);
                return (
                  <button
                    key={s}
                    disabled={oos}
                    onClick={() => setSize(s)}
                    className={`h-10 w-12 border text-[13px] font-medium transition-colors sharp-edges ${
                      oos
                        ? "cursor-not-allowed border-border text-muted-foreground/40 line-through bg-secondary/30"
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
            {showSizeError && (
              <p className="mt-2 text-[11px] font-bold text-destructive uppercase tracking-wider">
                Please select a sizing option to continue.
              </p>
            )}
          </div>

          <div className="h-px bg-border" />

          {/* Counter Actions Line */}
          <div className="flex items-center gap-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-foreground">Qty</p>
            <div className="flex items-center border border-border bg-background select-none">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-1.5 hover:bg-secondary/40 transition-colors" aria-label="Reduce count">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-1.5 hover:bg-secondary/40 transition-colors" aria-label="Increase count">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Checkout Purchase Handles */}
          <div className="space-y-2.5 pt-2">
            {product.soldOut ? (
              <button type="button" className="w-full border border-foreground py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] sharp-edges bg-transparent text-foreground hover:bg-foreground hover:text-background transition-colors">
                Notify Me When Restocked
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleAdd}
                  className="w-full bg-foreground py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] text-background transition-opacity hover:opacity-95 sharp-edges"
                >
                  Add to Bag
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full bg-[#F5C800] py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] text-black transition-opacity hover:opacity-95 sharp-edges"
                >
                  Buy Now
                </button>
              </>
            )}
          </div>

          <div className="h-px bg-border" />

          {/* Accordions Matrix */}
          <div className="border-t border-border pt-2">
            {ACCORDIONS.map((a) => (
              <div key={a} className="border-b border-border">
                <button
                  onClick={() => setOpen(open === a ? null : a)}
                  className="flex w-full items-center justify-between py-3.5 text-[11px] font-bold uppercase tracking-wider text-foreground"
                >
                  {a}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open === a ? "rotate-180" : ""}`} />
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

      {/* Recommended Products Grid Section */}
      <section className="mt-20 border-t border-border pt-12">
        <SectionTitle title="You May Also Like" />
        <div className="mt-8 grid grid-cols-2 gap-x-[2px] gap-y-10 px-4 md:grid-cols-4 md:px-0">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* ================= REVIEWS DISPLAY BLOCK (NEW) ================= */}
      <section className="mt-20 border-t border-border pt-12 max-w-4xl">
        <h2 className="font-poppins text-xs font-bold uppercase tracking-[0.2em] text-foreground">
          Customer Reviews
        </h2>
        
        {/* Aggregated Score Bar */}
        <div className="mt-4 flex items-center gap-4 bg-secondary/30 p-6 sharp-edges border border-border">
          <div className="text-center shrink-0">
            <p className="font-poppins text-3xl font-bold text-foreground">4.9</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">out of 5 stars</p>
          </div>
          <div className="h-10 w-px bg-border hidden sm:block" />
          <div className="space-y-1 flex-1 hidden sm:block">
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span>Excellent (5★)</span>
              <div className="h-2 bg-foreground flex-1 max-w-[200px] sharp-edges" style={{ width: "92%" }} />
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span>Good (4★)</span>
              <div className="h-2 bg-foreground/20 flex-1 max-w-[200px] sharp-edges" style={{ width: "8%" }} />
            </div>
          </div>
        </div>

        {/* Mapped Text Reviews Grid */}
        <div className="mt-8 divide-y divide-border">
          {MOCK_REVIEWS.map((rev) => (
            <div key={rev.id} className="py-6 first:pt-0 last:pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#F5C800]">
                  {[...Array(5)].map((_, index) => (
                    <Star 
                      key={index} 
                      className={`h-3.5 w-3.5 ${index < rev.rating ? "fill-current" : "text-border"}`} 
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground font-poppins">{rev.date}</span>
              </div>
              
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-poppins text-sm font-semibold text-foreground">{rev.title}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground shrink-0">
                  — {rev.author}
                </span>
                {rev.verified && (
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#000] border border-foreground/30 px-1 shrink-0">
                    Verified Buyer
                  </span>
                )}
              </div>
              
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-sans">
                {rev.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HIGH-FIDELITY ZOOM LIGHTBOX OVERLAY MODAL ================= */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center animate-fadeIn">
          
          {/* Header Controls Banner Context */}
          <div className="absolute top-0 inset-x-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-10">
            <span className="text-xs font-poppins font-medium text-white/70 uppercase tracking-widest">
              Image {activeImg + 1} of {product.gallery.length}
            </span>
            <button 
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="text-white hover:text-[#F5C800] transition-colors p-2"
              aria-label="Close zoomed viewport modal panel"
            >
              <X className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Central Fullscreen Content Wrapper Canvas */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            
            {/* Direct Background Dim Click Exit Bounds Context */}
            <div className="absolute inset-0" onClick={() => setLightboxOpen(false)} />

            {/* Zoom-contained Main Graphic Element Sheet
               Using touch-action-pinch and high-resolution parameters handles smartphone scaling gracefully
            */}
            <img 
              src={product.gallery[activeImg]} 
              alt="" 
              className="max-w-full max-h-full object-contain select-none z-10 transition-transform duration-300 md:scale-110 lg:scale-125 touch-pan-x touch-pan-y"
            />

            {/* Large View Slider Handles */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 bg-white/5 hover:bg-white/10 rounded-full z-20"
              aria-label="Previous page campaign frame selection"
            >
              <ChevronLeft className="h-8 w-8" strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 bg-white/5 hover:bg-white/10 rounded-full z-20"
              aria-label="Next page campaign frame selection"
            >
              <ChevronRight className="h-8 w-8" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}