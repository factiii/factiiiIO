"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";

// Only list sites that genuinely run the package in production, and only ones
// we operate or have permission to name. Every entry here is verifiable from
// the site's own package.json — do not add a logo we cannot back up.
const sites = [
  {
    name: "factiii.com",
    href: "https://factiii.com",
    desc: "The research and claim-verification platform. Runs the auth package for every account, and the runner for Board AI agents.",
    packages: ["@factiii/auth", "@factiii/runner"],
  },
  {
    name: "greasemoto.com",
    href: "https://greasemoto.com",
    desc: "A separate product on the same auth layer — a second codebase proving the package is not welded to one schema.",
    packages: ["@factiii/auth"],
  },
];

export function UsedBy() {
  return (
    <section className="py-20 bg-background border-t border-border">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            Running in production
          </h2>
          <p className="mt-3 text-muted-foreground">
            We ship these packages because we depend on them. Two live products,
            two different schemas, one auth layer.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {sites.map((site, index) => (
            <motion.a
              key={site.name}
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-semibold text-foreground">
                  {site.name}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <p className="mt-3 grow text-sm leading-relaxed text-muted-foreground">
                {site.desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {site.packages.map((pkg) => (
                  <span
                    key={pkg}
                    className="rounded-md border border-border bg-muted/50 px-2 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {pkg}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}
