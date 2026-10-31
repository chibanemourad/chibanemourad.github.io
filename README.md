# Mourad Chibane — Portfolio

Static English portfolio and technical blog built with Astro and strict TypeScript.

## Development

Use Node 24 (`nvm use`), then `npm ci`.

- `npm run dev`: local development server.
- `npm run check`: type and formatting checks.
- `npm run build`: generate `dist/`.
- `npm run preview`: preview the production build.
- `npm run format`: format source files.

TypeScript stays on 6.0.3: the current `@astrojs/check` peer range is `^5.0.0 || ^6.0.0`, and `typescript-eslint` requires `>=4.8.4 <6.1.0`. Upgrade their compatibility first, then remove the TypeScript major-update ignore in Dependabot and upgrade the compiler together with its lockfile. Do not bypass peer checks with `--force` or `--legacy-peer-deps`.

## Content

Add Markdown to `src/content/blog/` or `src/content/projects/`. The filename becomes the URL slug. Both require `title` and `description`. Articles require `date` (ISO format); projects accept an optional absolute `url`. Set `draft: true` to exclude an entry from production and RSS. Invalid frontmatter fails the build. No sample projects or professional claims are published.

## Architecture

Routes compose shared layouts; content queries centralize publication filtering. Global CSS supplies design tokens and responsive styles. No client framework or server runtime is required. `AGENTS.md` describes the previous Jekyll setup and is preserved as requested; use this README for current commands.

## Deployment

Select **Settings → Pages → Source → GitHub Actions**. Push to the default branch to run checks, build, and publish. Pull requests build without publishing. The canonical site is `https://chibanemourad.github.io`; change `astro.config.mjs` if a custom domain is introduced. `/feed.xml`, `/sitemap.xml`, and `/404.html` remain available.

If a run named **pages build and deployment** logs Jekyll, the repository is still using branch-based publishing. Switch the Pages source to **GitHub Actions**, then manually run **Site quality and deployment** on `master`. The Astro workflow uploads `dist/`; adding `.nojekyll` alone does not build Astro. A Dependabot pull request runs checks but does not deploy.

Generated artifacts are ignored. To roll back, revert the migration or a faulty commit and redeploy using the matching workflow. Git history retains the legacy Jekyll source.

Before release, manually verify mobile/desktop layouts, keyboard focus, navigation, RSS, sitemap, and the deployed 404 page. Playwright checks accessibility, responsive overflow, and discovery endpoints. Run `npx playwright install chromium` then `npm run test:e2e` after building. Performance budgets still require Lighthouse verification.

## Profile and portfolio content

Edit `src/data/profile.ts` for shared identity and career details. Project frontmatter requires employer, role, technologies, and a nonnegative integer order; featured controls homepage selection. Projects sort by order then slug. Keep current-role responsibilities separate from historical assignments. Editorial source notes and unpublished article outlines live in `docs/content-sources.md`, outside published assets.
