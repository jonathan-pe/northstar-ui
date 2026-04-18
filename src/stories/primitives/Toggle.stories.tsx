import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'

import { Toggle } from '@/primitives'

const meta = {
  title: 'Primitives/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Pressable on/off control from `@/primitives` for formatting and tool states.',
      },
    },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const bold = canvas.getByRole('button', { name: 'Bold' })
    await userEvent.click(bold)
    await expect(bold).toHaveAttribute('data-state', 'on')
  },
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Italic" variant="outline">
        <ItalicIcon />
      </Toggle>
      <Toggle aria-label="Underline" size="sm">
        <UnderlineIcon />
      </Toggle>
    </div>
  ),
}
