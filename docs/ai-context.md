# AI Context (Living Document)

This document is the canonical onboarding brief for AI agents working in `northstar-ui`.
Update it whenever architecture, scripts, CI gates, or release flows change.

## 1) Project Mission

`northstar-ui` is a reusable React design/component library built on shadcn + Tailwind.

Primary goals:
- stable component APIs across apps
- RTL and dark mode first-class support
- strong Storybook + unit-test coverage
- safe, repeatable releases via Changesets

## 2) Technology Stack

- React 19
- TypeScript 6
- Tailwind CSS 4
- shadcn components (generated source under `src/components/ui`)
- Storybook 10 + addon-vitest + addon-a11y
- Vitest (unit project + storybook project)
- tsup for distributable package artifacts

## 3) Package Contract

Package name: `northstar-ui`

Public subpath contracts (do not break without major version):
- `northstar-ui/primitives`
- `northstar-ui/composites`
- `northstar-ui/tokens`
- `northstar-ui` (aggregated)

Exports point to built artifacts in `dist/*` (ESM + CJS + `.d.ts`).

## 4) Repository Layout (Important)

- `src/components/ui/*`
  - shadcn-generated component sources (upstream-aligned)
- `src/index.css`
  - base theme tokens / shadcn-aligned global styles (upstream-aligned)
- `src/styles/overrides.css`
  - project-owned CSS override layer loaded after `index.css`
- `src/primitives/wrappers/*`
  - stable wrapper API layer (primary extension point)
- `src/primitives.ts`
  - primitive export surface
- `src/composites/*`
  - reusable higher-level components (`LoginCard`, `AppSidebar`)
- `src/composites.ts`
  - composite export surface
- `src/tokens/semantic.ts`
  - token source of truth
- `src/tokens/web-tailwind.ts`
  - token-to-CSS mapping for web
- `src/tokens.ts`
  - token export surface
- `src/stories/primitives/*.stories.tsx`
  - per-primitive Storybook docs and interaction tests
- `src/stories/*.stories.tsx`
  - composites, sanity (e.g. RTL regression), and other top-level stories
- `tests/**/*.test.tsx`
  - unit tests (including `tests/tokens/theme-parity.test.ts` guarding CSS vs semantic tokens)
- `docs/rtl.md`
  - runtime RTL guidance
- `docs/maintenance.md`
  - maintenance and release playbook

## 5) Critical Architecture Rules

1. Keep generated and customized code separated:
   - generated: `src/components/ui/*`
   - custom/stable: wrappers + composites
2. Do not directly modify `src/components/ui/*` for product/library customizations.
   - Treat those files as shadcn-owned generated sources that can be replaced by future updates.
   - Implement overrides, accessibility tweaks, and design customizations in `src/primitives/wrappers/*` (or composites when appropriate).
3. Keep CSS layering explicit:
   - base/upstream: `src/index.css`
   - custom overrides: `src/styles/overrides.css`
   - ensure overrides are imported after base in both app and Storybook.
4. Preserve wrapper API stability; treat wrapper exports as contract.
5. Use semantic tokens, not raw color literals, for new theming work.
6. Keep RTL/LTR parity and dark mode parity in stories.

## 6) Directionality and RTL

Current system:
- Direction is controlled via `DirectionProvider`.
- Shared helpers in `src/lib/direction.ts` normalize/apply document direction.
- Storybook has a global direction toolbar in `.storybook/preview.ts`.
- `docs/rtl.md` defines required consumer setup (`dir`, `lang`, provider, fonts).

Agent rule:
- Any UI change affecting layout/alignment/overlay placement must be checked in both LTR and RTL.

## 7) Testing & Quality Gates

Required local validation before commit:
- `pnpm lint`
- `pnpm test:unit`
- `pnpm build`
- `pnpm test:storybook`

Notes:
- Storybook a11y mode is strict (`test: 'error'`).
- Storybook tests rely on Playwright browser binaries; install with:
  - `pnpm exec playwright install`
- Vitest + jsdom: Radix primitives use pointer capture APIs that jsdom does not ship; stubs live in `src/test/setup.ts` (do not remove without replacing with another fix).

## 8) Build and Release Flow

Build scripts:
- `pnpm build:lib` -> tsup output to `dist/*`
- `pnpm build:app` -> Vite app build
- `pnpm build` -> runs both

Changesets:
- `pnpm changeset`
- `pnpm version-packages`
- `pnpm release`

GitHub workflows:
- CI: `.github/workflows/ci.yml`
  - lint, unit, build, storybook tests
- Chromatic (optional): `.github/workflows/chromatic.yml`
  - runs only when `CHROMATIC_PROJECT_TOKEN` is configured
- Release: `.github/workflows/release.yml`
  - changesets/action creates release PRs or publishes on main
  - requires `NPM_TOKEN` secret

## 9) Versioning Policy

Use SemVer:
- patch: internal fixes, no contract change
- minor: additive public API (new props/variants/components/tokens)
- major: breaking changes (removed/renamed exports, removed token keys, incompatible contract changes)

## 10) Current v1 Scope Snapshot

Primitives (10):
- Button, Input, Textarea, Checkbox, Switch, Select, Dialog, Tooltip, Tabs, Toast

Composites:
- LoginCard
- AppSidebar

Storybook coverage:
- one story module per primitive under `src/stories/primitives/` (variants, states, interactions)
- composite stories (`LoginCard`, `AppSidebar`)
- `Sanity/RTL Regression` story (`src/stories/RtlSanity.stories.tsx`) with LTR/RTL interaction tests

Visual regression (optional):
- Chromatic can be wired via `pnpm chromatic` when `CHROMATIC_PROJECT_TOKEN` is configured; see `docs/maintenance.md`.

## 11) Common Pitfalls

1. Breaking export contract by editing `package.json` exports casually.
2. Adding app-specific logic directly in `src/components/ui/*`.
3. Failing strict a11y checks in stories (labels/accessible names).
4. Forgetting Playwright install in environments running Storybook tests.
5. Reintroducing framework-coupled dependencies in primitives/composites.

## 12) Agent Update Protocol

When you make meaningful changes, update this file if you changed:
- public APIs/exports
- build scripts or release scripts
- CI/release workflows
- testing gates or a11y enforcement
- RTL/direction architecture
- token schema or mapping strategy

Also update:
- `README.md` for consumer-facing behavior
- `docs/maintenance.md` for maintainer procedures
- `docs/rtl.md` when direction setup requirements change
