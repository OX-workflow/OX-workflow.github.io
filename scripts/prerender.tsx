import React from "react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../client/src/pages/Home";
import SitePage, { type PageKey } from "../client/src/pages/SitePage";
import ProductPage from "../client/src/pages/ProductPage";

type Locale = "en" | "fa";

type LocaleMetadata = {
  documentLanguage: string;
  direction: "ltr" | "rtl";
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
    direction: "ltr",
    url: `${SITE_URL}/en/`,
    title: "ONYX | The Architecture of Execution",
    description: "ONYX is a Mission Operations Platform and Operational Intelligence Infrastructure that maps authority, coordinates execution, and verifies outcomes across complex organizations.",
    socialTitle: "ONYX | The architecture of execution",
    socialDescription: "A Mission Operations Platform and Operational Intelligence Infrastructure for visible execution, accountability, and organizational intelligence.",
    articleHeadline: "The architecture of execution",
    articleAlternativeHeadline: "ONYX Mission Operations Platform",
    articleDescription: "A Mission Operations Platform and Operational Intelligence Infrastructure for connecting authority, responsibility, execution, and verification across complex organizations.",
    articleSection: "Mission Operations Platform",
    articleKeywords: ["Mission Operations Platform", "Operational Intelligence Infrastructure", "authority graph", "accountability", "execution verification"],
  },
  fa: {
    documentLanguage: "fa",
    direction: "rtl",
    url: `${SITE_URL}/fa/`,
    title: "ONYX | معماری اجرا",
    description: "ONYX یک پلتفرم عملیات مأموریت‌محور و زیرساخت هوشمندی عملیاتی است که اختیار، اجرا و راستی‌آزمایی نتایج را در سازمان‌های پیچیده قابل مشاهده می‌کند.",
    socialTitle: "ONYX | معماری اجرا",
    socialDescription: "پلتفرم عملیات مأموریت‌محور و زیرساخت هوشمندی عملیاتی برای اجرای قابل مشاهده، پاسخ‌گویی و هوشمندی سازمانی.",
    articleHeadline: "معماری اجرا",
    articleAlternativeHeadline: "پلتفرم عملیات مأموریت‌محور ONYX",
    articleDescription: "پلتفرم عملیات مأموریت‌محور و زیرساخت هوشمندی عملیاتی برای اتصال اختیار، مسئولیت، اجرا و راستی‌آزمایی در عملیات پیچیده.",
    articleSection: "پلتفرم عملیات مأموریت‌محور",
    articleKeywords: ["پلتفرم عملیات مأموریت‌محور", "زیرساخت هوشمندی عملیاتی", "نقشه اختیار", "پاسخ‌گویی", "راستی‌آزمایی اجرا"],
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
        name: "ONYX | The Architecture of Execution",
        description: "ONYX is a Mission Operations Platform and Operational Intelligence Infrastructure for authority-aware execution across complex organizations.",
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
        genre: "Operational Intelligence Infrastructure",
        url: metadata.url,
        image: [`${SITE_URL}/assets/product/mission-operations.png`, `${SITE_URL}/assets/product/operational-overview.png`],
        author: { "@id": `${SITE_URL}/#soheil-mozaffari` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: [{ "@id": `${SITE_URL}/#onyx-framework` }, { "@id": "https://bound-method.github.io/#bound-method" }],
        inLanguage: locale,
        isAccessibleForFree: true,
        keywords: metadata.articleKeywords,
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": `${SITE_URL}/#onyx-framework`,
        name: "ONYX",
        alternateName: "ONYX Mission Operations Platform",
        url: `${SITE_URL}/en/`,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/onyx-symbol.svg`, caption: "ONYX Mission Operations Platform symbol" },
        description: "ONYX is a Mission Operations Platform and Operational Intelligence Infrastructure that gives organizational authority, responsibility, execution, and verification a living digital structure.",
        codeRepository: "https://github.com/SMozaff/Onyx-Framwork",
        programmingLanguage: ["Rust", "TypeScript"],
        author: { "@id": `${SITE_URL}/#soheil-mozaffari` },
        about: { "@id": "https://bound-method.github.io/#bound-method" },
        keywords: "ONYX, Mission Operations Platform, Operational Intelligence Infrastructure, authority graph, accountability, execution verification",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "ONYX Mission Operations Platform",
        url: `${SITE_URL}/en/`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/assets/onyx-symbol.svg`,
          caption: "ONYX Mission Operations Platform symbol",
        },
        email: ["Soheil.Mozaffari@gmail.com", "Mozaffari@lamatech.com"],
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#soheil-mozaffari`,
        name: "Soheil Mozaffari",
        jobTitle: "Software Engineer and Systems Architect",
        url: "https://SMozaff.github.io/",
        email: ["Soheil.Mozaffari@gmail.com", "Mozaffari@lamatech.com"],
        sameAs: ["https://github.com/SMozaff", "https://orcid.org/0009-0001-2428-1295"],
      },
      {
        "@type": "DefinedTerm",
        "@id": "https://bound-method.github.io/#bound-method",
        name: "BOUND Method v3.0 — Boundary-Oriented Unified Development",
        url: "https://bound-method.github.io/",
        description: "A boundary-oriented development method that defines domains, responsibility boundaries, contracts, independent execution, and continuous verification."
      },
    ],
  };

  return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n    </script>`;
}

function localizedDocument(locale: Locale): string {
  const metadata = localeMetadata[locale];
  const rootMarkup = renderToStaticMarkup(<Home initialLocale={locale} />);
  const htmlAttributes = `<html lang="${metadata.documentLanguage}" dir="${metadata.direction}">`;
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


function pagesTitle(locale: Locale, page: PageKey) {
  const titles: Record<PageKey, { en: string; fa: string }> = {
    product: { en: "ONYX | Product — Local-first mission operations", fa: "ONYX | محصول — عملیات مأموریت‌محور محلی‌محور" },
    solutions: { en: "ONYX | Solutions", fa: "ONYX | راهکارها" },
    architecture: { en: "ONYX | Architecture", fa: "ONYX | معماری" },
    security: { en: "ONYX | Security", fa: "ONYX | امنیت" },
    roadmap: { en: "ONYX | Roadmap", fa: "ONYX | نقشه راه" },
    about: { en: "ONYX | About", fa: "ONYX | درباره" },
    resources: { en: "ONYX | Resources", fa: "ONYX | منابع" },
    contact: { en: "ONYX | Contact / Demo", fa: "ONYX | تماس / دمو" },
    investors: { en: "ONYX | Investors", fa: "ONYX | سرمایه‌گذاران" },
  };
  return titles[page][locale];
}

function pagesDescription(locale: Locale, page: PageKey) {
  const descriptions: Record<PageKey, { en: string; fa: string }> = {
    product: { en: "ONYX is a local-first mission operations platform for distributed teams, built around local execution, controlled synchronization, and explicit operational authority.", fa: "ONYX یک پلتفرم عملیات مأموریت‌محور و محلی‌محور برای تیم‌های توزیع‌شده است که بر اجرای محلی، همگام‌سازی کنترل‌شده و اختیار عملیاتی صریح بنا شده است." },
    solutions: { en: "Operational scenarios and environments for ONYX.", fa: "سناریوها و محیط‌های عملیاتی ONYX." },
    architecture: { en: "The ONYX system and technical architecture.", fa: "معماری سامانه و فنی ONYX." },
    security: { en: "Security, authority, auditability, and deployment controls for ONYX.", fa: "امنیت، اختیار، ممیزی و کنترل‌های استقرار ONYX." },
    roadmap: { en: "The ONYX product and technology roadmap.", fa: "نقشه راه محصول و فناوری ONYX." },
    about: { en: "The ONYX mission, team, and engineering philosophy.", fa: "مأموریت، تیم و فلسفه مهندسی ONYX." },
    resources: { en: "ONYX product, architecture, technical, and media resources.", fa: "منابع محصول، معماری، فنی و رسانه‌ای ONYX." },
    contact: { en: "Contact ONYX and request an enterprise demonstration.", fa: "تماس با ONYX و درخواست دمو سازمانی." },
    investors: { en: "ONYX product, technology, roadmap, and commercial information.", fa: "اطلاعات محصول، فناوری، نقشه راه و تجاری ONYX." },
  };
  return descriptions[page][locale];
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

const sitePages: PageKey[] = [
  "product",
  "solutions",
  "architecture",
  "security",
  "roadmap",
  "about",
  "resources",
  "contact",
  "investors",
];

for (const locale of ["en", "fa"] as const) {
  const metadata = localeMetadata[locale];
  for (const page of sitePages) {
    const pageUrl = `${SITE_URL}/${locale}/${page}/`;
    const rootMarkup = page === "product"
      ? renderToStaticMarkup(<ProductPage locale={locale} />)
      : renderToStaticMarkup(<SitePage locale={locale} page={page} />);
    const pageDocument = sourceDocument
      .replace(/<html lang="en">/, `<html lang="${metadata.documentLanguage}" dir="${metadata.direction}">`)
      .replace('<div id="root"></div>', `<div id="root">${rootMarkup}</div>`)
      .replace(/<link rel="canonical" href="[^"]+"\s*\/>/, `    <link rel="canonical" href="${pageUrl}" />`)
      .replace(/<title>[^<]*<\/title>/, `<title>${pagesTitle(locale, page)}</title>`)
      .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${pagesDescription(locale, page)}" />`)
      .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${pagesTitle(locale, page)}" />`)
      .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${pagesDescription(locale, page)}" />`)
      .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${pageUrl}" />`)
      .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${pagesTitle(locale, page)}" />`)
      .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${pagesDescription(locale, page)}" />`);
    const pageDirectory = path.join(outputDirectory, locale, page);
    fs.mkdirSync(pageDirectory, { recursive: true });
    fs.writeFileSync(path.join(pageDirectory, "index.html"), pageDocument, "utf8");
  }
}

console.log("Pre-rendered ONYX homepages and information-architecture route skeletons.");
