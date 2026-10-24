import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "../../primitives/Container";
import { SectionHeading } from "../../primitives/SectionHeading";
import { Reveal } from "../../primitives/Reveal";
import { EASE } from "../../lib/ease";
import { SvgSignature } from "../../primitives/SvgSignature";
import { TiltCard } from "../../primitives/TiltCard";
import amazeLogo from "../../../assets/A Maze Venture.png";

const ICONS = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-10 w-10 md:h-12 md:w-12 transition-transform duration-300 group-hover:scale-110">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.16c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14v3.18c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-10 w-10 md:h-12 md:w-12 transition-transform duration-300 group-hover:scale-110">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
};

function ScrubbedWord({ word, progress, range, isLead }) {
  const opacity = useTransform(progress, range, [0.38, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.28em] transition-opacity duration-100 ${
        isLead ? "text-fg font-medium" : "text-fg-muted"
      }`}
    >
      {word}
    </motion.span>
  );
}

function ScrubbedBioParagraph({ lead, body }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 88%", "start 48%"],
  });

  const leadWords = lead.split(" ");
  const bodyWords = body.split(" ");
  const allWords = [...leadWords, ...bodyWords];

  return (
    <p ref={targetRef} className="body-l leading-relaxed text-balance">
      {allWords.map((word, idx) => {
        const start = idx / allWords.length;
        const end = Math.min(1, start + 1.2 / allWords.length);
        const isLead = idx < leadWords.length;
        return (
          <ScrubbedWord
            key={idx}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
            isLead={isLead}
          />
        );
      })}
    </p>
  );
}

const ABOUT_PARAGRAPHS = [
  {
    lead: "I build backend systems and web applications.",
    body: "Backend-first by habit. I define data models and API contracts before touching UI layouts. Most of my work centers on database schemas, server architecture, and clean integration boundaries.",
  },
  {
    lead: "Frontend craft.",
    body: "The interface is where the system meets the user. I focus on clear typography, accessible markup, and smooth transitions that reflect underlying state.",
  },
  {
    lead: "AI in development.",
    body: "I use AI tools daily to catch edge cases, accelerate refactoring, and draft tests for unfamiliar APIs.",
  },
  {
    lead: "Proudest build so far.",
    body: "PettyCash won 2nd place at an internal hackathon. An enterprise operations management platform for employee requisitions, leave management, approval workflows, team administration, delegation, notifications, and organizational analytics.",
  },
];

export default function About({ showTopBorder = true }) {
  return (
    <section
      id="about"
      className={`relative py-20 md:py-28 ${showTopBorder ? "border-t border-border" : ""}`}
    >
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <Container size="default" className="relative">
        <SectionHeading
          eyebrow="About"
          title="Backend first,"
          muted="frontend by love."
          body="A short, honest read on how I think, what I care about, and how I work."
        />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          {/* Left: bio paragraphs with scroll-scrubbed reading highlight */}
          <div className="md:col-span-7">
            <div className="space-y-6 md:space-y-7">
              {ABOUT_PARAGRAPHS.map((p, i) => (
                <ScrubbedBioParagraph key={i} lead={p.lead} body={p.body} />
              ))}
            </div>

            <Reveal delay={0.3} className="mt-8 md:mt-10">
              <div className="flex flex-wrap gap-2.5 md:gap-3">
                {[
                  "Calm under pressure",
                  "Accountability",
                  "Async-first",
                  "English · বাংলা",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="mono-label rounded-sm border border-border bg-elev1 px-3 py-1.5 text-fg-muted text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Recipe 7: SVG Signature Handwriting Draw */}
            <Reveal delay={0.4} className="mt-10 md:mt-12">
              <SvgSignature />
            </Reveal>
          </div>

          {/* Right: stats card with Recipe 10 3D Tilt */}
          <div className="md:col-span-5">
            <TiltCard maxTilt={8}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.9, ease: EASE }}
                className="relative border border-border bg-elev1 p-5 md:p-8 rounded-xl shadow-lg"
              >
                <span className="mono-label absolute right-5 top-5 text-fg-dim">
                  Current Focus
                </span>
                <h3
                  className="h3-card text-fg"
                  style={{ fontSize: "clamp(20px, 1.6vw, 24px)" }}
                >
                  Where I am right now
                </h3>

                <div className="mt-6 md:mt-8 grid grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
                  {/* Row 1: Amaze Venture — full width */}
                  <a
                    href="/contacts"
                    className="group col-span-2 flex flex-col items-center justify-center gap-2.5 md:gap-3 bg-elev1 p-6 md:p-8 transition-colors hover:bg-elev2"
                  >
                    <img
                      src={amazeLogo}
                      alt="Amaze Venture"
                      className="h-9 w-auto max-w-full shrink-0 dark:brightness-0 dark:invert opacity-90 md:h-12 transition-all"
                    />
                    <span className="mono-label text-fg-muted text-center">
                      Associate Software Engineer
                    </span>
                  </a>

                  {/* Row 2: github + linkedin — logo only, centered */}
                  {[
                    {
                      href: "https://github.com/Zauwad",
                      external: true,
                      icon: ICONS.github,
                      label: "GitHub",
                    },
                    {
                      href: "https://www.linkedin.com/in/ridwanul-azim-zawad",
                      external: true,
                      icon: ICONS.linkedin,
                      label: "LinkedIn",
                    },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="group flex items-center justify-center bg-elev1 p-6 md:p-8 transition-colors hover:bg-elev2"
                    >
                      <span className="flex items-center justify-center text-fg">
                        {s.icon}
                      </span>
                    </a>
                  ))}
                </div>

                <div className="mt-6 md:mt-8 border-t border-border pt-5 md:pt-6">
                  <span className="mono-label mb-3 block text-fg-dim">
                    Currently
                  </span>
                  <ul className="space-y-2 body-m">
                    <li className="flex items-center gap-3">
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-fg"
                        aria-hidden
                      />
                      <span className="text-fg-muted text-sm md:text-base">
                        Building full-stack at Amaze Venture
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-fg"
                        aria-hidden
                      />
                      <span className="text-fg-muted text-sm md:text-base">
                        Studying system design and data modeling on the side
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-fg"
                        aria-hidden
                      />
                      <span className="text-fg-muted text-sm md:text-base">
                        Exploring RAG, MCP, and AI-first workflows
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </TiltCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
