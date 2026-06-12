import { useState, useEffect, useRef } from "react";
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
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    // 1. Node activation logic via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveNodes((prev) => (prev.includes(index) ? prev : [...prev, index]));
          }
        });
      },
      { rootMargin: "0px 0px -30% 0px", threshold: 0.1 }
    );

    const childRows = el.querySelectorAll("[data-index]");
    childRows.forEach((row) => observer.observe(row));

    // 2. Dynamic line filling calculation on scroll
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      // Start filling line when top of timeline hits middle of viewport
      const startPoint = viewHeight / 2;
      const elementTopFromStart = rect.top - startPoint;
      
      if (elementTopFromStart > 0) {
        setScrollProgress(0);
        return;
      }

      const totalHeight = rect.height;
      const currentProgress = Math.abs(elementTopFromStart) / totalHeight;
      
      // Cap progress cleanly at 100%
      setScrollProgress(Math.min(Math.max(currentProgress * 100, 0), 100));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial pass check

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="bg-secondary/50 overflow-x-hidden">
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-6 md:py-24">
        
        {/* Header Block */}
        <Reveal className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-sublabel font-bold">From Loom to Doorstep</p>
          <h2 className="mt-2 font-poppins text-2xl md:text-4xl font-semibold tracking-tight text-foreground">
            The Journey of Every Piece
          </h2>
        </Reveal>

        <div ref={timelineRef} className="relative mt-16 md:mt-20">
          
          {/* ====== DYNAMIC PROGRESS LINE (DESKTOP) ====== */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-foreground/10 md:block">
            <div 
              className="w-full bg-[#F5C800] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(245,200,0,0.4)]"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>

          {/* ====== DYNAMIC PROGRESS LINE (MOBILE) ====== */}
          <div className="absolute left-[14px] top-0 h-full w-px bg-foreground/10 md:hidden">
            <div 
              className="w-full bg-[#F5C800] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(245,200,0,0.4)]"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>

          <div className="space-y-12 md:space-y-0">
            {STAGES.map((s, i) => {
              const isEvenRow = i % 2 === 1;
              const isNodeActive = activeNodes.includes(i);
              const animationDirection = isEvenRow ? "right" : "left";

              return (
                <div key={s.no} data-index={i} className="relative">
                  <Reveal delay={50} direction={animationDirection} distance={30}>
                    <div className="relative md:grid md:grid-cols-2 md:items-center md:gap-16 md:py-8">
                      
                      {/* Glowing Yellow Circle Node */}
                      <span 
                        className={`absolute left-[14px] top-2 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 transition-all duration-500 ease-out md:left-1/2 ${
                          isNodeActive 
                            ? "bg-[#F5C800] border-[#F5C800] scale-110 shadow-[0_0_12px_rgba(245,200,0,0.8)]" 
                            : "bg-background border-foreground/30 scale-100"
                        }`} 
                      />

                      {/* Content panel layout */}
                      <div
                        className={`pl-8 md:pl-0 ${
                          isEvenRow 
                            ? "md:col-start-2 md:pl-8" 
                            : "md:col-start-1 md:pr-8 md:text-right"
                        }`}
                      >
                        <span className={`font-poppins text-xs font-bold tracking-widest transition-colors duration-500 ${
                          isNodeActive ? "text-[#F5C800]" : "text-sublabel"
                        }`}>
                          STAGE {s.no}
                        </span>
                        
                        <h3 className="mt-1 font-poppins text-base font-semibold uppercase tracking-[0.1em] text-foreground md:text-lg">
                          {s.title}
                        </h3>
                        
                        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground max-w-md md:ml-auto isEvenRow:md:ml-0">
                          {s.body}
                        </p>
                      </div>

                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}