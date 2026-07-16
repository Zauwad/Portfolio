import { useEffect, useRef, useState } from "react";
import { easeOutQuart } from "../lib/ease";

export function CountUp({
  to,
  duration = 1100,
  suffix = "",
  prefix = "",
  format = (n) => Math.round(n).toString(),
  start = 0,
  trigger = true,
  className,
}) {
  const [val, setVal] = useState(start);
  const raf = useRef();
  const startTime = useRef();

  useEffect(() => {
    if (!trigger) return;
    const tick = (t) => {
      if (!startTime.current) startTime.current = t;
      const elapsed = t - startTime.current;
      const p = Math.min(1, elapsed / duration);
      setVal(start + (to - start) * easeOutQuart(p));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      startTime.current = null;
    };
  }, [to, duration, start, trigger]);

  return (
    <span className={`tabular ${className || ""}`}>
      {prefix}
      {format(val)}
      {suffix}
    </span>
  );
}
