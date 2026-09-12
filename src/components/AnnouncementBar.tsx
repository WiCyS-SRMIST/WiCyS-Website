import { sanityFetch } from "@/sanity/client";
import { ANNOUNCEMENTS_QUERY, type AnnouncementResult } from "@/sanity/queries";

export default async function AnnouncementBar() {
  const announcements = await sanityFetch<AnnouncementResult[]>({
    query: ANNOUNCEMENTS_QUERY,
    tags: ["announcement"],
  });
  const latest = announcements?.[0];
  if (!latest) return null;

  return (
    <div className="border-b border-border-soft bg-violet-deep/25">
      <p className="mx-auto flex max-w-6xl items-center gap-2 px-5 py-2 text-sm text-text sm:px-8">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
        <span className="truncate">{latest.title}</span>
      </p>
    </div>
  );
}
