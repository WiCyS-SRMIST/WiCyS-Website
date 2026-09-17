import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { sanityFetch } from "@/sanity/client";
import { CONTACT_QUERY, type ContactResult } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the WiCyS SRMIST chapter — email, social channels, and a message form.",
};

// Fallback re-fetch interval — the /api/revalidate webhook does the real work.
export const revalidate = 3600;

const fallbackChannels = [
  { label: "Email", value: "wicys@srmist.edu.in", href: "mailto:wicys@srmist.edu.in" },
  { label: "Instagram", value: "@wicys_srmist", href: "https://instagram.com/wicys_srmist" },
  { label: "LinkedIn", value: "WiCyS SRMIST", href: "https://linkedin.com/company/wicys-srmist" },
  { label: "Discord", value: "Join the server", href: "https://discord.gg/wicys-srmist" },
];

export default async function Contact() {
  const contact = await sanityFetch<ContactResult>({
    query: CONTACT_QUERY,
    tags: ["contactInfo"],
  });
  const channels = contact?.channels?.length
    ? contact.channels
    : fallbackChannels;

  return (
    <div className="flex flex-col gap-10 pt-6 sm:gap-14 sm:pt-10 md:pt-16">
      <header className="max-w-2xl">
        <h1 className="text-fluid-h1 font-display font-semibold tracking-tight text-text">
          {contact?.heading ?? "Get in touch"}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-muted">
          {contact?.intro ??
            "Questions about joining, an idea for a session, or a partnership — any of these reaches us."}
        </p>
      </header>

      <div className="grid gap-12 md:grid-cols-2">
        <Reveal as="section">
          <h2 className="font-display text-xl font-semibold text-text">
            {contact?.channelsHeading ?? "Channels"}
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
            {contact?.formHeading ?? "Send a message"}
          </h2>
          <div className="mt-5">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
