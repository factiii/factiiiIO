// Single source of truth for the packages this site advertises. The Hero cards
// and the JSON-LD on the homepage both read from here, so a version can never
// disagree between the visible page and the structured data.
//
// Versions come from the npm registry at build time and refresh on their own
// (see getPackages). Everything else is editorial and stays hand-written —
// maintenance status especially. @factiii/stack still receives version bumps
// from monorepo releases despite not being developed, so deriving "maintained"
// from publish activity would put a claim on the page that npm contradicts.

export type PackageInfo = {
  name: string;
  version: string;
  status: string;
  maintained: boolean;
  desc: string;
  href: string;
  linkLabel: string;
  /** True when the version below is the hard-coded fallback, not live npm data. */
  versionIsStale: boolean;
  /**
   * npm's own deprecation notice for the latest version, when one is set.
   * Read from the registry rather than hand-written: this is a hard fact about
   * what `npm install` prints, not an editorial judgement, so the page follows
   * npm automatically the moment `npm deprecate` runs.
   */
  deprecationNotice: string | null;
};

type PackageSeed = Omit<
  PackageInfo,
  "version" | "versionIsStale" | "deprecationNotice"
> & {
  /** Used only when the registry is unreachable. Keep roughly current. */
  fallbackVersion: string;
};

const seeds: PackageSeed[] = [
  {
    name: "@factiii/auth",
    fallbackVersion: "0.20.4",
    status: "Maintained",
    maintained: true,
    desc: "Drop-in authentication for tRPC. JWT sessions, OAuth, and 2FA, all type-safe against your Prisma schema.",
    href: "https://github.com/factiii/stack/tree/main/packages/auth",
    linkLabel: "Source on GitHub",
  },
  {
    name: "@factiii/runner",
    fallbackVersion: "0.14.1",
    status: "Maintained",
    maintained: true,
    desc: "A headless daemon that runs Factiii's Board AI agents on a machine you control. The web and mobile clients reach it over WebRTC.",
    href: "https://www.npmjs.com/package/@factiii/runner",
    linkLabel: "Package on npm",
  },
  {
    name: "@factiii/stack",
    fallbackVersion: "0.20.4",
    status: "No longer maintained",
    maintained: false,
    desc: "The configless deploy CLI. Published versions still install, but the package is not developed further. See the project status below.",
    href: "https://github.com/factiii/stack",
    linkLabel: "Source on GitHub",
  },
];

/** How long a fetched version stays fresh, in seconds. */
export const VERSION_REVALIDATE_SECONDS = 3600;

// The registry's package document is large; the abbreviated Accept header asks
// for the small one, which is a few hundred bytes instead of megabytes.
const ABBREVIATED = "application/vnd.npm.install-v1+json";

type RegistryFacts = { version: string; deprecationNotice: string | null };

async function fetchRegistryFacts(name: string): Promise<RegistryFacts | null> {
  // Scoped names must have the slash encoded, but not the @.
  const encoded = name.replace("/", "%2f");
  try {
    const res = await fetch(`https://registry.npmjs.org/${encoded}`, {
      headers: { accept: ABBREVIATED },
      next: { revalidate: VERSION_REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const body = (await res.json()) as {
      "dist-tags"?: { latest?: string };
      versions?: Record<string, { deprecated?: string }>;
    };
    const version = body["dist-tags"]?.latest;
    if (!version) return null;
    // The abbreviated document omits `deprecated` entirely unless it is set.
    const deprecated = body.versions?.[version]?.deprecated;
    return {
      version,
      deprecationNotice: typeof deprecated === "string" && deprecated.trim() ? deprecated : null,
    };
  } catch {
    // A registry outage must not fail the build or blank the page.
    return null;
  }
}

/**
 * The package list with live versions from npm. Falls back to the pinned
 * version per package, independently, so one unreachable package cannot take
 * the others down.
 */
export async function getPackages(): Promise<PackageInfo[]> {
  const facts = await Promise.all(seeds.map((p) => fetchRegistryFacts(p.name)));

  return seeds.map(({ fallbackVersion, ...seed }, i) => ({
    ...seed,
    version: facts[i]?.version ?? fallbackVersion,
    versionIsStale: facts[i] === null,
    deprecationNotice: facts[i]?.deprecationNotice ?? null,
  }));
}
