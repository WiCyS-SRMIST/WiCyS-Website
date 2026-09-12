import { defineQuery } from "next-sanity";
import type { Image } from "sanity";

// ---- shared field shapes -------------------------------------------------

export interface CtaLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: "email" | "instagram" | "linkedin" | "discord" | "github";
  url: string;
}

export interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

export interface SanityImageWithAlt extends Image {
  alt?: string;
}

// ---- site settings --------------------------------------------------------

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    wordmarkSuffix,
    headerCta,
    footerTagline,
    footerAffiliationLine,
    socials[]{ platform, url }
  }
`);

export interface SiteSettingsResult {
  wordmarkSuffix?: string;
  headerCta?: CtaLink;
  footerTagline?: string;
  footerAffiliationLine?: string;
  socials?: SocialLink[];
}

// ---- home page --------------------------------------------------------

export const HOME_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    heroHeading,
    heroBody,
    heroPrimaryCta,
    heroSecondaryCta,
    offeringsHeading,
    offerings[]{ title, body },
    stats[]{ value, suffix, label },
    closingCtaHeading,
    closingCtaBody,
    closingCta
  }
`);

export interface HomeResult {
  heroHeading?: string;
  heroBody?: string;
  heroPrimaryCta?: CtaLink;
  heroSecondaryCta?: CtaLink;
  offeringsHeading?: string;
  offerings?: { title: string; body: string }[];
  stats?: StatItem[];
  closingCtaHeading?: string;
  closingCtaBody?: string;
  closingCta?: CtaLink;
}

// ---- about page --------------------------------------------------------

export const ABOUT_QUERY = defineQuery(`
  *[_type == "aboutPage"][0]{
    heading,
    intro,
    missionTitle,
    missionBody,
    whyTitle,
    whyBody,
    valuesHeading,
    values[]{ term, def },
    teamCtaText
  }
`);

export interface AboutResult {
  heading?: string;
  intro?: string;
  missionTitle?: string;
  missionBody?: unknown;
  whyTitle?: string;
  whyBody?: unknown;
  valuesHeading?: string;
  values?: { term: string; def: string }[];
  teamCtaText?: string;
}

// ---- contact page --------------------------------------------------------

export const CONTACT_QUERY = defineQuery(`
  *[_type == "contactInfo"][0]{
    heading,
    intro,
    channelsHeading,
    channels[]{ label, value, href, kind },
    formHeading
  }
`);

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  kind: string;
}

export interface ContactResult {
  heading?: string;
  intro?: string;
  channelsHeading?: string;
  channels?: ContactChannel[];
  formHeading?: string;
}

// ---- team --------------------------------------------------------

export const TEAM_QUERY = defineQuery(`
  *[_type == "teamMember"] | order(isFacultyAdvisor desc, order asc, name asc){
    _id,
    name,
    role,
    isFacultyAdvisor,
    category,
    bio,
    "photo": photo{..., "alt": alt},
    socials[]{ platform, url }
  }
`);

export interface TeamMemberResult {
  _id: string;
  name: string;
  role: string;
  isFacultyAdvisor?: boolean;
  category?: string;
  bio?: string;
  photo?: SanityImageWithAlt;
  socials?: SocialLink[];
}

// ---- events --------------------------------------------------------

export const EVENTS_UPCOMING_QUERY = defineQuery(`
  *[_type == "event" && coalesce(endDate, date) >= now()] | order(date asc){
    _id,
    title,
    "slug": slug.current,
    date,
    endDate,
    location,
    type,
    summary,
    "image": image{..., "alt": alt},
    registrationUrl,
    featured
  }
`);

export const EVENTS_PAST_QUERY = defineQuery(`
  *[_type == "event" && coalesce(endDate, date) < now()] | order(date desc)[0...12]{
    _id,
    title,
    "slug": slug.current,
    date,
    endDate,
    location,
    type,
    summary,
    "image": image{..., "alt": alt},
    registrationUrl,
    featured
  }
`);

export interface EventResult {
  _id: string;
  title: string;
  slug: string;
  date: string;
  endDate?: string;
  location?: string;
  type?: "workshop" | "ctf" | "speaker" | "mentorship" | "other";
  summary?: string;
  image?: SanityImageWithAlt;
  registrationUrl?: string;
  featured?: boolean;
}

// ---- announcements --------------------------------------------------------

export const ANNOUNCEMENTS_QUERY = defineQuery(`
  *[_type == "announcement" && active == true
    && (!defined(expiresAt) || expiresAt > now())] | order(date desc){
    _id,
    title,
    body,
    link
  }
`);

export interface AnnouncementResult {
  _id: string;
  title: string;
  body?: unknown;
  link?: CtaLink;
}
