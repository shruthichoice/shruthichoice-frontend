import { useEffect, useState } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

/**
 * Image-only editorial hero. Banners are designed externally with their own
 * typography and marketing copy — this component only handles the crossfade,
 * autoplay, navigation dots and responsive sizing.
 */
const slides: { image: string; alt: string }[] = [
  { image: hero1, alt: "Shruthi's Choice — Saree campaign" },
  { image: hero2, alt: "Shruthi's Choice — Kurtha campaign" },
  { image: hero3, alt: "Shruthi's Choice — Festive 3-piece sets campaign" },
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
          <img
            src={slide.image}
            alt={slide.alt}
            className="h-full w-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
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
