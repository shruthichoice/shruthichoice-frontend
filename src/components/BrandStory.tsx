import { Link } from "@tanstack/react-router";
import { Reveal } from "@/hooks/use-reveal";
import editorial from "@/assets/editorial.jpg"; 

export function BrandStory() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-6 md:py-28 overflow-x-hidden">
      
      {/* 1. Stately Header Section */}
      <Reveal className="text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-sublabel">Est. 2023</p>
        <h2 className="font-poppins mt-2 text-2xl md:text-5xl font-semibold tracking-tight text-foreground">
          Defining Indian Elegance
        </h2>
      </Reveal>

      <div className="my-16 md:my-20 h-px bg-border max-w-sm mx-auto" />

      {/* 2. Interactive "Half-Scroll" Campaign Header */}
      <div 
        className="w-full aspect-[4/5] sm:aspect-[21/9] bg-cover bg-center border border-border shadow-sm transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url(${editorial})`, 
          backgroundAttachment: 'fixed', 
          backgroundRepeat: 'no-repeat'
        }}
        role="img"
        aria-label="Artisan craftsmanship at Shruthi's Choice"
      />

      {/* 3. Editorial Alternate Sided Narrative Layout */}
      <div className="mt-16 md:mt-24 space-y-16 md:space-y-24">
        
        {/* Story Block 1 (Quote First, Text Second) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-1 md:order-none">
            <Reveal delay={100} direction="left">
              <q className="font-poppins text-xl md:text-3xl font-medium tracking-tight text-foreground block leading-tight italic before:content-['\201C'] before:text-4xl before:font-bold before:text-brand">
                Born from a love letter to Indian craft, honoring every signature.
              </q>
            </Reveal>
          </div>
          <div className="order-2 md:order-none">
            <Reveal delay={200} direction="up" className="space-y-3">
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-sublabel">Rooted in Inspiration</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Shruthi's Choice was born from a love letter to Indian craft — the
                quiet poetry of a handwoven border, the warmth of natural dyes, the
                pride of a weaver's signature. Every collection begins with a single
                idea: that tradition deserves to be worn, not archived.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Story Block 2 (FIXED: Quote displays first on mobile, alternates on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text block: Pushed to order 2 on mobile, resets to left side on desktop */}
          <div className="order-2 md:order-1">
            <Reveal delay={100} direction="up" className="space-y-3">
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-sublabel">Heritage &amp; Craftsmanship</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                We work alongside artisan clusters across India, honouring techniques
                passed down through generations. Each saree, kurtha and set carries
                the fingerprints of the hands that made it — imperfectly perfect, and
                entirely one of a kind.
              </p>
            </Reveal>
          </div>
          {/* Quote block: Pulled to order 1 on mobile, moves to right side on desktop */}
          <div className="order-1 md:order-2">
            <Reveal delay={200} direction="right">
              <q className="font-poppins text-xl md:text-3xl font-medium tracking-tight text-foreground block leading-tight italic before:content-['\201C'] before:text-4xl before:font-bold before:text-brand">
                 Techniques passed down, carrying the handwork imperfections of the artisan.
              </q>
            </Reveal>
          </div>
        </div>

        {/* Story Block 3 (Quote First, Text Second) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-1 md:order-none">
            <Reveal delay={100} direction="left">
              <q className="font-poppins text-xl md:text-3xl font-medium tracking-tight text-foreground block leading-tight italic before:content-['\201C'] before:text-4xl before:font-bold before:text-brand">
                 Timeless silhouettes reimagined, celebrating everyday elegance for the contemporary woman.
              </q>
            </Reveal>
          </div>
          <div className="order-2 md:order-none space-y-7">
            <Reveal delay={200} direction="up" className="space-y-3">
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-sublabel">For the Modern Woman</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                A celebration of womanhood, our pieces are designed for women who move
                between worlds — rooted in heritage, dressed for today. Timeless
                silhouettes, reimagined for everyday elegance.
              </p>
            </Reveal>
          </div>
        </div>

      </div>
    </section>
  );
}