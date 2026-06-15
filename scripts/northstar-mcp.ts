import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

type Catalog = {
  catalogVersion: number
  package: string
  primitives: CatalogEntry[]
  composites: CatalogEntry[]
  tokens: Record<string, unknown>
}

type CatalogEntry = {
  id: string
  title: string
  category?: string
  summary?: string
  tags?: string[]
  [key: string]: unknown
}

function loadCatalogPath(): string {
  const envPath = process.env.NORTHSTAR_CATALOG_PATH
  if (envPath) return envPath
  const here = dirname(fileURLToPath(import.meta.url))
  return join(here, '..', 'docs', 'agent', 'northstar-catalog.json')
}

function readCatalog(): Catalog {
  const raw = readFileSync(loadCatalogPath(), 'utf8')
  return JSON.parse(raw) as Catalog
}

function normalizeQuery(q: string): string {
  return q.trim().toLowerCase()
}

function scoreEntry(entry: CatalogEntry, q: string): number {
  const whenToUse = Array.isArray(entry.whenToUse) ? (entry.whenToUse as string[]) : []
  const hay = [entry.id, entry.title, entry.summary ?? '', ...(entry.tags ?? []), ...whenToUse]
    .join(' ')
    .toLowerCase()
  if (!q) return 0
  if (hay.includes(q)) return 100
  const words = q.split(/\s+/).filter(Boolean)
  let score = 0
  for (const w of words) {
    if (hay.includes(w)) score += 10
  }
  return score
}

const catalog = readCatalog()

const server = new McpServer(
  { name: 'northstar-ui-catalog', version: '1.0.0' },
  {
    instructions:
      'Northstar UI component catalog for northstar-ui (React + Tailwind v4 + shadcn). ' +
      'Use these tools before guessing imports or APIs. Prefer northstar-ui/primitives and northstar-ui/composites. ' +
      'Full JSON is available at resource URI northstar://catalog.',
  },
)

server.registerResource(
  'northstar-catalog-json',
  'northstar://catalog',
  {
    description: 'Full northstar-catalog.json (machine-readable component reference).',
    mimeType: 'application/json',
  },
  async (uri) => ({
    contents: [
      {
        uri: uri.toString(),
        mimeType: 'application/json',
        text: JSON.stringify(catalog, null, 2),
      },
    ],
  }),
)

server.registerTool(
  'northstar_catalog_list',
  {
    title: 'List Northstar components',
    description:
      'Lists primitives (and optionally composites) from the Northstar catalog with id, title, category, and summary.',
    inputSchema: {
      include: z
        .enum(['primitives', 'composites', 'both'])
        .optional()
        .describe('Which sections to include (default: primitives).'),
      category: z.string().optional().describe('Filter by category (e.g. overlay, control, layout).'),
    },
  },
  async (args) => {
    const include = args?.include ?? 'primitives'
    const category = args?.category?.trim().toLowerCase()
    const rows: CatalogEntry[] = []
    if (include === 'primitives' || include === 'both') {
      rows.push(...catalog.primitives)
    }
    if (include === 'composites' || include === 'both') {
      rows.push(...catalog.composites)
    }
    const filtered = category
      ? rows.filter((r) => (r.category ?? '').toLowerCase() === category)
      : rows
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(filtered, null, 2),
        },
      ],
    }
  },
)

server.registerTool(
  'northstar_catalog_get',
  {
    title: 'Get Northstar component by id',
    description: 'Returns the full catalog record for a primitive or composite id (e.g. button, login-card).',
    inputSchema: {
      id: z.string().describe('Catalog id (matches source filename stem for primitives, e.g. alert-dialog).'),
    },
  },
  async (args) => {
    const id = args?.id?.trim()
    if (!id) {
      return {
        content: [{ type: 'text' as const, text: 'Missing id.' }],
        isError: true,
      }
    }
    const hit =
      catalog.primitives.find((p) => p.id === id) ??
      catalog.composites.find((c) => c.id === id)
    if (!hit) {
      return {
        content: [{ type: 'text' as const, text: `Unknown id: ${id}` }],
        isError: true,
      }
    }
    return {
      content: [{ type: 'text' as const, text: JSON.stringify(hit, null, 2) }],
    }
  },
)

server.registerTool(
  'northstar_catalog_search',
  {
    title: 'Search Northstar catalog',
    description: 'Keyword search across ids, titles, summaries, tags, and whenToUse hints.',
    inputSchema: {
      query: z.string().describe('Free-text query.'),
      limit: z.number().int().positive().max(50).optional().describe('Max results (default 10).'),
    },
  },
  async (args) => {
    const q = normalizeQuery(args?.query ?? '')
    const limit = args?.limit ?? 10
    if (!q) {
      return {
        content: [{ type: 'text' as const, text: 'Missing query.' }],
        isError: true,
      }
    }
    const pool: CatalogEntry[] = [...catalog.primitives, ...catalog.composites]
    const ranked = pool
      .map((entry) => ({ entry, score: scoreEntry(entry, q) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((r) => r.entry)
    return {
      content: [{ type: 'text' as const, text: JSON.stringify(ranked, null, 2) }],
    }
  },
)

const transport = new StdioServerTransport()
await server.connect(transport)
