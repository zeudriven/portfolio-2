"use client";

import { useEffect, useState } from "react";
import HudAvatar from "./HudAvatar";

// Degree timeline → XP. Bar fills with progress toward graduation; level = academic year.
const START = new Date("2023-09-01").getTime();
const END = new Date("2027-09-01").getTime();

export default function PlayerHUD() {
  const [{ pct, year }, set] = useState({ pct: 0, year: 3 });

  useEffect(() => {
    const now = Date.now();
    const p = Math.min(1, Math.max(0, (now - START) / (END - START)));
    const y = Math.min(4, Math.max(1, Math.floor((now - START) / (365.25 * 864e5)) + 1));
    set({ pct: p, year: y });
  }, []);

  const xp = Math.round(pct * 100);

  return (
    <div className="inline-flex items-center gap-3 bg-panel/90 border-[2px] border-green/70 shadow-blocky px-3 py-2 neon-green">
      <HudAvatar />
      {/* stats */}
      <div className="leading-none">
        <div className="font-pixel text-[12px] text-text tracking-wide">VARUN PATEL</div>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-pixel text-[9px] text-green">Lv. {String(year).padStart(2, "0")}</span>
          {/* segmented XP bar — fills with degree progress */}
          <div className="relative w-[120px] h-[10px] bg-night-deep border-[2px] border-ink overflow-hidden" title={`Degree progress · ${xp}%`}>
            <div
              className="absolute inset-y-0 left-0 bg-green transition-[width] duration-700 ease-out"
              style={{ width: `${xp}%`, backgroundImage: "linear-gradient(90deg,#000 0 1px,transparent 1px 12px)", backgroundSize: "12px 100%" }}
            />
            <span className="absolute inset-y-0 left-0 w-6 bg-white/40 blur-[1px] animate-xp-shine" />
          </div>
          <span className="font-pixel text-[8px] text-muted">{xp}/100 XP</span>
        </div>
      </div>
    </div>
  );
}
