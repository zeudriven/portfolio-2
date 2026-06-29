"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// Left/Right arrows cycle through the sections (wraps around).
const ORDER = ["/about", "/projects", "/skills", "/blog", "/contact"];

export default function SectionArrowNav() {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // don't hijack keys while typing in a field (e.g. the contact form)
      const t = document.activeElement as HTMLElement | null;
      const tag = t?.tagName?.toLowerCase();
      const typing = tag === "input" || tag === "textarea" || tag === "select" || t?.isContentEditable;

      // ESC → back to the home world
      if (e.key === "Escape") {
        if (typing) return;
        e.preventDefault();
        router.push("/");
        return;
      }

      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      // stand down while hovering the resume viewer (it uses arrows to switch resumes)
      if (document.body.dataset.resumeHover === "1") return;
      if (typing) return;
      e.preventDefault();
      let i = ORDER.indexOf(path);
      if (i < 0) i = 0;
      const next = e.key === "ArrowRight" ? (i + 1) % ORDER.length : (i - 1 + ORDER.length) % ORDER.length;
      router.push(ORDER[next]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [path, router]);

  return (
    <div className="fixed bottom-3 right-3 z-40 hidden sm:flex items-center gap-2 font-pixel text-[8px] text-muted bg-panel/85 border-[2px] border-ink px-2 py-1">
      <span className="text-gold">◄ ►</span> switch section
    </div>
  );
}
