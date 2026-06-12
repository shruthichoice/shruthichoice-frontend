import { Reveal } from "@/hooks/use-reveal";

export function EditorialQuote({
  quote,
  light = false,
}: {
  quote: string;
  light?: boolean;
}) {
  return (
    <section
      className={
        light
          ? "bg-foreground text-background"
          : "bg-background text-foreground"
      }
    >
      <div className="mx-auto max-w-[1400px] px-6 py-6 md:py-8">
        <Reveal>
          <div className="flex flex-col items-center">
            {/* Top Accent Line */}
            <div className="mb-4 h-[1px] w-16 bg-brand transition-all duration-500 hover:w-24" />

            {/* Quote */}
            <p
              className="
                mx-auto
                max-w-4xl
                text-center
                font-poppins
                text-2xl
                font-medium
                leading-[1.5]
                tracking-normal
                transition-all
                duration-700
                hover:tracking-[0.04em]
                md:text-4xl
              "
            >
              {quote}
            </p>

            {/* Bottom Accent Line */}
            <div className="mt-4 h-[1px] w-16 bg-brand transition-all duration-500 hover:w-24" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}