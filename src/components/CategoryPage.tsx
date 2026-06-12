import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/products";

type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "newest", label: "Newest First" },
];

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export function CategoryPage({
  title,
  products,
  breadcrumb,
}: {
  title: string;
  products: Product[];
  breadcrumb: string;
}) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colorNames, setColorNames] = useState<string[]>([]);

  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => p.colors.forEach((c) => map.set(c.name, c.hex)));
    return Array.from(map, ([name, hex]) => ({ name, hex }));
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (sizes.length) list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));
    if (colorNames.length)
      list = list.filter((p) => p.colors.some((c) => colorNames.includes(c.name)));
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
    }
    return list;
  }, [products, maxPrice, sizes, colorNames, sort]);

  const toggle = (arr: string[], v: string, set: (a: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const clearAll = () => {
    setMaxPrice(5000);
    setSizes([]);
    setColorNames([]);
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 md:px-6">
      <nav className="text-[12px] text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="uppercase tracking-wide text-foreground">{breadcrumb}</span>
      </nav>

      <h1 className="mt-3 font-display text-3xl font-medium uppercase tracking-[0.15em] md:text-4xl">
        {title}
      </h1>

      {/* Controls bar */}
      <div className="mt-5 flex items-center justify-between border-b border-foreground pb-3">
        <div>
          <span className="text-[12px] text-muted-foreground">
            {filtered.length} items
          </span>
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-1.5 text-[12px] uppercase tracking-wider"
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} /> Filter
          </button>
          <div className="relative">
            <button
              onClick={() => setSortOpen((o) => !o)}
              className="flex items-center gap-1.5 text-[12px] uppercase tracking-wider"
            >
              <ArrowUpDown className="h-4 w-4" strokeWidth={1.5} /> Sort
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-7 z-20 w-52 border border-foreground bg-background py-1">
                {SORTS.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => {
                      setSort(s.key);
                      setSortOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-[13px] hover:bg-secondary ${
                      sort === s.key ? "font-medium" : ""
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid — Clean, Fixed Response Layout */}
      {filtered.length === 0 ? (
        <p className="py-24 text-center text-sm text-muted-foreground">
          No products match your filters.
        </p>
      ) : (
        /* Fixed Editorial Grid Configuration:
          - Gutter padding added via px-4 to match earlier responsive safety rules
          - Fixed 2-column scale on mobile viewports
          - Staggered scaling array out to 3 cols on tablet, 4 cols on full screen desktops
        */
        <div className="mt-4 grid grid-cols-2 gap-x-[2px] gap-y-10 px-4 md:grid-cols-3 md:px-0 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}

      {/* Filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setFilterOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-background">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="section-title text-xs">Filters</h2>
              <button onClick={() => setFilterOpen(false)} aria-label="Close filters">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
              <div>
                <h3 className="text-[12px] font-medium uppercase tracking-wider">Price Range</h3>
                <input
                  type="range"
                  min={500}
                  max={5000}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="mt-4 w-full accent-[#000]"
                />
                <p className="mt-2 text-[13px] text-muted-foreground">Up to ₹ {maxPrice.toLocaleString("en-IN")}</p>
              </div>

              <div>
                <h3 className="text-[12px] font-medium uppercase tracking-wider">Size</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ALL_SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggle(sizes, s, setSizes)}
                      className={`h-9 w-12 border text-[13px] sharp-edges ${
                        sizes.includes(s) ? "border-foreground bg-foreground text-background" : "border-border"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[12px] font-medium uppercase tracking-wider">Color</h3>
                <div className="mt-3 flex flex-wrap gap-3">
                  {allColors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => toggle(colorNames, c.name, setColorNames)}
                      aria-label={c.name}
                      className={`h-8 w-8 rounded-full border-2 ${
                        colorNames.includes(c.name) ? "border-foreground" : "border-border"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 border-t border-border px-6 py-4">
              <button
                onClick={() => setFilterOpen(false)}
                className="w-full bg-foreground py-3 text-[12px] font-medium uppercase tracking-[0.15em] text-background sharp-edges"
              >
                Apply Filters
              </button>
              <button onClick={clearAll} className="link-underline mx-auto block text-[12px]">
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}