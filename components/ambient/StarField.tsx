"use client";

import PixelSun from "./PixelSun";
import DayBeach from "./DayBeach";

// Full-viewport night-sky + twinkling stars behind ALL page content (no seam between
// the dashboard and the world scene). The day-mode sun + beach live inside this same
// z-0 layer, so they are always the bottom-most layer — behind the dashboard and content.
const STARS = Array.from({ length: 38 }, (_, i) => ({
  left: (i * 47 + 3) % 100,
  top: (i * 71 + 11) % 100,
  big: i % 9 === 0,
  delay: (i % 11) * 0.23,
}));

// bigger, colorful 4-point sparkles that twinkle on top of the stars
const SPARK_COLORS = ["#ffd76a", "#4cc9ff", "#b7ff45", "#ffffff"];
const SPARKLES = Array.from({ length: 7 }, (_, i) => ({
  left: (i * 53 + 9) % 100,
  top: (i * 89 + 7) % 100,
  size: 9 + (i % 3) * 5,
  color: SPARK_COLORS[i % SPARK_COLORS.length],
  delay: (i % 7) * 0.4,
  dur: 2.2 + (i % 4) * 0.6,
}));
const STAR_CLIP = "polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)";

export default function StarField() {
  return (
    <div aria-hidden className="sky-layer fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="sky-dot absolute bg-[#e3e7ff] animate-twinkle"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.big ? 6 : 4, height: s.big ? 6 : 4, animationDelay: `${s.delay}s` }}
        />
      ))}
      {SPARKLES.map((s, i) => (
        <span
          key={`spark-${i}`}
          className="sky-dot absolute animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            clipPath: STAR_CLIP,
            WebkitClipPath: STAR_CLIP,
            filter: `drop-shadow(0 0 5px ${s.color})`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
      {/* day-mode ambient decor — part of this background layer, so always the bottom layer */}
      <PixelSun />
      <DayBeach />
    </div>
  );
}
