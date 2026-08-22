import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.resolve(__dirname, "..", "dist", "public");
const siteUrl = "https://ox-workflow.github.io";
const requiredTypes = ["WebSite", "WebPage", "Article", "SoftwareSourceCode", "Organization", "Person", "DefinedTerm"];
const localizedPages = [
  { locale: "en", file: path.join(outputDirectory, "en", "index.html"), url: `${siteUrl}/en/` },
  { locale: "fa", file: path.join(outputDirectory, "fa", "index.html"), url: `${siteUrl}/fa/` },
] as const;

type SchemaNode = { "@id"?: string; "@type"?: string; url?: string; inLanguage?: string | string[] };

for (const page of localizedPages) {
  const html = fs.readFileSync(page.file, "utf8");
  const match = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);

  if (!match) {
    throw new Error(`No JSON-LD script was found in the built ${page.locale} HTML.`);
  }

  const data = JSON.parse(match[1]) as { "@context"?: string; "@graph"?: SchemaNode[] };
  const graph = data["@graph"] ?? [];
  const types = new Set(graph.map((node) => node["@type"]));
  const ids = new Set(graph.map((node) => node["@id"]));
  const localizedEntityBase = page.url.slice(0, -1);

  if (data["@context"] !== "https://schema.org") {
    throw new Error(`The ${page.locale} JSON-LD context must be https://schema.org.`);
  }

  for (const type of requiredTypes) {
    if (!types.has(type)) {
      throw new Error(`Missing required schema type on ${page.locale}: ${type}`);
    }
  }

  for (const id of [
    `${siteUrl}/#website`,
    `${localizedEntityBase}/#webpage`,
    `${localizedEntityBase}/#case-study`,
    `${siteUrl}/#onyx-framework`,
    `${siteUrl}/#organization`,
    `${siteUrl}/#suhail-muzaffari`,
    "https://ifem-doctrine.github.io/#ifem",
  ]) {
    if (!ids.has(id)) {
      throw new Error(`Missing required ${page.locale} entity identifier: ${id}`);
    }
  }

  const webPage = graph.find((node) => node["@type"] === "WebPage");
  if (webPage?.url !== page.url || webPage.inLanguage !== page.locale) {
    throw new Error(`${page.locale} WebPage structured data does not use the matching canonical URL and language.`);
  }
}

console.log("Valid JSON-LD on both English and Farsi canonical documents.");
