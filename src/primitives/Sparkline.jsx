import { useState } from "react";
import { motion } from "framer-motion";

export function Sparkline({
  data = [],
  height = 56,
  invert = false,
  className = "",
}) {
  const [hover, setHover] = useState(null);
  if (!data.length) return null;

  const w = 200;
  const h = height;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = w / (data.length - 1);

  const points = data.map((v, i) => {
    const x = i * stepX;
    const yNorm = (v - min) / range;
    const y = invert ? h - yNorm * h : h - yNorm * h;
    return [x, y];
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`)
    .join(" ");

  const areaPath =
    linePath +
    ` L${w},${h} L0,${h} Z`;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * w;
    const idx = Math.min(data.length - 1, Math.max(0, Math.round(x / stepX)));
    setHover(idx);
  };

  const hoverPoint = hover != null ? points[hover] : null;

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height }}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="spark-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(250,250,250,0.18)" />
            <stop offset="100%" stopColor="rgba(250,250,250,0)" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#spark-grad)" />
        <path
          d={linePath}
          stroke="#fafafa"
          strokeWidth="1.25"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {hoverPoint && (
          <>
            <line
              x1={hoverPoint[0]}
              x2={hoverPoint[0]}
              y1={0}
              y2={h}
              stroke="rgba(250,250,250,0.12)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <circle
              cx={hoverPoint[0]}
              cy={hoverPoint[1]}
              r="4"
              fill="none"
              stroke="rgba(250,250,250,0.4)"
              strokeWidth="1.5"
            />
            <circle
              cx={hoverPoint[0]}
              cy={hoverPoint[1]}
              r="2"
              fill="#fafafa"
            />
          </>
        )}
      </svg>
      {hover != null && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mono-label pointer-events-none absolute -top-7"
          style={{
            left: `${(hoverPoint[0] / w) * 100}%`,
            transform: "translateX(-50%)",
            color: "var(--fg)",
          }}
        >
          {data[hover]}
        </motion.div>
      )}
    </div>
  );
}
