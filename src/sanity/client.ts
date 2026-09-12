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
  revalidate = 60,
}: {
  query: string;
  params?: Record<string, unknown>;
  revalidate?: number;
}): Promise<T> {
  return client.fetch<T>(query, params, { next: { revalidate } });
}

export const getSiteSettings = () =>
  sanityFetch<SiteSettingsResult>({ query: SITE_SETTINGS_QUERY });
