import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.15 },
) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      });
    }, options);

    observer.observe(el);

    return () => observer.disconnect();
  }, [shown, options]);

  return { ref, shown };
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  distance?: number;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 40,
}: RevealProps) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  const hiddenTransform = {
    up: `translateY(${distance}px)`,
    left: `translateX(-${distance}px)`,
    right: `translateX(${distance}px)`,
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: shown
          ? "translate3d(0,0,0)"
          : hiddenTransform[direction],
      }}
      className={`
        transition-all
        duration-700
        ease-out
        ${shown ? "opacity-100" : "opacity-0"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}