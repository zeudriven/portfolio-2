/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

type Tone = "green" | "purple" | "cyan" | "gold";
const labelTone: Record<Tone, string> = {
  green: "text-green border-green/60",
  purple: "text-purple border-purple/60",
  cyan: "text-cyan border-cyan/60",
  gold: "text-gold border-gold/60",
};
const glowTone: Record<Tone, string> = {
  green: "rgba(155,227,74,0.45)",
  purple: "rgba(160,107,255,0.5)",
  cyan: "rgba(86,199,245,0.5)",
  gold: "rgba(255,207,92,0.5)",
};

export default function DestinationDoor({
  index,
  label,
  href,
  art,
  tone = "green",
  size = 192,
  delay = 0,
}: {
  index: number;
  label: string;
  href: string;
  art: string;
  tone?: Tone;
  size?: number;
  delay?: number;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-3 w-[200px]"
    >
      <div
        className={`font-pixel text-[12px] text-center leading-snug px-3 py-2 bg-[#0f0a22]/90 border-[3px] ${labelTone[tone]} shadow-blocky-sm transition-transform duration-150 group-hover:-translate-y-1`}
      >
        {index}. {label}
      </div>

      <div className="relative flex flex-col items-center">
        {/* floating art */}
        <div
          className="animate-float transition-transform duration-150 group-hover:scale-110"
          style={{ animationDelay: `${delay}s` }}
        >
          <img
            src={art}
            alt={label}
            width={size}
            height={size}
            style={{ width: size, height: size }}
            className="object-contain transition-[filter] duration-150"
            // glow brightens on hover
          />
        </div>
        {/* glow pad under the art that intensifies on hover */}
        <span
          className="pointer-events-none absolute -bottom-1 h-3 w-28 rounded-full blur-[3px] opacity-50 group-hover:opacity-100 transition-opacity"
          style={{ background: glowTone[tone] }}
        />
      </div>
    </Link>
  );
}
