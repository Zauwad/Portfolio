import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { EASE } from "../lib/ease";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Card({
  as = "div",
  hover = true,
  className,
  children,
  size = "md",
  delay = 0,
  ...rest
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const padding = size === "lg" ? "p-7 md:p-9" : "p-6 md:p-7";
  const MotionTag = motion[as] || motion.div;

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    const t = setTimeout(() => setVisible(true), 2000);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [reduced]);

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileHover={hover && visible ? { y: -2 } : undefined}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={cn(
        "group relative flex flex-col gap-6 border border-border bg-[var(--bg-elev1)]",
        "transition-colors duration-500 hover:border-[var(--border-hi)]",
        padding,
        className
      )}
      {...rest}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-5 top-5 font-mono text-[14px] text-[var(--fg-dim)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      >
        →
      </span>
      {children}
    </MotionTag>
  );
}
