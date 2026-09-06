import type { Metadata } from "next";

import { CTA } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Runner } from "@/components/sections/runner";
import { Status } from "@/components/sections/status";
import { UsedBy } from "@/components/sections/used-by";
import { getPackages, type PackageInfo } from "@/lib/packages";

const siteUrl = "https://factiii.io";

// The canonical lives here rather than on the root layout, so pages that do not
// set one do not inherit a claim to be the homepage.
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

// Built from the same source as the Hero cards, so the structured data and the
// visible version can never disagree. Emitted server-side: Google may defer
// processing of JSON-LD injected by JavaScript, and most AI crawlers do not run
// it at all.
function buildStructuredData(packages: PackageInfo[]) {
  return {
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
      // Only the maintained packages are described. Emitting SoftwareSourceCode
      // for a package we tell people not to adopt would invite rich results for
      // it.
      ...packages
        .filter((pkg) => pkg.maintained)
        .map((pkg) => ({
          "@type": "SoftwareSourceCode",
          name: pkg.name,
          description: pkg.desc,
          [pkg.href.includes("github.com") ? "codeRepository" : "url"]: pkg.href,
          programmingLanguage: "TypeScript",
          runtimePlatform: "Node.js",
          softwareVersion: pkg.version,
          author: { "@id": `${siteUrl}/#organization` },
        })),
    ],
  };
}

export default async function Home() {
  const structuredData = buildStructuredData(await getPackages());

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
