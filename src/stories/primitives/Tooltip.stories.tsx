import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/primitives'

import { StorySection } from './shared'

const meta = {
  title: 'Primitives/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tooltip primitives from `@/primitives`. Wrap the tree in `TooltipProvider`; prefer triggers with an accessible name (e.g. icon buttons with `aria-label`).',
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={0}>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Placements: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="mx-auto grid max-w-2xl grid-cols-2 gap-8 p-12">
      {(
        [
          ['top', 'top'] as const,
          ['right', 'right'] as const,
          ['bottom', 'bottom'] as const,
          ['left', 'left'] as const,
        ] as const
      ).map(([label, side]) => (
        <StorySection key={side} title={label}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="sm" aria-label={`Tooltip ${label}`}>
                {label}
              </Button>
            </TooltipTrigger>
            <TooltipContent side={side} sideOffset={6}>
              Content on the {label}
            </TooltipContent>
          </Tooltip>
        </StorySection>
      ))}
    </div>
  ),
}

export const WithFormattedContent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const root = within(document.body)
    await userEvent.hover(canvas.getByRole('button', { name: 'Keyboard shortcut' }))
    await expect(root.getAllByText(/Save/).length).toBeGreaterThan(0)
  },
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="link" className="h-auto p-0">
          Keyboard shortcut
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span className="flex items-center gap-2">
          Save
          <kbd className="rounded border border-background/30 bg-background/20 px-1.5 py-0.5 font-mono text-[10px]">
            ⌘S
          </kbd>
        </span>
      </TooltipContent>
    </Tooltip>
  ),
}
