"use client";

import { useState } from "react";
import PixelButton from "@/components/pixel/PixelButton";
import { PixelField, PixelTextarea } from "@/components/pixel/PixelInput";
import { profile } from "@/lib/profile";

/**
 * Visual-first contact form. For now it opens the user's mail client with a
 * prefilled message to {profile.email}. Later this will POST to an API route
 * (e.g. Resend / Nodemailer) so the website sends the email automatically —
 * see the TODO below.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const subject = String(data.get("subject") || "Portfolio message");
    const message = String(data.get("message") || "");

    // TODO (next pass): replace mailto with a fetch('/api/contact', { method:'POST', body })
    // backed by Resend/Nodemailer so the site emails varunmkpatel12@gmail.com directly.
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PixelField label="NAME" name="name" placeholder="Your Name" required />
      <PixelField label="EMAIL" name="email" placeholder="your@email.com" type="email" required />
      <PixelField label="SUBJECT" name="subject" placeholder="How can I help?" />
      <PixelTextarea label="MESSAGE" name="message" placeholder="Write your message here..." rows={4} required />
      <PixelButton variant="purple" className="w-full" type="submit">
        SEND MESSAGE ✈
      </PixelButton>
      {sent && (
        <p className="font-body text-[16px] text-green text-center">
          Opening your mail app… you can also reach me at {profile.email}
        </p>
      )}
    </form>
  );
}
