import type { CatalogCompositeEntry, CatalogPrimitiveEntry } from './types.ts'
import { getCatalogEntryById } from './build-catalog.ts'

function isCompositeEntry(
  entry: CatalogPrimitiveEntry | CatalogCompositeEntry,
): entry is CatalogCompositeEntry {
  return entry.category === 'composite'
}

function formatCatalogMarkdown(entry: CatalogPrimitiveEntry | CatalogCompositeEntry): string {
  const lines: string[] = [entry.summary, '', '### When to use', '']
  for (const line of entry.whenToUse) {
    lines.push(`- ${line}`)
  }
  lines.push('', '### Composition', '', entry.composition, '', '### Imports', '', '```tsx', entry.importExample, '```', '')
  lines.push('### Exports', '', entry.exports.map((e) => `- \`${e}\``).join('\n'), '')
  if (isCompositeEntry(entry)) {
    if (entry.props?.length) {
      lines.push('### Props', '', entry.props.map((p) => `- \`${p}\``).join('\n'), '')
    }
    if (entry.types?.length) {
      lines.push('### Types', '', entry.types.map((t) => `- \`${t}\``).join('\n'), '')
    }
  }
  lines.push(
    '### Source',
    '',
    `\`${entry.source}\``,
    '',
    '### Story',
    '',
    `\`${entry.story}\``,
    '',
    `*Category: ${entry.category} · ${entry.tags.map((t) => `\`${t}\``).join(', ')}*`,
  )
  return lines.join('\n')
}

/**
 * Storybook `parameters` fragment sourced from the catalog (single source of truth in `src/stories/catalog/*`).
 */
export function catalogStoryDocs(id: string): {
  docs: { description: { component: string } }
} {
  const entry = getCatalogEntryById(id)
  if (!entry) {
    throw new Error(
      `catalogStoryDocs: unknown catalog id "${id}". Add it in primitive-entries.ts or composite-entries.ts.`,
    )
  }
  return {
    docs: {
      description: {
        component: formatCatalogMarkdown(entry),
      },
    },
  }
}
