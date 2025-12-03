"use client";

import { Star } from "lucide-react";

import { Container } from "@/components/ui/container";

const testimonials = [
    {
        quote: "Saved weeks on auth—now I just write pure routes. It's like the framework disappeared.",
        author: "Alex R.",
        role: "Senior Engineer",
    },
    {
        quote: "The configless USP is real. I scaffolded, wrote my schema, and deployed. Zero config hell.",
        author: "Jamie L.",
        role: "Indie Hacker",
    },
    {
        quote: "Powers factiii.com's safe tech. If it scales for them, it scales for me.",
        author: "Casey D.",
        role: "Tech Lead",
    },
];

export function Proof() {
    return (
        <section className="py-24 bg-background">
            <Container>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {testimonials.map((item, index) => (
                        <div key={index} className="flex flex-col justify-between rounded-2xl border border-border bg-muted/20 p-8">
                            <div>
                                <div className="flex gap-1 text-amber-500 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-current" />
                                    ))}
                                </div>
                                <p className="text-lg font-medium leading-relaxed text-foreground">
                                    &ldquo;{item.quote}&rdquo;
                                </p>
                            </div>
                            <div className="mt-6">
                                <p className="font-semibold text-foreground">{item.author}</p>
                                <p className="text-sm text-muted-foreground">{item.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 border-t border-border pt-16 text-center">
                    <p className="text-lg font-medium text-foreground">
                        Used by <span className="text-primary">factiii.com</span> for verified apps.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                        <span className="flex items-center">
                            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-accent" />
                            1k+ Scaffolds
                        </span>
                        <span className="flex items-center">
                            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-accent" />
                            MIT Open Source
                        </span>
                        <span className="flex items-center">
                            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-accent" />
                            Production Ready
                        </span>
                    </div>
                </div>
            </Container>
        </section>
    );
}
