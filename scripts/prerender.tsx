import React from "react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../client/src/pages/Home";

type Locale = "en" | "fa";

type LocaleMetadata = {
  documentLanguage: string;
  direction?: "rtl";
  url: string;
  title: string;
  description: string;
  socialTitle: string;
  socialDescription: string;
  articleHeadline: string;
  articleAlternativeHeadline: string;
  articleDescription: string;
  articleSection: string;
  articleKeywords: string[];
};

const SITE_URL = "https://ox-workflow.github.io";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.resolve(__dirname, "..", "dist", "public");
const sourceDocument = fs.readFileSync(path.join(outputDirectory, "index.html"), "utf8");

const localeMetadata: Record<Locale, LocaleMetadata> = {
  en: {
    documentLanguage: "en",
    url: `${SITE_URL}/en/`,
    title: "ONYX Tectosilicate Framework | Systems Architecture Case Study",
    description: "Explore the ONYX Tectosilicate Framework: an evidence-led, local-first mission-operations architecture with explicit boundaries, authority-aware workflows, and IFEM-informed engineering.",
    socialTitle: "ONYX Tectosilicate Framework",
    socialDescription: "Evidence-led systems architecture for local-first, authority-aware mission operations.",
    articleHeadline: "Operational intelligence for complex systems",
    articleAlternativeHeadline: "ONYX Tectosilicate Framework Systems Architecture Case Study",
    articleDescription: "A systems architecture case study describing the local-first, authority-aware mission-operations approach of the ONYX Tectosilicate Framework.",
    articleSection: "Systems Architecture",
    articleKeywords: ["mission operations", "systems architecture", "local-first", "IFEM", "software engineering"],
  },
  fa: {
    documentLanguage: "fa",
    direction: "rtl",
    url: `${SITE_URL}/fa/`,
    title: "چارچوب تکتوسیلیکات ONYX | مطالعه موردی معماری سامانه‌ها",
    description: "چارچوب تکتوسیلیکات ONYX را بررسی کنید: معماری عملیاتی محلی‌محور و مبتنی بر شواهد، با مرزهای صریح، جریان‌های کاری آگاه از اختیار و مهندسی الهام‌گرفته از IFEM.",
    socialTitle: "چارچوب تکتوسیلیکات ONYX",
    socialDescription: "معماری سامانه مبتنی بر شواهد برای عملیات مأموریت محلی‌محور و آگاه از اختیار.",
    articleHeadline: "هوشمندی عملیاتی برای سامانه‌های پیچیده",
    articleAlternativeHeadline: "مطالعه موردی معماری سامانه‌های چارچوب ONYX",
    articleDescription: "مطالعه‌ای موردی درباره رویکرد محلی‌محور و آگاه از اختیار چارچوب تکتوسیلیکات ONYX برای عملیات مأموریت.",
    articleSection: "معماری سامانه‌ها",
    articleKeywords: ["عملیات مأموریت", "معماری سامانه‌ها", "محلی‌محور", "IFEM", "مهندسی نرم‌افزار"],
  },
};

function replaceMeta(html: string, attribute: "name" | "property", value: string, content: string): string {
  const expression = new RegExp(`<meta\\s+${attribute}="${value}"\\s+content="[^"]*"\\s*/?>`, "i");
  const replacement = `<meta ${attribute}="${value}" content="${content}" />`;
  if (!expression.test(html)) {
    throw new Error(`Missing ${attribute} metadata for ${value}.`);
  }
  return html.replace(expression, replacement);
}

function alternateLinks(): string {
  return [
    `    <link rel="alternate" hreflang="en" href="${localeMetadata.en.url}" />`,
    `    <link rel="alternate" hreflang="fa" href="${localeMetadata.fa.url}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`,
  ].join("\n");
}

function schema(locale: Locale): string {
  const metadata = localeMetadata[locale];
  const entityBase = metadata.url.slice(0, -1);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "ONYX Tectosilicate Framework",
        description: "An evidence-led systems architecture case study for a local-first, authority-aware mission-operations framework.",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: ["en", "fa"],
      },
      {
        "@type": "WebPage",
        "@id": `${entityBase}/#webpage`,
        url: metadata.url,
        name: metadata.title,
        description: metadata.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${entityBase}/#case-study` },
        inLanguage: locale,
      },
      {
        "@type": "Article",
        "@id": `${entityBase}/#case-study`,
        mainEntityOfPage: { "@id": `${entityBase}/#webpage` },
        headline: metadata.articleHeadline,
        alternativeHeadline: metadata.articleAlternativeHeadline,
        description: metadata.articleDescription,
        articleSection: metadata.articleSection,
        genre: "Technical case study",
        url: metadata.url,
        image: [`${SITE_URL}/assets/product/mission-operations.png`, `${SITE_URL}/assets/product/operational-overview.png`],
        author: { "@id": `${SITE_URL}/#suhail-muzaffari` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: [{ "@id": `${SITE_URL}/#onyx-framework` }, { "@id": "https://ifem-doctrine.github.io/#ifem" }],
        inLanguage: locale,
        isAccessibleForFree: true,
        keywords: metadata.articleKeywords,
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": `${SITE_URL}/#onyx-framework`,
        name: "ONYX Tectosilicate Framework",
        url: `${SITE_URL}/en/`,
        description: "A local-first, authority-aware mission-operations system presented as an evidence-led systems architecture case study.",
        codeRepository: "https://github.com/SMozaff/Onyx-Framwork",
        programmingLanguage: ["Rust", "TypeScript"],
        author: { "@id": `${SITE_URL}/#suhail-muzaffari` },
        about: { "@id": "https://ifem-doctrine.github.io/#ifem" },
        keywords: "ONYX Tectosilicate Framework, mission operations, systems architecture, local-first, IFEM",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "ONYX Tectosilicate Framework",
        url: `${SITE_URL}/en/`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/assets/onyx-logo.png`,
          caption: "ONYX Tectosilicate Framework logo",
        },
        email: "so.muzaff@gmail.com",
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#suhail-muzaffari`,
        name: "Suhail Muzaffari",
        jobTitle: "Software Engineer and Systems Architect",
        url: "https://SMozaff.github.io/",
        email: "so.muzaff@gmail.com",
        sameAs: ["https://github.com/SMozaff", "https://orcid.org/0009-0001-2428-1295"],
      },
      {
        "@type": "DefinedTerm",
        "@id": "https://ifem-doctrine.github.io/#ifem",
        name: "Interface-First Engineering Methodology (IFEM)",
        url: "https://IFEM-doctrine.github.io/",
        description: "An engineering methodology for defining interfaces, contracts, responsibilities, and verification boundaries before large-scale parallel implementation.",
      },
    ],
  };

  return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n    </script>`;
}

function localizedDocument(locale: Locale): string {
  const metadata = localeMetadata[locale];
  const rootMarkup = renderToStaticMarkup(<Home initialLocale={locale} />);
  const htmlAttributes = metadata.direction ? `<html lang="${metadata.documentLanguage}" dir="${metadata.direction}">` : `<html lang="${metadata.documentLanguage}">`;
  const metadataWithAlternates = `${alternateLinks()}\n    <link rel="canonical" href="${metadata.url}" />`;

  let documentHtml = sourceDocument
    .replace(/<html lang="en">/, htmlAttributes)
    .replace('<div id="root"></div>', `<div id="root">${rootMarkup}</div>`)
    .replace(/<link rel="canonical" href="[^"]+"\s*\/>/, metadataWithAlternates)
    .replace(/<script type="application\/ld\+json">\s*[\s\S]*?\s*<\/script>/, schema(locale));

  documentHtml = replaceMeta(documentHtml, "name", "description", metadata.description);
  documentHtml = replaceMeta(documentHtml, "property", "og:title", metadata.socialTitle);
  documentHtml = replaceMeta(documentHtml, "property", "og:description", metadata.socialDescription);
  documentHtml = replaceMeta(documentHtml, "property", "og:url", metadata.url);
  documentHtml = replaceMeta(documentHtml, "name", "twitter:title", metadata.socialTitle);
  documentHtml = replaceMeta(documentHtml, "name", "twitter:description", metadata.socialDescription);
  documentHtml = documentHtml.replace(/<title>[^<]*<\/title>/, `<title>${metadata.title}</title>`);

  if (documentHtml === sourceDocument) {
    throw new Error(`Unable to pre-render the ${locale} document.`);
  }

  return documentHtml;
}

for (const locale of ["en", "fa"] as const) {
  const documentHtml = localizedDocument(locale);
  const localeDirectory = path.join(outputDirectory, locale);
  fs.mkdirSync(localeDirectory, { recursive: true });
  fs.writeFileSync(path.join(localeDirectory, "index.html"), documentHtml, "utf8");

  if (locale === "en") {
    fs.writeFileSync(path.join(outputDirectory, "index.html"), documentHtml, "utf8");
  }
}

console.log("Pre-rendered crawlable English and Farsi case-study documents into /en/ and /fa/.");
