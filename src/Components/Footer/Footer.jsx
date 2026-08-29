import { Link } from "react-router";
import { Container } from "../../primitives/Container";
import { BrandMark } from "../../primitives/BrandMark";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { StatusPulse } from "../../primitives/StatusPulse";
import { Reveal } from "../../primitives/Reveal";
import { AnchorNavLink } from "../../primitives/AnchorNavLink";
import { SOCIALS } from "../../lib/content";

const FOOTER_NAV = [
  { label: "Works", to: "/projects" },
  { label: "About", to: "/#about" },
  { label: "Stack", to: "/#stack" },
  { label: "Contact", to: "/contacts" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border bg-[var(--bg-base)]">
      <Container size="wide" className="py-20 md:py-28">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-10">
          {/* Brand column */}
          <div className="md:col-span-5">
            <BrandMark size="lg" showTag={false} asLink={false} />
            <Reveal delay={0.05}>
              <p
                className="body-l mt-6 max-w-[42ch]"
                style={{ color: "var(--fg-muted)" }}
              >
                Full-stack engineer building platforms. Open to roles — based in Bangladesh.
              </p>
            </Reveal>
            <div className="mt-8">
              <StatusPulse
                label="Available for new projects · 2026"
                variant="live"
              />
            </div>
          </div>

          {/* Nav column */}
          <div className="md:col-span-3">
            <span
              className="mono-label mb-6 block"
              style={{ color: "var(--fg-dim)" }}
            >
              Index
            </span>
            <ul className="space-y-3">
              {FOOTER_NAV.map((item, i) => {
                const isAnchor = item.to.startsWith("/#");
                const inner = (
                  <>
                    <span>{item.label}</span>
                    <span
                      aria-hidden
                      className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </>
                );
                return (
                  <Reveal key={item.label} delay={0.05 + i * 0.05} as="li">
                    {isAnchor ? (
                      <AnchorNavLink
                        to={item.to}
                        className="group inline-flex items-center gap-2 text-[15px] text-fg-muted transition-colors hover:text-fg"
                      >
                        {inner}
                      </AnchorNavLink>
                    ) : (
                      <Link
                        to={item.to}
                        className="group inline-flex items-center gap-2 text-[15px] text-fg-muted transition-colors hover:text-fg"
                      >
                        {inner}
                      </Link>
                    )}
                  </Reveal>
                );
              })}
            </ul>
          </div>

          {/* CTA column */}
          <div className="md:col-span-4">
            <span
              className="mono-label mb-6 block"
              style={{ color: "var(--fg-dim)" }}
            >
              Start a project
            </span>
            <Reveal delay={0.05}>
              <p
                className="body-l mb-6"
                style={{ color: "var(--fg-muted)" }}
              >
                Have an idea worth building? Let's make it precise, performant,
                and shipped.
              </p>
            </Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <PrimaryCTA variant="solid" size="md" href="mailto:redwanulazimzawad@gmail.com">
                Begin →
              </PrimaryCTA>
              <a
                href="/Ridwanul_Azim_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted transition-colors hover:text-fg"
              >
                Resume ↓
              </a>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-center">
          <div
            className="mono-data flex flex-wrap items-center gap-x-4 gap-y-2"
            style={{ color: "var(--fg-dim)" }}
          >
            <span>© {year} Ridwanul Azim Zawad</span>
            <span aria-hidden>·</span>
            <span>Built with React, ShadCN, Framer Motion</span>
            <span aria-hidden>·</span>
            <span>Dhaka, Bangladesh</span>
          </div>
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="mono-label border border-border bg-[var(--bg-elev1)] px-3 py-1.5 text-[var(--fg-muted)] transition-colors duration-300 hover:border-[var(--border-hi)] hover:text-fg"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
