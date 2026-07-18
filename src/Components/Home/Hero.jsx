import { motion } from "framer-motion";
import { Container } from "../../primitives/Container";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { StatusPulse } from "../../primitives/StatusPulse";
import { Marquee } from "../../primitives/Marquee";
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

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      {/* Background layers */}
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div
        className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)",
        }}
        aria-hidden
      />
      {/* Floating glyphs - positioned to not overlap text */}
      <span
        aria-hidden
        className="mono-data pointer-events-none absolute right-[3%] top-[10%] hidden text-[var(--fg-dim)] md:block"
        style={{ fontSize: 64, lineHeight: 1 }}
      >
        ∇
      </span>
      <span
        aria-hidden
        className="mono-data pointer-events-none absolute left-[3%] bottom-[12%] hidden text-[var(--fg-dim)] md:block"
        style={{ fontSize: 48, lineHeight: 1 }}
      >
        ◇
      </span>
      <span
        aria-hidden
        className="mono-data pointer-events-none absolute right-[8%] bottom-[24%] hidden text-[var(--fg-dim)] md:block"
        style={{ fontSize: 32, lineHeight: 1 }}
      >
        Σ
      </span>

      <Container size="wide" className="relative py-20 md:py-28 lg:py-36">
        {/* Top eyebrow row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 flex items-center justify-between md:mb-24"
        >
          <StatusPulse label="Available · 2026" variant="live" />
          <span
            className="mono-data hidden md:inline-flex"
            style={{ color: "var(--fg-dim)" }}
          >
            ✕ Dhaka, Bangladesh · UTC+6
          </span>
        </motion.div>

        {/* Centered content */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
          className="hero-display text-balance"
        >
          Backend that scales.
          <br />
          <span style={{ color: "var(--fg-muted)" }}>
            Frontend that feels.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          className="body-l mt-8 max-w-[58ch]"
          style={{ color: "var(--fg-muted)" }}
        >
          Ridwanul Azim Zawad — I build, ship, and design full-stack web
          products. I care about clean code, calm interfaces, and getting
          things into the hands of real users.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <PrimaryCTA variant="solid" size="lg" to="/projects">
            View Work
          </PrimaryCTA>
          <PrimaryCTA variant="outline" size="lg" to="/contacts">
            Get in touch
          </PrimaryCTA>
          <a
            href="/Ridwanul_Azim_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="mono-label ml-2 inline-flex items-center gap-2 text-[var(--fg-muted)] transition-colors hover:text-fg"
          >
            Resume <span aria-hidden>↓</span>
          </a>
        </motion.div>

        {/* Bottom proof row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 gap-6 border-t border-border pt-8 md:mt-28 md:grid-cols-4"
        >
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
              className="group flex items-center gap-3 transition-opacity hover:opacity-70"
            >
              <span
                className="inline-flex shrink-0 items-center justify-center text-fg"
                style={{
                  width: "1.1em",
                  height: "1.1em",
                  lineHeight: 1,
                }}
              >
                {s.icon}
              </span>
              <span className="flex flex-col gap-0.5 leading-tight">
                <span
                  className="inline-flex items-center gap-1.5 font-medium tabular text-fg"
                  style={{
                    fontSize: "clamp(18px, 1.8vw, 22px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.label}
                  <span
                    aria-hidden
                    className="opacity-50 transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
                <span
                  className="mono-label"
                  style={{ color: "var(--fg-dim)" }}
                >
                  {s.sub}
                </span>
              </span>
            </a>
          ))}
        </motion.div>
      </Container>

      {/* Marquee at section bottom */}
      <Marquee
        items={[
          "design →",
          "plan →",
          "build →",
          "ship",
        ]}
        separator="◇"
        speed={50}
      />
    </section>
  );
}
