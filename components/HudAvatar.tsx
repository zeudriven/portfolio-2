"use client";

import { useEffect, useState } from "react";

const DIRS = ["south", "west", "north", "east"];

/** Top-left HUD avatar — spins through all 4 directions continuously while hovered. */
export default function HudAvatar() {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!hover) {
      setI(0);
      return;
    }
    const id = setInterval(() => setI((p) => (p + 1) % DIRS.length), 170);
    return () => clearInterval(id);
  }, [hover]);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative w-12 h-12 bg-night-deep border-[2px] border-ink overflow-hidden shrink-0 cursor-pointer"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/assets/character/${DIRS[i]}.png`}
        alt="Varun avatar"
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-[56px] max-w-none"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
