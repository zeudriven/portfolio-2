"use client";

import { useState } from "react";
import PixelButton from "@/components/pixel/PixelButton";
import { PixelField, PixelTextarea } from "@/components/pixel/PixelInput";
import { profile } from "@/lib/profile";

/**
 * Contact form. If a Web3Forms access key is set in lib/profile.ts, the site
 * emails {profile.email} directly (no backend needed). Otherwise it falls back
 * to opening the visitor's mail client with a prefilled message.
 */
type Status = "idle" | "sending" | "ok" | "error" | "mail";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const subject = String(data.get("subject") || "Portfolio message");
    const message = String(data.get("message") || "");

    if (profile.web3formsKey) {
      // Send directly to the inbox via Web3Forms.
      setStatus("sending");
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: profile.web3formsKey,
            subject: `Portfolio: ${subject}`,
            from_name: name,
            name,
            email,
            message,
            replyto: email,
          }),
        });
        const json = await res.json();
        if (json.success) { setStatus("ok"); form.reset(); }
        else setStatus("error");
      } catch {
        setStatus("error");
      }
      return;
    }

    // Fallback: open the visitor's mail client.
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    setStatus("mail");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PixelField label="NAME" name="name" placeholder="Your Name" required />
      <PixelField label="EMAIL" name="email" placeholder="your@email.com" type="email" required />
      <PixelField label="SUBJECT" name="subject" placeholder="How can I help?" />
      <PixelTextarea label="MESSAGE" name="message" placeholder="Write your message here..." rows={7} required />
      <PixelButton variant="purple" className="w-full" type="submit">
        {status === "sending" ? "SENDING…" : "SEND MESSAGE ✈"}
      </PixelButton>
      {status === "ok" && <p className="font-body text-[16px] text-green text-center">✔ Message sent — I&apos;ll reply soon!</p>}
      {status === "mail" && <p className="font-body text-[16px] text-green text-center">Opening your mail app… or email me at {profile.email}</p>}
      {status === "error" && <p className="font-body text-[16px] text-rose text-center">Couldn&apos;t send — please email me at {profile.email}</p>}
    </form>
  );
}
