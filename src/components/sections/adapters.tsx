"use client";

import { motion } from "framer-motion";
import { Code, Network, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const adapters = [
    {
        title: "Next.js Adapter",
        tagline: "/app → configs",
        description: "Drop code into your /app folder. The adapter reads your structure and auto-generates the optimal next.config.js.",
        icon: Code,
    },
    {
        title: "Expo Adapter",
        tagline: "Mobile-first magic",
        description: "Seamlessly integrate with Expo projects. The adapter handles app.json generation and native module configuration automatically.",
        icon: Smartphone,
    },
    {
        title: "tRPC Backend Adapter",
        tagline: "Type-safe APIs",
        description: "Auto-generate fully typed tRPC routers from your Prisma schema. Zero boilerplate, maximum type safety.",
        icon: Network,
    },
];

export function Adapters() {
    return (
        <section className="py-24 bg-muted/30">
            <Container>
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                        Adapters Coming Soon
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Fully open source adapters. Anyone can build and contribute their own.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {adapters.map((adapter, index) => (
                        <motion.div
                            key={adapter.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative flex flex-col p-6 bg-background rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                                    <adapter.icon className="h-6 w-6 text-secondary" />
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold text-foreground">
                                {adapter.title}
                            </h3>
                            <p className="text-sm font-medium text-secondary mt-1">
                                {adapter.tagline}
                            </p>
                            <p className="mt-4 text-muted-foreground text-sm grow">
                                {adapter.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button variant="outline" size="lg">
                        Build Your Own Adapter
                    </Button>
                </div>
            </Container>
        </section>
    );
}
