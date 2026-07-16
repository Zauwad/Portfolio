import { motion } from "framer-motion";
import { useTypewriter } from "../../hooks/useTypewriter";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { Container } from "../../primitives/Container";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { StatusPulse } from "../../primitives/StatusPulse";
import { Caret } from "../../primitives/Caret";
import { Marquee } from "../../primitives/Marquee";
import { EASE } from "../../lib/ease";
import { Link } from "react-router";

const TYPED_LINES = [
  "ship for the web.",
  "design calm interfaces.",
  "build the right thing.",
  "care about the details.",
];

export default function Hero() {
  const reduced = useReducedMotion();
  const text = useTypewriter(
    TYPED_LINES[0],
    reduced ? 0 : 14,
    reduced ? 0 : 400
  );

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
          className="hero-display max-w-[18ch] text-balance"
        >
          I build products that{" "}
          <span style={{ color: "var(--fg-muted)" }}>
            {text}
            {!reduced && <Caret className="ml-1" />}
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
          <Link to="/projects">
            <PrimaryCTA variant="solid" size="lg">
              View Work
            </PrimaryCTA>
          </Link>
          <Link to="/contacts">
            <PrimaryCTA variant="outline" size="lg">
              Get in touch
            </PrimaryCTA>
          </Link>
          <a
            href="/Ridwanul_Azim_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="mono-label ml-2 inline-flex items-center gap-2 text-[var(--fg-muted)] transition-colors hover:text-fg"
          >
            Resume <span aria-hidden>↓</span>
          </a>
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 gap-6 border-t border-border pt-8 md:mt-28 md:grid-cols-4"
        >
          {[
            { k: "5+", v: "Projects shipped" },
            { k: "500+", v: "Production users" },
            { k: "1.5y", v: "Building on the web" },
            { k: "14+", v: "Stack pieces" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span
                className="tabular font-medium"
                style={{
                  fontSize: "clamp(28px, 3vw, 40px)",
                  letterSpacing: "-0.03em",
                  color: "var(--fg)",
                }}
              >
                {s.k}
              </span>
              <span className="mono-label" style={{ color: "var(--fg-dim)" }}>
                {s.v}
              </span>
            </div>
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
