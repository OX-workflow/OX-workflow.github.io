import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.resolve(__dirname, "..", "dist", "public");
const robots = fs.readFileSync(path.join(outputDirectory, "robots.txt"), "utf8");
const sitemap = fs.readFileSync(path.join(outputDirectory, "sitemap.xml"), "utf8");
const siteUrl = "https://ox-workflow.github.io";

if (!robots.includes("User-agent: *") || !robots.includes("Allow: /")) {
  throw new Error("robots.txt does not allow general crawling.");
}

if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) {
  throw new Error("robots.txt does not reference the canonical sitemap URL.");
}

if (!sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
  throw new Error("sitemap.xml does not have a valid XML declaration.");
}

if (!sitemap.includes(`<loc>${siteUrl}/</loc>`)) {
  throw new Error("sitemap.xml does not include the canonical case-study URL.");
}

if (!/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(sitemap)) {
  throw new Error("sitemap.xml does not include a valid last modification date.");
}

console.log("Valid robots.txt and sitemap.xml artifacts.");
