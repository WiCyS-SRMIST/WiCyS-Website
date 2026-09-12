# WiCyS SRMIST

The website for the [Women in Cybersecurity](https://www.wicys.org/) student chapter at
SRM Institute of Science and Technology — [wicys-srmist.vercel.app](https://wicys-srmist.vercel.app).

Built with Next.js 16 (App Router, Turbopack), Tailwind CSS v4, and [Sanity](https://www.sanity.io/)
as a headless CMS, so the team can update the roster, events, and copy from a web UI
without touching code.

## Stack

- **Framework:** Next.js 16 + React 19, TypeScript, package manager [Bun](https://bun.sh)
- **Styling:** Tailwind CSS v4 (CSS-based theme in `src/app/globals.css`), Bricolage Grotesque + IBM Plex Sans
- **Content:** Sanity — schema in `src/sanity/schemaTypes/`, Studio embedded at `/studio`
- **Hosting:** Vercel, with ISR + a Sanity webhook for near-instant content updates

## Getting started

```bash
bun install
cp .env.example .env.local   # fill in the Sanity values below
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site, or
[http://localhost:3000/studio](http://localhost:3000/studio) to edit content (Sanity-hosted login).

### Environment variables

Set these in `.env.local` (never committed) and in Vercel's project settings
(Production + Preview):

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | sanity.io/manage → project → Settings → API |
| `NEXT_PUBLIC_SANITY_DATASET` | usually `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | a fixed date, e.g. `2025-02-19` — keep as-is unless you know why you're changing it |
| `SANITY_REVALIDATE_SECRET` | any random string — must match the Secret on the Sanity webhook (see below) |

## Scripts

| Command | What it does |
|---|---|
| `bun run dev` | Local dev server (Turbopack) |
| `bun run build` | Production build |
| `bun run start` | Serve a production build locally |
| `bun run lint` | ESLint |
| `bun run typegen` | Extract the Sanity schema and regenerate `src/sanity/schema.json` + `src/sanity/types.gen.ts` — run after editing schema files or GROQ queries, then commit the output |
| `bun run seed` | Import `scripts/seed.ndjson` into the `production` dataset (`--replace`, safe to re-run) |
| `bun run sanity` | Passthrough to the Sanity CLI |

## Editing content

Day-to-day updates (team roster, events, home/about/contact copy, announcements) don't
need a code change — go to `/studio` on the deployed site, log in, and edit. Publishing
triggers a webhook that revalidates just the affected page within a few seconds; if the
webhook is ever misconfigured, every page still re-fetches at least once an hour as a
fallback (see `src/sanity/client.ts`).

To add another editor: sanity.io/manage → project → Members → invite them, no code
changes needed.

## Project structure

```
src/
  app/
    (site)/       the public site — pages, layout, entrance-transition template
    studio/       the embedded Sanity Studio ([[...tool]] catch-all route)
    api/          the /api/revalidate webhook handler
  components/     shared UI (nav, footer, CTF widget, Portable Text renderer, ...)
  sanity/         Sanity client, GROQ queries, image helper, schema types
sanity.config.ts  Studio configuration (schema, structure, plugins)
scripts/seed.ndjson  placeholder content used to seed a fresh dataset
```

## Deployment

Pushing to `main` deploys to Vercel automatically. The production build needs the four
env vars above set in Vercel; without them, every page fails at build time (they're
required, not optional — see `src/sanity/env.ts`).

To wire up (or move) the revalidation webhook: sanity.io/manage → project → API →
Webhooks → create one pointing at `https://<your-domain>/api/revalidate`, dataset
`production`, triggered on Create/Update/Delete, with the same secret as
`SANITY_REVALIDATE_SECRET` and projection `{"_type": _type}`.
