import { Container } from "../../primitives/Container";
import { SectionHeading } from "../../primitives/SectionHeading";
import { Reveal } from "../../primitives/Reveal";
import { experience } from "../../data/portfolio";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative border-t border-border py-20 md:py-28"
    >
      <Container size="default">
        <SectionHeading
          index="04"
          eyebrow="Trajectory"
          title="Building,"
          muted="in chapters."
          body="Client work, side projects, and the occasional pivot that paid off — shipped end-to-end."
        />

        <ol className="relative">
          <span
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-border md:left-[19px]"
          />
          {experience.map((item, i) => (
            <Reveal
              as="li"
              key={item.id}
              delay={i * 0.08}
              className="relative grid grid-cols-1 gap-6 py-8 md:grid-cols-12 md:gap-8"
            >
              <div className="relative flex items-start md:col-span-3">
                <span
                  aria-hidden
                  className="absolute left-0 top-2 inline-block h-[15px] w-[15px] -translate-x-1/2 rounded-full border border-[var(--border-hi)] bg-[var(--bg-base)] md:left-[15px]"
                />
                <span
                  className="mono-data pl-8 tabular md:pl-12"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {item.when}
                </span>
              </div>
              <div className="md:col-span-9">
                <h3
                  className="h3-card"
                  style={{ fontSize: "clamp(20px, 1.6vw, 24px)" }}
                >
                  {item.role}{" "}
                  <span style={{ color: "var(--fg-muted)" }}>· {item.org}</span>
                </h3>
                <ul className="mt-4 space-y-2 body-m">
                  {item.points.map((point, j) => (
                    <li
                      key={j}
                      className="flex items-baseline gap-3"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      <span
                        className="mono-data"
                        style={{ color: "var(--fg-dim)" }}
                        aria-hidden
                      >
                        ·
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
