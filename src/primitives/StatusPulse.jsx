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
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
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
