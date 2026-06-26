"use client";

import { useState, useEffect } from "react";
import PixelButton from "./pixel/PixelButton";

const RESUMES = [
  { label: "Résumé", file: "/resumes/varun_version_c_faang.pdf" },
  { label: "Cover Letter", file: "/resumes/varun_coverletter_faang.pdf" },
];

/** Multi-resume viewer: tabs + prev/next, and ← → arrows while hovered (flag lets the
 *  page's section-nav stand down so arrows switch resumes here instead of pages). */
export default function ResumeViewer() {
  const [i, setI] = useState(0);
  const n = RESUMES.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.body.dataset.resumeHover !== "1") return;
      if (e.key === "ArrowLeft") { e.preventDefault(); setI((p) => (p - 1 + n) % n); }
      else if (e.key === "ArrowRight") { e.preventDefault(); setI((p) => (p + 1) % n); }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.dataset.resumeHover = "0"; };
  }, [n]);

  const cur = RESUMES[i];
  const view = `${cur.file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
  return (
    <div
      onMouseEnter={() => { document.body.dataset.resumeHover = "1"; }}
      onMouseLeave={() => { document.body.dataset.resumeHover = "0"; }}
      className="group"
    >
      {/* tabs */}
      <div className="flex flex-wrap gap-2 mb-3">
        {RESUMES.map((r, idx) => (
          <button
            key={r.label}
            onClick={() => setI(idx)}
            className={`font-pixel text-[10px] px-3 py-2 border-[2px] border-ink transition-colors ${idx === i ? "bg-green text-[#0b1206]" : "bg-inset text-muted hover:text-text"}`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* viewer + hover glow */}
      <div className="relative transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_0_26px_rgba(76,201,255,0.45)]">
        <object data={view} type="application/pdf" className="w-full aspect-[8.5/11] min-h-[680px] bg-inset border-[2px] border-ink">
          <iframe src={view} title={cur.label} className="w-full aspect-[8.5/11] min-h-[680px] border-0" />
          <div className="p-6 text-center font-body text-[17px] text-muted">
            Preview unavailable — <a className="text-cyan underline" href={cur.file} target="_blank" rel="noreferrer">open in a new tab</a>.
          </div>
        </object>
        <button onClick={() => setI((p) => (p - 1 + n) % n)} aria-label="Previous resume" className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center bg-panel/90 border-[2px] border-ink text-green font-pixel hover:bg-green hover:text-[#0b1206]">◄</button>
        <button onClick={() => setI((p) => (p + 1) % n)} aria-label="Next resume" className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center bg-panel/90 border-[2px] border-ink text-green font-pixel hover:bg-green hover:text-[#0b1206]">►</button>
      </div>

      <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
        <span className="font-pixel text-[10px] text-cyan">{cur.label} · {i + 1}/{n}</span>
        <span className="font-body text-[15px] text-muted">◄ ► (or hover + arrow keys) to switch</span>
        <a href={cur.file} download><PixelButton variant="outline">DOWNLOAD ⬇</PixelButton></a>
      </div>
    </div>
  );
}
