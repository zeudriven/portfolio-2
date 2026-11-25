/** Underline + green-glow key phrases inside a paragraph. */
export default function HighlightText({ text, terms }: { text: string; terms?: string[] }) {
  if (!terms || terms.length === 0) return <>{text}</>;
  const esc = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${esc.join("|")})`, "g");
  return (
    <>
      {text.split(re).map((part, i) =>
        terms.includes(part) ? (
          <span
            key={i}
            className="text-text underline decoration-green decoration-2 underline-offset-2"
            style={{ textShadow: "0 0 9px rgba(183,255,69,.75)" }}
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
