import "./globals.css";

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const siteUrl = "https://factiii.io";
const description =
  "Open-source packages from Factiii. @factiii/auth is drop-in authentication for tRPC, and @factiii/runner runs Board AI agents on your own machine. Both run in production on factiii.com and greasemoto.com. @factiii/stack is no longer maintained.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "factiii.io | Open source from Factiii",
  description,
  // No default canonical here. A canonical on the root layout is inherited by
  // every page that does not override it, which makes each one claim to be a
  // duplicate of the homepage. Indexable pages declare their own.
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "factiii.io",
    title: "Open source from Factiii",
    description,
    images: [{ url: "/logo.jpg", width: 960, height: 960, alt: "Factiii" }],
  },
  twitter: {
    card: "summary",
    images: ["/logo.jpg"],
    title: "Open source from Factiii",
    description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
