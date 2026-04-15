import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button, Checkbox, Input, Textarea } from '@/primitives'

const meta = {
  title: 'Primitives/Batch A',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <div className="flex w-[420px] flex-col gap-4 rounded-md border border-border p-4">
      <div className="flex items-center gap-2">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button disabled>Disabled</Button>
      </div>
      <Input placeholder="Input default" />
      <Input disabled value="Disabled input" readOnly />
      <Textarea placeholder="Textarea default" />
      <Textarea disabled value="Disabled textarea" readOnly />
      <label className="flex items-center gap-2 text-sm">
        <Checkbox defaultChecked />
        <span>Checkbox checked</span>
      </label>
      <label className="flex items-center gap-2 text-sm opacity-70">
        <Checkbox disabled />
        <span>Checkbox disabled</span>
      </label>
    </div>
  ),
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const LTR: Story = {
  globals: {
    direction: 'ltr',
  },
}

export const RTL: Story = {
  globals: {
    direction: 'rtl',
  },
}
