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

## Available scripts

- `pnpm dev` - run Vite app
- `pnpm build` - build package app scaffold
- `pnpm lint` - run ESLint
- `pnpm storybook` - run Storybook locally
- `pnpm build-storybook` - build static Storybook
- `pnpm test:unit` - run Vitest primitive/composite unit tests
- `pnpm test:storybook` - run Storybook interaction tests (includes RTL sanity stories)

## RTL

This project is initialized with shadcn RTL mode. Additional runtime support is configured in app and Storybook.

See `docs/rtl.md` for:

- direction provider usage
- `dir`/`lang` wiring expectations
- font strategy for RTL scripts
- verification checklist for LTR/RTL behavior

## Releases (Changesets)

Versioning and changelogs are managed with Changesets.

- Create a changeset: `pnpm changeset`
- Apply version/changelog updates: `pnpm version-packages`
- Publish packages: `pnpm release`

CI/CD:

- `.github/workflows/release.yml` runs on `main` pushes
- creates/updates a release PR when unpublished changesets exist
- publishes when release commit lands (requires `NPM_TOKEN` secret)