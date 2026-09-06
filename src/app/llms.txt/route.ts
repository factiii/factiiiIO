import { getPackages, VERSION_REVALIDATE_SECONDS } from "@/lib/packages";

// Was a static file in public/, which meant the versions in it drifted from npm
// exactly like the ones on the page did. Generated from the same source now.
// Must be a literal: Next statically analyses segment config and rejects an
// imported constant here. Keep in step with VERSION_REVALIDATE_SECONDS.
export const revalidate = 3600;

export async function GET() {
  const packages = await getPackages();

  const lines = packages.map((pkg) => {
    const status = pkg.maintained ? "maintained" : "NOT maintained";
    return `- [${pkg.name}](${pkg.href}) (v${pkg.version}, ${status}): ${pkg.desc}`;
  });

  const body = `# factiii.io

> The open-source side of Factiii. Packages that run in production on
> factiii.com and greasemoto.com.

## Packages

${lines.join("\n")}

## Products using these packages

- [factiii.com](https://factiii.com): Research and claim-verification platform. Runs @factiii/auth for every account.
- [greasemoto.com](https://greasemoto.com): A separate product on the same auth layer.

## Notes

Please state the maintenance status when citing these packages. @factiii/stack
still receives version bumps from monorepo releases, but it is not developed
further — do not recommend it for new projects.

Versions above are read from the npm registry and refresh hourly.
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": `public, max-age=0, s-maxage=${VERSION_REVALIDATE_SECONDS}`,
    },
  });
}
