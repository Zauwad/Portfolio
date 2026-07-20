import { motion } from "framer-motion";
import { Container } from "../../primitives/Container";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { StatusPulse } from "../../primitives/StatusPulse";
import { Marquee } from "../../primitives/Marquee";
import { EASE } from "../../lib/ease";

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
          className="mb-12 flex items-center justify-between md:mb-16"
        >
          <StatusPulse label="Available · 2026" variant="live" />
          <span
            className="mono-data hidden md:inline-flex"
            style={{ color: "var(--fg-dim)" }}
          >
            ✕ Dhaka, Bangladesh · UTC+6
          </span>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
          {/* Portrait — mobile first, right column on md+ */}
          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.05 }}
            className="order-1 mx-auto w-full max-w-[280px] md:order-2 md:col-span-5 md:max-w-none md:justify-self-end lg:col-span-5 lg:max-w-[360px]"
          >
            {/* Outer ring — sits behind the panel, gives the accent halo */}
            <div
              aria-hidden
              className="relative"
              style={{ padding: 14 }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.12), rgba(255,255,255,0.04) 45%, transparent 75%)",
                  filter: "blur(8px)",
                }}
              />
              {/* Gradient frame */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  padding: 1,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.02) 65%, rgba(255,255,255,0.22) 100%)",
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              <div className="relative overflow-hidden border border-border bg-[var(--bg-elev1)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.10), transparent 60%)",
                  }}
                />
                <img
                  src="/assets/MyPhoto.jpg"
                  alt="Portrait of Ridwanul Azim Zawad"
                  className="relative block h-auto w-full select-none"
                  draggable="false"
                />
              </div>
            </div>

            <figcaption
              className="mono-data mt-4 flex items-center justify-between"
              style={{ color: "var(--fg-dim)" }}
            >
              <span>✕ me</span>
              <span className="tabular">548 × 455</span>
            </figcaption>
          </motion.figure>

          {/* Copy */}
          <div className="order-2 md:order-1 md:col-span-7 lg:col-span-7">
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
          </div>
        </div>
      </Container>

      {/* Marquee at section bottom */}
      <Marquee
        items={[
          "auth",
          "payments",
          "realtime",
          "dashboards",
          "subscriptions",
          "scheduling",
          "CRUD",
          "cloud sync",
          "deploys",
        ]}
        separator="◇"
        speed={50}
      />
    </section>
  );
}
