"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function CTA() {
    return (
        <section className="py-24 bg-background">
            <Container>
                <div className="rounded-3xl bg-primary px-6 py-16 sm:p-16 md:p-24 text-center relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary-foreground">
                            The packages come from a real product
                        </h2>
                        <p className="mt-4 text-lg text-primary-foreground/80">
                            Factiii is a platform for researching and verifying claims in
                            the open. The auth here is the auth it runs on.
                        </p>
                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <a
                                href="https://factiii.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button size="lg" variant="secondary">
                                    Visit factiii.com
                                </Button>
                            </a>
                            <a
                                href="https://github.com/factiii/stack"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                                >
                                    Browse the source
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
