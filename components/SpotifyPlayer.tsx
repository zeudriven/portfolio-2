"use client";

import { useState } from "react";
import { profile } from "@/lib/profile";

/** Turns a Spotify share link (open.spotify.com/…/playlist/ID?si=…) into its embed URL. */
function toEmbedUrl(link: string): string | null {
  const m = link.match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(playlist|album|track|artist|show|episode)\/([A-Za-z0-9]+)/);
  return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}?theme=0` : null;
}

/**
 * Floating pixel music button (bottom-right). Clicking it opens Spotify's embedded player so
 * visitors can play the music while they browse. The player is only loaded on the first open,
 * and stays loaded when collapsed so the music keeps playing.
 */
export default function SpotifyPlayer() {
  const src = toEmbedUrl(profile.spotify);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (!src) return null;

  const toggle = () => {
    setLoaded(true);
    setOpen((o) => !o);
  };

  return (
    <div className="fixed right-3 bottom-[96px] sm:bottom-[110px] z-40 flex flex-col items-end gap-2">
      {loaded && (
        <div
          className={`w-[min(340px,calc(100vw-24px))] bg-panel/90 border-[2px] border-ink shadow-blocky transition-[opacity,transform] duration-200 ${
            open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none h-0 overflow-hidden"
          }`}
          aria-hidden={!open}
        >
          <div className="pixel-titlebar justify-between text-green">
            <span>♪ NOW PLAYING</span>
            <button type="button" onClick={() => setOpen(false)} className="text-muted hover:text-text px-1" aria-label="Hide music player">
              ✕
            </button>
          </div>
          <iframe
            title="Varun's Spotify"
            src={src}
            width="100%"
            height="152"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="block border-0"
          />
        </div>
      )}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Hide music player" : "Play music"}
        title={open ? "Hide music player" : "Play music"}
        className={`grid place-items-center w-12 h-12 bg-panel/90 border-[2px] font-pixel text-[18px] shadow-blocky-sm transition-all duration-150
                    hover:-translate-y-[2px] hover:text-green hover:border-green hover:shadow-[4px_6px_0_0_#000,0_0_14px_rgba(183,255,69,0.45)]
                    ${open ? "text-green border-green" : "text-muted border-ink"}`}
      >
        ♪
      </button>
    </div>
  );
}
