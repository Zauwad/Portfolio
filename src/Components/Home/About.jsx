import { motion } from "framer-motion";
import { Container } from "../../primitives/Container";
import { SectionHeading } from "../../primitives/SectionHeading";
import { Reveal } from "../../primitives/Reveal";
import { EASE } from "../../lib/ease";
import amazeLogo from "../../../assets/A Maze Venture.png";

const ICONS = {
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.16c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14v3.18c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6M9 9h2" />
    </svg>
  ),
};

const ABOUT_PARAGRAPHS = [
  {
    lead: "I build systems, not just screens.",
    body: "Backend-first by habit — I think in data flow, contracts, and reliability before I sketch a single layout. System design, persistence, and the seam between server and client are where I do my best work.",
  },
  {
    lead: "Frontend, by love.",
    body: "I love the part where the system meets the user — calm interfaces, considered motion, and the quiet details that make a product feel right. I just don't lead with it. The frontend is where the backend gets to express itself.",
  },
  {
    lead: "AI in the loop.",
    body: "I use AI coding assistants daily — not as shortcuts but as a second pass on thinking, refactoring, and exploring unfamiliar ground. I'm actively working with retrieval patterns, tool protocols, and systems thinking for the next generation of products.",
  },
  {
    lead: "Proudest build so far.",
    body: "FitTrack — a full-stack platform with auth, role-based dashboards, real-time scheduling, and payments. The system behind it is what I'm proud of; the interface is what I enjoyed building.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-border py-20 md:py-28"
    >
      <Container size="default">
        <SectionHeading
          index="01"
          eyebrow="About"
          title="Backend first,"
          muted="frontend by love."
          body="A short, honest read on how I think, what I care about, and how I work."
        />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          {/* Left: bio paragraphs */}
          <div className="md:col-span-7">
            <div className="space-y-7">
              {ABOUT_PARAGRAPHS.map((p, i) => (
                <Reveal key={i} delay={i * 0.06} as="p" className="body-l">
                  <span className="text-fg">{p.lead}</span>{" "}
                  <span style={{ color: "var(--fg-muted)" }}>{p.body}</span>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3} className="mt-10">
              <div className="flex flex-wrap gap-3">
                {[
                  "Calm under pressure",
                  "Hybrid-ready",
                  "Async-first",
                  "English · বাংলা",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="mono-label rounded-sm border border-border bg-[var(--bg-elev1)] px-3 py-1.5 text-[var(--fg-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: stats card */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative border border-border bg-[var(--bg-elev1)] p-6 md:p-8"
            >
              <span
                className="mono-label absolute right-5 top-5"
                style={{ color: "var(--fg-dim)" }}
              >
                Snapshot · 2026
              </span>
              <h3
                className="h3-card"
                style={{ fontSize: "clamp(20px, 1.6vw, 24px)" }}
              >
                Where I am right now
              </h3>

              <div className="mt-8 grid grid-cols-2 gap-px bg-border">
                {[
                  {
                    label: "fittrack",
                    sub: "live · fitness-tracker-d03b6.web.app",
                    href: "https://fitness-tracker-d03b6.web.app/",
                    external: true,
                    icon: ICONS.globe,
                  },
                  {
                    label: "github",
                    sub: "code · commits",
                    href: "https://github.com/Zauwad",
                    external: true,
                    icon: ICONS.github,
                  },
                  {
                    label: "amaze · 2026",
                    sub: "building full-stack",
                    href: "/contacts",
                    icon: (
                      <img
                        src={amazeLogo}
                        alt=""
                        className="h-[0.85em] w-auto shrink-0 brightness-0 invert"
                        aria-hidden
                        style={{ verticalAlign: "middle" }}
                      />
                    ),
                  },
                  {
                    label: "resume",
                    sub: "pdf · 1 page",
                    href: "/Ridwanul_Azim_Resume.pdf",
                    external: true,
                    icon: ICONS.doc,
                  },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target={s.external ? "_blank" : undefined}
                    rel={s.external ? "noreferrer" : undefined}
                    className="group flex flex-col gap-3 bg-[var(--bg-elev1)] p-5 transition-colors hover:bg-[var(--bg-elev2)]"
                  >
                    <span
                      className="mono-label"
                      style={{ color: "var(--fg-dim)" }}
                    >
                      {s.sub}
                    </span>
                    <span
                      className="flex items-center gap-2 font-medium tabular text-fg"
                      style={{
                        fontSize: "clamp(22px, 2.2vw, 28px)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      <span
                        className="inline-flex shrink-0 items-center justify-center text-fg"
                        style={{ width: "1.1em", height: "1.1em", lineHeight: 1 }}
                      >
                        {s.icon}
                      </span>
                      <span className="flex-1">{s.label}</span>
                      <span
                        aria-hidden
                        className="opacity-50 transition-transform group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <span
                  className="mono-label mb-3 block"
                  style={{ color: "var(--fg-dim)" }}
                >
                  Currently
                </span>
                <ul className="space-y-2 body-m">
                  <li className="flex items-center gap-3">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full bg-fg"
                      aria-hidden
                    />
                    <span style={{ color: "var(--fg-muted)" }}>
                      Building full-stack at Amaze Venture
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full bg-fg"
                      aria-hidden
                    />
                    <span style={{ color: "var(--fg-muted)" }}>
                      Studying system design and data modeling on the side
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full bg-fg"
                      aria-hidden
                    />
                    <span style={{ color: "var(--fg-muted)" }}>
                      Exploring RAG, MCP, and AI-first workflows
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
