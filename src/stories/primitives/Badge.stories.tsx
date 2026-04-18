import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from '@/primitives'

import { StoryGrid, StorySection } from './shared'

const VARIANTS = ['default', 'secondary', 'destructive', 'outline'] as const

const meta = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Status and metadata pill from `@/primitives`. Use variants to signal neutral, subtle, and destructive semantics.',
      },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="mx-auto max-w-4xl space-y-8 p-8">
      <StorySection title="Variants">
        <StoryGrid columnsClassName="grid-cols-2 md:grid-cols-4">
          {VARIANTS.map((variant) => (
            <div key={variant} className="space-y-2">
              <p className="text-xs text-muted-foreground">{variant}</p>
              <Badge variant={variant}>{variant}</Badge>
            </div>
          ))}
        </StoryGrid>
      </StorySection>
    </div>
  ),
}

export const WithContent: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge>New</Badge>
      <Badge variant="secondary">v1.2.0</Badge>
      <Badge variant="destructive">Action required</Badge>
    </div>
  ),
}
