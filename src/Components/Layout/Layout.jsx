import { useState, useEffect, useLayoutEffect } from "react";
import { useOutlet, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CommandPalette from "../CommandPalette/CommandPalette";
import { CustomCursor } from "../../primitives/CustomCursor";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { NavigationProvider, useNavigationStatus } from "../../context/NavigationContext";

function LayoutContent({ paletteOpen, setPaletteOpen, location, outlet, reduced }) {
  const { isRouteChange } = useNavigationStatus();

  return (
    <div className="flex min-h-[100svh] flex-col overflow-x-clip bg-bg-base text-fg selection:bg-fg selection:text-bg-base">
      <CustomCursor />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <main className="flex-1 pt-20 md:pt-24">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={isRouteChange && !reduced ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: -10 }}
            transition={{
              duration: reduced ? 0 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full flex-1"
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
    </div>
  );
}

export default function Layout() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const location = useLocation();
  const outlet = useOutlet();
  const reduced = useReducedMotion();

  // Initialize smooth inertia scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });
    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  // Ensure scroll is immediately reset to top on route change
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <NavigationProvider>
      <LayoutContent
        paletteOpen={paletteOpen}
        setPaletteOpen={setPaletteOpen}
        location={location}
        outlet={outlet}
        reduced={reduced}
      />
    </NavigationProvider>
  );
}
