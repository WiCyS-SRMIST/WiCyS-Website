import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { teamMembers } from "@/data/team";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The students and faculty advisor leading the WiCyS SRMIST chapter.",
};

function initials(name: string) {
  return name
    .replace(/^(Dr|Prof)\.?\s+/i, "")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export default function Team() {
  return (
    <div className="flex flex-col gap-14 pt-10 md:pt-16">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
          The team
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-muted">
          A student-run board, one faculty advisor, and a lot of members who
          show up. This is the group that plans the calendar and keeps things
          moving.
        </p>
      </header>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, i) => (
          <Reveal
            as="li"
            key={member.name}
            delay={(i % 3) * 80}
            className="ring-brand flex flex-col rounded-2xl bg-surface/50 p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-violet-deep/40 font-display text-base font-semibold text-text">
                {initials(member.name)}
              </span>
              <div>
                <h2 className="font-display font-semibold text-text">
                  {member.name}
                </h2>
                <p className="text-sm text-green">{member.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              {member.bio}
            </p>
          </Reveal>
        ))}
      </ul>

      <p className="text-sm text-text-faint">
        Placeholder roster — swap in the current board in{" "}
        <code className="text-text-muted">src/data/team.ts</code>.
      </p>
    </div>
  );
}
