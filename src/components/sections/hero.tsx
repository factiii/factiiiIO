import { ArrowUpRight, Package } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

// Everything Factiii publishes to npm. Status strings here must match the
// package READMEs — this page is the first thing anyone finds when they search
// the package names, so a stale "maintained" claim costs more than saying
// nothing. The runner links to npm, not GitHub: its source still lives in the
// private product monorepo, so there is no public repository to point at yet.
const packages = [
  {
    name: "@factiii/auth",
    version: "0.20.0",
    status: "Maintained",
    maintained: true,
    desc: "Drop-in authentication for tRPC. JWT sessions, OAuth, and 2FA, all type-safe against your Prisma schema.",
    href: "https://github.com/factiii/stack/tree/main/packages/auth",
    linkLabel: "Source on GitHub",
  },
  {
    name: "@factiii/runner",
    version: "0.12.2",
    status: "Maintained",
    maintained: true,
    desc: "A headless daemon that runs Factiii's Board AI agents on a machine you control. The web and mobile clients reach it over WebRTC.",
    href: "https://www.npmjs.com/package/@factiii/runner",
    linkLabel: "Package on npm",
  },
  {
    name: "@factiii/stack",
    version: "0.19.0",
    status: "No longer maintained",
    maintained: false,
    desc: "The configless deploy CLI. Published versions still install, but the package is not developed further. See the project status below.",
    href: "https://github.com/factiii/stack",
    linkLabel: "Source on GitHub",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

      <Container className="flex flex-col items-center text-center">
        <div
          className="reveal flex flex-row items-center justify-center gap-4"
        >
          <Image
            src="/logo.jpg"
            alt="Factiii logo"
            width={50}
            height={50}
            className="rounded-xl"
            priority
          />
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Package className="mr-2 h-3.5 w-3.5" />
            Open source from Factiii
          </div>
        </div>

        <h1
          className="reveal reveal-1 mt-8 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
        >
          Auth we actually
          <br className="hidden md:block" />{" "}
          <span className="text-primary">run in production.</span>
        </h1>

        <p
          className="reveal reveal-2 mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          This is the open-source side of{" "}
          <a
            href="https://factiii.com"
            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
          >
            Factiii
          </a>
          . One package is maintained and shipping. One is not. Both are here so
          you can tell which is which before you install anything.
        </p>

        <div
          className="reveal reveal-3 mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="https://github.com/factiii/stack/tree/main/packages/auth"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg">Read the auth docs</Button>
          </a>
          <a href="https://factiii.com" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="gap-2">
              Visit factiii.com
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </a>
        </div>

        <div
          className="reveal reveal-4 mt-16 grid w-full grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3"
        >
          {packages.map((pkg) => (
            <a
              key={pkg.name}
              href={pkg.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/40"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-mono text-base font-semibold text-foreground">
                  {pkg.name}
                </h2>
                <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
                  v{pkg.version}
                </span>
              </div>
              <div
                className={
                  pkg.maintained
                    ? "mt-3 inline-flex items-center text-xs font-medium text-accent"
                    : "mt-3 inline-flex items-center text-xs font-medium text-muted-foreground"
                }
              >
                <span
                  className={
                    pkg.maintained
                      ? "mr-2 flex h-2 w-2 rounded-full bg-accent"
                      : "mr-2 flex h-2 w-2 rounded-full bg-muted-foreground"
                  }
                />
                {pkg.status}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {pkg.desc}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
                {pkg.linkLabel}
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
