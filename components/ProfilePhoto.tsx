"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import RotatingCharacter from "@/components/RotatingCharacter";

/**
 * Real photo of Varun in a chunky pixel frame, with the walking-character
 * sprite as the fallback. If the image file isn't there yet (or 404s) the
 * page silently falls back to the sprite it used before — so dropping the
 * photo in is the only step needed to switch it on.
 */
export default function ProfilePhoto({
  src = "/assets/about/varun.jpg",
  size = 220,
}: {
  src?: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return <RotatingCharacter size={size} />;

  return (
    <figure className="profile-photo" style={{ width: size }}>
      <img src={src} alt="Varun Patel" width={size} height={size} onError={() => setFailed(true)} />
      <figcaption className="font-pixel text-[9px] text-muted text-center mt-2">
        ▸ PLAYER 1
      </figcaption>
    </figure>
  );
}
