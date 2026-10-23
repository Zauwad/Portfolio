import { cn } from "../../lib/utils";

export function Marquee({
  items,
  separator = "◇",
  speed = 40,
  pauseOnHover = true,
  className,
}) {
  const rendered = items.join(` ${separator} `);
  const full = `${rendered} ${separator} ${rendered} ${separator}`;
  return (
    <div
      className={cn(
        "group/marquee relative w-full overflow-hidden border-y border-border bg-bg-base/50 backdrop-blur-sm select-none",
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
        className={cn(
          "mono-data flex whitespace-nowrap py-3.5 text-fg-muted transition-colors duration-300 group-hover/marquee:text-fg",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        <span className="px-6 tracking-[0.2em]">{full}</span>
        <span className="px-6 tracking-[0.2em]" aria-hidden>
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
