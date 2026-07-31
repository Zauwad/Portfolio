import { motion } from "framer-motion";

export function StatusPulse({
  label,
  variant = "live",
  size = 8,
  className = "",
}) {
  const dotColor = {
    live: "bg-fg",
    idle: "bg-[var(--fg-muted)]",
    error: "bg-[var(--fg-dim)]",
  }[variant];

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative inline-flex" style={{ width: size, height: size }}>
        <span
          className={`absolute inset-0 rounded-full ${dotColor}`}
          aria-hidden
        />
        {variant === "live" && (
          <motion.span
            className="absolute inset-0 rounded-full bg-fg/60"
            /* ponytail: scale 3.2 and 0.75 opacity for fuller pulse radius */
            animate={{ scale: [1, 3.2, 3.2], opacity: [0.75, 0, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              times: [0, 0.75, 1],
              ease: "easeOut",
            }}
            aria-hidden
          />
        )}
      </span>
      {label && (
        <span
          className="mono-label"
          style={{ color: "var(--fg-muted)" }}
        >
          {label}
        </span>
      )}
    </span>
  );
}
