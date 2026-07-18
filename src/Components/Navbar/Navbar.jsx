import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollPast } from "../../hooks/useScrollPast";
import { BrandMark } from "../../primitives/BrandMark";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { Kbd } from "../../primitives/Kbd";
import { AnchorNavLink } from "../../primitives/AnchorNavLink";
import { NAV_ITEMS } from "../../lib/content";
import { cn } from "../../../lib/utils";

export default function Navbar({ onOpenPalette }) {
  const scrolled = useScrollPast(12);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
          backgroundColor: scrolled
            ? "rgba(8,8,11,0.7)"
            : "rgba(8,8,11,0)",
          borderColor: scrolled
            ? "var(--border)"
            : "rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 border-b"
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-10">
          <div className="flex items-center gap-8">
            <BrandMark size="md" />
            <nav className="hidden items-center gap-1 md:flex">
              {NAV_ITEMS.map((item) => {
                const isAnchor = item.to.startsWith("/#");
                const baseCls =
                  "rounded-sm px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 text-[var(--fg-muted)] hover:text-fg";
                if (isAnchor) {
                  return (
                    <AnchorNavLink
                      key={item.id}
                      to={item.to}
                      className={baseCls}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </AnchorNavLink>
                  );
                }
                return (
                  <NavLink
                    key={item.id}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(baseCls, isActive && "text-fg")
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={onOpenPalette}
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-[var(--bg-elev1)] px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-muted)] transition-colors duration-300 hover:border-[var(--border-hi)] hover:text-fg"
              aria-label="Open command palette"
            >
              <span>Search</span>
              <Kbd>⌘K</Kbd>
            </button>
            <PrimaryCTA variant="outline" size="sm" arrow={false} to="/contacts">
              Get in touch
            </PrimaryCTA>
          </div>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-border md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-full bg-fg transition-all duration-300",
                  open && "translate-y-[6px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-fg transition-all duration-300",
                  open && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px w-full bg-fg transition-all duration-300",
                  open && "-translate-y-[6px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[var(--bg-base)]/80 backdrop-blur-md md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-border bg-[var(--bg-base)] px-6 pb-8 pt-24"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                  const isAnchor = item.to.startsWith("/#");
                  const baseCls = cn(
                    "block border-b border-border px-2 py-4 text-[28px] font-medium tracking-tight transition-colors",
                    !isAnchor &&
                      (location.pathname === item.to
                        ? "text-fg"
                        : "text-[var(--fg-muted)]")
                  );
                  if (isAnchor) {
                    return (
                      <AnchorNavLink
                        key={item.id}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block border-b border-border px-2 py-4 text-[28px] font-medium tracking-tight transition-colors text-[var(--fg-muted)] hover:text-fg"
                        )}
                      >
                        {item.label}
                      </AnchorNavLink>
                    );
                  }
                  return (
                    <NavLink
                      key={item.id}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={baseCls}
                    >
                      {item.label}
                    </NavLink>
                  );
                })}
              </nav>
              <div className="mt-8 flex items-center justify-between">
                <span className="mono-label" style={{ color: "var(--fg-dim)" }}>
                  v2026
                </span>
                <PrimaryCTA
                  variant="outline"
                  size="sm"
                  to="/contacts"
                  onClick={() => setOpen(false)}
                >
                  Get in touch
                </PrimaryCTA>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}