import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSlider } from "@/components/HeroSlider";
import { SectionTitle } from "@/components/SectionTitle";
import { ProductCard } from "@/components/ProductCard";
import { ProductRow } from "@/components/ProductRow";
import { BrandStory } from "@/components/BrandStory";
import { BrandTimeline } from "@/components/BrandTimeline";
import { WhyChoose } from "@/components/WhyChoose";
import { Testimonials } from "@/components/Testimonials";
import { EditorialQuote } from "@/components/EditorialQuote";
import {
  categories,
  newArrivals,
  bestSellers,
  products as allProducts,
  getProductBySlug,
  type CategorySlug,
} from "@/lib/products";
import { useStore } from "@/context/store";

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

const catTo = (slug: CategorySlug) =>
  slug === "sarees" ? "/sarees" : slug === "kurthas" ? "/kurthas" : "/3-piece-sets";

function Home() {
  const { recentlyViewed } = useStore();
  const recent = recentlyViewed
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div>
      <HeroSlider />

      {/* Categories — circular on mobile, square cards on desktop */}
      <section className="mx-auto max-w-[1600px] px-4 py-12 md:px-6 md:py-16">
        <SectionTitle title="Shop by Category" withRules={false} />

        {/* Mobile: circular thumbnails, horizontal scroll */}
        <div className="no-scrollbar mt-8 flex justify-start gap-7 overflow-x-auto px-1 sm:hidden">
          {categories.map((c) => (
            <Link key={c.slug} to={catTo(c.slug)} className="group flex shrink-0 flex-col items-center">
              <div className="h-[100px] w-[100px] overflow-hidden rounded-full border border-border">
                <img
                  src={c.image}
                  alt={c.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.12em]">
                {c.label}
              </p>
            </Link>
          ))}
        </div>

        {/* Desktop: square cards */}
        <div className="mt-8 hidden grid-cols-3 gap-[2px] sm:grid">
          {categories.map((c) => (
            <Link key={c.slug} to={catTo(c.slug)} className="group block">
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

      <EditorialQuote quote="Rooted in Tradition. Designed for Today." />

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

      <BrandStory />

      <EditorialQuote quote="Every Piece Carries a Story." light />

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

      <BrandTimeline />

      <WhyChoose />

      <EditorialQuote quote="Elegance Never Goes Out of Style." />

      <Testimonials />

      {/* Recently viewed */}
      {recent.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-4 py-16 md:px-6">
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
