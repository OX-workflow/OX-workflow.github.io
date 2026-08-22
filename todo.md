# Branding Update Checklist

- [x] Prepare the supplied ONYX wordmark as a deployable website asset.
- [x] Replace the primary navigation wordmark and brand treatment with the supplied asset.
- [x] Update social-preview and favicon branding to use the supplied ONYX asset where appropriate.
- [x] Verify the desktop and mobile branding presentation, then save a refreshed checkpoint.

## Full-Stack Asset Library Checklist

- [x] Upgrade the project to the full-stack template with managed file storage.
- [x] Review the upgraded project guidance and file-storage API surface.
- [x] Add an authenticated asset-library workflow for uploading, listing, and removing project media.
- [x] Validate the storage UI and protected procedures with responsive preview coverage and automated tests; live sign-in was attempted on development and deployed routes but the external app-auth gateway returned HTTP 403 before file operations could begin.

## Typography Readability Checklist

- [x] Replace the current display typography with a legible editorial heading font.
- [x] Increase body and supporting text readability while preserving the technical visual hierarchy.
- [x] Verify type readability across desktop and mobile layouts.

## ONYX Case-Study QA and Refinement Checklist

- [x] Audit identity, author attribution, and relationship links against the project specification.
- [x] Verify architecture claims against the ONYX repository and remove or qualify unsupported wording.
- [x] Refine the architecture and IFEM sections to make boundaries, responsibilities, and methodology positioning clearer.
- [x] Review and improve technical-case-study metadata and structured data only where necessary.
- [x] Validate light/dark responsive presentation and final source alignment.

## SEO review

- [x] Inspect the live sitemap.xml and robots.txt for canonical host, scope, and crawlability issues.
- [x] Inspect live JSON-LD for validity, entity relationships, URLs, and consistency with visible ONYX content.
- [x] Apply and validate any focused SEO corrections needed in the repository.
- [x] Commit and push the SEO review changes on a separate branch without altering main.

## Branch merge

- [x] Inspect latest remote `main` and `seo/sitemap-structured-data` histories for divergence.
- [x] Commit and push any pending changes before merging.
- [x] Merge the SEO branch into `main` and push the merged branch.
- [x] Verify the merge, working-tree cleanliness, and deployment status. GitHub Pages deployment is blocked because Pages is not enabled for the repository.

## High-priority SEO fixes

- [ ] Remove the mobile zoom restriction from the viewport metadata.
- [ ] Add intrinsic image dimensions or aspect-ratio reservations to reduce layout shift risk.
- [ ] Replace the extreme-ratio wordmark social preview with a dedicated social-card asset and metadata.
- [ ] Tighten the homepage meta description and preserve canonical consistency.
- [ ] Validate the static build, crawl artifacts, and Pages workflow configuration.

## Full live SEO audit

- [x] Audit live crawlability, canonicalization, sitemap, robots, and indexability signals.
- [x] Audit title, description, social metadata, language metadata, favicon, and viewport signals.
- [x] Audit headings, semantic page structure, links, images, accessibility-related SEO, and content discoverability.
- [x] Audit JSON-LD entity relationships, completeness, consistency, and rich-result eligibility.
- [x] Audit performance, asset delivery, JavaScript rendering, and GitHub Pages deployment constraints.
- [x] Produce and deliver a prioritized SEO audit report with citations and next steps.
