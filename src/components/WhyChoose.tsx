import { Reveal } from "@/hooks/use-reveal";
import { Hand, Gem, Scissors, Sparkles, ShieldCheck, Truck } from "lucide-react";

const VALUES: { icon: typeof Hand; title: string; body: string }[] = [
  {
    icon: Hand,
    title: "Handpicked Collections",
    body: "Every piece is personally selected — curated, never mass-produced.",
  },
  {
    icon: Gem,
    title: "Premium Quality Fabrics",
    body: "Pure silks, breathable cottons and fine chiffons, chosen with care.",
  },
  {
    icon: Scissors,
    title: "Traditional Craftsmanship",
    body: "Artisan weaves and handwork passed down through generations.",
  },
  {
    icon: Sparkles,
    title: "Curated Designs",
    body: "Timeless silhouettes, thoughtfully reimagined for the modern woman.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    body: "Safe, encrypted checkout with trusted payment options.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    body: "Carefully packed and dispatched across India with tracking.",
  },
];

export function WhyChoose() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-28">
      <Reveal className="text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-sublabel">The Difference</p>
        <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight md:text-6xl">
          Why Choose Shruthi's Choice
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {VALUES.map((v, i) => (
          <Reveal key={v.title} delay={i * 60}>
            <div className="group flex h-full flex-col items-start bg-background p-9 transition-colors hover:bg-secondary">
              <v.icon className="h-7 w-7" strokeWidth={1.25} />
              <h3 className="mt-5 font-display text-base font-medium uppercase tracking-[0.12em]">
                {v.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{v.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
