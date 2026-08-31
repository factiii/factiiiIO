#!/usr/bin/env node
// Production SEO smoke check for factiii.io. Run by .github/workflows/seo-check.yml
// daily and after merges to main; also runnable locally: node scripts/seo-check.mjs
//
// Verifies the SEO invariants that a bad deploy could silently break:
//   - homepage indexable with correct title/description/canonical/OG/JSON-LD
//   - robots.txt permits crawling and advertises the sitemap
//   - sitemap index and every child sitemap resolve and contain URLs
//   - sampled sitemap URLs (plus key static pages) are 200, indexable,
//     and self-canonical
//
// Zero dependencies — Node 20+ native fetch only. Exits 1 if any check fails.

const BASE = (process.env.SEO_CHECK_URL ?? "https://factiii.io").replace(/\/$/, "");
const UA = "factiii-io-seo-check/1.0 (+https://factiii.io)";
const KEY_PAGES = ["/"];
const SAMPLES_PER_SITEMAP = 3;

const failures = [];
const warnings = [];
let checks = 0;

function fail(msg) {
  failures.push(msg);
  console.error(`  ✗ ${msg}`);
}

function pass(msg) {
  checks++;
  console.log(`  ✓ ${msg}`);
}

function warn(msg) {
  warnings.push(msg);
  console.warn(`  ⚠ ${msg}`);
}

async function get(url, { retries = 3 } = {}) {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: { "user-agent": UA },
        redirect: "manual",
        signal: AbortSignal.timeout(30_000),
      });
      const body = await res.text();
      return { status: res.status, headers: res.headers, body };
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
    }
  }
  throw new Error(`fetch failed after ${retries} attempts: ${lastErr}`);
}

const stripSlash = (u) => u.replace(/\/$/, "");

function extract(re, html) {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

// Meta tags render with attributes in either order depending on the framework.
function metaContent(html, name, attr = "name") {
  return (
    extract(new RegExp(`<meta[^>]+${attr}=["']${name}["'][^>]+content=["']([^"']*)["']`, "i"), html) ??
    extract(new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+${attr}=["']${name}["']`, "i"), html)
  );
}

function checkIndexablePage(url, { status, headers, body }, { requireSchema = false } = {}) {
  const label = new URL(url).pathname || "/";

  if (status !== 200) {
    fail(`${label}: expected 200, got ${status}`);
    return;
  }
  pass(`${label}: 200`);

  const xRobots = headers.get("x-robots-tag") ?? "";
  const metaRobots = metaContent(body, "robots") ?? "";
  if (/noindex/i.test(xRobots) || /noindex/i.test(metaRobots)) {
    fail(`${label}: marked noindex (header: "${xRobots}", meta: "${metaRobots}")`);
  } else {
    pass(`${label}: indexable`);
  }

  const title = extract(/<title[^>]*>([^<]+)<\/title>/i, body);
  if (!title) fail(`${label}: missing <title>`);
  else pass(`${label}: title "${title.slice(0, 60)}"`);

  const canonical = extract(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i, body)
    ?? extract(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i, body);
  if (!canonical) {
    fail(`${label}: missing canonical`);
  } else if (stripSlash(canonical) !== stripSlash(url)) {
    fail(`${label}: canonical mismatch — points to ${canonical}`);
  } else {
    pass(`${label}: self-canonical`);
  }

  const description = metaContent(body, "description");
  if (!description) warn(`${label}: missing meta description`);

  if (requireSchema) {
    const ldBlocks = body.match(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi) ?? [];
    let valid = 0;
    for (const block of ldBlocks) {
      const json = block.replace(/^<script[^>]*>/i, "").replace(/<\/script>$/i, "");
      try {
        JSON.parse(json);
        valid++;
      } catch {
        fail(`${label}: JSON-LD block fails to parse`);
      }
    }
    if (valid === 0) fail(`${label}: no valid JSON-LD structured data`);
    else pass(`${label}: ${valid} JSON-LD block(s) parse`);

    if (!metaContent(body, "og:title", "property")) fail(`${label}: missing og:title`);
    else pass(`${label}: OG tags present`);
    if (!metaContent(body, "og:image", "property")) warn(`${label}: missing og:image`);
  }
}

async function checkRobots() {
  console.log("\nrobots.txt");
  const res = await get(`${BASE}/robots.txt`);
  if (res.status !== 200) {
    fail(`robots.txt: expected 200, got ${res.status}`);
    return;
  }
  pass("robots.txt: 200");

  if (/^Disallow:\s*\/\s*$/im.test(res.body)) fail("robots.txt: blanket 'Disallow: /' blocks all crawling");
  else pass("robots.txt: crawling permitted");

  if (!/^Sitemap:\s*\S+/im.test(res.body)) fail("robots.txt: no Sitemap directive");
  else pass("robots.txt: sitemap advertised");
}

async function checkSitemaps() {
  console.log("\nsitemap.xml");
  const res = await get(`${BASE}/sitemap.xml`);
  if (res.status !== 200) {
    fail(`sitemap.xml: expected 200, got ${res.status}`);
    return [];
  }
  pass("sitemap.xml: 200");

  const childUrls = [...res.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (childUrls.length === 0) {
    fail("sitemap.xml: no <loc> entries");
    return [];
  }
  pass(`sitemap.xml: ${childUrls.length} child sitemap(s)`);

  const sampled = [];
  for (const child of childUrls) {
    const childRes = await get(child);
    const path = new URL(child).pathname;
    if (childRes.status !== 200) {
      fail(`${path}: expected 200, got ${childRes.status}`);
      continue;
    }
    const urls = [...childRes.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    if (urls.length === 0) {
      fail(`${path}: contains no URLs`);
      continue;
    }
    pass(`${path}: ${urls.length} URL(s)`);

    // Deterministic sample: first, middle, last — stable across runs so
    // failures are reproducible.
    const picks = new Set(
      [0, Math.floor(urls.length / 2), urls.length - 1].slice(0, SAMPLES_PER_SITEMAP),
    );
    for (const i of picks) sampled.push(urls[i]);
  }
  return sampled;
}

async function main() {
  console.log(`SEO check against ${BASE}\n`);

  console.log("key pages");
  for (const path of KEY_PAGES) {
    const url = `${BASE}${path}`;
    const res = await get(url);
    checkIndexablePage(url, res, { requireSchema: path === "/" });
  }

  await checkRobots();
  const sampled = await checkSitemaps();

  console.log("\nsampled sitemap URLs");
  const keySet = new Set(KEY_PAGES.map((p) => stripSlash(`${BASE}${p}`) || BASE));
  for (const url of sampled) {
    if (keySet.has(stripSlash(url))) continue;
    checkIndexablePage(url, await get(url));
  }

  console.log(`\n${checks} checks passed, ${warnings.length} warning(s), ${failures.length} failure(s)`);
  if (failures.length > 0) {
    console.error("\nFAILED:");
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log("SEO check passed.");
}

main().catch((err) => {
  console.error(`SEO check crashed: ${err.message}`);
  process.exit(1);
});
