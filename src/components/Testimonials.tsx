import { Reveal } from "@/hooks/use-reveal";

const REVIEWS: { quote: string; name: string; meta: string; initial: string }[] = [
  {
    quote:
      "The Chanderi saree is even more beautiful in person. The weave, the fall, the finish — it felt like an heirloom from the moment I unwrapped it.",
    name: "Ananya Rao",
    meta: "Bengaluru · Verified Buyer",
    initial: "A",
  },
  {
    quote:
      "I wore the Anarkali set to my sister's wedding and was asked where it was from all evening. Beautifully made and so comfortable.",
    name: "Priya Menon",
    meta: "Hyderabad · Verified Buyer",
    initial: "P",
  },
  {
    quote:
      "Everyday kurthas that actually feel premium. The cotton is soft, the prints are elegant, and the fit is just right. My new go-to brand.",
    name: "Sneha Kulkarni",
    meta: "Pune · Verified Buyer",
    initial: "S",
  },
];

export function Testimonials() {
  return (
    <section className="bg-foreground text-background">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-28">
        <Reveal className="text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-background/50">In Their Words</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight md:text-6xl">
            Customer Love
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px bg-background/15 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 80}>
              <figure className="flex h-full flex-col bg-foreground p-9">
                <span className="font-serif text-5xl leading-none text-brand">&ldquo;</span>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-background/85">
                  {r.quote}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-background/15 pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand font-serif text-lg font-semibold text-brand-foreground">
                    {r.initial}
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{r.name}</span>
                    <span className="block text-[12px] text-background/55">{r.meta}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
