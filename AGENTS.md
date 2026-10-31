# Repository Guidelines

## Project Structure & Module Organization

This repository hosts Chibane Mourad’s personal GitHub Pages site, built with Jekyll and the Minimal Mistakes theme.

- `index.html` defines the homepage; `_pages/` contains standalone pages such as the 404 page.
- `_layouts/` contains page templates; `_includes/` contains reusable Liquid fragments.
- `_data/` stores navigation and interface text; `_config.yml` controls site settings and author information.
- `assets/_scss/` contains styles, and `assets/js/_main.js` contains custom JavaScript. Vendor libraries live in their respective `vendor/` and `plugins/` directories.
- `images/` and `assets/fonts/` hold static media. `_site/` contains tracked, generated output; make changes in source files first.

## Build, Test, and Development Commands

- `bundle install`: install the Ruby dependencies declared in `Gemfile`.
- `npm install`: install the asset build tools from `package.json`.
- `bundle exec jekyll serve`: build and preview the site locally, normally at `http://localhost:4000`. Restart after editing `_config.yml`.
- `bundle exec jekyll build`: generate the static site in `_site/`.
- `npm run build:all`: compile and prefix CSS, then minify JavaScript. Use `build:css` or `build:js` for individual asset types.
- `npm run watch:all`: rebuild assets when SCSS or JavaScript changes.

The asset toolchain includes legacy `node-sass`; verify runtime compatibility before upgrading dependencies.

## Coding Style & Naming Conventions

Follow `.editorconfig`: two-space indentation, UTF-8, LF endings, and no required final newline. Trim trailing whitespace except in Markdown. Preserve existing Liquid and YAML conventions. Name SCSS partials `_name.scss` and reuse existing CSS component patterns such as `archive__subtitle`. Edit source assets and regenerate `assets/css/main.css` and `assets/js/main.min.js`. No formatter or linter is configured.

## Testing Guidelines

There is no automated test suite, test naming convention, or coverage threshold. Validate changes with the relevant asset build and a Jekyll build. Preview affected pages at desktop and mobile widths; check navigation, images, links, and interactive behavior. Review generated diffs for unrelated changes.

## Commit & Pull Request Guidelines

History uses short, descriptive subjects such as `update blog description and avatar`; no strict prefix convention is established. Keep commits focused. Pull requests should describe the change, identify affected pages, link relevant issues, and list validation performed. Include desktop and mobile screenshots for visible changes.
