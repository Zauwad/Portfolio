import { Container } from "../../primitives/Container";
import { SectionHeading } from "../../primitives/SectionHeading";
import { Reveal } from "../../primitives/Reveal";
import { skills } from "../../data/portfolio";
import { Sparkline } from "../../primitives/Sparkline";
import { mulberry32 } from "../../lib/rng";

const COLUMNS = [
  { id: "frontend", label: "Frontend", icon: "◇" },
  { id: "backend", label: "Backend", icon: "◆" },
  { id: "data", label: "Data", icon: "⊡" },
  { id: "tools", label: "Tools & Ops", icon: "✦" },
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

export default function Stack() {
  return (
    <section id="stack" className="relative border-t border-border py-20 md:py-28">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <Container size="default" className="relative">
        <SectionHeading
          index="02"
          eyebrow="Stack"
          title="Tools I reach for,"
          muted="shaped by what I'm building."
          body="A pragmatic stack — frontend depth, backend fundamentals, and the cloud glue that ships."
        />

        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map((col, idx) => {
            const items = skills[col.id];
            const data = makeSpark(idx * 97 + 13);
            return (
              <Reveal
                key={col.id}
                delay={idx * 0.08}
                className="flex flex-col gap-6 bg-[var(--bg-elev1)] p-6 md:p-7"
              >
                <header className="flex items-baseline justify-between">
                  <span
                    className="font-mono text-[12px]"
                    style={{ color: "var(--fg-dim)" }}
                  >
                    {col.icon}
                  </span>
                  <span
                    className="mono-label"
                    style={{ color: "var(--fg-dim)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </header>
                <h3
                  className="h3-card"
                  style={{ fontSize: "clamp(20px, 1.6vw, 24px)" }}
                >
                  {col.label}
                </h3>
                <ul className="flex flex-col gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 text-[14px]"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      <span
                        className="mono-data"
                        style={{ color: "var(--fg-dim)" }}
                      >
                        ·
                      </span>
                      <span className="text-fg">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4">
                  <span
                    className="mono-label mb-2 block"
                    style={{ color: "var(--fg-dim)" }}
                  >
                    Activity
                  </span>
                  <Sparkline data={data} height={36} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
