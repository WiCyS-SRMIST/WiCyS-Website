import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the WiCyS SRMIST chapter — email, social channels, and a message form.",
};

const channels = [
  { label: "Email", value: "wicys@srmist.edu.in", href: "mailto:wicys@srmist.edu.in" },
  { label: "Instagram", value: "@wicys_srmist", href: "https://instagram.com/wicys_srmist" },
  { label: "LinkedIn", value: "WiCyS SRMIST", href: "https://linkedin.com/company/wicys-srmist" },
  { label: "Discord", value: "Join the server", href: "https://discord.gg/wicys-srmist" },
];

export default function Contact() {
  return (
    <div className="flex flex-col gap-14 pt-10 md:pt-16">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
          Get in touch
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-muted">
          Questions about joining, an idea for a session, or a partnership — any
          of these reaches us.
        </p>
      </header>

      <div className="grid gap-12 md:grid-cols-2">
        <Reveal as="section">
          <h2 className="font-display text-xl font-semibold text-text">
            Channels
          </h2>
          <ul className="mt-5 flex flex-col divide-y divide-border border-y border-border">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4"
                >
                  <span className="text-text-faint">{c.label}</span>
                  <span className="text-text transition-colors group-hover:text-green">
                    {c.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" delay={80}>
          <h2 className="font-display text-xl font-semibold text-text">
            Send a message
          </h2>
          <div className="mt-5">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
