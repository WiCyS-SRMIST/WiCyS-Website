import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export const runtime = "nodejs";

const SINGLETON_TAGS = new Set(["siteSettings", "homePage", "aboutPage", "contactInfo"]);

interface WebhookPayload {
  _type?: string;
  _id?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { revalidated: false, message: "Invalid signature" },
        { status: 401 },
      );
    }

    const type = body?._type;
    if (!type) {
      return NextResponse.json(
        { revalidated: false, message: "Missing _type in payload" },
        { status: 400 },
      );
    }

    const tags = [type];
    // siteSettings backs the header/footer on every page — always bust it too
    // when a different singleton changes shouldn't be needed, but a
    // siteSettings edit itself already tags as "siteSettings" above.
    if (SINGLETON_TAGS.has(type)) tags.push("siteSettings");

    // Next 16 requires a cache-life profile as the 2nd argument. Our tagged
    // fetches use `revalidate: false` (cached until explicitly busted), so
    // "max" is the matching profile — this call is what busts them.
    tags.forEach((tag) => revalidateTag(tag, "max"));

    return NextResponse.json({ revalidated: true, now: Date.now(), tags });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ revalidated: false, message }, { status: 500 });
  }
}
