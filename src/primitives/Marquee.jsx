import { cn } from "../../lib/utils";

export function Marquee({
  items,
  separator = "◇",
  speed = 40,
  className,
}) {
  const rendered = items.join(` ${separator} `);
  const full = `${rendered} ${separator} ${rendered} ${separator}`;
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden border-y border-border",
        className
      )}
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="mono-data flex whitespace-nowrap py-4 text-[var(--fg-muted)]"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        <span className="px-6">{full}</span>
        <span className="px-6" aria-hidden>
          {full}
        </span>
      </div>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
