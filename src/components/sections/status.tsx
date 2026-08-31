"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";

// Replaces the old "Adapters Coming Soon" section. Those adapters were never
// built, and @factiii/stack stopped being developed in July 2026 — this
// section says so plainly, because the packages are still installable and
// somebody has to tell people what they are getting.
export function Status() {
  return (
    <section className="py-24 bg-muted/30">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              What happened to{" "}
              <span className="font-mono text-primary">@factiii/stack</span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-background p-8 sm:p-10"
          >
            <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="mr-2 flex h-2 w-2 rounded-full bg-muted-foreground" />
              Unmaintained since July 2026
            </div>

            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <span className="font-mono text-foreground">
                  @factiii/stack
                </span>{" "}
                was a plugin framework for deploying full-stack apps. We
                replaced it with plain deploy scripts and AI agent skills kept
                in each repo that uses them. That turned out simpler and easier
                to adapt than a framework that had to anticipate every project.
              </p>
              <p>
                The published versions stay on npm and still install. The
                package is no longer developed, and issues and pull requests are
                not triaged. If you are starting something new, do not build on
                it.
              </p>
              <p className="text-foreground">
                <span className="font-mono">@factiii/auth</span> is a separate
                package in the same repository, and it is still maintained. We
                run it in production, so it keeps getting fixes.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/factiii/stack"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
              >
                Read the repository
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://github.com/factiii/stack/tree/main/packages/auth"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80 sm:ml-6"
              >
                Go straight to auth
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
