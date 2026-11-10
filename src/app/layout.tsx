import type { Metadata, Viewport } from "next";
import { Caveat, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Nav } from "@/components/Nav";
import { site } from "@/lib/site";
import "./globals.css";

const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
const hand = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, Product Designer who builds`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name}, Product Designer who builds`,
    description: site.description,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable} ${hand.variable} antialiased`}>
      <body className="min-h-svh">
        <Nav />
        {children}
      </body>
    </html>
  );
}
