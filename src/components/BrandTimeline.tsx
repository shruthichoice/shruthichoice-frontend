import { Reveal } from "@/hooks/use-reveal";

const STAGES: { no: string; title: string; body: string }[] = [
  {
    no: "01",
    title: "Inspiration",
    body: "Every collection begins with a mood — a temple motif, a monsoon palette, the drape of an heirloom saree.",
  },
  {
    no: "02",
    title: "Sourcing",
    body: "We travel to artisan clusters and trusted mills to source pure silks, breathable cottons and natural dyes.",
  },
  {
    no: "03",
    title: "Handpicked Selection",
    body: "Each piece is chosen by hand for its weave, finish and character — never mass-ordered, always intentional.",
  },
  {
    no: "04",
    title: "Quality Check",
    body: "Fabric, fall, stitching and colourfastness are inspected against our standard before anything is approved.",
  },
  {
    no: "05",
    title: "Packaging",
    body: "Your order is wrapped with care in protective, considered packaging — ready to be unboxed as a gift.",
  },
  {
    no: "06",
    title: "Delivered to You",
    body: "Tracked and dispatched across India, arriving at your door with the story stitched into every thread.",
  },
];

export function BrandTimeline() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-[1200px] px-4 py-20 md:px-6 md:py-28">
        <Reveal className="text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-sublabel">From Loom to Doorstep</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight md:text-6xl">
            The Journey of Every Piece
          </h2>
        </Reveal>

        <div className="relative mt-16">
          {/* center line — desktop */}
          <span className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-foreground/15 md:block" />
          {/* left line — mobile */}
          <span className="absolute left-[14px] top-0 h-full w-px bg-foreground/15 md:hidden" />

          <div className="space-y-10 md:space-y-0">
            {STAGES.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <Reveal key={s.no} delay={i * 60}>
                  <div className="relative md:grid md:grid-cols-2 md:items-center md:gap-12 md:py-6">
                    {/* node */}
                    <span className="absolute left-[14px] top-1 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-foreground bg-brand md:left-1/2" />

                    {/* content */}
                    <div
                      className={`pl-10 md:pl-0 ${
                        right ? "md:col-start-2 md:pl-12" : "md:col-start-1 md:pr-12 md:text-right"
                      }`}
                    >
                      <span className="font-serif text-3xl font-semibold text-brand md:text-4xl">
                        {s.no}
                      </span>
                      <h3 className="mt-1 font-display text-lg font-medium uppercase tracking-[0.12em] md:text-xl">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
