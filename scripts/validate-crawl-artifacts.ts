import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.resolve(__dirname, "..", "dist", "public");
const siteUrl = "https://ox-workflow.github.io";
const pages = ["product","solutions","architecture","security","roadmap","about","resources","contact","investors","pricing","customers"] as const;

type Route = {
  locale: "en" | "fa";
  page: string | null;
  file: string;
  url: string;
  canonical: string;
};

const routes: Route[] = [
  { locale: "en", page: null, file: path.join(outputDirectory, "en", "index.html"), url: \`\${siteUrl}/en/\`, canonical: \`\${siteUrl}/en/\` },
  { locale: "fa", page: null, file: path.join(outputDirectory, "fa", "index.html"), url: \`\${siteUrl}/fa/\`, canonical: \`\${siteUrl}/fa/\` },
  ...pages.flatMap((page) => [
    { locale: "en" as const, page, file: path.join(outputDirectory, "en", page, "index.html"), url: \`\${siteUrl}/en/\${page}/\`, canonical: \`\${siteUrl}/en/\${page}/\` },
    { locale: "fa" as const, page, file: path.join(outputDirectory, "fa", page, "index.html"), url: \`\${siteUrl}/fa/\${page}/\`, canonical: \`\${siteUrl}/fa/\${page}/\` },
  ]),
];

function alternates(page: string | null): string[] {
  const suffix = page ? \`\${page}/\` : "";
  const xDefault = page ? \`\${siteUrl}/en/\${suffix}\` : \`\${siteUrl}/\`;
  return [
    \`<link rel="alternate" hreflang="en" href="\${siteUrl}/en/\${suffix}" />\`,
    \`<link rel="alternate" hreflang="fa" href="\${siteUrl}/fa/\${suffix}" />\`,
    \`<link rel="alternate" hreflang="x-default" href="\${xDefault}" />\`,
  ];
}

const robots = fs.readFileSync(path.join(outputDirectory, "robots.txt"), "utf8");
const sitemap = fs.readFileSync(path.join(outputDirectory, "sitemap.xml"), "utf8");

if (!robots.includes("User-agent: *") || !robots.includes("Allow: /")) throw new Error("robots.txt does not allow general crawling.");
if (!robots.includes(\`Sitemap: \${siteUrl}/sitemap.xml\`)) throw new Error("robots.txt does not reference the canonical sitemap URL.");
if (!sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) throw new Error("sitemap.xml does not have a valid XML declaration.");
if (!sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) throw new Error("sitemap.xml is missing the xhtml namespace.");

for (const route of routes) {
  if (!fs.existsSync(route.file)) throw new Error(\`Missing prerendered route: \${route.url}\`);
  if (!sitemap.includes(\`<loc>\${route.url}</loc>\`)) throw new Error(\`sitemap.xml does not include \${route.url}\`);
  for (const alternate of alternates(route.page).map((value) => value.replace("<link ", "<xhtml:link "))) {
    if (!sitemap.includes(alternate)) throw new Error(\`sitemap.xml is missing \${alternate} for \${route.url}\`);
  }

  const html = fs.readFileSync(route.file, "utf8");
  const expectedLanguage = route.locale === "fa" ? '<html lang="fa" dir="rtl">' : '<html lang="en" dir="ltr">';
  if (!html.includes(expectedLanguage)) throw new Error(\`\${route.url} has incorrect language/direction metadata.\`);
  if (!html.includes(\`<link rel="canonical" href="\${route.canonical}" />\`)) throw new Error(\`\${route.url} has incorrect canonical metadata.\`);

  const title = html.match(/<title>([^<]+)<\\/title>/)?.[1] ?? "";
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  if (!title || !description) throw new Error(\`\${route.url} is missing title or description.\`);
  if (!html.includes(\`<meta property="og:title" content="\${title}" />\`)) throw new Error(\`\${route.url} has mismatched og:title.\`);
  if (!html.includes(\`<meta property="og:url" content="\${route.canonical}" />\`)) throw new Error(\`\${route.url} has mismatched og:url.\`);
  if (!html.includes(\`<meta name="twitter:title" content="\${title}" />\`)) throw new Error(\`\${route.url} has mismatched twitter:title.\`);
  if (!html.includes(\`<meta name="twitter:description" content="\${description}" />\`)) throw new Error(\`\${route.url} has mismatched twitter:description.\`);
  for (const alternate of alternates(route.page)) {
    if (!html.includes(alternate)) throw new Error(\`\${route.url} is missing \${alternate}\`);
  }
}

const titles = new Map<string, string>();
for (const route of routes) {
  const html = fs.readFileSync(route.file, "utf8");
  const title = html.match(/<title>([^<]+)<\\/title>/)?.[1] ?? "";
  if (titles.has(title)) throw new Error(\`Duplicate title "\${title}" on \${route.url} and \${titles.get(title)}\`);
  titles.set(title, route.url);
}

console.log(\`Valid SEO metadata, canonicals, hreflang, sitemap, and robots for \${routes.length} routes.\`);
