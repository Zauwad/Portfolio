import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "../lib/ease";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Reveal({
  as = "div",
  delay = 0,
  y = 16,
  duration = 0.7,
  className,
  children,
  ...rest
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) return;
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
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    // Safety fallback
    const t = setTimeout(() => setVisible(true), 2000);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [reduced]);

  const MotionTag = motion[as] || motion.div;

  if (reduced) {
    return (
      <MotionTag ref={ref} className={className} {...rest}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
