import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";
import { SITE_SETTINGS_QUERY, type SiteSettingsResult } from "./queries";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Read from the API directly rather than the CDN, since traffic is low
  // and this avoids the CDN lagging a few seconds behind a publish.
  useCdn: false,
  perspective: "published",
});

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: {
  query: string;
  params?: Record<string, unknown>;
  /** Cache tag(s) matching a document `_type`, busted by /api/revalidate on publish. */
  tags?: string[];
  /** Time-based fallback (seconds). Ignored when `tags` is non-empty — those
   *  are cached indefinitely until a webhook calls revalidateTag(). */
  revalidate?: number;
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: tags.length ? { tags, revalidate: false } : { revalidate },
  });
}

export const getSiteSettings = () =>
  sanityFetch<SiteSettingsResult>({
    query: SITE_SETTINGS_QUERY,
    tags: ["siteSettings"],
  });
