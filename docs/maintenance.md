# Maintenance Playbook

This document defines how to safely evolve `northstar-ui` without breaking consumers.

## Update shadcn components

1. Add or refresh upstream component source with shadcn CLI:
   - `pnpm dlx shadcn@latest add <component>`
2. Keep generated files in `src/components/ui/*` as upstream-aligned as possible.
3. Apply custom behavior only in wrapper/composite layers:
   - `src/primitives/wrappers/*`
   - `src/composites/*`

## Validate before merging

Run the full quality pipeline:

- `pnpm lint`
- `pnpm test:unit`
- `pnpm build`
- `pnpm test:storybook`

## Version and release discipline

For user-visible changes:

1. Create a changeset:
   - `pnpm changeset`
2. Use SemVer policy:
   - patch: internal fixes
   - minor: additive API changes
   - major: removed/renamed public contract
3. Let release automation create/reconcile release PRs on `main`.

## RTL and direction checks

For any component touching layout, overlay, or placement:

- verify LTR and RTL stories
- verify interaction tests still pass in `src/stories/RtlSanity.stories.tsx`
- ensure no hardcoded physical-direction assumptions (`left/right`) where logical alternatives exist

## Token governance

- Add or evolve semantic tokens in `src/tokens/semantic.ts`
- Keep web mapping in `src/tokens/web-tailwind.ts`
- Update `src/tokens/README.md` when token contracts change
- `src/index.css` shadcn theme variables for `--background`, `--foreground`, `--primary`, etc. must stay aligned with the same color values in `semantic.ts` for overlapping keys; `tests/tokens/theme-parity.test.ts` enforces that parity in CI.

## Visual regression (optional)

For screenshot baselines and cross-browser UI review, [Chromatic](https://www.chromatic.com/) integrates with Storybook.

1. Create a Chromatic project and copy the project token.
2. Add `CHROMATIC_PROJECT_TOKEN` as a repository secret (and optionally run the GitHub Action workflow if present).
3. Locally: `pnpm chromatic` (runs `build-storybook` and uploads the build).

Until Chromatic is configured, rely on `pnpm test:storybook` (a11y + interaction tests) and the theme parity test for token drift.
