import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BottomNav from "@/components/BottomNav";
import AnnouncementBar from "@/components/AnnouncementBar";

// Fallback re-fetch interval — the /api/revalidate webhook does the real work.
export const revalidate = 3600;

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <AnnouncementBar />
      <main className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8">
        {children}
      </main>
      <SiteFooter />
      <BottomNav />
    </>
  );
}
