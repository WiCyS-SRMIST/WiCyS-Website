import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

// `next.config.ts` has `images.unoptimized: true`, so <Image> emits this
// URL as-is (no /_next/image proxy, no `remotePatterns` needed). Always
// call .width()/.height() and pass matching dimensions to <Image>. If
// optimization is ever turned back on, add
// `images: { remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }] }`
// to next.config.ts.
export function urlForImage(source: Image) {
  return builder.image(source).auto("format").fit("max");
}
