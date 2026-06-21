/** Top status bar: avatar + name + level + animated XP bar. */
function MiniAvatar() {
  const B = ({ t, l, w, h, c }: { t: number; l: number; w: number; h: number; c: string }) => (
    <i className="absolute block" style={{ top: t, left: l, width: w, height: h, background: c }} />
  );
  return (
    <div className="relative" style={{ width: 36, height: 38 }}>
      <B t={2} l={8} w={20} h={4} c="#241a12" />
      <B t={6} l={6} w={4} h={7} c="#241a12" />
      <B t={6} l={26} w={4} h={7} c="#241a12" />
      <B t={6} l={10} w={16} h={12} c="#f0c09a" />
      <B t={11} l={13} w={3} h={4} c="#15101f" />
      <B t={11} l={20} w={3} h={4} c="#15101f" />
      <B t={18} l={6} w={24} h={18} c="#2f2b47" />
      <B t={18} l={16} w={3} h={18} c="#9be34a" />
      <B t={22} l={2} w={5} h={12} c="#2f2b47" />
      <B t={22} l={29} w={5} h={12} c="#2f2b47" />
    </div>
  );
}

export default function TopBar() {
  const xpBlocks = 12;
  const filled = 12; // 100%
  return (
    <div className="pixel-panel-2 pixel-interactive group flex items-center gap-4 px-4 py-3">
      <div className="grid place-items-center w-12 h-12 shrink-0 border-[3px] border-ink bg-gradient-to-b from-[#1a1338] to-[#0f0a22] overflow-hidden">
        <MiniAvatar />
      </div>

      <div className="min-w-0">
        <div className="font-pixel text-[13px] text-text leading-none mb-2 tracking-wide">
          VARUN PATEL
        </div>
        <div className="flex items-center gap-3">
          <span className="font-pixel text-[10px] text-gold">Lv. 01</span>
          {/* segmented XP track with moving shine */}
          <div className="relative h-4 w-40 bg-[#0f0a22] border-[3px] border-ink overflow-hidden">
            <div className="absolute inset-0 flex gap-[2px] p-[2px]">
              {Array.from({ length: xpBlocks }).map((_, i) => (
                <span
                  key={i}
                  className={`flex-1 ${i < filled ? "bg-green" : "bg-[#241c44]"}`}
                />
              ))}
            </div>
            <span className="absolute top-0 left-0 h-full w-6 bg-white/40 blur-[2px] animate-xp-shine" />
          </div>
          <span className="font-pixel text-[9px] text-green">100/100</span>
        </div>
      </div>
    </div>
  );
}
