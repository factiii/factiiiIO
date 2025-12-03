import Image from "next/image";

import { Container } from "@/components/ui/container";

export function Footer() {
    return (
        <footer className="border-t border-border bg-background py-12 md:py-16">
            <Container>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <Image 
                                src="/logo.jpg" 
                                alt="Factiii Logo" 
                                width={50}
                                height={50}
                                className="rounded-xl"
                            />
                            <span className="text-xl font-bold text-foreground">factiii.io</span>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                            The open-source hub for factiii/core and configless developer stack.
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            © 2025 Factiii. MIT Licensed.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground">Resources</h3>
                        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                            <li>
                                <a
                                    href="https://github.com/factiii/core"
                                    className="hover:text-primary transition-colors"
                                >
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
