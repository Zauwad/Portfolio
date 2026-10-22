import { useRef } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "../../primitives/Container";
import { SectionHeading } from "../../primitives/SectionHeading";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { TiltCard } from "../../primitives/TiltCard";
import { projects } from "../../data/portfolio";
import { getTechIcon } from "../../lib/techIcons";

function StackedProjectCard({ project, index, total }) {
  const cardRef = useRef(null);

  // Scroll tracking for progressive scaling and dimming as next card overlaps
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <div
      ref={cardRef}
      style={{
        position: "sticky",
        top: `calc(96px + ${index * 24}px)`,
        zIndex: index + 10,
      }}
      className="mb-14 w-full transition-all duration-300"
    >
      <motion.article
        style={{ scale }}
        className="group relative overflow-hidden rounded-2xl border border-border-hi bg-[var(--bg-elev1)] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
      >
        {/* Subtle background ambient gradient accent */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full opacity-10 blur-3xl"
          style={{
            background:
              index === 0
                ? "radial-gradient(circle, #3b82f6, transparent 70%)"
                : index === 1
                ? "radial-gradient(circle, #10b981, transparent 70%)"
                : "radial-gradient(circle, #8b5cf6, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Project Editorial Information */}
          <div className="flex flex-col gap-6 lg:col-span-6">
            <header className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <span className="mono-data font-mono text-[12px] text-accent">
                  PROJECT // {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mono-micro font-mono text-[10px] text-[var(--fg-dim)]">
                  OF {String(total).padStart(2, "0")}
                </span>
              </div>
              <span className="mono-label font-mono rounded border border-border bg-[var(--bg-base)] px-2.5 py-1 text-[11px] text-[var(--fg-muted)]">
                {project.role}
              </span>
            </header>

            <div>
              <span className="mono-micro font-mono text-[11px] text-accent/80 block mb-1">
                {project.subtitle}
              </span>
              <Link
                to={`/projects/${project.id}`}
                className="h2-section font-serif block text-fg hover:text-accent transition-colors"
                style={{ fontSize: "clamp(28px, 2.8vw, 42px)" }}
              >
                {project.title}
              </Link>
            </div>

            <p className="body-m text-[var(--fg-muted)] leading-relaxed">
              {project.desc}
            </p>

            {project.difficulty && (
              <div className="rounded-lg border border-border/80 bg-[var(--bg-base)] p-3.5 text-xs text-[var(--fg-muted)]">
                <span className="mono-micro font-mono text-[10px] text-accent block mb-1">
                  CORE CHALLENGE
                </span>
                {project.difficulty}
              </div>
            )}

            {/* Stack Badges with SVG Icons */}
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => {
                const iconData = getTechIcon(tech);
                return (
                  <span
                    key={tech}
                    className="mono-micro font-mono inline-flex items-center gap-1.5 rounded-md border border-border bg-[var(--bg-elev2)] px-2.5 py-1 text-[11px] text-[var(--fg)] transition-all hover:border-border-hi"
                  >
                    {iconData?.svg && (
                      <span className="h-3.5 w-3.5 shrink-0 opacity-80 flex items-center justify-center [&>svg]:h-3.5 [&>svg]:w-3.5">
                        {iconData.svg}
                      </span>
                    )}
                    <span>{tech}</span>
                  </span>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4 pt-4 border-t border-border mt-2">
              {project.link && (
                <PrimaryCTA
                  variant="solid"
                  size="sm"
                  as="a"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Live ↗
                </PrimaryCTA>
              )}
              <PrimaryCTA
                variant="outline"
                size="sm"
                to={`/projects/${project.id}`}
              >
                Case Study
              </PrimaryCTA>
            </div>
          </div>

          {/* Right Column: 3D Holographic Tilt Card Preview */}
          <div className="lg:col-span-6">
            <TiltCard maxTilt={10} glare={true} className="w-full">
              <Link
                to={`/projects/${project.id}`}
                className="group/img relative block aspect-[16/10] overflow-hidden rounded-xl border border-border-hi bg-[var(--bg-base)] shadow-2xl"
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-105"
                />

                {/* Ambient vignette and overlay info */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Production Build</span>
                  </span>
                  <span className="rounded bg-black/60 px-2 py-1 backdrop-blur-md border border-white/10 text-[10px]">
                    Interactive Preview →
                  </span>
                </div>
              </Link>
            </TiltCard>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function FeaturedWork() {
  const featured = projects.slice(0, 3);

  return (
    <section
      id="work"
      className="relative border-t border-border py-20 md:py-32"
    >
      <Container size="default">
        {/* Section headline */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <SectionHeading
            index="02"
            eyebrow="Featured work"
            title="A small set,"
            muted="shipped end-to-end."
            body="A curated showcase of full-stack engineering — scroll through the stack deck."
            className="mb-0"
          />
          <PrimaryCTA variant="outline" size="md" to="/projects">
            View all work
          </PrimaryCTA>
        </div>

        {/* Sticky Stacking Deck Container */}
        <div className="relative pb-32">
          {featured.map((project, index) => (
            <StackedProjectCard
              key={project.id}
              project={project}
              index={index}
              total={featured.length}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
