import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { LoginCard } from '@/composites/LoginCard'
import { catalogStoryDocs } from '@/stories/catalog'

const meta = {
  title: 'Composites/LoginCard',
  component: LoginCard,
  parameters: {
    layout: 'centered',
    ...catalogStoryDocs('login-card'),
  },
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof LoginCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
