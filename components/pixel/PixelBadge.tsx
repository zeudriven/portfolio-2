import { ReactNode } from "react";

type Tone = "green" | "purple" | "cyan" | "gold" | "muted";

const tones: Record<Tone, string> = {
  green: "text-green border-green/50",
  purple: "text-purple border-purple/50",
  cyan: "text-cyan border-cyan/50",
  gold: "text-gold border-gold/50",
  muted: "text-muted border-muted/40",
};

export default function PixelBadge({
  children,
  tone = "green",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center font-pixel text-[9px] leading-none px-2 py-[6px] bg-panel-2 border-[3px] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
