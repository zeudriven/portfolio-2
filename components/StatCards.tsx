/**
 * Bottom RPG-style stat cards — the quick recruiter summary.
 * TODO: confirm/replace facts (school, counts, experience) with Varun's real details.
 */
type Card = { icon: string; title: string; tone: string; l1: string; l2: string };

const cards: Card[] = [
  { icon: "🎓", title: "CS STUDENT", tone: "text-green", l1: "York University · Lassonde", l2: "BSc Computer Science '27" },
  { icon: "💼", title: "EXPERIENCE", tone: "text-cyan", l1: "AI Data Engineer @ Ayvelis AI", l2: "Director @ Enactus York" },
  { icon: "💻", title: "PROJECTS", tone: "text-purple", l1: "AI workflow engines · FinTech", l2: "FastAPI · React · LLMs" },
  { icon: "🏆", title: "ACHIEVEMENTS", tone: "text-gold", l1: "5+ awards · $6.8K+ won", l2: "Climathon · Hult · Enactus" },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div
          key={c.title}
          className="pixel-hoverable flex items-start gap-3 bg-panel/90 border-[2px] border-ink shadow-blocky p-4"
        >
          <span className="text-[26px] leading-none">{c.icon}</span>
          <div className="leading-tight">
            <div className={`font-pixel text-[11px] ${c.tone}`}>{c.title}</div>
            <div className="mt-2 font-body text-[17px] text-text">{c.l1}</div>
            <div className="font-body text-[16px] text-muted">{c.l2}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
