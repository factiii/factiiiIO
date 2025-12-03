"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function CTA() {
    return (
        <section className="py-24 bg-muted/30">
            <Container>
                <div className="rounded-3xl bg-primary px-6 py-16 sm:p-16 md:p-24 text-center relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary-foreground">
                            Go Configless Today
                        </h2>
                        <p className="mt-4 text-lg text-primary-foreground/80">
                            Stop configuring. Start building. Join the configless revolution.
                        </p>
                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Link
                                href="https://github.com/factiii/core"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button size="lg" variant="secondary">
                                    Join the Build
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
