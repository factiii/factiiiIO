import Image from "next/image";

import { Container } from "@/components/ui/container";

// factiii.io links back to factiii.com on purpose: the product is the primary
// property, and this domain should pass discovery through to it rather than
// stand as a separate brand.
const resources = [
    { label: "factiii.com", href: "https://factiii.com" },
    { label: "GitHub", href: "https://github.com/factiii" },
    {
        label: "@factiii/auth",
        href: "https://github.com/factiii/stack/tree/main/packages/auth",
    },
    {
        label: "@factiii/runner",
        href: "https://www.npmjs.com/package/@factiii/runner",
    },
    { label: "@factiii/stack", href: "https://github.com/factiii/stack" },
];

export function Footer() {
    return (
        <footer className="border-t border-border bg-background py-12 md:py-16">
            <Container>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="/logo.jpg"
                                alt="Factiii logo"
                                width={50}
                                height={50}
                                className="rounded-xl"
                            />
                            <span className="text-xl font-bold text-foreground">factiii.io</span>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground max-w-sm">
                            The open-source packages behind{" "}
                            <a
                                href="https://factiii.com"
                                className="text-foreground transition-colors hover:text-primary"
                            >
                                factiii.com
                            </a>
                            . Published under MIT.
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Factiii LLC. San Antonio, Texas.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground">Resources</h3>
                        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                            {resources.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className="hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
