import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../../lib/utils";

export function MagneticButton({
  children,
  strength = 0.25,
  className,
  as = "button",
  ...rest
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * strength);
    y.set(my * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = motion[as] || motion.button;

  return (
    <MotionTag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function PrimaryCTA({
  variant = "outline",
  size = "md",
  arrow = true,
  className,
  children,
  ...rest
}) {
  const sizes = {
    sm: "px-3 py-1.5 text-[12px]",
    md: "px-5 py-2.5 text-[13px]",
    lg: "px-6 py-3 text-[13px]",
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-sm font-mono uppercase tracking-[0.18em] transition-colors duration-300 select-none";

  const variants = {
    outline:
      "border border-[var(--border-hi)] text-fg hover:border-fg",
    solid: "border border-fg bg-fg text-[var(--bg-base)]",
    ghost: "text-fg-muted hover:text-fg",
  };

  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {variant === "outline" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-y-full bg-fg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
        />
      )}
      <span
        className={cn(
          "relative z-10 flex items-center gap-2 transition-colors duration-500",
          variant === "outline" && "group-hover:text-[var(--bg-base)]"
        )}
      >
        {children}
        {arrow && <span aria-hidden>→</span>}
      </span>
    </button>
  );
}
