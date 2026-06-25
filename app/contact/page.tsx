import PageChrome from "@/components/PageChrome";
import PixelPanel from "@/components/pixel/PixelPanel";
import PixelButton from "@/components/pixel/PixelButton";
import ContactForm from "./ContactForm";
import ResumeViewer from "@/components/ResumeViewer";
import Reveal from "@/components/Reveal";
import ScrollReveal from "@/components/ScrollReveal";
import Parallax from "@/components/Parallax";
import { profile } from "@/lib/profile";

const contacts = [
  { icon: "✉", t: "EMAIL", d: profile.email, href: `mailto:${profile.email}`, tone: "text-green" },
  { icon: "in", t: "LINKEDIN", d: profile.linkedinLabel, href: profile.linkedin, tone: "text-cyan" },
  { icon: "GH", t: "GITHUB", d: profile.githubLabel, href: profile.github, tone: "text-purple" },
  { icon: "IG", t: "INSTAGRAM", d: profile.instagramLabel, href: profile.instagram, tone: "text-rose" },
  { icon: "📍", t: "LOCATION", d: profile.location, href: null, tone: "text-gold" },
];

export default function Contact() {
  return (
    <PageChrome>
      <Reveal className="text-center mt-6">
        <h1 className="font-pixel text-cyan text-[30px] md:text-[48px] leading-none text-shadow-blocky">CONTACT / RESUME</h1>
        <p className="font-body text-[20px] text-muted mt-4">
          <span className="text-gold">❖</span> Let&apos;s Connect &amp; Build Something Amazing! <span className="text-gold">❖</span>
        </p>
      </Reveal>

      <div className="relative max-w-[1300px] mx-auto py-12">
        <Parallax speed={0.6} className="pointer-events-none absolute -z-10 top-16 -right-10 w-72 h-72 blur-3xl opacity-30">
          <div className="w-full h-full" style={{ background: "radial-gradient(closest-side,rgba(184,60,255,.45),transparent)" }} />
        </Parallax>
        <Parallax speed={-0.5} className="pointer-events-none absolute -z-10 bottom-24 -left-10 w-72 h-72 blur-3xl opacity-30">
          <div className="w-full h-full" style={{ background: "radial-gradient(closest-side,rgba(76,201,255,.4),transparent)" }} />
        </Parallax>

        {/* resume (left, big) + contact & form (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          <ScrollReveal className="lg:col-span-3">
            <PixelPanel title="RESUME" accent="purple" icon={<span>📄</span>} glowing bodyClassName="">
              <ResumeViewer />
            </PixelPanel>
          </ScrollReveal>

          <div className="lg:col-span-2 space-y-6">
            <ScrollReveal>
              <PixelPanel title="GET IN TOUCH" accent="green" bodyClassName="space-y-3">
                {contacts.map((c) => {
                  const inner = (
                    <div className="flex items-center gap-3 bg-[#0f0a22] border-[3px] border-ink p-3 pixel-hoverable">
                      <span className="grid place-items-center w-10 h-10 bg-panel-2 border-[3px] border-ink font-pixel text-[11px] shrink-0">{c.icon}</span>
                      <div className="min-w-0">
                        <div className={`font-pixel text-[11px] ${c.tone}`}>{c.t}</div>
                        <div className="font-body text-[17px] text-muted truncate">{c.d}</div>
                      </div>
                    </div>
                  );
                  return c.href ? (
                    <a key={c.t} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block">{inner}</a>
                  ) : (<div key={c.t}>{inner}</div>);
                })}
              </PixelPanel>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <PixelPanel title="SEND A MESSAGE" accent="green" glowing bodyClassName="">
                <ContactForm />
              </PixelPanel>
            </ScrollReveal>
          </div>
        </div>

        {/* let's build — big CTA */}
        <ScrollReveal>
          <div className="mt-14 bg-panel border-[5px] border-purple/60 shadow-blocky-lg neon-purple p-8 sm:p-12 text-center">
            <h2 className="font-pixel text-purple text-[22px] sm:text-[36px] leading-tight text-shadow-blocky">LET&apos;S BUILD SOMETHING GREAT!</h2>
            <p className="font-body text-[20px] sm:text-[24px] text-muted mt-5 max-w-[640px] mx-auto">
              I&apos;m always open to exciting projects, collaborations, and opportunities — I usually reply within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-7">
              <a href={`mailto:${profile.email}`}><PixelButton variant="purple">✉ EMAIL ME</PixelButton></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><PixelButton variant="outline">in&nbsp; CONNECT ON LINKEDIN</PixelButton></a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageChrome>
  );
}
