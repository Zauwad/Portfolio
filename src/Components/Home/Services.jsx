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
  // Sequential scroll pipeline:
  // Initial stage (0.00 -> 0.04): stage is blank, all cards offscreen to the right (55vw, opacity 0).
  // Phase 01 (Plan): glides in from right between 0.04 and 0.21.
  // Phase 02 (Build): glides in from right between 0.24 and 0.41.
  // Phase 03 (Ship): glides in from right between 0.44 and 0.61.
  // Generous locked dwell window (0.61 -> 1.00): all 3 cards docked, CTA revealed (0.63 -> 0.75) before unpinning.

  const start = 0.04 + i * 0.20;
  const end = start + 0.17;

  const rawXNum = useTransform(
    scrollYProgress,
    [0, start, end, 1],
    [55, 55, 0, 0],
    { clamp: true }
  );

  const rawOpacity = useTransform(
    scrollYProgress,
    [0, start, start + 0.08, 1],
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
  const springX = useSpring(rawXNum, { stiffness: 60, damping: 18, mass: 0.7 });
  const x = useTransform(springX, (v) => `${v}vw`);
  const opacity = useSpring(rawOpacity, { stiffness: 75, damping: 20 });
  const scale = useSpring(rawScale, { stiffness: 60, damping: 18 });

  return (
    <motion.div
      style={{ x, opacity, scale }}
      className="flex h-full w-full flex-col"
    >
      <TiltCard maxTilt={6} className="h-full">
        <div className="group relative flex h-full flex-col justify-between rounded-xl border border-border bg-[var(--bg-elev1)] p-6 md:p-7 transition-all duration-500 hover:border-border-hi hover:bg-[var(--bg-elev2)] hover:shadow-2xl">
          <div>
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

  const rawCtaOpacity = useTransform(scrollYProgress, [0.63, 0.75], [0, 1]);
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
            eyebrow="Engagements"
            title="What I can do,"
            muted="and how I like to work."
            body="Available for initial technical planning, full-stack implementation, or production deployments."
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
      className="relative h-[320vh] border-t border-border"
    >
      {/* Pinned viewport frame with transparent background matching all other sections */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden">
        {/* Grid background matching About, Stack, and Work */}
        <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />

        <Container size="default" className="relative">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Engagements"
              title="What I can do,"
              muted="and how I like to work."
              body="Available for initial technical planning, full-stack implementation, or production deployments."
              className="mb-0"
            />
          </div>

          {/* Sequential Phase Pipeline Connector */}
          <div className="mb-8 hidden items-center gap-4 font-mono text-[11px] text-[var(--fg-dim)] md:flex">
            {validServices.map((s, idx) => (
              <div key={s.id} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-fg font-medium tracking-wider">
                    PHASE 0{idx + 1}
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




