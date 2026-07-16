import { motion } from "framer-motion";

export function Caret({ className = "" }) {
  return (
    <motion.span
      aria-hidden
      className={`inline-block h-[1em] w-[1.5px] translate-y-[2px] bg-fg ${className}`}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}
