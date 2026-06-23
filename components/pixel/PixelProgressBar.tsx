type Tone = "green" | "purple" | "cyan" | "gold";

/** NES.css progress bar (`.nes-progress`) recolored to the V2 palette. */
const toneClass: Record<Tone, string> = {
  green: "is-success",
  cyan: "is-primary",
  purple: "is-primary",
  gold: "is-warning",
};

export default function PixelProgressBar({
  label,
  value,
  tone = "green",
}: {
  label: string;
  value: number; // 0-100
  tone?: Tone;
  segments?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-text/90 text-[18px]">{label}</span>
      <progress
        className={`nes-progress ${toneClass[tone]} flex-1`}
        value={value}
        max={100}
      />
      <span className="w-9 text-right font-pixel text-[10px] text-text/80">
        {value}
      </span>
    </div>
  );
}
