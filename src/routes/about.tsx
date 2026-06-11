import { createFileRoute, Link } from "@tanstack/react-router";
import editorial from "@/assets/editorial.jpg";
import { SectionTitle } from "@/components/SectionTitle";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Shruthi's Choice" },
      {
        name: "description",
        content:
          "Shruthi's Choice is a celebration of womanhood and heritage — timeless craftsmanship curated for the modern woman.",
      },
      { property: "og:title", content: "Our Story — Shruthi's Choice" },
      { property: "og:description", content: "A celebration of womanhood and heritage." },
      { property: "og:type", content: "article" },
      { property: "og:image", content: editorial },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-16 md:px-16">
          <p className="section-title text-xs text-muted-foreground">Our Story</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight md:text-6xl">
            Tradition, woven with care
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            Shruthi's Choice is a celebration of womanhood and heritage. Every piece in our
            collection is handpicked for its craftsmanship, comfort and timeless appeal —
            curated for the modern woman who honours her roots.
          </p>
        </div>
        <div className="min-h-[400px] overflow-hidden">
          <img src={editorial} alt="Shruthi's Choice atelier" className="h-full w-full object-cover" loading="lazy" />
        </div>
      </div>

      <section className="mx-auto max-w-[1000px] px-6 py-16 text-center">
        <SectionTitle title="What We Stand For" />
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {[
            { t: "Craftsmanship", d: "Handwoven fabrics and detailing from skilled artisans across India." },
            { t: "Curation", d: "A tightly edited collection — only pieces we truly love." },
            { t: "Care", d: "Honest pricing, easy returns and personal service for every customer." },
          ].map((b) => (
            <div key={b.t}>
              <h3 className="font-display text-sm uppercase tracking-[0.15em]">{b.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
        <Link
          to="/sarees"
          className="mt-12 inline-block bg-foreground px-10 py-3.5 text-[12px] font-medium uppercase tracking-[0.15em] text-background"
        >
          Explore the Collection
        </Link>
      </section>
    </div>
  );
}
