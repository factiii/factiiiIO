import type { Metadata } from "next";

import { CTA } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Runner } from "@/components/sections/runner";
import { Status } from "@/components/sections/status";
import { UsedBy } from "@/components/sections/used-by";

const siteUrl = "https://factiii.io";

// The canonical lives here rather than on the root layout, so pages that do not
// set one do not inherit a claim to be the homepage.
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

// Versions and maintenance status must match the package list in Hero. Emitted
// server-side: Google may defer processing of JSON-LD injected by JavaScript,
// and most AI crawlers do not run it at all.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Factiii",
      url: siteUrl,
      logo: `${siteUrl}/logo.jpg`,
      description:
        "Factiii builds a research and claim-verification platform, and publishes the packages behind it as open source.",
      sameAs: [
        "https://github.com/factiii",
        "https://www.npmjs.com/org/factiii",
        "https://factiii.com",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "factiii.io",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "SoftwareSourceCode",
      name: "@factiii/auth",
      description:
        "Drop-in authentication for tRPC. JWT sessions, OAuth, and 2FA, all type-safe against your Prisma schema.",
      codeRepository: "https://github.com/factiii/stack/tree/main/packages/auth",
      programmingLanguage: "TypeScript",
      runtimePlatform: "Node.js",
      softwareVersion: "0.20.0",
      author: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "SoftwareSourceCode",
      name: "@factiii/runner",
      description:
        "A headless daemon that runs Factiii's Board AI agents on a machine you control. The web and mobile clients reach it over WebRTC.",
      url: "https://www.npmjs.com/package/@factiii/runner",
      programmingLanguage: "TypeScript",
      runtimePlatform: "Node.js",
      softwareVersion: "0.12.2",
      author: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <UsedBy />
      <Features />
      <HowItWorks />
      <Runner />
      <Status />
      <CTA />
      <Footer />
    </main>
  );
}
