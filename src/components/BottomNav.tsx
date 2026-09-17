"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/nav";

const icons: Record<string, React.ReactNode> = {
  "/": <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />,
  "/about": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7.5h.01" />
    </>
  ),
  "/events": (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  "/team": (
    <>
      <circle cx="9" cy="9" r="3" />
      <path d="M3.5 20c.6-3.2 3-5 5.5-5s4.9 1.8 5.5 5M16 7.5a3 3 0 0 1 0 6M15.5 20c-.2-2.2-1-3.8-2-5 2.8-.6 6 1.2 6.5 5" />
    </>
  ),
  "/contact": (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
};

export default function BottomNav() {
  const pathname = usePathname();
  const activeIndex = navItems.findIndex((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
  );
  const safeIndex = activeIndex < 0 ? 0 : activeIndex;

  return (
    <nav
      aria-label="Primary"
      className="nav-in fixed inset-x-0 bottom-4 z-50 mx-auto w-[min(24rem,calc(100%-1.5rem))]"
    >
      <div className="glass relative flex items-stretch rounded-full p-1.5">
        {/* frosted sliding indicator */}
        <span
          aria-hidden
          className="nav-indicator pointer-events-none absolute inset-y-1.5 left-1.5 rounded-full transition-transform duration-[440ms] ease-[cubic-bezier(0.34,1.4,0.5,1)]"
          style={{
            width: `calc((100% - 0.75rem) / ${navItems.length})`,
            transform: `translateX(${safeIndex * 100}%)`,
          }}
        />
        {navItems.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative z-10 flex flex-1 flex-col items-center gap-1 rounded-full px-1 py-2 text-[0.64rem] font-medium tracking-wide transition-colors duration-200 ${
                active
                  ? "text-white"
                  : "text-text-faint hover:text-text-muted"
              }`}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className={`transition-transform duration-300 ${
                  active ? "-translate-y-0.5 scale-110" : ""
                }`}
              >
                {icons[item.href]}
              </svg>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
