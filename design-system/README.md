# Portfolio design system

Tokens in `tokens/foundations.json` are authoritative. Change source JSON, run
`npm run tokens:build`, and review the generated CSS with the source change.
Never edit generated output. The public `/design-system/` catalog renders real
components and describes their contracts. Components are stable after migration;
new variants require a demonstrated page use case.

## Figma handoff

Create one library file with Foundations, Components, Patterns, and Guidelines
pages. Import the DTCG source using a compatible token plugin. Map light/dark
color tokens into a Semantic collection with Light and Dark modes; share spacing
variables in a Primitive collection. Bind colors to semantic roles, not literals.
Create text styles from the catalog specimens and Auto Layout components matching
the native component contracts. Name variables with slash-separated token paths.

Document desktop (1440px) and mobile (360px) pattern frames. Document hover,
focus, active, disabled, and selected states only where applicable. Icons use
44px control targets. Confirm native anchor versus button semantics at handoff.

Figma edits are proposals: export changes, compare token values, and submit a PR.
No automatic production writes or API credentials are required. Library creation
and import require a destination Figma file and editor access.

## Ownership and changes

The repository maintainer owns token and component changes. PRs must include
usage documentation, checks performed, and desktop/mobile screenshots in both
themes for visual changes. Deprecate names with a documented replacement before
removal; migrate all consumers together. Keep the current identity and content.
