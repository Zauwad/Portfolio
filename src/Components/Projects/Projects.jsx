import { useMemo, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../../primitives/Container";
import { SectionHeading } from "../../primitives/SectionHeading";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { projects } from "../../data/portfolio";
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
          content="Selected full-stack and frontend projects by Ridwanul Azim Zawad — React, Node, MongoDB, Firebase, Stripe."
        />
      </Helmet>

      <section className="relative border-b border-border py-20 md:py-28">
        <Container size="wide">
          <SectionHeading
            index="03"
            eyebrow="Work"
            title="Selected projects,"
            muted="shipped end-to-end."
            body="Filter by discipline or skim them all. Every card opens to a short brief — stack, build notes, what's next."
          />

          {/* Filter row */}
          <div className="mb-12 flex flex-wrap items-center gap-3 border-t border-border pt-8">
            <span
              className="mono-label"
              style={{ color: "var(--fg-dim)" }}
            >
              Filter
            </span>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`mono-label rounded-sm border px-3 py-1.5 transition-all duration-300 ${
                    filter === f.id
                      ? "border-fg bg-fg text-[var(--bg-base)]"
                      : "border-border bg-[var(--bg-base)] text-[var(--fg-muted)] hover:border-[var(--border-hi)] hover:text-fg"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <span
              className="mono-data ml-auto tabular"
              style={{ color: "var(--fg-dim)" }}
            >
              {filtered.length} project{filtered.length === 1 ? "" : "s"}
            </span>
          </div>

          {/* Projects grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="grid grid-cols-1 gap-px bg-border lg:grid-cols-2"
            >
              {filtered.map((p, i) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.9, ease: EASE, delay: i * 0.06 }}
                  className="group relative flex flex-col gap-6 bg-[var(--bg-elev1)] p-6 transition-colors duration-500 hover:bg-[var(--bg-elev2)] md:p-8"
                >
                  <span
                    aria-hidden
                    className="absolute right-6 top-6 font-mono text-[14px] text-[var(--fg-dim)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  >
                    →
                  </span>

                  {/* Image */}
                  <Link
                    to={`/projects/${p.id}`}
                    className="relative block aspect-[16/10] overflow-hidden border border-border bg-[var(--bg-base)]"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="absolute inset-0 h-full w-full object-cover object-top opacity-90 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(8,8,11,0.7), transparent 50%)",
                      }}
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span
                        className="mono-label"
                        style={{ color: "rgba(250,250,250,0.85)" }}
                      >
                        {p.role}
                      </span>
                      <span
                        className="mono-label"
                        style={{ color: "rgba(250,250,250,0.65)" }}
                      >
                        {p.year}
                      </span>
                    </div>
                  </Link>

                  <header className="flex items-start justify-between gap-4">
                    <Link to={`/projects/${p.id}`}>
                      <h3
                        className="h3-card transition-colors hover:text-fg"
                        style={{ fontSize: "clamp(22px, 2vw, 28px)" }}
                      >
                        {p.title}
                      </h3>
                      <p
                        className="body-s mt-1"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        {p.subtitle}
                      </p>
                    </Link>
                    <span
                      className="mono-data tabular"
                      style={{ color: "var(--fg-dim)" }}
                    >
                      {String(p.id).padStart(2, "0")}
                    </span>
                  </header>

                  <p className="body-m" style={{ color: "var(--fg-muted)" }}>
                    {p.desc}
                  </p>

                  {/* Stack chips */}
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="mono-label rounded-sm border border-border bg-[var(--bg-base)] px-2 py-1 text-[var(--fg-muted)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                    <PrimaryCTA
                      variant="outline"
                      size="sm"
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visit live
                    </PrimaryCTA>
                    <PrimaryCTA
                      variant="ghost"
                      size="sm"
                      arrow={false}
                      to={`/projects/${p.id}`}
                    >
                      Read brief →
                    </PrimaryCTA>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      {/* CTA strip */}
      <section className="py-16">
        <Container size="default">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="flex flex-col items-start justify-between gap-6 border border-border bg-[var(--bg-elev1)] p-8 md:flex-row md:items-center md:p-10"
          >
            <div>
              <h3
                className="h3-card"
                style={{ fontSize: "clamp(22px, 2vw, 28px)" }}
              >
                Have a project in mind?
              </h3>
              <p
                className="body-m mt-2"
                style={{ color: "var(--fg-muted)" }}
              >
                Open to freelance, contract, and hybrid roles — let's talk
                about what you're building.
              </p>
            </div>
            <PrimaryCTA variant="solid" size="lg" to="/contacts">
              Start a project →
            </PrimaryCTA>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
