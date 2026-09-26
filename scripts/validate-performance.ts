import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.resolve(__dirname, "..", "dist", "public");

function walk(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const files = walk(outputDirectory);
const jsBytes = files.filter((file) => file.endsWith(".js")).reduce((sum, file) => sum + fs.statSync(file).size, 0);
const cssBytes = files.filter((file) => file.endsWith(".css")).reduce((sum, file) => sum + fs.statSync(file).size, 0);
const largeAssets = files
  .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file))
  .map((file) => ({ file, bytes: fs.statSync(file).size }))
  .filter(({ bytes }) => bytes > 1_500_000);

if (jsBytes > 1_500_000) throw new Error(\`JavaScript bundle budget exceeded: \${jsBytes} bytes.\`);
if (cssBytes > 750_000) throw new Error(\`CSS bundle budget exceeded: \${cssBytes} bytes.\`);
if (largeAssets.length) throw new Error(\`Unoptimized raster assets exceed 1.5 MB: \${largeAssets.map(({file}) => file).join(", ")}\`);

const indexHtml = fs.readFileSync(path.join(outputDirectory, "en", "index.html"), "utf8");
if (!indexHtml.includes('rel="preload"') || !indexHtml.includes('as="font"')) throw new Error("Expected font preloads are missing from the production document.");
if (indexHtml.includes('<link rel="stylesheet" href="http')) throw new Error("External render-blocking stylesheet detected.");

console.log(\`Performance checks passed: JS=\${jsBytes} bytes, CSS=\${cssBytes} bytes.\`);
