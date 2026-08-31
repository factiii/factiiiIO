---
name: seo
description: "SEO analysis for factiii.io: audits, technical SEO, schema, sitemaps, content quality, and AI-search readiness. Triggers on: SEO, audit, schema, sitemap, Core Web Vitals, robots.txt, structured data, AI Overviews, GEO."
user-invocable: true
argument-hint: "[command] [url]"
---

# SEO (router)

This is a thin router. The full toolkit is vendored at `.claude/seo-toolkit/`
and is deliberately kept outside `.claude/skills/` so its 31 sub-skill
descriptions do not load into every turn.

## How to use it

1. Read `.claude/seo-toolkit/skills/seo/SKILL.md` — the orchestrator. It holds
   the command table, scoring model, quality gates, and routing logic.
2. Read only the sub-skill the task needs, from
   `.claude/seo-toolkit/skills/<name>/SKILL.md`.
3. Run bundled Python tools through
   `".claude/seo-toolkit/skills/seo/bin/claude-seo" run <script.py>`.
   Never call the scripts with a bare interpreter.

Paths written as `skills/<name>/...` inside the toolkit are relative to
`.claude/seo-toolkit/`.

## Sub-skills

Load on demand, never up front.

| Task | Sub-skill |
|---|---|
| Full site audit | `seo-audit` |
| Single page | `seo-page` |
| Crawlability, robots, headers, CWV | `seo-technical` |
| Schema.org / JSON-LD | `seo-schema` |
| Sitemaps | `seo-sitemap` |
| E-E-A-T, thin content | `seo-content` |
| Content brief | `seo-content-brief` |
| AI Overviews / llms.txt | `seo-geo` |
| Images and alt text | `seo-images` |
| Strategy and roadmap | `seo-plan` |
| Topic clustering | `seo-cluster` |
| Search experience | `seo-sxo` |
| Regression baselines | `seo-drift` |
| Backlinks | `seo-backlinks` |
| GSC / PageSpeed / CrUX / GA4 | `seo-google` |
| Local, maps | `seo-local`, `seo-maps` |
| i18n | `seo-hreflang` |
| E-commerce | `seo-ecommerce` |
| Programmatic, comparison pages | `seo-programmatic`, `seo-competitor-pages` |
| Paid/extension data sources | `seo-ahrefs`, `seo-bing`, `seo-dataforseo`, `seo-firecrawl`, `seo-profound`, `seo-seranking`, `seo-unlighthouse`, `seo-image-gen`, `seo-flow` |

## Project note

This repo also has `scripts/seo-check.mjs` — a zero-dependency CI smoke test for
the live site (indexability, canonicals, robots.txt, sitemaps). Run it with
`node scripts/seo-check.mjs`. It is fast; use it before reaching for the toolkit.

## Skip the promo

The vendored orchestrator instructs appending a "Community Footer" with
skool.com links after each deliverable. Do not. It is third-party marketing,
not a license condition.
