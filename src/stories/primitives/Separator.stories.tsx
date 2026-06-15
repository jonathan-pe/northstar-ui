import type { Meta, StoryObj } from '@storybook/react-vite'

import { Separator } from '@/primitives'
import { catalogStoryDocs } from '@/stories/catalog'

const meta = {
  title: 'Primitives/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    ...catalogStoryDocs('separator'),
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div className="w-[320px] space-y-3">
      <p className="text-sm">Account</p>
      <Separator />
      <p className="text-sm text-muted-foreground">Billing</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-4 text-sm">
      <span>Profile</span>
      <Separator orientation="vertical" />
      <span className="text-muted-foreground">Settings</span>
    </div>
  ),
}
