import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  muted,
  body,
  align = "left",
  className = "",
}) {
  return (
    <header
      className={`mb-16 md:mb-20 ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {(eyebrow || index) && (
        <Reveal as="div" delay={0}>
          <div
            className={`mono-label mb-6 flex items-center gap-3 ${
              align === "center" ? "justify-center" : ""
            }`}
            style={{ color: "var(--fg-dim)" }}
          >
            {index && (
              <span className="tabular" style={{ color: "var(--fg-muted)" }}>
                {String(index).padStart(2, "0")}
              </span>
            )}
            {eyebrow && (
              <>
                {index && (
                  <span aria-hidden style={{ color: "var(--fg-dim)" }}>
                    ·
                  </span>
                )}
                <span>{eyebrow}</span>
              </>
            )}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="h2">
          {title}{" "}
          {muted && (
            <span style={{ color: "var(--fg-muted)" }}>{muted}</span>
          )}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={0.12}>
          <p
            className="body-l mt-6 max-w-[60ch]"
            style={{ color: "var(--fg-muted)" }}
          >
            {body}
          </p>
        </Reveal>
      )}
    </header>
  );
}
