import { motion } from "framer-motion";
import { Container } from "../../primitives/Container";
import { SectionHeading } from "../../primitives/SectionHeading";
import { Reveal } from "../../primitives/Reveal";
import { EASE } from "../../lib/ease";
import { CountUp } from "../../primitives/CountUp";

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

              <dl className="mt-8 grid grid-cols-2 gap-px bg-border">
                {[
                  { k: "Projects shipped", to: 5, suf: "+" },
                  { k: "Users reached", to: 500, suf: "+" },
                  { k: "Years building", to: 1.5, suf: "", dec: true },
                  { k: "Stack pieces", to: 14, suf: "+" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 bg-[var(--bg-elev1)] p-5"
                  >
                    <dt
                      className="mono-label"
                      style={{ color: "var(--fg-dim)" }}
                    >
                      {s.k}
                    </dt>
                    <dd
                      className="tabular font-medium"
                      style={{
                        fontSize: "clamp(32px, 3.5vw, 44px)",
                        letterSpacing: "-0.03em",
                        color: "var(--fg)",
                      }}
                    >
                      <CountUp
                        to={s.to}
                        suffix={s.suf}
                        format={s.dec ? (n) => n.toFixed(1) : undefined}
                      />
                    </dd>
                  </div>
                ))}
              </dl>

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
