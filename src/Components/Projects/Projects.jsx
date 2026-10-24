import { useMemo, useState, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Container } from "../../primitives/Container";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { projects } from "../../data/portfolio";
import { TiltCard } from "../../primitives/TiltCard";
import { getTechIcon } from "../../lib/techIcons";
import { EASE } from "../../lib/ease";
import { Helmet } from "react-helmet";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full-stack" },
  { id: "frontend", label: "Frontend" },
];

function matchesFilter(project, filterId) {
  if (filterId === "all") return true;
  if (filterId === "fullstack") {
    return project.role?.toLowerCase().includes("full-stack");
  }
  if (filterId === "frontend") {
    return project.role?.toLowerCase().includes("frontend");
  }
  return true;
}

function ScrollProjectArticle({ project, index }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <motion.article
      layout="position"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
      transition={{
        layout: { type: "spring", stiffness: 300, damping: 28 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      }}
      className="group relative flex flex-col justify-between overflow-hidden bg-elev1 p-5 md:p-8 transition-colors duration-500 hover:bg-elev2"
    >
      {/* Interactive spotlight cursor mask effect */}
      {mousePos.active && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, var(--accent-glow), transparent 75%)`,
          }}
        />
      )}

      <div>
        <div className="flex items-center justify-between border-b border-border/80 pb-3 md:pb-4 mb-5 md:mb-6">
          <div className="flex items-center gap-2.5 md:gap-3">
            <span className="mono-data font-mono text-xs text-accent">
              PROJECT // {String(project.id).padStart(2, "0")}
            </span>
            <span className="mono-micro font-mono text-[11px] text-fg-dim">
              · {project.role}
            </span>
          </div>
          <span
            aria-hidden
            className="font-mono text-[13px] text-fg-dim transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-fg"
          >
            ↗
          </span>
        </div>

        {/* Image with 3D Tilt */}
        <TiltCard maxTilt={5} glare={false}>
          <Link
            to={`/projects/${project.id}`}
            className="relative block aspect-[16/10] overflow-hidden rounded-sm border border-border bg-bg-base"
          >
            <img
              src={project.images[0]}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover object-top opacity-90 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, transparent 80%)",
              }}
            />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span
                className="mono-label font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-xs bg-black/60 backdrop-blur-md text-white/90 border border-white/10"
              >
                {project.role}
              </span>
              <span
                className="mono-label font-mono text-[10px] uppercase tracking-[0.2em] text-white/70"
              >
                Shipped Build
              </span>
            </div>
          </Link>
        </TiltCard>

        <header className="mt-5 md:mt-6">
          <Link to={`/projects/${project.id}`}>
            <h3
              className="h3-card font-serif text-fg transition-colors group-hover:text-accent"
              style={{ fontSize: "clamp(22px, 2.2vw, 30px)" }}
            >
              {project.title}
            </h3>
            <p className="body-s mt-1 font-sans text-fg-muted italic">
              "{project.subtitle}"
            </p>
          </Link>
        </header>

        <p className="body-m mt-3 md:mt-4 text-fg-muted leading-relaxed">
          {project.desc}
        </p>

        {project.difficulty && (
          <div className="mt-4 rounded-md border border-border/80 bg-bg-base/60 p-3 text-xs text-fg-muted">
            <span className="mono-micro font-mono text-[10px] text-accent block mb-1">
              CORE CHALLENGE
            </span>
            {project.difficulty}
          </div>
        )}

        {/* Stack chips with official SVG icons */}
        <div className="mt-5 md:mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => {
            const iconData = getTechIcon(s);
            return (
              <span
                key={s}
                className="mono-micro font-mono inline-flex items-center gap-1.5 rounded-sm border border-border bg-bg-base px-2.5 py-1 text-[11px] text-fg transition-all hover:border-border-hi"
              >
                {iconData?.svg && (
                  <span className="h-3 w-3 shrink-0 opacity-75 flex items-center justify-center [&>svg]:h-3 [&>svg]:w-3">
                    {iconData.svg}
                  </span>
                )}
                <span>{s}</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border/80 pt-4">
        <div className="flex items-center gap-2">
          {project.link && (
            <PrimaryCTA
              variant="outline"
              size="sm"
              as="a"
              href={project.link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              Visit live ↗
            </PrimaryCTA>
          )}
          {project.repo && (
            <PrimaryCTA
              variant="ghost"
              size="sm"
              arrow={false}
              as="a"
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              Source
            </PrimaryCTA>
          )}
        </div>

        <Link
          to={`/projects/${project.id}`}
          className="mono-label font-mono text-[11px] text-fg-dim transition-colors hover:text-fg"
        >
          Read brief →
        </Link>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(
    () => projects.filter((p) => matchesFilter(p, filter)),
    [filter]
  );

  return (
    <div className="relative">
      <Helmet>
        <title>Work — Ridwanul.dev</title>
        <meta
          name="description"
          content="Selected full-stack and frontend projects by Ridwanul Azim Zawad"
        />
      </Helmet>

      <section className="relative border-b border-border py-20 md:py-28">
        <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
        <Container size="wide" className="relative">
          {/* Masked Editorial Headline */}
          <div className="mb-8 md:mb-10 max-w-[800px]">

            <h1 className="hero-display text-balance">
              <span className="block overflow-hidden py-1">
                <motion.span
                  className="block"
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                  Selected projects.
                </motion.span>
              </span>
              <span className="block overflow-hidden py-1">
                <motion.span
                  className="block text-fg-muted font-serif italic"
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                >
                  Shipped end-to-end.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
              className="body-l mt-4 md:mt-6 max-w-[58ch] text-fg-muted leading-relaxed"
            >
              Filter by discipline or explore the full roster. Every card opens to an
              in-depth brief — architecture, data models, build decisions, and live links.
            </motion.p>
          </div>



          {/* Filter row */}
          <div className="mb-8 md:mb-10 flex flex-wrap items-center gap-3">
            <span className="mono-label font-mono text-[11px] uppercase tracking-[0.2em] text-fg-dim">
              FILTER:
            </span>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const isActive = filter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`relative rounded-sm px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 select-none cursor-pointer ${
                      isActive ? "text-bg-base font-semibold" : "text-fg-muted hover:text-fg"
                    }`}
                  >
                    <span className="relative z-10">{f.label}</span>
                    {isActive ? (
                      <motion.span
                        layoutId="project-filter-pill"
                        className="absolute inset-0 rounded-sm bg-fg shadow-sm"
                        transition={{ type: "spring", stiffness: 420, damping: 30 }}
                      />
                    ) : (
                      <span className="absolute inset-0 rounded-sm border border-border bg-bg-base transition-colors hover:border-border-hi" />
                    )}
                  </button>
                );
              })}
            </div>
            <span className="mono-data ml-auto tabular font-mono text-[11px] text-fg-dim">
              <span className="hidden sm:inline">Showing </span>{filtered.length} of {projects.length} projects
            </span>
          </div>

          {/* Projects grid with Spring Layout Transitions */}
          <motion.div
            layout
            className="grid grid-cols-1 gap-px bg-border lg:grid-cols-2 rounded-xl overflow-hidden shadow-xl"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.map((p, i) => (
                <ScrollProjectArticle
                  key={p.id}
                  project={p}
                  index={i}
                />
              ))}
            </AnimatePresence>

            {/* CTA tile — fills the empty slot beside an odd-numbered last card */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="flex flex-col items-center justify-center gap-5 md:gap-6 bg-elev1 p-6 text-center md:p-12"
            >
              <span className="mono-label font-mono text-[11px] text-fg-dim">
                ✕ 08 · NEXT CHAPTER
              </span>
              <h3
                className="h3-card font-serif text-fg"
                style={{ fontSize: "clamp(22px, 2.4vw, 32px)" }}
              >
                Have a project in mind?
              </h3>
              <p className="body-m max-w-[44ch] text-fg-muted leading-relaxed">
                Open to freelance, contract, and hybrid roles — let's build
                something resilient and considered together.
              </p>
              <PrimaryCTA variant="solid" size="md" to="/contacts">
                Start a project →
              </PrimaryCTA>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
