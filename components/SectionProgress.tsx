"use client";

import { useState, useEffect } from "react";

/** Small fixed pixel progress rail on the RIGHT — fills + highlights as you scroll through sections. */
export default function SectionProgress({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = sections.findIndex((s) => s.id === e.target.id);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const n = Math.max(sections.length, 1);
  const pct = ((active + 1) / n) * 100;

  return (
    <div className="hidden lg:flex fixed right-3 top-1/2 -translate-y-1/2 z-40 items-stretch gap-2 h-[210px]">
      {/* labels (left of the track, right-aligned) */}
      <div className="flex flex-col justify-between text-right">
        {sections.map((s, i) => (
          <button key={s.id} onClick={() => go(s.id)}
            className={`font-pixel text-[7px] leading-tight transition-colors ${i === active ? "text-green" : "text-muted hover:text-text"}`}>
            {s.label}
          </button>
        ))}
      </div>
      {/* pixel track */}
      <div className="relative w-[8px] bg-panel-2 border-[2px] border-ink">
        <div className="absolute left-0 right-0 top-0 bg-green transition-[height] duration-300" style={{ height: `${pct}%`, boxShadow: "0 0 6px rgba(183,255,69,.6)" }} />
        {sections.map((s, i) => (
          <span key={s.id} className={`absolute -left-[4px] w-[11px] h-[11px] border-[2px] border-ink ${i <= active ? "bg-green" : "bg-night-deep"}`}
            style={{ top: `calc(${n > 1 ? (i / (n - 1)) * 100 : 0}% - 5px)` }} />
        ))}
      </div>
    </div>
  );
}
