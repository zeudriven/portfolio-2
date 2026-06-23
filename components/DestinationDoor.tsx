/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Tone = "green" | "purple" | "cyan" | "gold";

const badgeTone: Record<Tone, string> = {
  cyan: "text-cyan border-cyan/50",
  green: "text-green border-green/50",
  purple: "text-purple border-purple/50",
  gold: "text-gold border-gold/50",
};
const cornerTone: Record<Tone, string> = {
  cyan: "border-cyan",
  green: "border-green",
  purple: "border-purple",
  gold: "border-gold",
};
const outlineTone: Record<Tone, string> = {
  cyan: "outline-cyan",
  green: "outline-green",
  purple: "outline-purple",
  gold: "outline-gold",
};

/**
 * V2 destination card — an image slot (replaceable pixel-art) with corner
 * ticks, an AREA badge, title, blurb and an ENTER button. Framer Motion lifts
 * the card on hover; the parent grid staggers entrance.
 */
export default function DestinationDoor({
  index,
  label,
  desc,
  href,
  art,
  tone = "cyan",
  selected = false,
  onSelect,
}: {
  index: number;
  label: string;
  desc: string;
  href: string;
  art: string;
  tone?: Tone;
  selected?: boolean;
  onSelect?: () => void;
}) {
  const area = String(index).padStart(2, "0");
  return (
    <motion.article
      onMouseEnter={onSelect}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ x: -2, y: -2 }}
      transition={{ type: "tween", duration: 0.12 }}
      className={`flex flex-col bg-panel border-[5px] border-ink shadow-blocky-lg transition-[outline-color] duration-150 outline outline-[4px] outline-offset-[3px] ${
        selected ? outlineTone[tone] : "outline-transparent"
      }`}
    >
      {/* image slot */}
      <div className="relative h-[172px] flex items-center justify-center border-b-[5px] border-ink bg-[repeating-linear-gradient(45deg,#241f38_0_10px,#211c33_10px_20px)]">
        <span className={`absolute top-2 left-2 w-3 h-3 border-t-[3px] border-l-[3px] ${cornerTone[tone]}`} />
        <span className={`absolute top-2 right-2 w-3 h-3 border-t-[3px] border-r-[3px] ${cornerTone[tone]}`} />
        <span className={`absolute bottom-2 left-2 w-3 h-3 border-b-[3px] border-l-[3px] ${cornerTone[tone]}`} />
        <span className={`absolute bottom-2 right-2 w-3 h-3 border-b-[3px] border-r-[3px] ${cornerTone[tone]}`} />
        <motion.img
          src={art}
          alt={label}
          width={128}
          height={128}
          className="w-32 h-32 object-contain drop-shadow-[0_6px_0_rgba(0,0,0,0.35)]"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
        />
      </div>

      {/* body */}
      <div className="flex flex-col gap-3 p-[18px] flex-1">
        <span
          className={`self-start font-pixel text-[9px] leading-none px-2 py-[6px] bg-panel-2 border-[3px] ${badgeTone[tone]}`}
        >
          AREA {area}
        </span>
        <h3 className="font-pixel text-[14px] text-text leading-[1.4]">{label}</h3>
        <p className="font-body text-[18px] text-muted leading-[1.35] flex-1">{desc}</p>
        <Link
          href={href}
          className={`nes-btn is-primary font-pixel text-[11px] text-center ${selected ? "animate-pulse" : ""}`}
        >
          {selected ? "▶ ENTER" : "ENTER"}
        </Link>
      </div>
    </motion.article>
  );
}
