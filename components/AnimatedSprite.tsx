"use client";

import { useState, useEffect } from "react";

/** Loops a folder of frames (f00.png, f01.png, …) — for scattering animated pixel objects. */
export default function AnimatedSprite({
  dir,
  frames,
  size = 96,
  fps = 9,
  className = "",
}: {
  dir: string; // e.g. "/assets/objects/anim/contact"
  frames: number;
  size?: number;
  fps?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % frames), Math.round(1000 / fps));
    return () => clearInterval(t);
  }, [frames, fps]);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${dir}/f${String(i).padStart(2, "0")}.png`}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, imageRendering: "pixelated" }}
    />
  );
}
