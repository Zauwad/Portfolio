import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Container } from "../../primitives/Container";
import { AnchorNavLink } from "../../primitives/AnchorNavLink";
import { SOCIALS } from "../../lib/content";

const EXPLORE_LINKS = [
  { label: "Works", to: "/projects", tag: "01" },
  { label: "About", to: "/about", tag: "02" },
  { label: "Stack", to: "/stack", tag: "03" },
  { label: "Contact", to: "/contacts", tag: "04" },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("redwanulazimzawad@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative isolate overflow-hidden border-t border-border bg-[var(--bg-base)]">
      {/* Subtle architectural curvature glow rim */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 left-1/2 h-[100px] w-full max-w-[1200px] -translate-x-1/2 rounded-[100%] opacity-40 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse 75% 100% at 50% 0%, var(--accent-glow), transparent 75%)",
        }}
      />

      <Container size="wide" className="pt-16 pb-12 md:pt-20 md:pb-16">
        {/* Main 3-column designer layout */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Column 1: Manifesto / Bold Statement (6 cols) */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>


              <h2
                className="display text-fg text-balance font-medium leading-[1.04]"
                style={{ fontSize: "clamp(34px, 4.4vw, 58px)" }}
              >
                Independent thinking.
                <br />
                <span className="font-serif italic text-[var(--fg-muted)]">
                  Connected execution.
                </span>
              </h2>

              <p className="body-l mt-6 max-w-[46ch] text-[var(--fg-muted)] leading-relaxed">
                Production-grade web architecture, resilient backend infrastructure, and calm,
                considered interfaces. Designed to last and built to scale.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3 font-mono text-[11px] text-[var(--fg-dim)]">
              <span>✕ Available worldwide</span>
              <span>·</span>
              <span className="tabular">Dhaka (UTC+6)</span>
            </div>
          </div>

          {/* Column 2: Explore / Sitemap (3 cols) */}
          <div className="lg:col-span-3">
            <span className="mono-label mb-6 block text-[var(--fg-dim)]">
              EXPLORE
            </span>
            <ul className="space-y-3.5">
              {EXPLORE_LINKS.map((item) => {
                const isAnchor = item.to.startsWith("/#");
                const inner = (
                  <span className="group/item flex items-center justify-between py-1 text-[16px] text-[var(--fg-muted)] transition-colors hover:text-fg">
                    <span className="group-hover/item:translate-x-1 transition-transform duration-300">
                      {item.label}
                    </span>
                    <span className="font-mono text-[11px] text-[var(--fg-dim)] opacity-60 group-hover/item:opacity-100">
                      {item.tag} →
                    </span>
                  </span>
                );

                return (
                  <li key={item.label} className="border-b border-border/50 pb-1">
                    {isAnchor ? (
                      <AnchorNavLink to={item.to} className="block">
                        {inner}
                      </AnchorNavLink>
                    ) : (
                      <Link to={item.to} className="block">
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Direct Contact & Inquiries (3 cols) */}
          <div className="flex flex-col justify-between lg:col-span-3">
            <div>
              <span className="mono-label mb-6 block text-[var(--fg-dim)]">
                DIRECT INQUIRY
              </span>

              {/* Direct interactive email link */}
              <div className="group/email mb-6">
                <a
                  href="mailto:redwanulazimzawad@gmail.com"
                  className="block break-all font-mono text-[15px] font-medium text-fg underline decoration-border-hi underline-offset-4 transition-colors hover:text-accent hover:decoration-fg"
                >
                  redwanulazimzawad@gmail.com ↗
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="mono-micro mt-2 inline-flex items-center gap-1.5 text-[var(--fg-dim)] transition-colors hover:text-fg"
                >
                  <span>{copied ? "✓ Copied to clipboard" : "Copy email address"}</span>
                </button>
              </div>

              <p className="body-s text-[var(--fg-muted)] leading-relaxed">
                Dhaka · Bangladesh.
                <br />
                Working with remote teams and product founders across time zones.
              </p>
            </div>

            {/* Social pills */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {SOCIALS.filter((s) => s.id !== "email").map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mono-label rounded-sm border border-border bg-[var(--bg-elev1)] px-3 py-1.5 text-[11px] text-[var(--fg-muted)] transition-all duration-300 hover:border-border-hi hover:bg-[var(--bg-elev2)] hover:text-fg"
                >
                  {s.label} ↗
                </a>
              ))}
              <a
                href="/Ridwanul_Azim_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="mono-label rounded-sm border border-border bg-[var(--bg-elev1)] px-3 py-1.5 text-[11px] text-[var(--fg-muted)] transition-all duration-300 hover:border-border-hi hover:bg-[var(--bg-elev2)] hover:text-fg"
              >
                Resume ↓
              </a>
            </div>
          </div>
        </div>

        {/* Monumental Watermark Display Typography (The Apricode signature effect - Double line on all devices) */}
        <div className="pointer-events-none mt-16 md:mt-24 select-none overflow-hidden border-t border-border/40 pt-10 pb-2">
          <div className="footer-watermark flex flex-col items-center justify-center text-center font-serif text-[11vw] font-bold uppercase tracking-tight leading-none text-fg opacity-[0.06] transition-all duration-500">
            <span className="block">RIDWANUL</span>
            <span className="block">AZIM</span>
          </div>
        </div>

        {/* Bottom architecture metadata bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--fg-dim)] md:flex-row">
          <div>
            <span>© ALL RIGHTS RESERVED</span>
          </div>

          <div className="hidden items-center gap-2 md:flex">
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[var(--fg-muted)] transition-colors hover:text-fg"
          >
            <span>BACK TO TOP</span>
            <span className="transition-transform duration-300 group-hover:-translate-y-1">
              ↑
            </span>
            <span className="tabular font-mono text-[10px] text-[var(--fg-dim)]">[01]</span>
          </button>
        </div>
      </Container>
    </footer>
  );
}
