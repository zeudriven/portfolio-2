"use client";

import { useEffect, useState } from "react";

/**
 * Pixel loading screen for the HOME page only.
 *
 * Flow:  fill the bar 0 → 100  →  the character does a full 360° spin  →  fade away and
 * reveal the world underneath.  Fully themed (uses the day/night CSS-variable tokens, so it
 * matches whichever theme is active) and pixel-crisp.
 *
 * It plays once per *fresh* page load. `hasPlayed` is a module-level flag (not React state):
 * it resets on a real reload / refresh but stays true across in-app navigation, so bouncing
 * from Home → About → Home does NOT replay the loader.
 */
let hasPlayed = false;

type Phase = "load" | "spin" | "out";

// Cycling these 4 facings turns the character a full 360° in place — the same
// "spin" the top-left HUD avatar uses (not a CSS rotate).
const DIRS = ["south", "west", "north", "east"];

export default function HomeLoader() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("load");
  const [dirIdx, setDirIdx] = useState(0);

  // Decide whether to play — client-only, so there is no SSR/hydration mismatch.
  useEffect(() => {
    if (hasPlayed) return;
    hasPlayed = true;
    setShow(true);
  }, []);

  // Phase 1: smoothly fill the loading bar.
  useEffect(() => {
    if (!show || phase !== "load") return;
    const DURATION = 1150; // ms to reach 100% (snappy)
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const pct = Math.min(100, ((t - start) / DURATION) * 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
      else setPhase("spin");
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show, phase]);

  // The character turns a full 360° by cycling its facings at ONE constant, brisk speed
  // the whole time (just like the HUD avatar) — smooth and consistent from start to finish.
  useEffect(() => {
    if (!show) return;
    const id = setInterval(() => setDirIdx((p) => (p + 1) % DIRS.length), 170); // full turn ≈ 0.68s
    return () => clearInterval(id);
  }, [show]);

  // Phase 2 → 3: let it turn a bit more once the bar is full, then fade out and unmount.
  useEffect(() => {
    if (phase === "spin") {
      const t = setTimeout(() => setPhase("out"), 520);
      return () => clearTimeout(t);
    }
    if (phase === "out") {
      const t = setTimeout(() => setShow(false), 400); // matches the fade duration below
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (!show) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-9 bg-night-deep transition-opacity duration-[400ms] ease-out ${
        phase === "out" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* the character — gently floats while turning through its 4 facings (a 360° spin) */}
      <img
        src={`/assets/character/${DIRS[dirIdx]}.png`}
        alt=""
        width={168}
        height={168}
        className="animate-soft-float"
        style={{
          width: 168,
          height: 168,
          imageRendering: "pixelated",
          filter: "drop-shadow(0 0 24px rgb(var(--c-cyan) / 0.4))",
        }}
      />

      {/* chunky pixel progress bar */}
      <div className="w-[min(78vw,320px)]">
        <div className="mb-2 flex justify-between font-pixel text-[9px] text-muted">
          <span>{phase === "load" ? "LOADING…" : "READY"}</span>
          <span className="text-green">{Math.round(progress)}%</span>
        </div>
        <div className="h-[16px] bg-inset border-[2px] border-ink overflow-hidden">
          <div
            className="h-full bg-green"
            style={{
              width: `${progress}%`,
              backgroundImage: "linear-gradient(90deg,rgb(var(--c-ink)) 0 1px,transparent 1px 12px)",
              backgroundSize: "12px 100%",
            }}
          />
        </div>
      </div>

      <div className="font-pixel text-[8px] text-muted tracking-[0.35em]">ENTERING VARUN&apos;S WORLD</div>
    </div>
  );
}
