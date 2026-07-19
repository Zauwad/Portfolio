import { Container } from "../../primitives/Container";
import { SectionHeading } from "../../primitives/SectionHeading";
import { Reveal } from "../../primitives/Reveal";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { services } from "../../data/portfolio";

export default function Services() {
  return (
    <section className="relative border-t border-border py-20 md:py-28">
      <Container size="default">
        <SectionHeading
          index="05"
          eyebrow="Engagements"
          title="What I can do,"
          muted="and how I like to work."
          body="Three overlapping modes — planning, building, and shipping. Pick one or the whole loop."
        />

        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.filter((s) => s.id !== "design").map((s, i, arr) => (
            <Reveal
              key={s.id}
              delay={i * 0.08}
              className="group flex flex-col gap-6 bg-[var(--bg-elev1)] p-6 transition-colors duration-500 hover:bg-[var(--bg-elev2)] md:p-7"
            >
              <div className="flex items-baseline justify-between">
                <span
                  className="mono-data text-[12px]"
                  style={{ color: "var(--fg-dim)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="mono-label"
                  style={{ color: "var(--fg-dim)" }}
                >
                  {i < arr.length - 1 ? "→" : "end"}
                </span>
              </div>
              <h3
                className="h3-card"
                style={{ fontSize: "clamp(24px, 2.4vw, 32px)" }}
              >
                {s.title}
              </h3>
              <p
                className="body-m"
                style={{ color: "var(--fg-muted)" }}
              >
                {s.subtitle}
              </p>
              <ul className="space-y-3 body-m">
                {s.points.map((pt, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    <span
                      aria-hidden
                      className="mono-data mt-2"
                      style={{ color: "var(--fg-dim)" }}
                    >
                      ·
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 flex flex-wrap items-center gap-4">
          <span className="mono-label" style={{ color: "var(--fg-dim)" }}>
            Ready to start?
          </span>
          <PrimaryCTA variant="outline" size="md" to="/contacts">
            Start a project
          </PrimaryCTA>
        </Reveal>
      </Container>
    </section>
  );
}
