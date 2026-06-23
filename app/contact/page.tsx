import PageChrome from "@/components/PageChrome";
import PixelPanel from "@/components/pixel/PixelPanel";
import PixelButton from "@/components/pixel/PixelButton";
import ArtSlot from "@/components/pixel/ArtSlot";
import ContactForm from "./ContactForm";
import Reveal from "@/components/Reveal";
import { profile } from "@/lib/profile";

const contacts = [
  { icon: "✉", t: "EMAIL", d: profile.email, href: `mailto:${profile.email}`, tone: "text-green" },
  { icon: "in", t: "LINKEDIN", d: profile.linkedinLabel, href: profile.linkedin, tone: "text-cyan" },
  { icon: "GH", t: "GITHUB", d: profile.githubLabel, href: profile.github, tone: "text-purple" },
  { icon: "📍", t: "LOCATION", d: profile.location, href: null, tone: "text-rose" },
  { icon: "🕒", t: "TIMEZONE", d: profile.timezone, href: null, tone: "text-gold" },
];

export default function Contact() {
  return (
    <PageChrome>
      <Reveal className="text-center mt-6">
        <h1 className="font-pixel text-cyan text-[30px] md:text-[48px] leading-none text-shadow-blocky">
          CONTACT / RESUME
        </h1>
        <p className="font-body text-[20px] text-muted mt-4">
          <span className="text-orange">❖</span> Let&apos;s Connect &amp; Build Something Amazing! <span className="text-orange">❖</span>
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8">
        {/* get in touch */}
        <PixelPanel title="GET IN TOUCH" accent="green" bodyClassName="space-y-3">
          {contacts.map((c) => {
            const inner = (
              <div className="flex items-center gap-3 bg-[#0f0a22] border-[3px] border-ink p-3 pixel-hoverable">
                <span className="grid place-items-center w-10 h-10 bg-panel-2 border-[3px] border-ink font-pixel text-[11px] shrink-0">
                  {c.icon}
                </span>
                <div className="min-w-0">
                  <div className={`font-pixel text-[11px] ${c.tone}`}>{c.t}</div>
                  <div className="font-body text-[17px] text-muted truncate">{c.d}</div>
                </div>
              </div>
            );
            return c.href ? (
              <a
                key={c.t}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="block"
              >
                {inner}
              </a>
            ) : (
              <div key={c.t}>{inner}</div>
            );
          })}
        </PixelPanel>

        {/* message form */}
        <PixelPanel title="SEND A MESSAGE" accent="green" glowing bodyClassName="">
          <ContactForm />
        </PixelPanel>

        {/* resume + portal */}
        <div className="space-y-5">
          <PixelPanel title="RESUME" accent="green" bodyClassName="space-y-4">
            <p className="font-body text-[18px] text-muted">
              Explore my experience, skills, and journey in detail.
            </p>
            <PixelButton variant="purple" className="w-full">VIEW RESUME 👁</PixelButton>
            <div className="text-center font-pixel text-[10px] text-muted">— OR —</div>
            <PixelButton variant="outline" className="w-full">DOWNLOAD PDF ⬇</PixelButton>
            <div className="text-center font-body text-[15px] text-muted">( add resume.pdf to /public )</div>
          </PixelPanel>

          <div className="flex justify-center py-2">
            <div className="animate-float">
              <ArtSlot src="/assets/portal.png" alt="Portal" size={132} corners={false} />
            </div>
          </div>

          <PixelPanel title="LET'S BUILD SOMETHING GREAT! ✦" accent="purple" bodyClassName="">
            <p className="font-body text-[17px] text-muted">
              I&apos;m always open to exciting projects, collaborations, and opportunities.
              I usually reply within 24 hours!
            </p>
          </PixelPanel>
        </div>
      </div>
    </PageChrome>
  );
}
