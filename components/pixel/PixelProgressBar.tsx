type Tone = "green" | "purple" | "cyan" | "gold";

const toneHex: Record<Tone, string> = {
  green: "#b7ff45",
  cyan: "#4cc9ff",
  purple: "#b83cff",
  gold: "#ffd76a",
};

/**
 * Battery-style skill bar — segmented cells that fill to `value`, always glowing
 * with a continuous brightness pulse + a shine sweep. Includes a battery terminal nub.
 */
export default function PixelProgressBar({
  label,
  value,
  tone = "green",
  segments = 8,
}: {
  label: string;
  value: number; // 0-100
  tone?: Tone;
  segments?: number;
}) {
  const hex = toneHex[tone];
  const filled = Math.round((value / 100) * segments);

  return (
    <div className="flex items-center gap-3 lg:gap-4">
      <span className="w-28 lg:w-36 xl:w-40 shrink-0 text-text/90 text-[19px] lg:text-[23px] xl:text-[25px] leading-tight">{label}</span>

      <div className="flex-1 flex items-center">
        {/* battery body — flat chunky pixel cells */}
        <div className="relative flex-1 flex gap-[4px] p-[5px] h-[30px] lg:h-[38px] bg-[#0a0f06] border-[2px] border-ink overflow-hidden" style={{ imageRendering: "pixelated" }}>
          {Array.from({ length: segments }).map((_, i) => (
            <span
              key={i}
              className={`flex-1 h-full ${i < filled ? "animate-cell-pulse" : ""}`}
              style={
                i < filled
                  ? { background: hex, boxShadow: `0 0 6px ${hex}`, animationDelay: `${i * 0.08}s` }
                  : { background: "#15210b" }
              }
            />
          ))}
          {/* continuous shine sweep */}
          <span className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-white/35 blur-[2px] animate-xp-shine" />
        </div>
        {/* battery terminal nub */}
        <span className="block w-[6px] h-[15px] lg:h-[19px] bg-ink ml-[2px]" />
      </div>

      <span className="w-10 lg:w-14 text-right font-pixel text-[11px] lg:text-[15px]" style={{ color: hex }}>{value}</span>
    </div>
  );
}
