import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lionael Surya — built like production",
  description:
    "Data science student at Seneca Polytechnic building data systems the way real teams do — tested, documented, reproducible, and shipped. Data engineering, analytics engineering, ML, and software.",
  openGraph: {
    title: "Lionael Surya — built like production",
    description:
      "Data pipelines, analytics marts, ML systems, and shipped products — built with production discipline.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
