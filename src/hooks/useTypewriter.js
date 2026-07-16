import { useEffect, useState } from "react";

export function useTypewriter(text, speed = 14, startDelay = 0) {
  const [out, setOut] = useState("");

  useEffect(() => {
    setOut("");
    let i = 0;
    let cancelled = false;
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (cancelled) return;
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      cancelled = true;
      clearTimeout(startTimer);
    };
  }, [text, speed, startDelay]);

  return out;
}
