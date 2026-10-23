import { useRef } from "react";
import { Link } from "react-router";
import { motion, useSpring } from "framer-motion";
import { cn } from "../../lib/utils";

export function PrimaryCTA({
  variant = "outline",
  size = "md",
  arrow = true,
  as = "button",
  to,
  href,
  className,
  children,
  magnetic = true,
  ...rest
}) {
  const btnRef = useRef(null);

  // Magnetic spring physics
  const springConfig = { damping: 15, stiffness: 180, mass: 0.2 };
  const magneticX = useSpring(0, springConfig);
  const magneticY = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!magnetic || !btnRef.current) return;
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    magneticX.set(x * 0.28);
    magneticY.set(y * 0.28);
  };

  const handleMouseLeave = () => {
    if (!magnetic) return;
    magneticX.set(0);
    magneticY.set(0);
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-xs md:px-5 md:py-2.5 md:text-sm",
    lg: "px-5 py-2.5 text-xs md:px-6 md:py-3 md:text-sm",
  };

  const base =
    "cta group/cta relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-sm font-mono uppercase tracking-[0.18em] transition-colors duration-300 select-none cursor-pointer";

  const variants = {
    outline: "border border-border-hi text-fg hover:border-fg",
    solid: "border border-fg bg-fg text-bg-base",
    ghost: "text-fg-muted hover:text-fg",
  };

  const cls = cn(base, sizes[size], variants[variant], className);

  const inner = (
    <>
      {variant === "outline" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-y-full bg-fg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-y-0"
        />
      )}
      <span
        className={cn(
          "relative z-10 flex items-center gap-2 transition-colors duration-500",
          variant === "outline" && "group-hover/cta:text-bg-base"
        )}
      >
        {children}
        {arrow && (
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover/cta:translate-x-1"
          >
            →
          </span>
        )}
      </span>
    </>
  );

  const motionProps = {
    ref: btnRef,
    style: { x: magneticX, y: magneticY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: cls,
  };

  if (as === Link || to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to || href} className={cls} {...rest}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  if (as === "a" || href) {
    return (
      <motion.a
        href={href}
        {...motionProps}
        {...rest}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      {...motionProps}
      {...rest}
    >
      {inner}
    </motion.button>
  );
}