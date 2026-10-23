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
      className={`mb-12 md:mb-16 lg:mb-20 ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {(eyebrow || index) && (
        <Reveal as="div" delay={0}>
          <div
            className={`mono-label mb-4 md:mb-6 flex items-center gap-3 text-fg-dim ${
              align === "center" ? "justify-center" : ""
            }`}
          >
            {index && (
              <span className="tabular text-fg-muted">
                {String(index).padStart(2, "0")}
              </span>
            )}
            {eyebrow && (
              <>
                {index && (
                  <span aria-hidden className="text-fg-dim">
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
        <h2 className="h2 text-fg">
          {title}{" "}
          {muted && (
            <span className="text-fg-muted">{muted}</span>
          )}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={0.12}>
          <p className="body-l mt-4 md:mt-6 max-w-[60ch] text-fg-muted">
            {body}
          </p>
        </Reveal>
      )}
    </header>
  );
}
