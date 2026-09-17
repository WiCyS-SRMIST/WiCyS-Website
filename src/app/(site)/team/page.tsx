import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { sanityFetch } from "@/sanity/client";
import { TEAM_QUERY, type TeamMemberResult } from "@/sanity/queries";
import { urlForImage } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The students and faculty advisor leading the WiCyS SRMIST chapter.",
};

// Fallback re-fetch interval — the /api/revalidate webhook does the real work.
export const revalidate = 3600;

function initials(name: string) {
  return name
    .replace(/^(Dr|Prof)\.?\s+/i, "")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export default async function Team() {
  const members = await sanityFetch<TeamMemberResult[]>({
    query: TEAM_QUERY,
    tags: ["teamMember"],
  });

  return (
    <div className="flex flex-col gap-10 pt-6 sm:gap-14 sm:pt-10 md:pt-16">
      <header className="max-w-2xl">
        <h1 className="text-fluid-h1 font-display font-semibold tracking-tight text-text">
          The team
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-muted">
          A student-run board, one faculty advisor, and a lot of members who
          show up. This is the group that plans the calendar and keeps things
          moving.
        </p>
      </header>

      {members.length === 0 ? (
        <p className="text-text-muted">
          The roster is being updated — check back soon.
        </p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => (
            <Reveal
              as="li"
              key={member._id}
              delay={(i % 3) * 80}
              className="ring-brand flex flex-col rounded-2xl bg-surface/50 p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                {member.photo?.asset ? (
                  <Image
                    src={urlForImage(member.photo).width(96).height(96).url()}
                    alt={member.photo.alt ?? member.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-violet-deep/40 font-display text-base font-semibold text-text">
                    {initials(member.name)}
                  </span>
                )}
                <div>
                  <h2 className="font-display font-semibold text-text">
                    {member.name}
                  </h2>
                  <p className="text-sm text-green">{member.role}</p>
                </div>
              </div>
              {member.bio && (
                <p className="mt-4 text-sm leading-relaxed text-text-muted">
                  {member.bio}
                </p>
              )}
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}
