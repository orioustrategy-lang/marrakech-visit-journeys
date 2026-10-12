#!/usr/bin/env node
/**
 * Optimize tour images referenced from src/data/tours.ts.
 *
 * - Finds every "/assets/..." string literal in src/data/tours.ts.
 * - For each file that exists under public/, writes:
 *     public/images/tours/<slug>.webp     (max 1600px wide, q78)
 *     public/images/tours/<slug>-sm.webp  (max 640px wide, q78)
 * - Rewrites the paths in tours.ts to "/images/tours/<slug>.webp".
 * - Also writes optimized copies of root-level page images from src/assets
 *   to src/assets/optimized/<name>.webp (imports are NOT changed).
 *
 * Idempotent: outputs newer than their source are skipped.
 * Originals are never moved or deleted.
 *
 * Usage: node scripts/optimize-images.mjs [--dry-run]
 */
import fs from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TOURS_FILE = path.join(ROOT, "src", "data", "tours.ts");
const PUBLIC_DIR = path.join(ROOT, "public");
const OUT_DIR = path.join(PUBLIC_DIR, "images", "tours");
const OUT_URL = "/images/tours";
const SRC_ASSETS = path.join(ROOT, "src", "assets");
const SRC_OPT_DIR = path.join(SRC_ASSETS, "optimized");

const LARGE_WIDTH = 1600;
const SMALL_WIDTH = 640;
const QUALITY = 78;
const DRY_RUN = process.argv.includes("--dry-run");

const PAGE_IMAGES = [
  { name: "hero-desert", width: 2000 },
  { name: "youssef-guide", width: 1600 },
  { name: "moroccan-culture", width: 1600 },
  { name: "marrakech-city", width: 1600 },
  { name: "atlas-mountains", width: 1600 },
  { name: "agafay-desert", width: 1600 },
  { name: "ourika-valley", width: 1600 },
];
const PAGE_IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

sharp.cache(false);

function slugify(s) {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function shortHash(s) {
  return crypto.createHash("sha1").update(s).digest("hex").slice(0, 6);
}

/** Base slug: parent folder + file name (without extension). */
function baseSlug(assetUrl) {
  const parts = assetUrl.split("/").filter(Boolean);
  const file = parts[parts.length - 1];
  const folder = parts.length >= 2 ? parts[parts.length - 2] : "";
  const name = file.replace(/\.[^.]+$/, "");
  let folderSlug = slugify(folder);
  if (folderSlug.length > 60) folderSlug = folderSlug.slice(0, 60).replace(/-+$/, "");
  let nameSlug = slugify(name) || "img";
  // Hash-like camera/CDN names can be 64+ chars; keep slugs readable but unique.
  if (nameSlug.length > 40) nameSlug = `${nameSlug.slice(0, 24).replace(/-+$/, "")}-${shortHash(name)}`;
  return folderSlug ? `${folderSlug}-${nameSlug}` : nameSlug;
}

/** Map each unique asset URL to a unique slug (hash suffix on collisions). */
function buildSlugMap(urls) {
  // Key by resolved file path in lowercase so case-only variants (same file on
  // a case-insensitive FS) share one output.
  const byBase = new Map();
  for (const url of urls) {
    const b = baseSlug(url);
    if (!byBase.has(b)) byBase.set(b, new Set());
    byBase.get(b).add(url.toLowerCase());
  }
  const map = new Map();
  for (const url of urls) {
    const b = baseSlug(url);
    const group = byBase.get(b);
    map.set(url, group.size > 1 ? `${b}-${shortHash(url.toLowerCase())}` : b);
  }
  return map;
}

function isFresh(out, srcMtimeMs) {
  if (!existsSync(out)) return false;
  return statSync(out).mtimeMs > srcMtimeMs;
}

async function writeWebp(src, out, width) {
  if (DRY_RUN) return;
  await sharp(src, { failOn: "none", limitInputPixels: false })
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(out);
}

async function fileSize(p) {
  try {
    return (await fs.stat(p)).size;
  } catch {
    return 0;
  }
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;

async function optimizeTours() {
  const source = await fs.readFile(TOURS_FILE, "utf8");
  const re = /(["'`])(\/assets\/[^"'`]+?)\1/g;
  const urls = [...new Set([...source.matchAll(re)].map((m) => m[2]))];
  console.log(`Found ${urls.length} unique /assets/ references in tours.ts`);

  const slugMap = buildSlugMap(urls);
  await fs.mkdir(OUT_DIR, { recursive: true });

  const missing = [];
  const failed = [];
  const replacements = new Map();
  const doneSources = new Map(); // lowercased abs path -> slug (dedupe)
  let before = 0;
  let after = 0;
  let generated = 0;
  let skipped = 0;

  for (const url of urls) {
    let decoded = url;
    try {
      decoded = decodeURIComponent(url);
    } catch {}
    const src = path.join(PUBLIC_DIR, ...decoded.split("/").filter(Boolean));
    if (!existsSync(src)) {
      missing.push(url);
      continue;
    }
    const key = src.toLowerCase();
    const slug = doneSources.get(key) ?? slugMap.get(url);
    const outLg = path.join(OUT_DIR, `${slug}.webp`);
    const outSm = path.join(OUT_DIR, `${slug}-sm.webp`);

    if (!doneSources.has(key)) {
      const st = statSync(src);
      try {
        let did = false;
        if (!isFresh(outLg, st.mtimeMs)) {
          await writeWebp(src, outLg, LARGE_WIDTH);
          did = true;
        }
        if (!isFresh(outSm, st.mtimeMs)) {
          await writeWebp(src, outSm, SMALL_WIDTH);
          did = true;
        }
        did ? generated++ : skipped++;
      } catch (err) {
        failed.push({ url, error: err.message });
        continue;
      }
      doneSources.set(key, slug);
      before += st.size;
      after += await fileSize(outLg);
    }
    replacements.set(url, `${OUT_URL}/${slug}.webp`);
  }

  let updated = source;
  let count = 0;
  updated = updated.replace(re, (m, q, url) => {
    const r = replacements.get(url);
    if (!r) return m;
    count++;
    return `${q}${r}${q}`;
  });
  if (updated !== source && !DRY_RUN) await fs.writeFile(TOURS_FILE, updated, "utf8");

  console.log(
    `\nTour images: ${doneSources.size} sources (${generated} generated, ${skipped} up-to-date), ` +
      `${count} path occurrences rewritten`,
  );
  console.log(`  Before (originals): ${mb(before)}`);
  console.log(`  After (1600px webp): ${mb(after)}`);
  if (missing.length) {
    console.log(`\nMissing on disk (${missing.length}, left unchanged):`);
    for (const m of missing) console.log(`  - ${m}`);
  }
  if (failed.length) {
    console.log(`\nFailed to process (${failed.length}, left unchanged):`);
    for (const f of failed) console.log(`  - ${f.url}\n      ${f.error}`);
  }
  return { before, after };
}

async function optimizePageImages() {
  await fs.mkdir(SRC_OPT_DIR, { recursive: true });
  let before = 0;
  let after = 0;
  console.log("\nPage images (src/assets -> src/assets/optimized):");
  for (const { name, width } of PAGE_IMAGES) {
    const ext = PAGE_IMAGE_EXTS.find((e) => existsSync(path.join(SRC_ASSETS, name + e)));
    if (!ext) {
      console.log(`  - ${name}: not found, skipped`);
      continue;
    }
    const src = path.join(SRC_ASSETS, name + ext);
    const out = path.join(SRC_OPT_DIR, `${name}.webp`);
    const st = statSync(src);
    try {
      const fresh = isFresh(out, st.mtimeMs);
      if (!fresh) await writeWebp(src, out, width);
      const outSize = await fileSize(out);
      before += st.size;
      after += outSize;
      console.log(`  - ${name}${ext}: ${mb(st.size)} -> ${mb(outSize)}${fresh ? " (up-to-date)" : ""}`);
    } catch (err) {
      console.log(`  - ${name}${ext}: FAILED ${err.message}`);
    }
  }
  console.log(`  Total: ${mb(before)} -> ${mb(after)}`);
  return { before, after };
}

const t = await optimizeTours();
const p = await optimizePageImages();
console.log(`\nGrand total: ${mb(t.before + p.before)} -> ${mb(t.after + p.after)}${DRY_RUN ? " (dry run)" : ""}`);
