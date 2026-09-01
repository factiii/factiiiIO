import { Code2, ShieldCheck, Terminal } from "lucide-react";

import { Container } from "@/components/ui/container";

// Mirrors the Setup section of packages/auth/README.md. Keep the snippets in
// sync with that README — this page and the README are the same instructions
// in two places, and a drifted example is worse than no example.
const steps = [
  {
    title: "Install and init",
    description:
      "Add the package, generate the Prisma models, then verify the setup before you write any code.",
    icon: Terminal,
    code: `npm install @factiii/auth @prisma/client

npx @factiii/auth init
npx prisma generate && npx prisma db push
npx @factiii/auth doctor`,
  },
  {
    title: "Create the auth router",
    description:
      "One call returns the router, the protected-procedure helper, and the context factory.",
    icon: Code2,
    code: `import { createAuthRouter } from '@factiii/auth';
import { prisma } from './prisma';

export const { router, authProcedure, createContext } =
  createAuthRouter({
    prisma,
    secrets: { jwt: process.env.JWT_SECRET! },
  });`,
  },
  {
    title: "Protect your routes",
    description:
      "authProcedure resolves the session and puts the user id on the context. Anything unauthenticated never reaches your handler.",
    icon: ShieldCheck,
    code: `const protectedRouter = router({
  getProfile: authProcedure.query(({ ctx }) => {
    return { userId: ctx.userId };
  }),
});`,
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-background">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Three steps to a session
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The whole quickstart. There is no hidden configuration step.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2 md:-ml-px" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`reveal-view relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Icon bubble */}
                <div className="absolute left-8 -ml-4 flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-background shadow-sm md:left-1/2">
                  <step.icon className="h-4 w-4 text-primary" />
                </div>

                {/* Content */}
                <div className="ml-16 md:ml-0 md:w-1/2 md:px-8">
                  <div
                    className={`flex flex-col ${
                      index % 2 === 0
                        ? "md:items-start text-left"
                        : "md:items-end md:text-right"
                    }`}
                  >
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {step.description}
                    </p>
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
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
