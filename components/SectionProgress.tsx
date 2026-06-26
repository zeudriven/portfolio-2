"use client";

import { useState, useEffect } from "react";

/** Small fixed pixel progress rail on the RIGHT — tracks the current section by scroll position
 *  (updates reliably scrolling up AND down) and fills exactly to the active dot. */
export default function SectionProgress({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4; // a section is "current" once its top crosses 40% of the viewport
      let idx = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      }
      setActive(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sections]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const n = Math.max(sections.length, 1);
  const fillPct = n > 1 ? (active / (n - 1)) * 100 : 0;

  return (
    <div className="hidden lg:flex fixed right-3 top-1/2 -translate-y-1/2 z-40 items-stretch gap-2 h-[210px]">
      {/* labels (left of the track, right-aligned) */}
      <div className="flex flex-col justify-between text-right">
        {sections.map((s, i) => (
          <button key={s.id} onClick={() => go(s.id)}
            className={`text-left font-pixel text-[7px] leading-tight transition-colors ${i === active ? "text-green" : "text-muted hover:text-text"}`}>
            {s.label}
          </button>
        ))}
      </div>
      {/* pixel track */}
      <div className="relative w-[8px] bg-panel-2 border-[2px] border-ink">
        <div className="absolute left-0 right-0 top-0 bg-green transition-[height] duration-200 ease-out" style={{ height: `${fillPct}%`, boxShadow: "0 0 6px rgba(183,255,69,.6)" }} />
        {sections.map((s, i) => (
          <span key={s.id} className={`absolute -left-[4px] w-[11px] h-[11px] border-[2px] border-ink transition-colors ${i <= active ? "bg-green" : "bg-night-deep"}`}
            style={{ top: `calc(${n > 1 ? (i / (n - 1)) * 100 : 0}% - 5px)` }} />
        ))}
      </div>
    </div>
  );
}
