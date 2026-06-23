"use client";

import { useEffect, useState } from "react";

/**
 * Cycling typewriter effect — types each phrase, pauses, deletes, next.
 * Used for the hero role line (CS Student / Full-Stack Developer / ...).
 */
export default function Typewriter({
  phrases,
  className = "",
}: {
  phrases: string[];
  className?: string;
}) {
  const [i, setI] = useState(0); // which phrase
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = phrases[i % phrases.length];
    let delay = deleting ? 45 : 80;

    if (!deleting && text === full) {
      delay = 1300; // hold at full phrase
      const t = setTimeout(() => setDeleting(true), delay);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setI((p) => (p + 1) % phrases.length);
      return;
    }
    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? full.slice(0, prev.length - 1) : full.slice(0, prev.length + 1)
      );
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, phrases]);

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="inline-block w-[10px] -mb-[2px] ml-[2px] bg-cyan animate-caret" style={{ height: "1em" }} />
    </span>
  );
}
