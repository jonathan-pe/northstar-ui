# northstar-ui

Reusable React design library scaffold built with Vite, TypeScript, Tailwind, shadcn, Storybook, and Vitest.

## Package contract (Ticket 1)

Canonical import paths:

- `northstar-ui/primitives`
- `northstar-ui/composites`
- `northstar-ui/tokens`
- `northstar-ui` (aggregated root export)

Current runtime compatibility targets:

- React `^19`
- React DOM `^19`
- Tailwind CSS `^4`

## Installation

```bash
pnpm add northstar-ui
```

Peer dependencies expected in consuming apps:

- `react@^19`
- `react-dom@^19`
- `tailwindcss@^4`

## Import patterns

Use stable subpath contracts:

```ts
import { Button, Input } from "northstar-ui/primitives"
import { LoginCard, AppSidebar } from "northstar-ui/composites"
import { themeCssVars, semanticTokens } from "northstar-ui/tokens"
```

## Theme + style expectations

- Tailwind and shadcn utility classes are used by primitives/composites.
- **Theme colors** are authored in `src/index.css` and `src/styles/overrides.css`. TypeScript mirrors are **generated** into `src/tokens/css-theme.generated.ts` via `pnpm generate:tokens` (runs before `pnpm build:lib`). Extra palettes use **`.theme-{name}`** blocks, which are discovered automatically (see `src/tokens/README.md`).
- Layout scales (`space`, `radius`) live in `src/tokens/semantic.ts` until mirrored as CSS variables.
- Web helpers live in `src/tokens/web-tailwind.ts`.
- Dark mode styles are built-in and validated in Storybook stories.

## Available scripts

- `pnpm dev` - run Vite app
- `pnpm build` - build package app scaffold
- `pnpm lint` - run ESLint
- `pnpm storybook` - run Storybook locally
- `pnpm build-storybook` - build static Storybook
- `pnpm chromatic` - upload Storybook to Chromatic (requires `CHROMATIC_PROJECT_TOKEN`; optional CI workflow in `.github/workflows/chromatic.yml`)
- `pnpm generate:tokens` - regenerate TS theme maps from CSS (`css-theme.generated.ts`)
- `pnpm test:unit` - run Vitest primitive/composite unit tests (includes CSS vs generated token parity)
- `pnpm test:storybook` - run Storybook interaction tests (includes RTL sanity stories)

## RTL

This project is initialized with shadcn RTL mode. Additional runtime support is configured in app and Storybook.

See `docs/rtl.md` for:

- direction provider usage
- `dir`/`lang` wiring expectations
- font strategy for RTL scripts
- verification checklist for LTR/RTL behavior
- Storybook direction toolbar usage (LTR/RTL)

## Releases (Changesets)

Versioning and changelogs are managed with Changesets.

- Create a changeset: `pnpm changeset`
- Apply version/changelog updates: `pnpm version-packages`
- Publish packages: `pnpm release`

CI/CD:

- `.github/workflows/release.yml` runs on `main` pushes
- creates/updates a release PR when unpublished changesets exist
- publishes when release commit lands (requires `NPM_TOKEN` secret)

Publishing notes:

- package exports resolve from `dist/*` artifacts
- run `pnpm build:lib` to produce release artifacts locally
- ensure `NPM_TOKEN` is configured in repository secrets for automated publish

## Maintenance

- Update playbook: `docs/maintenance.md`
- RTL guide: `docs/rtl.md`
- Token contract guide: `src/tokens/README.md`
- AI context (living): `docs/ai-context.md`