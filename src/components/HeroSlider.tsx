import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

interface Slide {
  image: string;
  headline: string;
  sub: string;
  cta: string;
  to: string;
  panelBg: string;
  textClass: string;
  ctaClass: string;
}

const slides: Slide[] = [
  {
    image: hero1,
    headline: "Tradition,\nReimagined",
    sub: "Handwoven silk sarees for the modern woman.",
    cta: "Shop Sarees",
    to: "/sarees",
    panelBg: "bg-foreground",
    textClass: "text-background",
    ctaClass: "bg-brand text-brand-foreground",
  },
  {
    image: hero2,
    headline: "Effortless\nKurthas",
    sub: "Breathable, everyday elegance in pure cotton.",
    cta: "Shop Now",
    to: "/kurthas",
    panelBg: "bg-[#f5f0e8]",
    textClass: "text-foreground",
    ctaClass: "bg-foreground text-background",
  },
  {
    image: hero3,
    headline: "The\nFestive Edit",
    sub: "Embroidered 3-piece sets for celebrations.",
    cta: "Shop 3-Piece Sets",
    to: "/3-piece-sets",
    panelBg: "bg-[#eaf0f5]",
    textClass: "text-foreground",
    ctaClass: "bg-brand text-brand-foreground",
  },
];

export function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="grid h-full grid-cols-1 md:grid-cols-2">
            <div
              className={`order-2 flex flex-col justify-center px-8 py-12 md:order-1 md:px-16 ${slide.panelBg}`}
            >
              <h1
                className={`whitespace-pre-line font-serif text-5xl font-bold leading-[1.05] md:text-7xl ${slide.textClass}`}
              >
                {slide.headline}
              </h1>
              <p className={`mt-5 max-w-sm text-sm md:text-base ${slide.textClass} opacity-80`}>
                {slide.sub}
              </p>
              <Link
                to={slide.to}
                className={`mt-8 inline-flex w-fit items-center px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.15em] transition-opacity hover:opacity-90 ${slide.ctaClass}`}
              >
                {slide.cta}
              </Link>
            </div>
            <div className="order-1 h-full overflow-hidden md:order-2">
              <img
                src={slide.image}
                alt={slide.cta}
                width={896}
                height={1216}
                className="h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 w-2 transition-colors ${
              i === active ? "bg-brand" : "bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
