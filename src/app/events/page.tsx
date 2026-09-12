import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { upcoming, past, type ClubEvent } from "@/data/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Workshops, CTFs, and talks hosted by the WiCyS SRMIST chapter — what's coming up and what we've run.",
};

const trackColor: Record<ClubEvent["track"], string> = {
  Workshop: "text-green",
  CTF: "text-violet",
  Talk: "text-teal",
  Community: "text-gold",
};

function fmt(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    mon: d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
    full: d.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }),
  };
}

function EventRow({ e, dim = false }: { e: ClubEvent; dim?: boolean }) {
  const d = fmt(e.date);
  return (
    <div
      className={`flex gap-5 border-t border-border py-6 ${dim ? "opacity-60" : ""}`}
    >
      <div className="w-14 shrink-0 text-center">
        <div className="font-display text-2xl font-semibold leading-none text-text">
          {d.day}
        </div>
        <div className="mt-1 text-[0.7rem] tracking-widest text-text-faint">
          {d.mon}
        </div>
      </div>
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-lg font-semibold text-text">
            {e.title}
          </h3>
          <span className={`text-xs font-medium ${trackColor[e.track]}`}>
            {e.track}
          </span>
        </div>
        <p className="mt-1 text-sm text-text-faint">
          {d.full} · {e.time} · {e.venue}
        </p>
        <p className="mt-2 max-w-prose leading-relaxed text-text-muted">
          {e.blurb}
        </p>
      </div>
    </div>
  );
}

export default function Events() {
  const [next, ...rest] = upcoming;
  const nd = fmt(next.date);

  return (
    <div className="flex flex-col gap-16 pt-10 md:pt-16">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
          Events
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-muted">
          Most weeks there is something — a workshop, a CTF, or a talk. All
          sessions are free and open to any SRMIST student.
        </p>
      </header>

      {/* Next up */}
      <Reveal
        as="section"
        className="ring-brand overflow-hidden rounded-3xl bg-gradient-to-br from-surface-2 to-bg-2 p-7 sm:p-10"
      >
        <p className="text-sm text-text-faint">Next up</p>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h2 className="font-display text-2xl font-semibold text-text sm:text-3xl">
            {next.title}
          </h2>
          <span className={`text-sm font-medium ${trackColor[next.track]}`}>
            {next.track}
          </span>
        </div>
        <p className="mt-2 text-text-muted">
          {nd.full} · {next.time} · {next.venue}
        </p>
        <p className="mt-4 max-w-prose leading-relaxed text-text-muted">
          {next.blurb}
        </p>
        <Link
          href="/contact"
          className="sheen mt-6 inline-flex rounded-full bg-green px-5 py-2.5 font-semibold text-on-green transition-transform hover:-translate-y-0.5"
        >
          Ask to be added
        </Link>
      </Reveal>

      <Reveal as="section">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-text">
          Also coming up
        </h2>
        <div className="mt-6">
          {rest.map((e) => (
            <EventRow key={e.title} e={e} />
          ))}
        </div>
      </Reveal>

      <Reveal as="section">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-text">
          Recently
        </h2>
        <div className="mt-6">
          {past.map((e) => (
            <EventRow key={e.title} e={e} dim />
          ))}
        </div>
      </Reveal>

      <p className="text-sm text-text-faint">
        Placeholder calendar — the live schedule lives in{" "}
        <code className="text-text-muted">src/data/events.ts</code>.
      </p>
    </div>
  );
}
