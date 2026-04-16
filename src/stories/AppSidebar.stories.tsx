import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { AppSidebar } from '@/composites/AppSidebar'

const items = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'billing', label: 'Billing' },
  { id: 'settings', label: 'Settings' },
]

const meta = {
  title: 'Composites/AppSidebar',
  component: AppSidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    items,
    activeId: 'dashboard',
    onSelect: fn(),
  },
} satisfies Meta<typeof AppSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
