# ONYX Live SEO Review Findings

## Live endpoints checked

- Homepage: https://ox-workflow.github.io/
- Sitemap: https://ox-workflow.github.io/sitemap.xml
- Robots: https://ox-workflow.github.io/robots.txt

## Observed sitemap and robots output

The live sitemap contains one absolute URL, `https://ox-workflow.github.io/`, with a last-modified date of `2026-08-22`. This is appropriate for the current single-page site because the navigation is anchor-based rather than separate crawlable HTML routes. The live robots file allows all user agents and references the same sitemap URL.

## Observed live JSON-LD graph

The homepage exposes one JSON-LD graph containing WebSite, WebPage, Article, SoftwareSourceCode, Organization, Person, and DefinedTerm entities. The graph uses stable fragment IDs, links the WebPage to the WebSite, links the Article to the WebPage, connects ONYX to the IFEM DefinedTerm, identifies Soheil Mozaffari, and references the source repository at `https://github.com/SMozaff/Onyx-Framwork`.

## Candidate improvements

The graph is valid and coherent, but the Article entity can be strengthened with visible-content-aligned `datePublished`, `dateModified`, `image`, and `url` properties. The homepage metadata should also include a canonical link and richer Open Graph image dimensions/type where appropriate. Any date must reflect a real publication or substantial content-update date, not an arbitrary current date.

## Final post-deployment verification

The deployed homepage now serves a canonical link for `https://ox-workflow.github.io/`, Open Graph image type and dimensions for the 1200 × 400 PNG wordmark, and Article `image`, `datePublished`, `dateModified`, and `url` properties. The deployed sitemap and robots.txt remain reachable and consistent with the canonical host. The GitHub Pages workflow completed successfully for the SEO commit.

## External benchmark sources

Google Search Central recommends absolute canonical URLs in sitemaps and says `<lastmod>` should reflect a significant, verifiable page update. Google recommends JSON-LD and requires structured data to describe visible page content. For Article markup, Google lists author, headline, image, datePublished, and dateModified as applicable recommended properties.

References:

1. https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
2. https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
3. https://developers.google.com/search/docs/appearance/structured-data/article
