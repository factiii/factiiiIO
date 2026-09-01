import { Database, Fingerprint, KeyRound, Server } from "lucide-react";

import { Container } from "@/components/ui/container";

// Every claim below maps to a documented option in packages/auth. Do not add a
// feature here before it ships in the package.
const features = [
  {
    title: "Prisma models, generated",
    description:
      "Run `npx @factiii/auth init` and the User, session, and verification models land in your schema.prisma. `doctor` tells you what is still wrong.",
    icon: Database,
  },
  {
    title: "A typed tRPC router",
    description:
      "createAuthRouter returns a router, an authProcedure, and a createContext. Protected routes read ctx.userId. No boilerplate wiring.",
    icon: Server,
  },
  {
    title: "OAuth and 2FA",
    description:
      "Google and Apple sign-in, TOTP two-factor, and email verification are config flags, not forks. Turn on what you need in the features object.",
    icon: KeyRound,
  },
  {
    title: "Sessions that survive",
    description:
      "JWT sessions with configurable cookie settings, including an explicit cookie domain for apps served across a proxy and an API subdomain.",
    icon: Fingerprint,
  },
];

export function Features() {
  return (
    <section className="py-24 bg-muted/30">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            What <span className="text-primary font-mono">@factiii/auth</span>{" "}
            gives you
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            It is the authentication layer behind factiii.com, extracted and
            published under MIT. We upgrade it because we depend on it.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="reveal-view relative p-6 bg-background rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
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
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
