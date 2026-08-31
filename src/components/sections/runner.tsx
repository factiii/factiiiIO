"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, KeySquare, Radio } from "lucide-react";

import { Container } from "@/components/ui/container";

// Facts here come from apps/runner/README.md in the product monorepo. The
// source is not public yet, so this section links to npm and describes
// behaviour only — it must not imply a repository that does not exist.
const traits = [
  {
    title: "Runs on your machine",
    description:
      "Agents execute on the host you install it on, so they can drive whatever that host can: simulators, native builds, platform toolchains.",
    icon: Cpu,
  },
  {
    title: "Clients connect over WebRTC",
    description:
      "The Factiii web and mobile clients reach the daemon directly and offload AI work to it. Your code never has to leave the machine.",
    icon: Radio,
  },
  {
    title: "Credentials encrypted at rest",
    description:
      "Tokens and OAuth files in ~/.factiii-runner/ are AES-256-GCM encrypted at 0600. There is no plaintext fallback — no usable keychain means it stores nothing.",
    icon: KeySquare,
  },
];

export function Runner() {
  return (
    <section className="py-24 bg-muted/30">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            <span className="font-mono text-primary">@factiii/runner</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The daemon behind Board AI agents on factiii.com. Install it on a
            workstation, dev box, or VM, pair it to your account, and the
            clients hand it the work.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-lg border border-border bg-background p-5 font-mono text-sm overflow-x-auto"
          >
            <pre className="text-foreground">
              <code>{`npx @factiii/runner setup   # check the host toolchain, pair this runner
factiii-runner start        # run the daemon`}</code>
            </pre>
          </motion.div>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Needs Node 20+, plus git, tmux and redis-server on PATH, and the
            agent CLIs you plan to use.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {traits.map((trait, index) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <trait.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {trait.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {trait.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://www.npmjs.com/package/@factiii/runner"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
            >
              Read the runner docs on npm
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
