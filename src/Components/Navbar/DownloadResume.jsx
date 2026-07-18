import { PrimaryCTA } from "../../primitives/PrimaryCTA";

export default function DownloadResume({ size = "sm", className = "" }) {
  return (
    <PrimaryCTA
      variant="outline"
      size={size}
      arrow={false}
      href="/Ridwanul_Azim_Resume.pdf"
      download="Ridwanul_Azim_Resume.pdf"
      target="_blank"
      rel="noreferrer"
      className={className}
    >
      <span>Resume</span>
      <span aria-hidden>↓</span>
    </PrimaryCTA>
  );
}
