/**
 * CSS pixel character — a developer in a green-trimmed hoodie.
 * Placeholder until a PixelLab walk-sprite is generated (see PIXELLAB_PROMPTS.md).
 * `float` adds a gentle hover; a soft shadow sits beneath.
 */
export default function CharacterSprite({
  scale = 1,
  float = false,
}: {
  scale?: number;
  float?: boolean;
}) {
  const u = scale; // 1 unit
  const Block = ({ t, l, w, h, c }: { t: number; l: number; w: number; h: number; c: string }) => (
    <i
      className="absolute block"
      style={{ top: t * u, left: l * u, width: w * u, height: h * u, background: c }}
    />
  );

  // V2 character — cyan hoodie (mirrors the sprite in v2-preview.html)
  const skin = "#e8b483";
  const skinShade = "#d89e74";
  const hair = "#2a1c12";
  const hoodie = "#56c7f5";
  const hoodieShade = "#2e6f8c";
  const trim = "#2e6f8c";
  const pants = "#2a2540";
  const shoe = "#e8e6f5";

  return (
    <div className="relative inline-flex flex-col items-center" aria-label="Varun character">
      <div
        className={`relative ${float ? "animate-float" : ""}`}
        style={{ width: 64 * u, height: 88 * u, filter: "drop-shadow(0 0 0 transparent)" }}
      >
        {/* hair */}
        <Block t={2} l={16} w={32} h={6} c={hair} />
        <Block t={8} l={14} w={6} h={10} c={hair} />
        <Block t={8} l={44} w={6} h={10} c={hair} />
        {/* face */}
        <Block t={8} l={20} w={24} h={18} c={skin} />
        <Block t={22} l={20} w={24} h={4} c={skinShade} />
        {/* eyes */}
        <Block t={14} l={25} w={4} h={5} c="#15101f" />
        <Block t={14} l={35} w={4} h={5} c="#15101f" />
        {/* hoodie body */}
        <Block t={28} l={12} w={40} h={34} c={hoodie} />
        <Block t={28} l={12} w={40} h={4} c={hoodieShade} />
        {/* hood collar */}
        <Block t={26} l={18} w={28} h={5} c={hoodieShade} />
        {/* green zip + pocket trim */}
        <Block t={30} l={30} w={4} h={30} c={trim} />
        <Block t={50} l={18} w={28} h={3} c={trim} />
        {/* arms */}
        <Block t={30} l={6} w={8} h={26} c={hoodie} />
        <Block t={30} l={50} w={8} h={26} c={hoodie} />
        <Block t={54} l={6} w={8} h={6} c={skin} />
        <Block t={54} l={50} w={8} h={6} c={skin} />
        {/* legs */}
        <Block t={62} l={18} w={12} h={20} c={pants} />
        <Block t={62} l={34} w={12} h={20} c={pants} />
        {/* shoes */}
        <Block t={80} l={16} w={14} h={6} c={shoe} />
        <Block t={80} l={34} w={14} h={6} c={shoe} />
      </div>
      {/* ground shadow */}
      <span
        className={`mt-1 rounded-full bg-black/45 blur-[1px] ${float ? "animate-bob" : ""}`}
        style={{ width: 40 * u, height: 7 * u }}
      />
    </div>
  );
}
