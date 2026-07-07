import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { StructuredData } from "@/components/structured-data";
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
      <body className="font-sans antialiased">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
