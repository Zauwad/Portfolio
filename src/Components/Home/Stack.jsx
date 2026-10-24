import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../../primitives/Container";
import { SectionHeading } from "../../primitives/SectionHeading";
import { Reveal } from "../../primitives/Reveal";
import { skills } from "../../data/portfolio";
import { Sparkline } from "../../primitives/Sparkline";
import { TECH_ICONS } from "../../lib/techIcons";
import { mulberry32 } from "../../lib/rng";

const COLUMNS = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "◇",
    tagline: "Calm interfaces, high performance, and fluid micro-interactions.",
  },
  {
    id: "backend",
    label: "Backend",
    icon: "◆",
    tagline: "Robust APIs, strict contracts, and row-level multi-tenancy.",
  },
  {
    id: "data",
    label: "Data",
    icon: "⊡",
    tagline: "Schemas designed for consistency, speed, and clean migrations.",
  },
  {
    id: "tools",
    label: "Tools & Ops",
    icon: "✦",
    tagline: "Continuous delivery, cloud infrastructure, and AI-assisted workflows.",
  },
];

function makeSpark(seed) {
  const rng = mulberry32(seed);
  const len = 14;
  let v = 4 + rng() * 4;
  const out = [];
  for (let i = 0; i < len; i++) {
    v += (rng() - 0.45) * 2.2;
    v = Math.max(2, Math.min(14, v));
    out.push(Number(v.toFixed(1)));
  }
  return out;
}

export default function Stack({ showTopBorder = true }) {
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <section
      id="stack"
      className={`relative py-20 md:py-28 ${showTopBorder ? "border-t border-border" : ""}`}
    >
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <Container size="default" className="relative">
        <SectionHeading
          index="03"
          eyebrow="Stack"
          title="Tools I reach for,"
          muted="shaped by what I'm building."
          body="A pragmatic stack — frontend depth, backend fundamentals, and the cloud glue that ships."
        />

        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4 rounded-xl overflow-hidden shadow-lg">
          {COLUMNS.map((col, idx) => {
            const items = skills[col.id] || [];
            const data = makeSpark(idx * 97 + 13);

            return (
              <Reveal
                key={col.id}
                delay={idx * 0.08}
                className="flex flex-col justify-between bg-elev1 p-5 sm:p-6 md:p-7 transition-colors duration-300 hover:bg-elev2"
              >
                <div>
                  {/* Column header */}
                  <header className="mb-4 md:mb-5 flex items-baseline justify-between border-b border-border pb-3">
                    <span className="font-mono text-xs sm:text-[13px] text-fg-dim">
                      {col.icon} {col.label}
                    </span>
                    <span className="mono-label font-mono text-fg-dim">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </header>

                  <p className="body-s mb-5 md:mb-6 text-xs sm:text-[13px] leading-relaxed italic text-fg-muted">
                    "{col.tagline}"
                  </p>

                  {/* Technology visual badges with crisp brand SVGs */}
                  <div className="space-y-2">
                    {items.map((item) => {
                      const iconMeta = TECH_ICONS[item] || { color: "var(--fg)", svg: null };
                      const isHovered = hoveredTech === item;

                      return (
                        <motion.div
                          key={item}
                          onMouseEnter={() => setHoveredTech(item)}
                          onMouseLeave={() => setHoveredTech(null)}
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                          className="group/badge relative flex items-center justify-between rounded-md border border-border bg-bg-base px-3 py-2 transition-all duration-300 hover:border-border-hi hover:shadow-sm"
                          style={{
                            borderColor: isHovered ? iconMeta.color : undefined,
                            boxShadow: isHovered
                              ? `0 0 12px ${iconMeta.color}25`
                              : undefined,
                          }}
                        >
                          <div className="flex items-center gap-2.5 sm:gap-3">
                            <span
                              className="flex h-5 w-5 shrink-0 items-center justify-center transition-transform duration-300 group-hover/badge:scale-110"
                              style={{ color: iconMeta.color }}
                            >
                              {iconMeta.svg || <span className="font-mono text-xs">◇</span>}
                            </span>
                            <span className="font-mono text-xs font-medium tracking-tight text-fg">
                              {item}
                            </span>
                          </div>

                          <span
                            aria-hidden
                            className="font-mono text-[11px] opacity-0 transition-opacity duration-300 group-hover/badge:opacity-100"
                            style={{ color: iconMeta.color }}
                          >
                            ✓
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom sparkline & activity */}
                <div className="mt-6 md:mt-8 border-t border-border pt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="mono-label font-mono text-[10px] text-fg-dim">
                      Activity
                    </span>
                  </div>
                  <Sparkline data={data} height={28} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
