import Link from "next/link";
import Wordmark from "./Wordmark";
import { getSiteSettings } from "@/sanity/client";

export default async function SiteHeader() {
  const settings = await getSiteSettings();
  const cta = settings?.headerCta ?? { label: "Join the chapter", href: "/contact" };

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Wordmark suffix={settings?.wordmarkSuffix} />
        <Link
          href={cta.href}
          className="group inline-flex items-center gap-2 rounded-full bg-green px-4 py-2 text-sm font-semibold text-on-green transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {cta.label}
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </div>
    </header>
  );
}
