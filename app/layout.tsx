import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { StructuredData } from "@/components/structured-data";
import { Ambient } from "@/components/ambient";
import { SmoothScroll } from "@/components/smooth-scroll";
import { TerminalTrigger } from "@/components/terminal-trigger";
import { RoleProvider } from "@/components/role-context";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s — Lionael Surya",
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    locale: "en_CA",
    title: site.title,
    description:
      "Data pipelines, analytics marts, ML systems, and shipped products — built with production discipline.",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description:
      "Data pipelines, analytics marts, ML systems, and shipped products — built with production discipline.",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Lionael Surya",
    "data engineering",
    "analytics engineering",
    "data science",
    "software engineering",
    "portfolio",
    "Toronto",
    "Seneca Polytechnic",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Reveal styles only apply when JS runs; see globals.css. If the
            bundle fails to hydrate, drop the class so nothing stays hidden.
            Also forwards old /#slug case-study links to /work/slug before
            first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__ambient)document.documentElement.classList.remove('js')},3000);" +
              `(function(){var s=${JSON.stringify(projects.map((p) => p.slug))};var h=location.hash.slice(1);if(location.pathname==='/'&&s.indexOf(h)>-1)location.replace('/work/'+h)})()`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <StructuredData />
        <RoleProvider>{children}</RoleProvider>
        <Ambient />
        <SmoothScroll />
        <TerminalTrigger />
        <Analytics />
      </body>
    </html>
  );
}
