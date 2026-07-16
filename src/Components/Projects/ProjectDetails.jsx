import { useState } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { Container } from "../../primitives/Container";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { projects } from "../../data/portfolio";
import { EASE } from "../../lib/ease";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "build", label: "Build notes" },
  { id: "next", label: "What's next" },
];

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));
  const [tab, setTab] = useState("overview");
  const [activeImage, setActiveImage] = useState(0);

  if (!project) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Container size="narrow" className="text-center">
          <span
            className="mono-label"
            style={{ color: "var(--fg-dim)" }}
          >
            404 · Not found
          </span>
          <h1 className="h2 mt-4">Project not found.</h1>
          <p className="body-m mt-4" style={{ color: "var(--fg-muted)" }}>
            The project you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/projects" className="mt-8 inline-block">
            <PrimaryCTA variant="outline" size="md">
              Back to all work
            </PrimaryCTA>
          </Link>
        </Container>
      </div>
    );
  }

  const idx = projects.findIndex((p) => p.id === project.id);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="relative">
      <Helmet>
        <title>{project.title} — Ridwanul.dev</title>
        <meta name="description" content={project.desc} />
      </Helmet>

      {/* Header */}
      <section className="relative border-b border-border pt-12 pb-16 md:pt-16 md:pb-20">
        <Container size="wide">
          <div className="mb-8 flex items-center gap-3">
            <Link
              to="/projects"
              className="mono-label inline-flex items-center gap-2 text-[var(--fg-muted)] transition-colors hover:text-fg"
            >
              <span aria-hidden>←</span> All work
            </Link>
            <span
              className="mono-data"
              style={{ color: "var(--fg-dim)" }}
              aria-hidden
            >
              /
            </span>
            <span className="mono-label" style={{ color: "var(--fg)" }}>
              {project.title}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE }}
              className="md:col-span-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="mono-label rounded-sm border border-border bg-[var(--bg-elev1)] px-3 py-1.5"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {String(project.id).padStart(2, "0")} · {project.year}
                </span>
                <span
                  className="mono-label rounded-sm border border-border bg-[var(--bg-elev1)] px-3 py-1.5"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {project.role}
                </span>
              </div>
              <h1
                className="hero-display mt-6"
                style={{ fontSize: "clamp(36px, 5.5vw, 72px)" }}
              >
                {project.title}
              </h1>
              <p
                className="body-l mt-6 max-w-[58ch]"
                style={{ color: "var(--fg-muted)" }}
              >
                {project.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}
              className="flex flex-col items-start gap-4 md:col-span-4 md:items-end md:justify-end"
            >
              <a href={project.link} target="_blank" rel="noreferrer">
                <PrimaryCTA variant="solid" size="lg">
                  Visit live ↗
                </PrimaryCTA>
              </a>
              <span
                className="mono-data tabular"
                style={{ color: "var(--fg-dim)" }}
              >
                ✕ Live · {project.year}
              </span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Multi-pane workspace */}
      <section className="border-b border-border py-12 md:py-16">
        <Container size="wide">
          <div className="relative overflow-hidden rounded-md border border-border bg-[var(--bg-elev1)]">
            {/* Top bar */}
            <div className="flex h-14 items-center justify-between border-b border-border px-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[12px]" style={{ color: "var(--fg-dim)" }}>
                  ◇
                </span>
                <span
                  className="mono-label"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {project.title.toLowerCase().replace(/\s+/g, "-")}.app
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-fg"
                  aria-hidden
                />
                <span
                  className="mono-label"
                  style={{ color: "var(--fg-muted)" }}
                >
                  Live
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Sidebar */}
              <aside className="hidden w-[220px] shrink-0 flex-col gap-1 border-r border-border p-4 md:flex">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`relative flex items-center justify-between rounded-sm px-3 py-2 text-left text-[13px] transition-colors duration-300 ${
                      tab === t.id
                        ? "bg-[var(--bg-elev2)] text-fg"
                        : "text-[var(--fg-muted)] hover:bg-[var(--bg-elev2)] hover:text-fg"
                    }`}
                  >
                    <span>{t.label}</span>
                    <span
                      className="mono-data tabular"
                      style={{ color: "var(--fg-dim)" }}
                    >
                      {String(TABS.indexOf(t) + 1).padStart(2, "0")}
                    </span>
                    {tab === t.id && (
                      <motion.span
                        layoutId="tab-bar"
                        className="absolute left-0 top-2 bottom-2 w-px bg-fg"
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    )}
                  </button>
                ))}

                <div className="mt-8 border-t border-border pt-4">
                  <span
                    className="mono-label mb-3 block"
                    style={{ color: "var(--fg-dim)" }}
                  >
                    Stack
                  </span>
                  <div className="flex flex-col gap-2">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="mono-label text-[var(--fg-muted)]"
                      >
                        · {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <span
                    className="mono-label mb-3 block"
                    style={{ color: "var(--fg-dim)" }}
                  >
                    Year
                  </span>
                  <span
                    className="tabular font-medium"
                    style={{ fontSize: 24, color: "var(--fg)", letterSpacing: "-0.02em" }}
                  >
                    {project.year}
                  </span>
                </div>
              </aside>

              {/* Content area */}
              <div className="min-h-[440px] flex-1 overflow-hidden bg-[var(--bg-base)] p-6 md:p-8">
                {/* Mobile tabs */}
                <div className="mb-6 flex gap-1 border-b border-border md:hidden">
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={`relative px-3 py-2 text-[12px] transition-colors ${
                        tab === t.id
                          ? "text-fg"
                          : "text-[var(--fg-muted)]"
                      }`}
                    >
                      {t.label}
                      {tab === t.id && (
                        <motion.span
                          layoutId="mobile-tab-underline"
                          className="absolute inset-x-0 -bottom-px h-px bg-fg"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="h-full"
                  >
                    {tab === "overview" && (
                      <div className="space-y-8">
                        <div>
                          <span
                            className="mono-label mb-4 inline-block"
                            style={{ color: "var(--fg-dim)" }}
                          >
                            What is it?
                          </span>
                          <p
                            className="body-l"
                            style={{ color: "var(--fg-muted)" }}
                          >
                            {project.desc}
                          </p>
                        </div>

                        <div>
                          <span
                            className="mono-label mb-4 inline-block"
                            style={{ color: "var(--fg-dim)" }}
                          >
                            Preview
                          </span>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {project.images.map((img, i) => (
                              <button
                                key={i}
                                onClick={() => setActiveImage(i)}
                                className={`group relative block aspect-[4/3] overflow-hidden border bg-[var(--bg-elev1)] transition-all ${
                                  activeImage === i
                                    ? "border-fg"
                                    : "border-border hover:border-[var(--border-hi)]"
                                }`}
                              >
                                <img
                                  src={img}
                                  alt={`${project.title} preview ${i + 1}`}
                                  className="absolute inset-0 h-full w-full object-cover object-top"
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        {Object.keys(project.metrics || {}).filter(
                          (k) => project.metrics[k]
                        ).length > 0 && (
                          <dl className="grid grid-cols-3 gap-px bg-border">
                            {Object.entries(project.metrics)
                              .filter(([, v]) => v != null && v !== "")
                              .map(([k, v]) => (
                                <div
                                  key={k}
                                  className="bg-[var(--bg-elev1)] p-5"
                                >
                                  <dt
                                    className="mono-label capitalize"
                                    style={{ color: "var(--fg-dim)" }}
                                  >
                                    {k.replace(/([A-Z])/g, " $1").trim()}
                                  </dt>
                                  <dd
                                    className="tabular font-medium"
                                    style={{
                                      fontSize: 24,
                                      color: "var(--fg)",
                                      letterSpacing: "-0.02em",
                                    }}
                                  >
                                    {v}
                                  </dd>
                                </div>
                              ))}
                          </dl>
                        )}
                      </div>
                    )}

                    {tab === "build" && (
                      <div className="space-y-8">
                        <div>
                          <span
                            className="mono-label mb-4 inline-block"
                            style={{ color: "var(--fg-dim)" }}
                          >
                            Difficulty
                          </span>
                          <p
                            className="body-l"
                            style={{ color: "var(--fg-muted)" }}
                          >
                            {project.difficulty}
                          </p>
                        </div>

                        <div>
                          <span
                            className="mono-label mb-4 inline-block"
                            style={{ color: "var(--fg-dim)" }}
                          >
                            Shipped
                          </span>
                          <p
                            className="body-l"
                            style={{ color: "var(--fg-muted)" }}
                          >
                            {project.year} · {project.role}
                          </p>
                        </div>
                      </div>
                    )}

                    {tab === "next" && (
                      <div className="space-y-8">
                        <div>
                          <span
                            className="mono-label mb-4 inline-block"
                            style={{ color: "var(--fg-dim)" }}
                          >
                            Future plan
                          </span>
                          <p
                            className="body-l"
                            style={{ color: "var(--fg-muted)" }}
                          >
                            {project.futurePlan}
                          </p>
                        </div>

                        <div className="border-t border-border pt-8">
                          <span
                            className="mono-label mb-4 inline-block"
                            style={{ color: "var(--fg-dim)" }}
                          >
                            Contribute
                          </span>
                          <p
                            className="body-l mb-6 max-w-[55ch]"
                            style={{ color: "var(--fg-muted)" }}
                          >
                            Open to feedback, ideas, and collaboration on this
                            project.
                          </p>
                          <a href={project.link} target="_blank" rel="noreferrer">
                            <PrimaryCTA variant="solid" size="md">
                              Open the project ↗
                            </PrimaryCTA>
                          </a>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Prev / Next nav */}
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              to={`/projects/${prev.id}`}
              className="group flex flex-col gap-2 border border-border bg-[var(--bg-elev1)] p-6 transition-colors hover:border-[var(--border-hi)]"
            >
              <span
                className="mono-label"
                style={{ color: "var(--fg-dim)" }}
              >
                ← Previous
              </span>
              <span
                className="h3-card transition-colors group-hover:text-fg"
                style={{ color: "var(--fg-muted)", fontSize: 20 }}
              >
                {prev.title}
              </span>
            </Link>
            <Link
              to={`/projects/${next.id}`}
              className="group flex flex-col gap-2 border border-border bg-[var(--bg-elev1)] p-6 text-right transition-colors hover:border-[var(--border-hi)]"
            >
              <span
                className="mono-label"
                style={{ color: "var(--fg-dim)" }}
              >
                Next →
              </span>
              <span
                className="h3-card transition-colors group-hover:text-fg"
                style={{ color: "var(--fg-muted)", fontSize: 20 }}
              >
                {next.title}
              </span>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
