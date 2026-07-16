import { Link } from "react-router";
import { motion } from "framer-motion";
import { Container } from "../../primitives/Container";
import { SectionHeading } from "../../primitives/SectionHeading";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { projects } from "../../data/portfolio";
import { EASE } from "../../lib/ease";

export default function FeaturedWork() {
  const featured = projects.slice(0, 3);

  return (
    <section
      id="work"
      className="relative border-t border-border py-20 md:py-28"
    >
      <Container size="default">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <SectionHeading
            index="03"
            eyebrow="Featured work"
            title="A small set,"
            muted="shipped end-to-end."
            body="A handful of projects I built from idea to deploy — frontend polish, real backends, real users."
            className="mb-0"
          />
          <Link to="/projects">
            <PrimaryCTA variant="outline" size="md">
              View all work
            </PrimaryCTA>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-3">
          {featured.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
              whileHover={{ y: -2 }}
              className="group relative flex flex-col gap-6 bg-[var(--bg-elev1)] p-6 transition-colors duration-500 hover:bg-[var(--bg-elev2)] md:p-7"
            >
              <span
                aria-hidden
                className="absolute right-5 top-5 font-mono text-[14px] text-[var(--fg-dim)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                →
              </span>
              {/* Image preview */}
              <Link
                to={`/projects/${p.id}`}
                className="relative block aspect-[4/3] overflow-hidden border border-border bg-[var(--bg-base)]"
              >
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover object-top opacity-80 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(8,8,11,0.6), transparent 40%)",
                  }}
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span
                    className="mono-label"
                    style={{ color: "rgba(250,250,250,0.8)" }}
                  >
                    {p.role}
                  </span>
                  <span
                    className="mono-label"
                    style={{ color: "rgba(250,250,250,0.6)" }}
                  >
                    {p.year}
                  </span>
                </div>
              </Link>

              <header className="flex items-baseline justify-between gap-4">
                <Link
                  to={`/projects/${p.id}`}
                  className="h3-card hover:underline"
                  style={{ fontSize: "clamp(20px, 1.6vw, 24px)" }}
                >
                  {p.title}
                </Link>
                <span
                  className="mono-data tabular"
                  style={{ color: "var(--fg-dim)" }}
                >
                  {String(p.id).padStart(2, "0")}
                </span>
              </header>

              <p
                className="body-m"
                style={{ color: "var(--fg-muted)" }}
              >
                {p.desc}
              </p>

              <div className="mt-auto flex flex-wrap gap-2">
                {p.stack.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="mono-label rounded-sm border border-border bg-[var(--bg-base)] px-2 py-1 text-[var(--fg-muted)]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mono-label inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-fg"
                >
                  Visit live <span aria-hidden>↗</span>
                </a>
                <Link
                  to={`/projects/${p.id}`}
                  className="mono-label inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-fg"
                >
                  Read brief <span aria-hidden>→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
