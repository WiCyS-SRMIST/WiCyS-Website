import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/lib/nav";

const socials = [
  { label: "Instagram", href: "https://instagram.com/wicys_srmist" },
  { label: "LinkedIn", href: "https://linkedin.com/company/wicys-srmist" },
  { label: "Discord", href: "https://discord.gg/wicys-srmist" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-border-soft">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <span className="inline-block rounded-lg bg-white px-2.5 py-1.5">
            <Image
              src="/brand/wicys-logo.png"
              alt="WiCyS"
              width={629}
              height={294}
              className="h-7 w-auto"
            />
          </span>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            The Women in Cybersecurity student chapter at SRM Institute of
            Science and Technology, Kattankulathur.
          </p>
        </div>

        <div className="flex gap-14">
          <nav className="flex flex-col gap-2 text-sm">
            <span className="mb-1 text-text-faint">Pages</span>
            {navItems.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="text-text-muted transition-colors hover:text-text"
              >
                {i.label}
              </Link>
            ))}
          </nav>
          <nav className="flex flex-col gap-2 text-sm">
            <span className="mb-1 text-text-faint">Elsewhere</span>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-text"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-5 pb-28 sm:px-8">
        <p className="text-xs text-text-faint">
          © {new Date().getFullYear()} WiCyS SRMIST. Affiliated with Women in
          Cybersecurity (WiCyS).
        </p>
      </div>
    </footer>
  );
}
