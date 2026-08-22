import React from "react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../client/src/pages/Home";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, "..", "dist", "public", "index.html");
const documentHtml = fs.readFileSync(outputPath, "utf8");
const renderedApp = renderToStaticMarkup(<Home />);
const withPrerenderedApp = documentHtml.replace(
  '<div id="root"></div>',
  `<div id="root">${renderedApp}</div>`,
);

if (withPrerenderedApp === documentHtml) {
  throw new Error("Unable to find the root element in the Vite output.");
}

fs.writeFileSync(outputPath, withPrerenderedApp, "utf8");
console.log("Pre-rendered the public case-study route into dist/public/index.html.");
