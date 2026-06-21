type Tone = "green" | "purple" | "cyan" | "gold";

const fillColor: Record<Tone, string> = {
  green: "bg-green",
  purple: "bg-purple",
  cyan: "bg-cyan",
  gold: "bg-gold",
};

/** Segmented blocky progress bar (10 blocks) like the reference UI. */
export default function PixelProgressBar({
  label,
  value,
  tone = "green",
  segments = 10,
}: {
  label: string;
  value: number; // 0-100
  tone?: Tone;
  segments?: number;
}) {
  const filled = Math.round((value / 100) * segments);
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-text/90 text-[18px]">{label}</span>
      <div className="flex flex-1 gap-[3px]">
        {Array.from({ length: segments }).map((_, i) => (
          <span
            key={i}
            className={`h-3 flex-1 border-2 border-ink ${
              i < filled ? fillColor[tone] : "bg-[#241c44]"
            }`}
          />
        ))}
      </div>
      <span className="w-9 text-right font-pixel text-[10px] text-text/80">
        {value}
      </span>
    </div>
  );
}
