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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "factiii.io",
    title: "Open source from Factiii",
    description,
  },
  twitter: {
    card: "summary",
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
