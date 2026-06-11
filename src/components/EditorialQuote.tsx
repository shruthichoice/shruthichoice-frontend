import { Reveal } from "@/hooks/use-reveal";

export function EditorialQuote({
  quote,
  light = false,
}: {
  quote: string;
  light?: boolean;
}) {
  return (
    <section className={light ? "bg-foreground text-background" : "bg-background text-foreground"}>
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:py-28">
        <Reveal>
          <p className="mx-auto max-w-4xl text-center font-serif text-[28px] font-semibold leading-[1.15] tracking-tight md:text-5xl lg:text-6xl">
            {quote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
