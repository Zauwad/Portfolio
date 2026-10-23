import { motion } from "framer-motion";
import { Container } from "../../primitives/Container";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { StatusPulse } from "../../primitives/StatusPulse";
import { EASE } from "../../lib/ease";

export default function ContactStrip() {
  return (
    <section className="relative border-t border-border py-16 md:py-24 lg:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--accent-glow), transparent 70%)",
        }}
        aria-hidden
      />
      <Container size="default" className="relative">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1, ease: EASE }}
            >
              <span className="mono-label mb-4 md:mb-6 inline-block text-fg-dim text-xs">
                ✉ Get in touch
              </span>
              <h2
                className="h2 max-w-[14ch] text-balance font-medium leading-[1.05]"
                style={{ fontSize: "clamp(36px, 5.5vw, 76px)" }}
              >
                Have something{" "}
                <span className="text-fg-muted font-serif italic">worth shipping?</span>
              </h2>
              <p className="body-l mt-4 md:mt-6 max-w-[55ch] text-fg-muted">
                <span className="md:hidden">Have a project or idea? I read every message and reply within a day.</span>
                <span className="hidden md:inline">Have a project, an idea, or just want to talk? I read every message and usually reply within a day.</span>
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col items-start gap-5 md:col-span-4 md:items-end md:justify-end">
            <StatusPulse label="Replying within 24h" variant="live" />
            <PrimaryCTA variant="solid" size="lg" to="/contacts">
              Open the conversation →
            </PrimaryCTA>
            <a
              href="mailto:redwanulazimzawad@gmail.com"
              className="mono-label text-xs text-fg-muted transition-colors hover:text-accent"
            >
              redwanulazimzawad@gmail.com ↗
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
