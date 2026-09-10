import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who WiCyS SRMIST is, why the chapter exists, and what we value as a community of women in cybersecurity.",
};

const values = [
  {
    term: "Community first",
    def: "A place where women and allies can ask the basic question, share the half-finished project, and find someone who has been there.",
  },
  {
    term: "Learning by doing",
    def: "Workshops, CTFs, and labs that put hands on keyboards. Theory matters, but it sticks when you have broken something with it.",
  },
  {
    term: "Access",
    def: "Every session is free and open to any SRMIST student. We meet people where they are instead of assuming a starting point.",
  },
  {
    term: "Leadership in practice",
    def: "Members run the events, lead the teams, and represent the chapter externally — the resume line is a side effect of the real thing.",
  },
];

export default function About() {
  return (
    <div className="flex flex-col gap-20 pt-10 md:pt-16">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
          About the chapter
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-muted">
          Women in Cybersecurity (WiCyS) is the global organization working on
          the recruitment, retention, and advancement of women in the field. Our
          SRMIST student chapter brings that work to campus — a group of students
          learning security together and building the network to carry it into
          careers.
        </p>
      </header>

      <Reveal as="section" className="grid gap-8 md:grid-cols-2">
        <div className="ring-brand rounded-2xl bg-surface/50 p-7">
          <h2 className="font-display text-xl font-semibold text-text">
            Our mission
          </h2>
          <p className="mt-3 leading-relaxed text-text-muted">
            Build a durable community of women in cybersecurity at SRMIST by
            providing training, mentorship, and a way in. We think a more
            representative security workforce is a stronger one — for the people
            in it and for everyone it protects.
          </p>
        </div>
        <div className="ring-brand rounded-2xl bg-surface/50 p-7">
          <h2 className="font-display text-xl font-semibold text-text">
            Why it exists
          </h2>
          <p className="mt-3 leading-relaxed text-text-muted">
            Women hold under a quarter of cybersecurity roles worldwide, and the
            gap starts early — often before the first internship. The chapter is
            one answer: a supportive place to get technical, get connected, and
            stay in the field.
          </p>
        </div>
      </Reveal>

      <Reveal as="section">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-text sm:text-3xl">
          What we value
        </h2>
        <dl className="mt-10 flex flex-col divide-y divide-border border-y border-border">
          {values.map((v) => (
            <div
              key={v.term}
              className="grid gap-2 py-6 md:grid-cols-[16rem_1fr] md:gap-8"
            >
              <dt className="font-display text-lg font-semibold text-text">
                {v.term}
              </dt>
              <dd className="leading-relaxed text-text-muted">{v.def}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-bg-2 px-6 py-6">
        <p className="text-text-muted">Meet the people who run it.</p>
        <Link
          href="/team"
          className="rounded-full border border-border px-5 py-2.5 font-semibold text-text transition-colors hover:border-green hover:text-green"
        >
          See the team
        </Link>
      </section>
    </div>
  );
}
