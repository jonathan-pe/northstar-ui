# Agent integrations (Northstar UI)

This folder holds **machine-readable reference** for AI agents and IDE integrations.

## `northstar-catalog.json` (generated)

**Do not edit by hand.** The canonical catalog lives in TypeScript under `src/stories/catalog/` (`primitive-entries.ts`, `composite-entries.ts`, `constants.ts`). Storybook Autodocs descriptions come from the same data via `catalogStoryDocs()` in each `*.stories.tsx`.

- **Regenerate**: `pnpm generate:agent-catalog` (also runs at the start of `pnpm build:lib`).
- **CI**: `pnpm verify:agent-catalog` checks that this file matches the TS source and that every `src/primitives/wrappers/*.tsx` file (plus the `direction` entry) and every composite has a catalog row.

## MCP server (optional)

The repo ships a stdio MCP server that exposes catalog search/list/get tools and a JSON resource.

- **Command**: `pnpm mcp:northstar` (runs `tsx scripts/northstar-mcp.ts`).
- **Override catalog path**: set `NORTHSTAR_CATALOG_PATH` to a different JSON file if you fork the catalog locally.

### Cursor

Register a stdio server in Cursor MCP settings, for example:

```json
{
  "mcpServers": {
    "northstar-ui": {
      "command": "pnpm",
      "args": ["mcp:northstar"],
      "cwd": "/absolute/path/to/northstar-ui"
    }
  }
}
```

Adjust `cwd` to your clone. After connecting, tools such as `northstar_catalog_search` and the `northstar://catalog` resource should appear in chat.

### Storybook

This project already includes `@storybook/addon-mcp` for Storybook-driven MCP during design review; the catalog MCP complements that with **package-level** API reference independent of Storybook.
