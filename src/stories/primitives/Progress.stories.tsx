import type { Meta, StoryObj } from '@storybook/react-vite'

import { Progress } from '@/primitives'

const meta = {
  title: 'Primitives/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Determinate progress indicator from `@/primitives` for uploads, task flows, and staged operations.',
      },
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 5 } },
  },
  args: {
    value: 55,
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: ({ value }) => (
    <div className="w-[320px] space-y-2">
      <Progress value={value} aria-label="Upload progress" />
      <p className="text-xs text-muted-foreground">{value}% complete</p>
    </div>
  ),
}
