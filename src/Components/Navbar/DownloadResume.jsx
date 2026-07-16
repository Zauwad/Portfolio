import { motion } from "framer-motion";
import { PrimaryCTA } from "../../primitives/PrimaryCTA";


export default function DownloadResume({ size = "sm", className = "" }) {
  return (
    <motion.a
      href="/Ridwanul_Azim_Resume.pdf"
      download="Ridwanul_Azim_Resume.pdf"
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <PrimaryCTA variant="outline" size={size} arrow={false}>
        <span>Resume</span>
        <span aria-hidden>↓</span>
      </PrimaryCTA>
    </motion.a>
  );
}
