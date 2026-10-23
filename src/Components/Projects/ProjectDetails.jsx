import { useState } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { Container } from "../../primitives/Container";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { projects } from "../../data/portfolio";
import { getTechIcon } from "../../lib/techIcons";
import { EASE } from "../../lib/ease";
import { useNavigationStatus } from "../../context/NavigationContext";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "build", label: "Build notes" },
  { id: "next", label: "What's next" },
];

export default function ProjectDetails() {
  const { isRouteChange } = useNavigationStatus();
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));
  const [tab, setTab] = useState("overview");
  const [activeImage, setActiveImage] = useState(0);

  if (!project) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Container size="narrow" className="text-center">
          <span className="mono-label text-fg-dim">
            404 · Not found
          </span>
          <h1 className="h2 mt-4 text-fg">Project not found.</h1>
          <p className="body-m mt-4 text-fg-muted">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <PrimaryCTA variant="outline" size="md" to="/projects" className="mt-8 inline-block">
            Back to all work
          </PrimaryCTA>
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
      <section className="relative border-b border-border pt-10 pb-12 md:pt-16 md:pb-20">
        <Container size="wide">
          <div className="mb-6 md:mb-8 flex items-center gap-3">
            <Link
              to="/projects"
              className="mono-label inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-fg"
            >
              <span aria-hidden>←</span> All work
            </Link>
            <span className="mono-data text-fg-dim" aria-hidden>
              /
            </span>
            <span className="mono-label text-fg font-medium">
              {project.title}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8">
            <motion.div
              initial={isRouteChange ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE }}
              className="md:col-span-7"
            >
              <div className="flex flex-wrap items-center gap-2.5 md:gap-3">
                <span className="mono-label rounded-sm border border-border bg-elev1 px-3 py-1.5 text-fg-muted text-xs">
                  {String(project.id).padStart(2, "0")} · Case Study
                </span>
                <span className="mono-label rounded-sm border border-border bg-elev1 px-3 py-1.5 text-fg-muted text-xs">
                  {project.role}
                </span>
                {project.architecture?.category && (
                  <span className="mono-label rounded-sm border border-border bg-elev1 px-3 py-1.5 text-accent text-xs">
                    {project.architecture.category}
                  </span>
                )}
              </div>
              <h1
                className="hero-display mt-5 md:mt-6 overflow-hidden py-1"
                style={{ fontSize: "clamp(32px, 5.5vw, 72px)" }}
              >
                <motion.span
                  className="block"
                  initial={isRouteChange ? { y: "115%" } : false}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                  {project.title}
                </motion.span>
              </h1>
              <p className="body-l mt-4 md:mt-6 max-w-[58ch] text-fg-muted leading-relaxed">
                {project.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={isRouteChange ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}
              className="flex flex-col items-start gap-3 md:col-span-5 md:items-end md:justify-end"
            >
              <div className="flex flex-wrap items-center gap-2.5">
                {project.link && (
                  <PrimaryCTA variant="solid" size="md" href={project.link} target="_blank" rel="noreferrer">
                    Visit live ↗
                  </PrimaryCTA>
                )}
                {project.repo && (
                  <PrimaryCTA
                    variant="outline"
                    size="md"
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.serverRepo ? "Client Repo ↗" : "Source Code ↗"}
                  </PrimaryCTA>
                )}
                {project.serverRepo && (
                  <PrimaryCTA
                    variant="outline"
                    size="md"
                    href={project.serverRepo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Server Repo ↗
                  </PrimaryCTA>
                )}
              </div>
              <span className="mono-data tabular text-xs text-fg-dim">
                ✕ Shipped · Production
              </span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Multi-pane workspace */}
      <section className="border-b border-border py-8 md:py-16">
        <Container size="wide">
          <div className="relative overflow-hidden rounded-xl border border-border bg-elev1 shadow-xl">
            {/* Top bar */}
            <div className="flex h-12 md:h-14 items-center justify-between border-b border-border px-4 md:px-5">
              <div className="flex items-center gap-2.5 md:gap-3">
                <span className="font-mono text-xs text-fg-dim">
                  ◇
                </span>
                <span className="mono-label text-fg-muted text-xs">
                  {project.title.toLowerCase().replace(/\s+/g, "-")}.app
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse"
                  aria-hidden
                />
                <span className="mono-label text-fg-muted text-xs">
                  Live
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Sidebar */}
              <aside className="hidden w-[230px] shrink-0 flex-col gap-1 border-r border-border p-4 md:flex">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`relative flex items-center justify-between rounded-sm px-3 py-2 text-left text-xs transition-colors duration-300 ${
                      tab === t.id
                        ? "bg-elev2 text-fg font-medium"
                        : "text-fg-muted hover:bg-elev2 hover:text-fg"
                    }`}
                  >
                    <span>{t.label}</span>
                    <span className="mono-data tabular text-fg-dim">
                      {String(TABS.indexOf(t) + 1).padStart(2, "0")}
                    </span>
                    {tab === t.id && (
                      <motion.span
                        layoutId="tab-bar"
                        className="absolute left-0 top-2 bottom-2 w-0.5 bg-fg rounded-full"
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    )}
                  </button>
                ))}

                <div className="mt-8 border-t border-border pt-4">
                  <span className="mono-label mb-3 block text-fg-dim">
                    Stack
                  </span>
                  <div className="flex flex-col gap-2">
                    {project.stack.map((s) => {
                      const iconData = getTechIcon(s);
                      return (
                        <span
                          key={s}
                          className="mono-label inline-flex items-center gap-2 text-fg-muted hover:text-fg transition-colors text-xs"
                        >
                          {iconData?.svg && (
                            <span className="h-3.5 w-3.5 shrink-0 opacity-75 flex items-center justify-center [&>svg]:h-3.5 [&>svg]:w-3.5">
                              {iconData.svg}
                            </span>
                          )}
                          <span>{s}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <span className="mono-label mb-3 block text-fg-dim">
                    Status
                  </span>
                  <span
                    className="tabular font-medium text-accent text-lg tracking-tight"
                  >
                    Production
                  </span>
                </div>
              </aside>

              {/* Content area */}
              <div className="min-h-[440px] flex-1 overflow-hidden bg-bg-base p-6 md:p-8">
                {/* Mobile tabs */}
                <div className="mb-6 flex gap-1 border-b border-border md:hidden overflow-x-auto no-scrollbar pb-1">
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={`relative shrink-0 px-3 py-2 text-xs transition-colors duration-200 ${
                        tab === t.id
                          ? "text-fg font-medium"
                          : "text-fg-muted hover:text-fg"
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

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={tab}
                    initial={isRouteChange ? { opacity: 0, y: 8 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="h-full"
                  >
                    {tab === "overview" && (
                      <div className="space-y-8">
                        <div>
                          <span className="mono-label mb-4 inline-block text-fg-dim">
                            What is it?
                          </span>
                          <p className="body-l text-fg-muted">
                            {project.desc}
                          </p>
                        </div>

                        <div>
                          <span className="mono-label mb-4 inline-block text-fg-dim">
                            Preview
                          </span>

                          {/* Hero image */}
                          <motion.div
                            key={activeImage}
                            initial={isRouteChange ? { opacity: 0, y: 8 } : false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="relative overflow-hidden border border-border bg-elev1"
                          >
                            <div className="relative aspect-[16/9] w-full">
                              <img
                                src={project.images[activeImage]}
                                alt={`${project.title} preview ${activeImage + 1}`}
                                className="absolute inset-0 h-full w-full object-cover object-top"
                              />
                              <div
                                className="pointer-events-none absolute inset-0"
                                style={{
                                  background:
                                    "linear-gradient(to top, rgba(8,8,11,0.55), transparent 40%)",
                                }}
                              />
                              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                                <span
                                  className="mono-label text-xs"
                                  style={{ color: "rgba(250,250,250,0.85)" }}
                                >
                                  {project.title}
                                </span>
                                <span
                                  className="mono-data tabular text-xs"
                                  style={{ color: "rgba(250,250,250,0.65)" }}
                                >
                                  {String(activeImage + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                                </span>
                              </div>
                            </div>
                          </motion.div>

                          {/* Thumb strip */}
                          <div className="mt-3 grid grid-cols-3 gap-3 md:grid-cols-6">
                            {project.images.map((img, i) => (
                              <button
                                key={i}
                                onClick={() => setActiveImage(i)}
                                className={`group relative block aspect-[4/3] overflow-hidden border bg-elev1 transition-all duration-200 ${
                                  activeImage === i
                                    ? "border-fg shadow-sm"
                                    : "border-border hover:border-border-hi"
                                }`}
                                aria-label={`Show preview ${i + 1}`}
                              >
                                <img
                                  src={img}
                                  alt=""
                                  className="absolute inset-0 h-full w-full object-cover object-top"
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {tab === "architecture" && (
                      <div className="space-y-8">
                        {project.architecture?.category && (
                          <div className="border-b border-border/80 pb-4">
                            <span className="mono-micro font-mono text-[10px] text-accent uppercase tracking-wider block mb-1">
                              SYSTEM CLASSIFICATION
                            </span>
                            <h3 className="h3-card font-serif text-fg text-xl md:text-2xl">
                              {project.architecture.category}
                            </h3>
                          </div>
                        )}

                        {project.architecture?.highlights && (
                          <div>
                            <span className="mono-label mb-4 inline-block text-fg-dim">
                              Core Engineering Mechanisms
                            </span>
                            <div className="space-y-3">
                              {project.architecture.highlights.map((h, i) => (
                                <div
                                  key={i}
                                  className="rounded-sm border border-border bg-elev1 p-4 transition-colors hover:border-border-hi"
                                >
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <span className="font-mono text-accent text-xs font-semibold">
                                      0{i + 1} //
                                    </span>
                                    <h4 className="font-medium text-fg text-sm">
                                      {h.title}
                                    </h4>
                                  </div>
                                  <p className="body-s text-xs md:text-[13px] text-fg-muted leading-relaxed">
                                    {h.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {project.architecture?.stackLayers && (
                          <div className="border-t border-border/80 pt-6">
                            <span className="mono-label mb-4 inline-block text-fg-dim">
                              Layered Technology Boundaries
                            </span>
                            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                              {project.architecture.stackLayers.map((l, i) => (
                                <div
                                  key={i}
                                  className="rounded-sm border border-border bg-elev1/80 p-3"
                                >
                                  <span className="mono-micro font-mono text-[10px] text-accent block uppercase mb-1">
                                    {l.layer}
                                  </span>
                                  <span className="font-mono text-xs text-fg">
                                    {l.tech}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="border-t border-border/80 pt-6 flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <span className="mono-label block text-xs text-fg-dim">
                              Code Audit & Repository
                            </span>
                            <span className="body-s text-xs text-fg-muted">
                              Inspect source trees, middleware handlers, and schema configurations on GitHub.
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2.5">
                            {project.repo && (
                              <PrimaryCTA
                                variant="outline"
                                size="sm"
                                href={project.repo}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {project.serverRepo ? "Client Repo ↗" : "Source Code ↗"}
                              </PrimaryCTA>
                            )}
                            {project.serverRepo && (
                              <PrimaryCTA
                                variant="outline"
                                size="sm"
                                href={project.serverRepo}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Server Repo ↗
                              </PrimaryCTA>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {tab === "build" && (
                      <div className="space-y-8">
                        <div>
                          <span className="mono-label mb-4 inline-block text-fg-dim">
                            Core Technical Challenge
                          </span>
                          <p className="body-l text-fg-muted">
                            {project.difficulty}
                          </p>
                        </div>

                        {project.buildNotes && project.buildNotes.length > 0 && (
                          <div className="border-t border-border/80 pt-6">
                            <span className="mono-label mb-4 inline-block text-fg-dim">
                              Codebase & Build Challenges
                            </span>
                            <div className="space-y-4">
                              {project.buildNotes.map((note, i) => (
                                <div
                                  key={i}
                                  className="rounded-sm border border-border bg-elev1/80 p-4 transition-colors hover:border-border-hi"
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="font-mono text-accent text-xs font-semibold">
                                      0{i + 1} //
                                    </span>
                                    <h4 className="font-medium text-fg text-sm">
                                      {note.title}
                                    </h4>
                                  </div>
                                  <p className="body-s text-xs md:text-[13px] text-fg-muted leading-relaxed">
                                    {note.takeaway}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <span className="mono-label mb-4 inline-block text-fg-dim">
                            Shipped
                          </span>
                          <p className="body-l text-fg-muted">
                            Shipped · {project.role}
                          </p>
                        </div>
                      </div>
                    )}

                    {tab === "next" && (
                      <div className="space-y-8">
                        <div>
                          <span className="mono-label mb-4 inline-block text-fg-dim">
                            Future plan
                          </span>
                          <p className="body-l text-fg-muted">
                            {project.futurePlan}
                          </p>
                        </div>

                        <div className="border-t border-border pt-8">
                          <span className="mono-label mb-4 inline-block text-fg-dim">
                            Contribute
                          </span>
                          <p className="body-l mb-6 max-w-[55ch] text-fg-muted">
                            Open to feedback, ideas, and collaboration on this
                            project.
                          </p>
                          <PrimaryCTA variant="solid" size="md" href={project.link} target="_blank" rel="noreferrer">
                            Open the project ↗
                          </PrimaryCTA>
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
              className="group flex flex-col gap-2 border border-border bg-elev1 p-5 md:p-6 transition-all duration-300 hover:border-border-hi hover:bg-elev2"
            >
              <span className="mono-label text-fg-dim text-xs">
                ← Previous
              </span>
              <span className="h3-card text-fg-muted transition-colors group-hover:text-fg text-lg md:text-xl font-medium">
                {prev.title}
              </span>
            </Link>
            <Link
              to={`/projects/${next.id}`}
              className="group flex flex-col gap-2 border border-border bg-elev1 p-5 md:p-6 text-right transition-all duration-300 hover:border-border-hi hover:bg-elev2"
            >
              <span className="mono-label text-fg-dim text-xs">
                Next →
              </span>
              <span className="h3-card text-fg-muted transition-colors group-hover:text-fg text-lg md:text-xl font-medium">
                {next.title}
              </span>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
