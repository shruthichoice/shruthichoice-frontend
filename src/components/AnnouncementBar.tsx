import { useEffect, useState } from "react";

const MESSAGES = [
  "Free shipping on orders above ₹999",
  "New arrivals: Festive Sarees & Kurthas",
  "Handpicked traditional wear for modern women",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-foreground text-background">
      <div className="relative mx-auto flex h-9 max-w-[1600px] items-center justify-center px-4">
        {MESSAGES.map((msg, i) => (
          <span
            key={msg}
            className={`absolute text-[12px] tracking-wide transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
