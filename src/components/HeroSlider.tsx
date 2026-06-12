import { useEffect, useState } from "react";
// Import Desktop Banners (1376x768)
import hero1Desktop from "@/assets/hero1.png";
import hero2Desktop from "@/assets/hero2.png";
import hero3Desktop from "@/assets/hero3.png";

// Import Mobile Banners (1080x1350)
import hero1Mobile from "@/assets/hero1-m.png";
import hero2Mobile from "@/assets/hero2-m.png";


interface Slide {
  desktopImage: string;
  mobileImage: string;
  alt: string;
}

/**
 * Image-only editorial hero. Banners are designed externally with their own
 * typography and marketing copy — this component only handles the crossfade,
 * autoplay, navigation dots and responsive sizing.
 */
const slides: Slide[] = [
  { 
    desktopImage: hero1Desktop, 
    mobileImage: hero1Mobile, 
    alt: "Shruthi's Choice — Saree campaign" 
  },
  { 
    desktopImage: hero2Desktop, 
    mobileImage: hero2Mobile, 
    alt: "Shruthi's Choice — Kurtha campaign" 
  },
  
];

export function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <picture>
            {/* Desktop variant loaded when screen matches Tailwind 'sm' breakpoint or higher */}
            <source media="(min-width: 640px)" srcSet={slide.desktopImage} />
            {/* Fallback/Mobile image loaded on smaller viewports */}
            <img
              src={slide.mobileImage}
              alt={slide.alt}
              className="h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </picture>
        </div>
      ))}

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 transition-all duration-300 ${
              i === active ? "w-6 bg-background" : "w-2 bg-background/60 hover:bg-background/90"
            }`}
          />
        ))}
      </div>
    </section>
  );
}