import { Link } from "react-router";
import { cn } from "../../lib/utils";

export function BrandMark({
  brand = "ridwanul",
  tag = "engineer",
  size = "md",
  asLink = true,
  showTag = false,
  className,
}) {
  const sizes = {
    sm: { brand: "text-[13px]", tag: "text-[10px]" },
    md: { brand: "text-[14px]", tag: "text-[11px]" },
    lg: { brand: "text-[18px]", tag: "text-[12px]" },
  };
  const sz = sizes[size];

  const content = (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-mono font-medium tracking-tight text-fg",
          sz.brand
        )}
      >
        ✕ {brand}
      </span>
      {showTag && tag && (
        <span
          className={cn("font-mono text-[var(--fg-dim)]", sz.tag)}
          style={{ letterSpacing: "0.18em" }}
        >
          /{tag}
        </span>
      )}
    </span>
  );

  if (!asLink) return content;

  return (
    <Link to="/" className="group inline-flex items-center">
      <span className="transition-opacity duration-300 group-hover:opacity-80">
        {content}
      </span>
    </Link>
  );
}
