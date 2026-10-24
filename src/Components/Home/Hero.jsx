import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "../../primitives/Container";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { StatusPulse } from "../../primitives/StatusPulse";
import { Marquee } from "../../primitives/Marquee";
import { ParticleField } from "../../primitives/ParticleField";
import { TiltCard } from "../../primitives/TiltCard";
import { EASE } from "../../lib/ease";

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={heroRef} className="relative isolate overflow-hidden border-b border-border">
      {/* Interactive 3D space dust particles */}
      <ParticleField />

      {/* Background layers */}
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--accent-glow), transparent 70%)",
        }}
        aria-hidden
      />


      <Container size="wide" className="relative py-20 md:py-28 lg:py-36">
        {/* Top editorial index row - calm, non-needy, museum-grade */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-fg-dim md:mb-14"
        >
          <span className="inline-flex items-center gap-2">
            <span>DHAKA <span className="hidden sm:inline">· BANGLADESH</span></span>
            <span aria-hidden>·</span>
            <span className="tabular">UTC+6</span>
          </span>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-10 lg:gap-16">
          {/* Portrait with 3D Holographic Perspective Tilt */}
          <motion.figure
            style={{ y: portraitY }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.05 }}
            className="order-1 mx-auto w-full max-w-[260px] md:order-2 md:col-span-5 md:max-w-none md:justify-self-end lg:col-span-5 lg:max-w-[360px]"
          >
            {/* Outer ring — sits behind the panel, gives the accent halo */}
            <div
              className="relative p-2.5 md:p-3.5"
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
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 block dark:hidden"
                style={{
                  padding: 1,
                  background:
                    "linear-gradient(135deg, rgba(15,23,42,0.22) 0%, rgba(15,23,42,0.06) 35%, rgba(15,23,42,0.02) 65%, rgba(15,23,42,0.16) 100%)",
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              {/* Photo with 3D tilt only, outer borders stay completely static */}
              <TiltCard maxTilt={8} glare={false}>
                <div className="relative overflow-hidden border border-border bg-elev1">
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
              </TiltCard>
            </div>


          </motion.figure>

          {/* Copy with Masked Editorial Line Reveals & Scroll Parallax */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="order-2 md:order-1 md:col-span-7 lg:col-span-7"
          >
            <h1 className="hero-display text-balance">
              <span className="block overflow-hidden py-1">
                <motion.span
                  className="block"
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                  Backend that scales.
                </motion.span>
              </span>
              <span className="block overflow-hidden py-1">
                <motion.span
                  className="block text-fg-muted font-serif italic"
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                >
                  Frontend that feels.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
              className="body-l mt-6 md:mt-8 max-w-[58ch] text-fg-muted leading-relaxed"
            >
              <span className="md:hidden">
                I build and ship products with clean code, calm interfaces, and resilient performance.
              </span>
              <span className="hidden md:inline">
                Ridwanul Azim Zawad — I build, ship, and design
                products. I care about clean code, calm interfaces, and getting
                things into the hands of real users.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
              className="mt-8 md:mt-12 flex flex-wrap items-center gap-3"
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
                className="mono-label ml-2 inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-fg text-xs"
              >
                Resume <span aria-hidden>↓</span>
              </a>
            </motion.div>
          </motion.div>
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
