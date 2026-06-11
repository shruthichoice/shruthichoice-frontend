import { Link } from "@tanstack/react-router";
import { Reveal } from "@/hooks/use-reveal";
import editorial from "@/assets/editorial.jpg";
import sareeBeige from "@/assets/p-saree-beige.jpg";

export function BrandStory() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-6 md:py-28">
      <Reveal className="text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-sublabel">The House of</p>
        <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight md:text-6xl">
          The Story of Shruthi's Choice
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="overflow-hidden">
            <img
              src={editorial}
              alt="Artisan craftsmanship at Shruthi's Choice"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="space-y-7">
            <div>
              <h3 className="font-serif text-2xl font-semibold md:text-3xl">Rooted in Inspiration</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                Shruthi's Choice was born from a love letter to Indian craft — the
                quiet poetry of a handwoven border, the warmth of natural dyes, the
                pride of a weaver's signature. Every collection begins with a single
                idea: that tradition deserves to be worn, not archived.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold md:text-3xl">Heritage &amp; Craftsmanship</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                We work alongside artisan clusters across India, honouring techniques
                passed down through generations. Each saree, kurtha and set carries
                the fingerprints of the hands that made it — imperfectly perfect, and
                entirely one of a kind.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold md:text-3xl">For the Modern Woman</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                A celebration of womanhood, our pieces are designed for women who move
                between worlds — rooted in heritage, dressed for today. Timeless
                silhouettes, reimagined for everyday elegance.
              </p>
            </div>
            <Link
              to="/about"
              className="inline-flex w-fit border border-foreground px-9 py-3.5 text-[12px] font-medium uppercase tracking-[0.15em] transition-colors hover:bg-foreground hover:text-background"
            >
              Discover Our Story
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
