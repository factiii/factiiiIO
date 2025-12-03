"use client";

import { motion } from "framer-motion";
import { Code2, Rocket,Terminal } from "lucide-react";

import { Container } from "@/components/ui/container";

const steps = [
    {
        title: "Write Code",
        description: "Focus on your features. Define routes and models without worrying about the glue code.",
        icon: Code2,
        code: `// src/server/api/routers/example.ts
export const hello = publicProcedure.query(() => {
  return { greeting: "Hello from factiii core" };
});`,
        language: "typescript",
    },
    {
        title: "Scaffold & Init",
        description: "Launch a production-ready stack with one command. No config tweaking required.",
        icon: Terminal,
        code: `npx @factiii/stack@latest my-app`,
        language: "bash",
    },
    {
        title: "Deploy",
        description: "Push to Vercel. Adapters ingest your code, generate next.config.js, and seal the bundle for instant, zero-config deployment.",
        icon: Rocket,
        code: null,
    },
];

export function HowItWorks() {
    return (
        <section className="py-24 bg-background">
            <Container>
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                        How It Works
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        From idea to production in three simple steps.
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2 md:-ml-px" />

                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Icon bubble */}
                                <div className="absolute left-8 -ml-4 flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-background shadow-sm md:left-1/2">
                                    <step.icon className="h-4 w-4 text-primary" />
                                </div>

                                {/* Content */}
                                <div className="ml-16 md:ml-0 md:w-1/2 md:px-8">
                                    <div className={`flex flex-col ${index % 2 === 0 ? "md:items-start text-left" : "md:items-end md:text-right"}`}>
                                        <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                                        <p className="mt-2 text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>

                                {/* Code Snippet */}
                                <div className="ml-16 md:ml-0 md:w-1/2 md:px-8">
                                    {step.code && (
                                        <div className="rounded-lg border border-border bg-muted/50 p-4 font-mono text-sm overflow-x-auto">
                                            <pre className="text-foreground">
                                                <code>{step.code}</code>
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
