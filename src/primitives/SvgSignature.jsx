import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * Recipe 7: SVG Signature / Handwriting Draw
 * Specifically handcrafted to fluidly spell "Ridwanul Azim" in cursive calligraphy.
 */
export function SvgSignature({ className, showLabel = true }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className={cn("inline-flex flex-col items-start gap-2", className)}>
      <svg
        viewBox="0 0 350 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-18 w-auto max-w-[320px] text-fg select-none"
        aria-label="Handwritten signature of Ridwanul Azim"
      >
        {/* "Ridwanul" flowing cursive stroke */}
        <motion.path
          d="M 22 56 C 22 36, 24 22, 28 14 C 34 11, 44 13, 46 22 C 48 30, 42 36, 32 37 C 37 40, 44 47, 50 56 C 53 50, 56 40, 60 38 C 63 39, 64 48, 66 54 C 69 46, 73 38, 78 38 C 83 38, 84 45, 84 54 C 84 35, 86 16, 89 12 C 88 25, 87 44, 91 54 C 94 46, 98 40, 102 46 C 104 51, 108 40, 112 44 C 115 50, 118 53, 122 51 C 125 43, 129 39, 134 39 C 139 39, 140 45, 140 53 C 140 45, 142 41, 146 51 C 149 42, 153 41, 156 51 C 159 42, 163 41, 167 51 C 170 43, 173 41, 175 49 C 177 53, 180 43, 183 51 C 186 39, 191 18, 195 14 C 192 25, 191 44, 197 53"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* "Azim" flowing cursive stroke */}
        <motion.path
          d="M 215 54 C 221 36, 227 18, 233 14 C 237 24, 241 42, 245 54 M 221 38 Q 233 34 243 38 C 248 45, 254 40, 258 44 C 261 48, 256 56, 252 64 C 248 70, 256 68, 262 54 C 265 44, 269 40, 272 51 C 275 43, 279 41, 282 51 C 285 43, 289 41, 293 51 C 296 43, 300 41, 304 51"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Dots for the two 'i's */}
        <motion.circle
          cx="62"
          cy="28"
          r="2.2"
          fill="currentColor"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, delay: 1.5, ease: "backOut" }}
        />
        <motion.circle
          cx="270"
          cy="30"
          r="2.2"
          fill="currentColor"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, delay: 1.9, ease: "backOut" }}
        />

        {/* Signature baseline underline flourish */}
        <motion.path
          d="M 28 66 C 80 62, 180 63, 300 58 C 316 57, 320 62, 310 65 C 270 71, 120 73, 50 72"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.6, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {showLabel && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
          className="flex items-center gap-3 pt-1 border-t border-border/60"
        >
          <span className="mono-data text-[11px] text-fg-dim">
            Ridwanul Azim · Software Engineer
          </span>
        </motion.div>
      )}
    </div>
  );
}
