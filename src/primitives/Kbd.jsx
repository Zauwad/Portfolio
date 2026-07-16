import { cn } from "../../lib/utils";

export function Kbd({ children, className }) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded-sm border border-border bg-[var(--bg-elev2)] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted",
        className
      )}
    >
      {children}
    </kbd>
  );
}
