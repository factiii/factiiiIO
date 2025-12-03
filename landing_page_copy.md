# Hero Section

# Configless Stacks: Write Code, Adapters Deploy the Magic.

One CLI scaffolds your T3 app with a configless core. Adapters ingest your code, abstracting the environment and schema so you can focus on building.

*   **Runtime Magic**: `factiii/core` ingests your Prisma folder and auto-extends auth, associations, and queries.
*   **Instant Scaffold**: `npx @factiii/stack` generates a pre-wired T3 app (Next.js + tRPC + Prisma) in seconds.
*   **Modular Power**: Code-only adapters handle integrations—from OpenAI to Next.js config generation.

**[Scaffold Your App Free]** *(Triggers modal: `npx @factiii/stack@latest my-app`)*

---

# Features

### Schema Ingestion
Stop wrestling with auth tables. `factiii/core` ingests your `schema.prisma`, automatically extending it with User tables, associations, and 2FA/email verification logic.

### tRPC Export
Forget boilerplate wiring. The core exports a fully typed tRPC router derived directly from your models and routes. You write the logic; we handle the plumbing.

### Adapters Flow
A 5-step magic loop: Ingest Code → Validate → Generate Configs → Hook Core → Seal Bundle. Your code is the only source of truth.

### Scalable Deploys
Built for Vercel. Optimized for Next.js serverless and edge functions. The configless runtime seals your environment for safe, scalable production releases on Vercel.

---

# How It Works

### 1. Write Code
Focus on your features. Define routes and models without worrying about the glue code.

```typescript
// src/server/api/routers/example.ts
export const hello = publicProcedure.query(() => {
  return { greeting: "Hello from factiii core" };
});
```

### 2. Scaffold & Init
Launch a production-ready stack with one command. No config tweaking required.

```bash
npx @factiii/stack@latest my-app
```

### 3. Deploy
Push to Vercel. Adapters ingest your code, generate `next.config.js`, and seal the bundle for instant, zero-config deployment.

---

# Adapters Spotlight

### OpenAI Adapter
**"AI procs from env flag"**
Enable advanced AI capabilities by simply toggling a flag. The adapter generates schemas and procedures automatically.

### Next.js Adapter
**"/app → configs"**
Drop code into your `/app` folder. The adapter reads your structure and auto-generates the optimal `next.config.js`.

### Bot Detect (Premium)
**"Patented Guard"**
Enterprise-grade protection. A drop-in adapter that secures your routes against bot traffic with patented detection technology.

[Build Your Own Adapter](https://docs.factiii.io/adapters/build)

---

# Proof

> "Saved weeks on auth—now I just write pure routes. It's like the framework disappeared."
> — **Alex R., Senior Engineer**

> "The configless USP is real. I scaffolded, wrote my schema, and deployed. Zero config hell."
> — **Jamie L., Indie Hacker**

> "Powers factiii.com's safe tech. If it scales for them, it scales for me."
> — **Casey D., Tech Lead**

**Used by factiii.com for verified apps.**
*1k+ scaffolds • MIT OSS • Powers factiii.com*

---

# Start Configless

## Go Configless Today

**[Scaffold Your App Free]**
*(Modal: `npx @factiii/stack@latest my-app`)*

**[Install Core]**
*(Link to NPM)*

---

# Footer

[Docs](https://docs.factiii.io) | [Core](https://www.npmjs.com/package/@factiii/core) | [Stack](https://www.npmjs.com/package/@factiii/stack) | [Adapters](https://factiii.io/adapters) | [GitHub](https://github.com/factiii) | [NPM](https://www.npmjs.com/~factiii)

**Join Newsletter**
*Get updates on new adapters and core features.*
[Subscribe]

*© 2025 Factiii. MIT Licensed.*
