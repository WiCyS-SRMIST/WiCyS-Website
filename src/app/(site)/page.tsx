import Link from "next/link";
import CtfChallenge from "@/components/CtfChallenge";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { sanityFetch } from "@/sanity/client";
import { HOME_QUERY, type HomeResult } from "@/sanity/queries";

// Fallback re-fetch interval — the /api/revalidate webhook does the real work.
export const revalidate = 3600;

const fallbackOfferings = [
  {
    title: "Workshops & labs",
    body: "Hands-on sessions on web security, networking, cryptography, and tooling — no prior experience assumed.",
  },
  {
    title: "Capture the Flag",
    body: "Weekly practice and travel teams for national and global CTFs, with writeups reviewed together afterwards.",
  },
  {
    title: "Speaker sessions",
    body: "Practitioners from SOCs, red teams, and product security talk about the work and how they got there.",
  },
  {
    title: "Mentorship circles",
    body: "Small groups pairing newer members with seniors and alumni for guidance on skills, internships, and interviews.",
  },
];

const fallbackStats = [
  { value: 120, suffix: "+", label: "Active members" },
  { value: 24, label: "Events a year" },
  { value: 3, label: "CTF teams" },
  { value: 2019, label: "Chartered" },
];

export default async function Home() {
  const home = await sanityFetch<HomeResult>({
    query: HOME_QUERY,
    tags: ["homePage"],
  });

  const offerings =
    home?.offerings?.length ? home.offerings : fallbackOfferings;
  const stats = home?.stats?.length ? home.stats : fallbackStats;
  const heroPrimaryCta = home?.heroPrimaryCta ?? {
    label: "Join the chapter",
    href: "/contact",
  };
  const heroSecondaryCta = home?.heroSecondaryCta ?? {
    label: "What we do",
    href: "/about",
  };

  return (
    <div className="flex flex-col gap-24 pt-14 md:gap-36 md:pt-20">
      {/* Hero */}
      <section className="grid items-center gap-12 md:grid-cols-[1.08fr_0.92fr] md:gap-6">
        <div>
          <h1 className="text-fluid-hero rise rise-1 font-display font-semibold leading-[1.03] tracking-[-0.02em] text-text">
            {home?.heroHeading ??
              "Women, building the skills to defend the internet."}
            <svg
              viewBox="0 0 320 12"
              preserveAspectRatio="none"
              aria-hidden
              className="mt-3 h-2.5 w-56 max-w-[70%] text-green"
            >
              <path
                d="M2 7C60 2 120 2 174 6c40 3 90 3 144-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="mesh-line"
                pathLength={1}
              />
            </svg>
          </h1>
          <p className="rise rise-2 mt-6 max-w-lg text-lg leading-relaxed text-text-muted">
            {home?.heroBody ??
              "WiCyS SRMIST is a student community where women dig into cybersecurity together — breaking things in the lab, defending them in CTFs, and building the network to take it professional."}
          </p>
          <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
            <Link
              href={heroPrimaryCta.href}
              className="sheen rounded-full bg-green px-5 py-2.5 font-semibold text-on-green transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {heroPrimaryCta.label}
            </Link>
            <Link
              href={heroSecondaryCta.href}
              className="rounded-full border border-border px-5 py-2.5 font-semibold text-text transition-colors hover:border-green hover:text-green"
            >
              {heroSecondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="rise rise-3 relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="pointer-events-none absolute inset-6 rounded-full bg-violet/20 blur-3xl" />
          <CtfChallenge />
        </div>
      </section>

      {/* Offerings */}
      <Reveal as="section">
        <h2 className="text-fluid-h2 max-w-xl font-display font-semibold tracking-tight text-text">
          {home?.offeringsHeading ?? "What a semester with us looks like"}
        </h2>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {offerings.map((o, i) => (
            <div key={o.title} className="border-t border-border pt-4">
              <h3 className="flex items-baseline gap-2 font-display text-lg font-semibold text-text">
                <span
                  aria-hidden
                  className={i % 2 ? "text-teal" : "text-green"}
                >
                  /
                </span>
                {o.title}
              </h3>
              <p className="mt-2 leading-relaxed text-text-muted">{o.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Stats */}
      <Reveal
        as="section"
        className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="bg-bg-2 px-5 py-9 text-center">
            <div className="font-display text-3xl font-semibold text-green">
              <CountUp value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-sm text-text-faint">{s.label}</div>
          </div>
        ))}
      </Reveal>

      {/* Closing CTA */}
      <Reveal
        as="section"
        className="ring-brand overflow-hidden rounded-3xl bg-gradient-to-br from-surface-2 to-bg-2 px-6 py-14 text-center sm:px-12 sm:py-20"
      >
        <h2 className="text-fluid-h2 mx-auto max-w-xl font-display font-semibold tracking-tight text-text">
          {home?.closingCtaHeading ??
            "You don't need to know where to start. That's what the chapter is for."}
        </h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-text-muted">
          {home?.closingCtaBody ??
            "Open to all students at SRMIST, every year and every branch. Come to one session and see."}
        </p>
        <Link
          href={home?.closingCta?.href ?? "/contact"}
          className="sheen mt-8 inline-flex rounded-full bg-green px-6 py-3 font-semibold text-on-green transition-transform hover:-translate-y-0.5"
        >
          {home?.closingCta?.label ?? "Get in touch"}
        </Link>
      </Reveal>
    </div>
  );
}
