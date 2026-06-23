/**
 * Bottom RPG-style stat cards — the quick recruiter summary.
 * TODO: confirm/replace facts (school, counts, experience) with Varun's real details.
 */
type Card = { icon: string; title: string; tone: string; l1: string; l2: string };

const cards: Card[] = [
  { icon: "🎓", title: "CS STUDENT", tone: "text-green", l1: "York University", l2: "Passionate Builder" },
  { icon: "💻", title: "PROJECTS", tone: "text-cyan", l1: "10+ Completed", l2: "Real-World Applications" },
  { icon: "💼", title: "EXPERIENCE", tone: "text-purple", l1: "Internships · Leadership", l2: "Hackathons" },
  { icon: "📬", title: "CONTACT", tone: "text-gold", l1: "Open to Opportunities", l2: "Let's Build Something Great" },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div
          key={c.title}
          className="pixel-hoverable flex items-start gap-3 bg-panel/90 border-[4px] border-ink shadow-blocky p-4"
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
