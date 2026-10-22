import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Container } from "../../primitives/Container";
import { SectionHeading } from "../../primitives/SectionHeading";
import { Reveal } from "../../primitives/Reveal";
import { experience } from "../../data/portfolio";

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 200, damping: 25 });

  return (
    <section
      id="experience"
      className="relative isolate overflow-hidden border-t border-border py-20 md:py-28"
    >
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute right-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--accent-glow), transparent 70%)",
        }}
        aria-hidden
      />
      <Container size="default" className="relative">
        <SectionHeading
          index="04"
          eyebrow="Trajectory"
          title="Building,"
          muted="in chapters."
          body="Client work, product engineering, and core architectural milestones — shipped end-to-end."
        />

        <div ref={containerRef} className="relative mt-12">
          {/* Static Background Track */}
          <span
            aria-hidden
            className="absolute left-[7px] top-4 bottom-4 w-px bg-border md:left-[19px]"
          />

          {/* Interactive Laser Progress Beam */}
          <motion.span
            aria-hidden
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-[7px] top-4 bottom-4 w-[2px] -translate-x-[0.5px] bg-gradient-to-b from-accent via-fg to-accent shadow-[0_0_12px_var(--fg)] md:left-[19px]"
          />

          <ol className="relative space-y-6">
            {experience.map((item, i) => (
              <Reveal
                as="li"
                key={item.id}
                delay={i * 0.08}
                className="group relative grid grid-cols-1 gap-6 py-4 md:grid-cols-12 md:gap-8"
              >
                {/* Node & Timestamp */}
                <div className="relative flex items-start md:col-span-3">
                  <span
                    aria-hidden
                    className="absolute left-0 top-3 inline-block h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-[var(--border-hi)] bg-[var(--bg-base)] transition-all duration-500 group-hover:scale-125 group-hover:border-fg group-hover:shadow-[0_0_12px_var(--fg)] md:left-[19px]"
                  />
                  <span
                    className="mono-data pl-8 tabular font-mono text-[12px] transition-colors duration-300 group-hover:text-fg md:pl-12"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {item.when}
                  </span>
                </div>

                {/* Milestone Content Card */}
                <div className="md:col-span-9">
                  <div className="rounded-xl border border-border/80 bg-[var(--bg-elev1)] p-6 transition-all duration-500 hover:border-border-hi hover:bg-[var(--bg-elev2)] hover:shadow-xl md:p-7">
                    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-border/60 pb-3">
                      <h3
                        className="h3-card font-serif text-fg transition-colors"
                        style={{ fontSize: "clamp(20px, 1.8vw, 26px)" }}
                      >
                        {item.role}{" "}
                        <span className="font-sans text-base font-normal text-[var(--fg-muted)]">
                          · {item.org}
                        </span>
                      </h3>
                      <span className="mono-label text-[10px] text-accent/80">
                        Chapter {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <ul className="space-y-2.5 body-m">
                      {item.points.map((point, j) => (
                        <li
                          key={j}
                          className="flex items-baseline gap-3"
                          style={{ color: "var(--fg-muted)" }}
                        >
                          <span
                            className="mono-data font-bold text-accent"
                            aria-hidden
                          >
                            ›
                          </span>
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
