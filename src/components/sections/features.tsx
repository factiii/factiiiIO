"use client";

import { motion } from "framer-motion";
import { Cloud,Database, Server, Workflow } from "lucide-react";

import { Container } from "@/components/ui/container";

const features = [
    {
        title: "Schema Ingestion",
        description: "Stop wrestling with auth tables. factiii/core ingests your schema.prisma, automatically extending it with User tables, associations, and 2FA/email verification logic.",
        icon: Database,
    },
    {
        title: "tRPC Export",
        description: "Forget boilerplate wiring. The core exports a fully typed tRPC router derived directly from your models and routes. You write the logic; we handle the plumbing.",
        icon: Server,
    },
    {
        title: "Adapters Flow",
        description: "A 5-step magic loop: Ingest Code → Validate → Generate Configs → Hook Core → Seal Bundle. Your code is the only source of truth.",
        icon: Workflow,
    },
    {
        title: "Scalable Deploys",
        description: "Built for Vercel. Optimized for Next.js serverless and edge functions. The configless runtime seals your environment for safe, scalable production releases.",
        icon: Cloud,
    },
];

export function Features() {
    return (
        <section className="py-24 bg-muted/30">
            <Container>
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                        Everything you need, <span className="text-primary">nothing you don&apos;t.</span>
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Focus on your product. Let the configless stack handle the infrastructure complexity.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative p-6 bg-background rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <feature.icon className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
