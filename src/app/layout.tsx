import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wicys-srmist.vercel.app"),
  title: {
    default: "WiCyS SRMIST — Women in Cybersecurity",
    template: "%s · WiCyS SRMIST",
  },
  description:
    "The WiCyS student chapter at SRM Institute of Science and Technology. A community where women build the skills, network, and confidence to defend the internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} ${plexSans.variable} antialiased`}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
