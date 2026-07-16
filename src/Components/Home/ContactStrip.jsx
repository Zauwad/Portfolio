import { Link } from "react-router";
import { motion } from "framer-motion";
import { Container } from "../../primitives/Container";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { StatusPulse } from "../../primitives/StatusPulse";
import { EASE } from "../../lib/ease";

export default function ContactStrip() {
  return (
    <section className="relative border-t border-border py-24 md:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)",
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
              <span
                className="mono-label mb-6 inline-block"
                style={{ color: "var(--fg-dim)" }}
              >
                ✉ Get in touch
              </span>
              <h2
                className="h2 max-w-[14ch] text-balance"
                style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
              >
                Have something{" "}
                <span style={{ color: "var(--fg-muted)" }}>worth shipping?</span>
              </h2>
              <p
                className="body-l mt-8 max-w-[55ch]"
                style={{ color: "var(--fg-muted)" }}
              >
                Have a project, an idea, or just want to talk shop? I read every
                message and usually reply within a day.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col items-start gap-6 md:col-span-4 md:items-end md:justify-end">
            <StatusPulse label="Replying within 24h" variant="live" />
            <Link to="/contacts">
              <PrimaryCTA variant="solid" size="lg">
                Open the conversation →
              </PrimaryCTA>
            </Link>
            <a
              href="mailto:redwanulazimzawad@gmail.com"
              className="mono-label text-[var(--fg-muted)] transition-colors hover:text-fg"
            >
              redwanulazimzawad@gmail.com ↗
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
