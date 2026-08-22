import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.resolve(__dirname, "..", "dist", "public");
const robots = fs.readFileSync(path.join(outputDirectory, "robots.txt"), "utf8");
const sitemap = fs.readFileSync(path.join(outputDirectory, "sitemap.xml"), "utf8");
const siteUrl = "https://ox-workflow.github.io";
const routes = {
  root: { file: path.join(outputDirectory, "index.html"), url: `${siteUrl}/`, canonical: `${siteUrl}/en/`, language: "en", phrase: "Operational intelligence" },
  en: { file: path.join(outputDirectory, "en", "index.html"), url: `${siteUrl}/en/`, canonical: `${siteUrl}/en/`, language: "en", phrase: "Operational intelligence" },
  fa: { file: path.join(outputDirectory, "fa", "index.html"), url: `${siteUrl}/fa/`, canonical: `${siteUrl}/fa/`, language: "fa", phrase: "هوشمندی عملیاتی" },
} as const;

const alternateLinks = [
  `<link rel="alternate" hreflang="en" href="${siteUrl}/en/" />`,
  `<link rel="alternate" hreflang="fa" href="${siteUrl}/fa/" />`,
  `<link rel="alternate" hreflang="x-default" href="${siteUrl}/" />`,
];

if (!robots.includes("User-agent: *") || !robots.includes("Allow: /")) {
  throw new Error("robots.txt does not allow general crawling.");
}

if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) {
  throw new Error("robots.txt does not reference the canonical sitemap URL.");
}

if (!sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
  throw new Error("sitemap.xml does not have a valid XML declaration.");
}

if (!sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) {
  throw new Error("sitemap.xml does not declare the xhtml namespace required for hreflang annotations.");
}

for (const route of Object.values(routes)) {
  if (!sitemap.includes(`<loc>${route.url}</loc>`)) {
    throw new Error(`sitemap.xml does not include ${route.url}.`);
  }
}

for (const alternate of [
  `<xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en/" />`,
  `<xhtml:link rel="alternate" hreflang="fa" href="${siteUrl}/fa/" />`,
  `<xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />`,
]) {
  if ((sitemap.match(new RegExp(alternate.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) ?? []).length !== 3) {
    throw new Error(`sitemap.xml must provide ${alternate} for every crawlable language URL.`);
  }
}

if (!/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(sitemap)) {
  throw new Error("sitemap.xml does not include a valid last modification date.");
}

for (const [routeName, route] of Object.entries(routes)) {
  const html = fs.readFileSync(route.file, "utf8");
  const htmlLanguage = route.language === "fa" ? '<html lang="fa" dir="rtl">' : '<html lang="en">';

  if (!html.includes(htmlLanguage)) {
    throw new Error(`${routeName} page does not declare the expected document language and direction.`);
  }

  if (!html.includes(`<link rel="canonical" href="${route.canonical}" />`)) {
    throw new Error(`${routeName} page does not declare its expected canonical URL.`);
  }

  for (const alternate of alternateLinks) {
    if (!html.includes(alternate)) {
      throw new Error(`${routeName} page is missing reciprocal alternate URL ${alternate}.`);
    }
  }

  if (!html.includes(route.phrase)) {
    throw new Error(`${routeName} page does not contain its expected pre-rendered language content.`);
  }
}

console.log("Valid multilingual robots.txt, sitemap.xml, canonical, and hreflang artifacts.");
