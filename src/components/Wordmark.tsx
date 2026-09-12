import Image from "next/image";
import Link from "next/link";

export default function Wordmark({
  className = "",
  suffix = "SRMIST",
}: {
  className?: string;
  suffix?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="WiCyS SRMIST home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="rounded-lg bg-white px-2 py-1 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:-translate-y-0.5">
        <Image
          src="/brand/wicys-logo.png"
          alt="WiCyS"
          width={629}
          height={294}
          priority
          className="h-6 w-auto"
        />
      </span>
      <span className="hidden text-sm font-medium tracking-[0.18em] text-text-faint sm:inline">
        {suffix}
      </span>
    </Link>
  );
}
