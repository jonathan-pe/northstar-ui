import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input, Label } from '@/primitives'

const meta = {
  title: 'Primitives/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible form label primitive from `@/primitives`. Pair with a field id via `htmlFor`.',
      },
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="grid w-[280px] gap-2">
      <Label htmlFor="label-email">Email</Label>
      <Input id="label-email" placeholder="user@example.com" />
    </div>
  ),
}
