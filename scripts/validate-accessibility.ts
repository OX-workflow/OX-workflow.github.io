import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.resolve(__dirname, "..", "dist", "public");
const pages = ["","product","solutions","architecture","security","roadmap","about","resources","contact","investors","pricing","customers"];

function stripMarkup(value: string): string {
  return value.replace(/<[^>]+>/g, "").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
}

for (const locale of ["en","fa"] as const) {
  for (const page of pages) {
    const file = page ? path.join(outputDirectory, locale, page, "index.html") : path.join(outputDirectory, locale, "index.html");
    const html = fs.readFileSync(file, "utf8");
    const label = \`\${locale}/\${page || "home"}\`;

    for (const image of [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0])) {
      if (!/\balt\s*=\s*"/i.test(image)) throw new Error(\`Missing alt text on \${label} image.\`);
    }

    for (const button of [...html.matchAll(/<button\b[^>]*>[\s\S]*?<\/button>/gi)].map((match) => match[0])) {
      const labelled = /\baria-label\s*=\s*"[^"]+"/i.test(button) || /\baria-labelledby\s*=\s*"[^"]+"/i.test(button);
      const content = stripMarkup(button.replace(/^<button\b[^>]*>|<\/button>$/gi, ""));
      if (!labelled && !content) throw new Error(\`Unlabelled button on \${label}.\`);
    }

    const headings = [...html.matchAll(/<h([1-6])\b[^>]*>/gi)].map((match) => Number(match[1]));
    if (headings.length === 0) throw new Error(\`No semantic heading found on \${label}.\`);
    if (headings.filter((level) => level === 1).length !== 1) throw new Error(\`Expected exactly one h1 on \${label}.\`);
    for (let i = 1; i < headings.length; i++) {
      if (headings[i] > headings[i - 1] + 1) throw new Error(\`Heading level jumps from h\${headings[i - 1]} to h\${headings[i]} on \${label}.\`);
    }

    const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] ?? "";
    if (!new RegExp(\`lang="\${locale}"\`).test(htmlTag)) throw new Error(\`Missing document language on \${label}.\`);
    const direction = locale === "fa" ? "rtl" : "ltr";
    if (!new RegExp(\`dir="\${direction}"\`).test(htmlTag)) throw new Error(\`Missing document direction on \${label}.\`);

    for (const anchor of [...html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)].map((match) => match[0])) {
      if (!/\brel\s*=\s*"[^"]*noreferrer[^"]*"/i.test(anchor)) throw new Error(\`External target link without noreferrer on \${label}.\`);
    }
  }
}

console.log("Accessibility checks passed for all prerendered English and Farsi routes.");
