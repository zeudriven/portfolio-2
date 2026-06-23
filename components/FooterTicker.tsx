export default function FooterTicker({
  text = "Crafting digital experiences, one pixel at a time.",
}: {
  text?: string;
}) {
  return (
    <footer className="text-center py-6 font-body text-[18px] text-muted">
      <span className="text-cyan mr-2">◆◆</span>
      {text}
      <span className="text-cyan ml-2">◆◆</span>
    </footer>
  );
}
