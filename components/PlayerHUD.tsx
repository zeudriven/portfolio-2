import HudAvatar from "./HudAvatar";

/**
 * Top-left RPG player HUD — pixel avatar + name + level + XP bar.
 * Mirrors the reference: avatar frame, "VARUN PATEL", "Lv. 01", segmented XP, "100/100 XP".
 */
export default function PlayerHUD() {
  return (
    <div className="inline-flex items-center gap-3 bg-panel/90 border-[2px] border-green/70 shadow-blocky px-3 py-2 neon-green">
      {/* avatar — spins through all directions on hover */}
      <HudAvatar />
      {/* stats */}
      <div className="leading-none">
        <div className="font-pixel text-[12px] text-text tracking-wide">VARUN PATEL</div>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-pixel text-[9px] text-green">Lv. 01</span>
          {/* segmented XP bar */}
          <div className="relative w-[120px] h-[10px] bg-night-deep border-[2px] border-ink overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 w-full bg-green"
              style={{ backgroundImage: "linear-gradient(90deg,#000 0 1px,transparent 1px 12px)", backgroundSize: "12px 100%" }}
            />
            <span className="absolute inset-y-0 left-0 w-6 bg-white/40 blur-[1px] animate-xp-shine" />
          </div>
          <span className="font-pixel text-[8px] text-muted">100/100 XP</span>
        </div>
      </div>
    </div>
  );
}
