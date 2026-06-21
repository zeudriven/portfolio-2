/** Decorative sparkles revealed on hover (see .pixel-interactive in globals.css). */
const spots = [
  { top: "6px", left: "10px", size: "12px", delay: "0s" },
  { top: "14px", right: "14px", size: "9px", delay: "0.15s" },
  { bottom: "12px", left: "18px", size: "8px", delay: "0.3s" },
  { bottom: "10px", right: "12px", size: "13px", delay: "0.1s" },
  { top: "40%", right: "8px", size: "7px", delay: "0.25s" },
];

export default function Sparkles() {
  return (
    <>
      {spots.map((s, i) => (
        <span
          key={i}
          className="sparkle font-pixel"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            bottom: s.bottom,
            fontSize: s.size,
            animationDelay: s.delay,
          }}
        >
          ✦
        </span>
      ))}
    </>
  );
}
