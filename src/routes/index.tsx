import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSlider } from "@/components/HeroSlider";
import { SectionTitle } from "@/components/SectionTitle";
import { ProductCard } from "@/components/ProductCard";
import { ProductRow } from "@/components/ProductRow";
import {
  categories,
  newArrivals,
  bestSellers,
  products as allProducts,
  getProductBySlug,
} from "@/lib/products";
import { useStore } from "@/context/store";
import editorial from "@/assets/editorial.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shruthi's Choice — Traditional Indian Women's Wear" },
      {
        name: "description",
        content:
          "Shop handpicked sarees, kurthas and 3-piece sets at Shruthi's Choice. Fine apparel and curated pieces for the modern woman.",
      },
      { property: "og:title", content: "Shruthi's Choice — Fine Apparel and Curated Pieces" },
      {
        property: "og:description",
        content: "Handpicked traditional wear for modern women.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { recentlyViewed } = useStore();
  const recent = recentlyViewed
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div>
      <HeroSlider />

      {/* Categories */}
      <section className="mx-auto max-w-[1600px] px-4 py-16 md:px-6">
        <SectionTitle title="Shop by Category" withRules={false} />
        <div className="mt-8 grid grid-cols-1 gap-[2px] sm:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.slug} to={c.slug === "sarees" ? "/sarees" : c.slug === "kurthas" ? "/kurthas" : "/3-piece-sets"} className="group block">
              <div className="relative overflow-hidden border-b-2 border-transparent transition-colors duration-300 group-hover:border-brand">
                <img
                  src={c.image}
                  alt={c.label}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="section-title mt-3 text-center text-xs">{c.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mx-auto max-w-[1600px] px-4 py-8 md:px-6">
        <SectionTitle title="New Arrivals" />
        <div className="mt-8">
          <ProductRow products={newArrivals.length ? newArrivals : allProducts.slice(0, 4)} />
        </div>
        <div className="mt-5 text-right">
          <Link to="/new-arrivals" className="link-underline text-[12px] uppercase tracking-wider">
            View All
          </Link>
        </div>
      </section>

      {/* Editorial brand story */}
      <section className="mt-12 bg-foreground text-background">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-stretch md:grid-cols-2">
          <div className="flex flex-col justify-center px-8 py-16 md:px-16">
            <p className="font-serif text-3xl font-semibold leading-tight md:text-5xl">
              “Every piece tells a story”
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-background/75 md:text-base">
              Shruthi's Choice is a celebration of womanhood and heritage. Timeless
              craftsmanship, curated for the modern woman.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex w-fit border border-background px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.15em] transition-colors hover:bg-background hover:text-foreground"
            >
              Our Story
            </Link>
          </div>
          <div className="min-h-[360px] overflow-hidden">
            <img
              src={editorial}
              alt="Shruthi's Choice editorial"
              width={960}
              height={1216}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="mx-auto max-w-[1600px] px-4 py-16 md:px-6">
        <SectionTitle title="Best Sellers" />
        <div className="mt-8 grid grid-cols-2 gap-x-[2px] gap-y-6 md:grid-cols-4">
          {(bestSellers.length ? bestSellers : allProducts).slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-5 text-right">
          <Link to="/sarees" className="link-underline text-[12px] uppercase tracking-wider">
            View All
          </Link>
        </div>
      </section>

      {/* Recently viewed */}
      {recent.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-4 py-8 md:px-6">
          <SectionTitle title="Continue Shopping" />
          <div className="mt-8">
            <ProductRow products={recent} />
          </div>
        </section>
      )}

      {/* Instagram strip */}
      <section className="mx-auto max-w-[1600px] px-4 py-16 md:px-6">
        <SectionTitle title="@shruthis_choice" withRules={false} />
        <div className="mt-8 grid grid-cols-3 gap-[2px] md:grid-cols-6">
          {allProducts.concat(allProducts).slice(0, 6).map((p, i) => (
            <a
              key={i}
              href="https://www.instagram.com/shruthis_choice"
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden"
            >
              <img
                src={p.image}
                alt="Instagram post"
                width={600}
                height={600}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-brand/0 opacity-0 transition-all duration-300 group-hover:bg-brand/70 group-hover:opacity-100">
                <svg className="h-7 w-7 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
