import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { sanityFetch } from "@/sanity/client";
import {
  EVENTS_UPCOMING_QUERY,
  EVENTS_PAST_QUERY,
  type EventResult,
} from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Workshops, CTFs, and talks hosted by the WiCyS SRMIST chapter — what's coming up and what we've run.",
};

export const revalidate = 60;

const trackColor: Record<string, string> = {
  workshop: "text-green",
  ctf: "text-violet",
  speaker: "text-teal",
  mentorship: "text-gold",
  other: "text-text-faint",
};

const trackLabel: Record<string, string> = {
  workshop: "Workshop",
  ctf: "CTF",
  speaker: "Talk",
  mentorship: "Mentorship",
  other: "Event",
};

function fmt(iso: string) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    mon: d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
    full: d.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }),
    time: d.toLocaleTimeString("en-GB", {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
}

function EventRow({ e, dim = false }: { e: EventResult; dim?: boolean }) {
  const d = fmt(e.date);
  const type = e.type ?? "other";
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
          <span className={`text-xs font-medium ${trackColor[type]}`}>
            {trackLabel[type]}
          </span>
        </div>
        <p className="mt-1 text-sm text-text-faint">
          {d.full} · {d.time}
          {e.location ? ` · ${e.location}` : ""}
        </p>
        {e.summary && (
          <p className="mt-2 max-w-prose leading-relaxed text-text-muted">
            {e.summary}
          </p>
        )}
      </div>
    </div>
  );
}

export default async function Events() {
  const [upcoming, past] = await Promise.all([
    sanityFetch<EventResult[]>({ query: EVENTS_UPCOMING_QUERY }),
    sanityFetch<EventResult[]>({ query: EVENTS_PAST_QUERY }),
  ]);
  const [next, ...rest] = upcoming;

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

      {next ? (
        <Reveal
          as="section"
          className="ring-brand overflow-hidden rounded-3xl bg-gradient-to-br from-surface-2 to-bg-2 p-7 sm:p-10"
        >
          <p className="text-sm text-text-faint">Next up</p>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2 className="font-display text-2xl font-semibold text-text sm:text-3xl">
              {next.title}
            </h2>
            <span className={`text-sm font-medium ${trackColor[next.type ?? "other"]}`}>
              {trackLabel[next.type ?? "other"]}
            </span>
          </div>
          <p className="mt-2 text-text-muted">
            {fmt(next.date).full} · {fmt(next.date).time}
            {next.location ? ` · ${next.location}` : ""}
          </p>
          {next.summary && (
            <p className="mt-4 max-w-prose leading-relaxed text-text-muted">
              {next.summary}
            </p>
          )}
          <Link
            href={next.registrationUrl || "/contact"}
            target={next.registrationUrl ? "_blank" : undefined}
            rel={next.registrationUrl ? "noopener noreferrer" : undefined}
            className="sheen mt-6 inline-flex rounded-full bg-green px-5 py-2.5 font-semibold text-on-green transition-transform hover:-translate-y-0.5"
          >
            {next.registrationUrl ? "Register" : "Ask to be added"}
          </Link>
        </Reveal>
      ) : (
        <Reveal
          as="section"
          className="rounded-3xl border border-border bg-surface/40 p-8 text-center"
        >
          <p className="text-text-muted">
            No upcoming events right now — check back soon.
          </p>
        </Reveal>
      )}

      {rest.length > 0 && (
        <Reveal as="section">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-text">
            Also coming up
          </h2>
          <div className="mt-6">
            {rest.map((e) => (
              <EventRow key={e._id} e={e} />
            ))}
          </div>
        </Reveal>
      )}

      {past.length > 0 && (
        <Reveal as="section">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-text">
            Recently
          </h2>
          <div className="mt-6">
            {past.map((e) => (
              <EventRow key={e._id} e={e} dim />
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
