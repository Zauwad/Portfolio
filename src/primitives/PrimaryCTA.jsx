import { Link } from "react-router";
import { cn } from "../../lib/utils";

export function PrimaryCTA({
  variant = "outline",
  size = "md",
  arrow = true,
  as = "button",
  to,
  href,
  className,
  children,
  ...rest
}) {
  const sizes = {
    sm: "px-3 py-1.5 text-[12px]",
    md: "px-5 py-2.5 text-[13px]",
    lg: "px-6 py-3 text-[13px]",
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-sm font-mono uppercase tracking-[0.18em] transition-colors duration-300 select-none";

  const variants = {
    outline:
      "border border-[var(--border-hi)] text-fg hover:border-fg",
    solid: "border border-fg bg-fg text-[var(--bg-base)]",
    ghost: "text-fg-muted hover:text-fg",
  };

  const cls = cn(base, sizes[size], variants[variant], className);

  const inner = (
    <>
      {variant === "outline" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-y-full bg-fg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
        />
      )}
      <span
        className={cn(
          "relative z-10 flex items-center gap-2 transition-colors duration-500",
          variant === "outline" && "group-hover:text-[var(--bg-base)]"
        )}
      >
        {children}
        {arrow && <span aria-hidden>→</span>}
      </span>
    </>
  );

  if (as === Link || to) {
    return (
      <Link to={to || href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }

  if (as === "a" || href) {
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  }

  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}