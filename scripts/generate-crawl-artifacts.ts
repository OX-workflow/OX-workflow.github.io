import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://ox-workflow.github.io";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.resolve(__dirname, "..", "dist", "public");
const localizedUrls = {
  en: `${SITE_URL}/en/`,
  fa: `${SITE_URL}/fa/`,
  default: `${SITE_URL}/`,
};

function getLastModifiedDate(): string {
  try {
    return execFileSync("git", ["log", "-1", "--format=%cI"], {
      cwd: path.resolve(__dirname, ".."),
      encoding: "utf8",
    })
      .trim()
      .slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

function alternateLinks(): string {
  return `    <xhtml:link rel="alternate" hreflang="en" href="${localizedUrls.en}" />
    <xhtml:link rel="alternate" hreflang="fa" href="${localizedUrls.fa}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${localizedUrls.default}" />`;
}

function sitemapEntry(url: string, lastModified: string): string {
  return `  <url>
    <loc>${url}</loc>
${alternateLinks()}
    <lastmod>${lastModified}</lastmod>
  </url>`;
}

const lastModified = getLastModifiedDate();
const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntry(localizedUrls.default, lastModified)}
${sitemapEntry(localizedUrls.en, lastModified)}
${sitemapEntry(localizedUrls.fa, lastModified)}
</urlset>
`;

fs.writeFileSync(path.join(outputDirectory, "robots.txt"), robots, "utf8");
fs.writeFileSync(path.join(outputDirectory, "sitemap.xml"), sitemap, "utf8");
console.log(`Generated multilingual robots.txt and sitemap.xml for ${SITE_URL}.`);
