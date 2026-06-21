"use client";

import { useEffect, useRef } from "react";

/** Mounts the Phaser world scene into a div, sized to its container. */
export default function PhaserMount() {
  const ref = useRef<HTMLDivElement>(null);
  const gameRef = useRef<unknown>(null);

  useEffect(() => {
    let destroyed = false;

    (async () => {
      const PhaserMod = await import("phaser");
      const Phaser = (PhaserMod as unknown as { default?: typeof PhaserMod }).default ?? PhaserMod;
      const { WorldScene } = await import("./WorldScene");
      if (destroyed || !ref.current) return;

      const game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: ref.current,
        backgroundColor: "#0e0b1c",
        pixelArt: true,
        scale: {
          mode: Phaser.Scale.RESIZE,
          width: ref.current.clientWidth,
          height: ref.current.clientHeight,
        },
        scene: [WorldScene],
      });
      gameRef.current = game;
    })();

    return () => {
      destroyed = true;
      const g = gameRef.current as { destroy?: (b: boolean) => void } | null;
      if (g && g.destroy) g.destroy(true);
    };
  }, []);

  return <div ref={ref} className="absolute inset-0" aria-hidden />;
}
