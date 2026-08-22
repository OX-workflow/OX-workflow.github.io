import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, "..", "dist", "public", "index.html");
const html = fs.readFileSync(outputPath, "utf8");
const match = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);

if (!match) {
  throw new Error("No JSON-LD script was found in the built HTML.");
}

const data = JSON.parse(match[1]) as { "@context"?: string; "@graph"?: Array<{ "@id"?: string; "@type"?: string }> };
const graph = data["@graph"] ?? [];
const types = new Set(graph.map((node) => node["@type"]));
const ids = new Set(graph.map((node) => node["@id"]));
const requiredTypes = ["WebSite", "WebPage", "Article", "SoftwareSourceCode", "Organization", "Person", "DefinedTerm"];

if (data["@context"] !== "https://schema.org") {
  throw new Error("The JSON-LD context must be https://schema.org.");
}

for (const type of requiredTypes) {
  if (!types.has(type)) {
    throw new Error(`Missing required schema type: ${type}`);
  }
}

for (const id of [
  "https://ox-workflow.github.io/#website",
  "https://ox-workflow.github.io/#webpage",
  "https://ox-workflow.github.io/#case-study",
  "https://ox-workflow.github.io/#onyx-framework",
  "https://ox-workflow.github.io/#organization",
  "https://ox-workflow.github.io/#suhail-muzaffari",
  "https://ifem-doctrine.github.io/#ifem",
]) {
  if (!ids.has(id)) {
    throw new Error(`Missing required entity identifier: ${id}`);
  }
}

console.log(`Valid JSON-LD: ${graph.length} connected entities (${[...types].join(", ")}).`);
