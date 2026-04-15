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
