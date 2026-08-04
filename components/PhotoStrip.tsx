"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from "react";

export type Photo = { src: string; caption: string };

/**
 * Pixel-framed thumbnail strip for an experience card. Click a thumb to open
 * the full-size lightbox (arrow keys / ← → buttons to move, ESC or backdrop
 * click to close). Photos that 404 remove themselves, so the strip degrades
 * cleanly while image files are still being added.
 */
export default function PhotoStrip({ photos, label }: { photos: Photo[]; label: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const [missing, setMissing] = useState<Record<string, boolean>>({});

  const shown = photos.filter((p) => !missing[p.src]);

  const move = useCallback(
    (step: number) =>
      setOpen((i) => (i === null ? null : (i + step + shown.length) % shown.length)),
    [shown.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    // don't let the page scroll behind the lightbox
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, move]);

  if (shown.length === 0) return null;

  return (
    <>
      <div className="flex flex-wrap gap-2 mt-4">
        {shown.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            className="photo-thumb"
            aria-label={`Open photo: ${p.caption}`}
          >
            <img
              src={p.src}
              alt={p.caption}
              loading="lazy"
              onError={() => setMissing((m) => ({ ...m, [p.src]: true }))}
            />
          </button>
        ))}
        <span className="self-center font-body text-[15px] text-muted ml-1">
          {shown.length} photo{shown.length > 1 ? "s" : ""} — {label}
        </span>
      </div>

      {open !== null && shown[open] && (
        <div
          className="photo-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <div className="photo-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <img src={shown[open].src} alt={shown[open].caption} />
            <div className="flex items-center justify-between gap-4 mt-3">
              <button type="button" className="photo-nav" onClick={() => move(-1)}>
                ← PREV
              </button>
              <div className="font-body text-[17px] text-text/90 text-center flex-1">
                {shown[open].caption}
                <span className="text-muted ml-2 font-pixel text-[10px]">
                  {open + 1}/{shown.length}
                </span>
              </div>
              <button type="button" className="photo-nav" onClick={() => move(1)}>
                NEXT →
              </button>
            </div>
          </div>
          <button
            type="button"
            className="photo-close"
            onClick={() => setOpen(null)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
