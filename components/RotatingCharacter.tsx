"use client";

import { useState, useEffect } from "react";

// Cycles the 4 directional sprites to make the character "turn" a full 360.
const DIRS = ["south", "west", "north", "east"];

export default function RotatingCharacter({ size = 150 }: { size?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % DIRS.length), 650);
    return () => clearInterval(t);
  }, []);
  return (
    <img
      src={`/assets/character/${DIRS[i]}.png`}
      alt="Varun character"
      width={size}
      height={size}
      className="animate-soft-float"
      style={{ width: size, height: size, imageRendering: "pixelated", filter: "drop-shadow(0 0 18px rgba(76,201,255,0.35))" }}
    />
  );
}
