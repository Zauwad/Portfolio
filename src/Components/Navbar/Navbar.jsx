import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollPast } from "../../hooks/useScrollPast";
import { BrandMark } from "../../primitives/BrandMark";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";
import { Kbd } from "../../primitives/Kbd";
import { AnchorNavLink } from "../../primitives/AnchorNavLink";
import { NAV_ITEMS } from "../../lib/content";
import { cn } from "../../../lib/utils";
import { ToggleTheme } from "../lightswind/toggle-theme";

export default function Navbar({ onOpenPalette }) {
  const scrolled = useScrollPast(12);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const location = useLocation();

  // Smoothly glide up on intentional scroll down, return smoothly on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Only hide after scrolling past 160px with deliberate downward movement
      if (currentScrollY > 160 && currentScrollY > lastScrollY + 10) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY - 8 || currentScrollY <= 80) {
        setHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHidden = hidden && !open;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: isHidden ? -100 : 0, opacity: isHidden ? 0 : 1 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-x-0 top-3 md:top-4 z-50 px-3 md:px-8 pointer-events-none"
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1360px] items-center justify-between rounded-md border px-4 py-2.5 md:px-7 md:py-2.5 transition-all duration-300 pointer-events-auto",
            scrolled
              ? "border-border-hi bg-bg-base/90 backdrop-blur-md shadow-lg shadow-black/[0.04]"
              : "border-border/80 bg-bg-base/75 backdrop-blur-md shadow-sm"
          )}
        >
          <div className="flex items-center gap-8">
            <BrandMark size="md" />
            <nav
              className="hidden items-center gap-1 md:flex"
              onMouseLeave={() => setHoveredNav(null)}
            >
              {NAV_ITEMS.map((item) => {
                const isHovered = hoveredNav === item.id;
                const baseCls =
                  "relative rounded-sm px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 text-fg-muted hover:text-fg";

                return (
                  <NavLink
                    key={item.id}
                    to={item.to}
                    onMouseEnter={() => setHoveredNav(item.id)}
                    className={({ isActive }) =>
                      cn(baseCls, isActive && "text-fg font-medium")
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="relative z-10">{item.label}</span>
                        {(isHovered || (isActive && !hoveredNav)) && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-sm bg-elev2 border border-border-hi shadow-sm"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* ponytail: single flex container handles mobile and desktop header actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={onOpenPalette}
              className="hidden items-center gap-2 rounded-sm border border-border bg-elev1 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted transition-colors duration-300 hover:border-border-hi hover:text-fg md:inline-flex"
              aria-label="Open command palette"
            >
              <span>Search</span>
              <Kbd>⌘K</Kbd>
            </button>
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-elev1 text-fg-muted transition-colors duration-300 hover:border-border-hi hover:text-fg md:h-[34px] md:w-[34px]">
              <ToggleTheme animationType="circle-spread" duration={600} />
            </div>
            <div className="hidden md:block">
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
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg-base/80 backdrop-blur-md md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-border bg-bg-base px-6 pb-8 pt-24"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "block border-b border-border px-2 py-3.5 text-2xl font-medium tracking-tight transition-colors",
                        isActive ? "text-fg font-semibold" : "text-fg-muted hover:text-fg"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onOpenPalette?.();
                  }}
                  className="flex items-center justify-between border-b border-border px-2 py-3.5 text-left font-mono text-xs uppercase tracking-[0.2em] text-fg-muted hover:text-fg transition-colors"
                >
                  <span>Quick Search / Jump</span>
                  <Kbd>⌘K</Kbd>
                </button>
              </nav>
              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="mono-label text-fg-dim text-xs">
                  Portfolio · Ridwanul
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