interface SectionTitleProps {
  title: string;
  withRules?: boolean;
}

export function SectionTitle({ title, withRules = true }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-center gap-4 md:gap-6">
      {withRules && <span className="hidden h-px flex-1 bg-foreground/80 sm:block" />}
      <h2 className="section-title text-center text-[11px] md:text-xs">{title}</h2>
      {withRules && <span className="hidden h-px flex-1 bg-foreground/80 sm:block" />}
    </div>
  );
}
