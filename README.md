# northstar-ui

Reusable React design library scaffold built with Vite, TypeScript, Tailwind, shadcn, Storybook, and Vitest.

## Available scripts

- `pnpm dev` - run Vite app
- `pnpm build` - build package app scaffold
- `pnpm lint` - run ESLint
- `pnpm storybook` - run Storybook locally
- `pnpm build-storybook` - build static Storybook
- `pnpm test:storybook` - run Storybook interaction tests (includes RTL sanity stories)

## RTL

This project is initialized with shadcn RTL mode. Additional runtime support is configured in app and Storybook.

See `docs/rtl.md` for:

- direction provider usage
- `dir`/`lang` wiring expectations
- font strategy for RTL scripts
- verification checklist for LTR/RTL behavior