import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Container } from "../../primitives/Container";
import { SectionHeading } from "../../primitives/SectionHeading";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { TiltCard } from "../../primitives/TiltCard";
import { services } from "../../data/portfolio";

function ScrollStageCard({ s, i, progress }) {
  // Clear, non-overlapping scroll intervals:
  // Card 0 (Plan): arrives from right between 0.05 and 0.28, then stays settled
  // Card 1 (Build): hidden until 0.35, arrives from right between 0.35 and 0.58, then stays settled
  // Card 2 (Ship): hidden until 0.68, arrives from right between 0.68 and 0.90, then stays settled
  const start = 0.05 + i * 0.31;
  const end = start + 0.23;

  // Glides smoothly from offscreen right into its settled grid column
  const x = useTransform(
    progress,
    [0, start, end, 1],
    ["100vw", "100vw", "0vw", "0vw"],
    { clamp: true }
  );

  const opacity = useTransform(
    progress,
    [0, start, start + 0.08, 1],
    [0, 0, 1, 1],
    { clamp: true }
  );

  const scale = useTransform(
    progress,
    [0, start, end, 1],
    [0.94, 0.94, 1, 1],
    { clamp: true }
  );

  return (
    <motion.div
      style={{ x, opacity, scale }}
      className="flex h-full w-full flex-col"
    >
      <TiltCard maxTilt={6} className="h-full">
        <div className="group relative flex h-full flex-col justify-between rounded-xl border border-border bg-[var(--bg-elev1)] p-6 md:p-7 transition-all duration-500 hover:border-border-hi hover:bg-[var(--bg-elev2)] hover:shadow-xl">
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
                  <span
                    aria-hidden
                    className="mono-data mt-1 font-bold text-accent"
                  >
                    ✓
                  </span>
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
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
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
                  <span aria-hidden className="mono-data mt-0.5 font-bold text-accent">
                    ✓
                  </span>
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

  // Smooth, continuous spring physics applied to scroll progression
  const progress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 18,
    mass: 0.8,
  });

  const ctaOpacity = useTransform(progress, [0.88, 0.98], [0, 1], {
    clamp: true,
  });

  const validServices = services.filter((s) => s.id !== "design");

  if (isMobile) {
    return (
      <section
        id="engagements"
        className="relative overflow-hidden border-t border-border py-20"
      >
        <Container size="default">
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
      className="relative h-[300vh] overflow-hidden border-t border-border"
    >
      {/* Sticky viewport frame pinned while scrolling through the sequence */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden">
        <Container size="default">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading
              index="05"
              eyebrow="Engagements"
              title="What I can do,"
              muted="and how I like to work."
              body="Three overlapping modes — planning, building, and shipping. Pick one or the whole loop."
              className="mb-0"
            />
          </div>

          {/* 3-Column Grid: Each card arrives from the right on its dedicated scroll stage */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {validServices.map((s, i) => (
              <ScrollStageCard
                key={s.id}
                s={s}
                i={i}
                progress={progress}
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
