import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Container } from "../../primitives/Container";
import { SectionHeading } from "../../primitives/SectionHeading";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { TiltCard } from "../../primitives/TiltCard";
import { services } from "../../data/portfolio";

function CheckmarkIcon() {
  return (
    <span
      aria-hidden
      className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-border bg-[var(--bg-elev2)] text-accent transition-colors group-hover:border-accent/50"
    >
      <svg
        className="h-2.5 w-2.5"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="2.5 6 5 8.5 9.5 3.5" />
      </svg>
    </span>
  );
}

function ScrollStageCard({ s, i, scrollYProgress }) {
  // Clear, non-overlapping scroll intervals linked to scroll pin:
  // Card 0 (Plan): arrives from right between 0.05 and 0.28, then stays settled
  // Card 1 (Build): hidden until 0.35, arrives from right between 0.35 and 0.58, then stays settled
  // Card 2 (Ship): hidden until 0.66, arrives from right between 0.66 and 0.88, then stays settled
  const start = 0.05 + i * 0.30;
  const end = start + 0.23;

  const rawX = useTransform(
    scrollYProgress,
    [0, start, end, 1],
    ["55vw", "55vw", "0vw", "0vw"],
    { clamp: true }
  );

  const rawOpacity = useTransform(
    scrollYProgress,
    [0, start, start + 0.10, 1],
    [0, 0, 1, 1],
    { clamp: true }
  );

  const rawScale = useTransform(
    scrollYProgress,
    [0, start, end, 1],
    [0.94, 0.94, 1, 1],
    { clamp: true }
  );

  // Fluid spring physics for gentle, luxury deceleration when gliding in from the right
  const x = useSpring(rawX, { stiffness: 55, damping: 18, mass: 0.7 });
  const opacity = useSpring(rawOpacity, { stiffness: 75, damping: 20 });
  const scale = useSpring(rawScale, { stiffness: 55, damping: 18 });

  return (
    <motion.div
      style={{ x, opacity, scale }}
      className="flex h-full w-full flex-col"
    >
      <TiltCard maxTilt={6} className="h-full">
        <div className="group relative flex h-full flex-col justify-between rounded-xl border border-border bg-[var(--bg-elev1)] p-6 md:p-7 transition-all duration-500 hover:border-border-hi hover:bg-[var(--bg-elev2)] hover:shadow-2xl">
          {/* Top row */}
          <div>
            <div className="mb-5 flex items-baseline justify-between border-b border-border/80 pb-3">
              <span className="mono-data font-mono text-[12px] font-bold text-accent">
                PHASE // {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mono-label font-mono text-[11px] text-[var(--fg-dim)] transition-colors group-hover:text-accent">
                {i < 2 ? "NEXT →" : "SHIP"}
              </span>
            </div>

            <h3
              className="h3-card font-serif text-fg transition-colors"
              style={{ fontSize: "clamp(24px, 2.2vw, 30px)" }}
            >
              {s.title}
            </h3>

            <p className="body-m mt-2 text-[var(--fg-muted)] italic leading-relaxed">
              "{s.subtitle}"
            </p>

            <ul className="mt-6 space-y-3 body-m">
              {s.points.map((pt, j) => (
                <li
                  key={j}
                  className="flex items-start gap-3"
                  style={{ color: "var(--fg-muted)" }}
                >
                  <CheckmarkIcon />
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom step tag */}
          <div className="mt-8 flex items-center justify-between border-t border-border/80 pt-4 font-mono text-[11px] text-[var(--fg-dim)]">
            <span>Deliverable ready</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              Step {i + 1} of 3 →
            </span>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

function MobileCard({ s, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 45 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <TiltCard maxTilt={5}>
        <div className="group relative flex flex-col justify-between rounded-xl border border-border bg-[var(--bg-elev1)] p-6 transition-all duration-300">
          <div>
            <div className="mb-4 flex items-baseline justify-between border-b border-border/80 pb-3">
              <span className="mono-data font-mono text-[12px] font-bold text-accent">
                PHASE // {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mono-label font-mono text-[11px] text-[var(--fg-dim)]">
                {i < 2 ? "NEXT →" : "SHIP"}
              </span>
            </div>

            <h3 className="h3-card font-serif text-fg text-2xl">
              {s.title}
            </h3>

            <p className="body-m mt-1.5 text-[var(--fg-muted)] italic">
              "{s.subtitle}"
            </p>

            <ul className="mt-5 space-y-2.5 body-m">
              {s.points.map((pt, j) => (
                <li
                  key={j}
                  className="flex items-start gap-2.5 text-sm"
                  style={{ color: "var(--fg-muted)" }}
                >
                  <CheckmarkIcon />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border/80 pt-3 font-mono text-[11px] text-[var(--fg-dim)]">
            <span>Deliverable ready</span>
            <span>Step {i + 1} of 3 →</span>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Services() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawCtaOpacity = useTransform(scrollYProgress, [0.85, 0.96], [0, 1]);
  const ctaOpacity = useSpring(rawCtaOpacity, { stiffness: 80, damping: 20 });

  const validServices = services.filter((s) => s.id !== "design");

  if (isMobile) {
    return (
      <section
        id="engagements"
        className="relative overflow-hidden border-t border-border py-20"
      >
        <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
        <Container size="default" className="relative">
          <SectionHeading
            index="05"
            eyebrow="Engagements"
            title="What I can do,"
            muted="and how I like to work."
            body="Three overlapping modes — planning, building, and shipping. Pick one or the whole loop."
          />

          <div className="mt-10 flex flex-col gap-6">
            {validServices.map((s, i) => (
              <MobileCard key={s.id} s={s} i={i} />
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <span className="mono-label" style={{ color: "var(--fg-dim)" }}>
              Ready to start?
            </span>
            <PrimaryCTA variant="solid" size="md" to="/contacts">
              Start a project
            </PrimaryCTA>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="engagements"
      className="relative h-[260vh] border-t border-border"
    >
      {/* Pinned viewport frame with transparent background matching all other sections */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden">
        {/* Grid background matching About, Stack, and Work */}
        <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />

        <Container size="default" className="relative">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading
              index="05"
              eyebrow="Engagements"
              title="What I can do,"
              muted="and how I like to work."
              body="Three overlapping modes — planning, building, and shipping. Pick one or the whole loop."
              className="mb-0"
            />
            <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--fg-dim)]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span>PINNED SEQUENCE // SCROLL TO ADVANCE</span>
            </div>
          </div>

          {/* Sequential Phase Pipeline Connector */}
          <div className="mb-8 hidden items-center gap-4 font-mono text-[11px] text-[var(--fg-dim)] md:flex">
            {validServices.map((s, idx) => (
              <div key={s.id} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-fg font-medium tracking-wider">
                    PHASE 0{idx + 1} // {s.title.toUpperCase()}
                  </span>
                </div>
                {idx < validServices.length - 1 && (
                  <span className="h-px w-12 bg-border-hi" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          {/* 3-Column Grid: Each card arrives from the RIGHT on its dedicated scroll stage */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {validServices.map((s, i) => (
              <ScrollStageCard
                key={s.id}
                s={s}
                i={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          {/* Bottom CTA, reveals after all 3 cards have settled */}
          <motion.div
            style={{ opacity: ctaOpacity }}
            className="mt-8 flex flex-wrap items-center gap-4 border-t border-border/80 pt-6"
          >
            <span className="mono-label" style={{ color: "var(--fg-dim)" }}>
              Ready to start?
            </span>
            <PrimaryCTA variant="solid" size="md" to="/contacts">
              Start a project
            </PrimaryCTA>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}




