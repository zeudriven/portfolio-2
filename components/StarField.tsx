"use client";

// Full-viewport night-sky + twinkling stars behind ALL page content (no seam between
// the dashboard and the world scene).
const STARS = Array.from({ length: 140 }, (_, i) => ({
  left: (i * 47 + 3) % 100,
  top: (i * 71 + 11) % 100,
  big: i % 9 === 0,
  delay: (i % 11) * 0.23,
}));

export default function StarField() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#0a0720 0%,#160a34 28%,#27145a 56%,#3a2068 74%,#1a1038 100%)" }}
    >
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute bg-[#e3e7ff] animate-twinkle"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.big ? 6 : 4, height: s.big ? 6 : 4, animationDelay: `${s.delay}s` }}
        />
      ))}
    </div>
  );
}
