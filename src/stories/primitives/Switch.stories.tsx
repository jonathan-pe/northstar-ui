import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Switch } from '@/primitives'

import { StoryGrid, StorySection } from './shared'

const meta = {
  title: 'Primitives/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: 'select', options: ['default', 'sm'] },
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
  args: {
    size: 'default',
    'aria-label': 'Enable feature',
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Sizes: Story = {
  parameters: { layout: 'fullscreen' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sw = canvas.getByRole('switch', { name: 'Default size off' })
    await expect(sw).toHaveAttribute('data-state', 'unchecked')
    await userEvent.click(sw)
    await expect(sw).toHaveAttribute('data-state', 'checked')
  },
  render: () => (
    <div className="mx-auto max-w-xl space-y-8 p-8">
      <StorySection title="default" description="Standard track and thumb.">
        <div className="flex items-center gap-3">
          <Switch size="default" defaultChecked aria-label="Default size on" />
          <Switch size="default" aria-label="Default size off" />
        </div>
      </StorySection>
      <StorySection title="sm" description="Compact for dense toolbars and tables.">
        <div className="flex items-center gap-3">
          <Switch size="sm" defaultChecked aria-label="Small on" />
          <Switch size="sm" aria-label="Small off" />
        </div>
      </StorySection>
    </div>
  ),
}

export const States: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="mx-auto max-w-md space-y-8 p-8">
      <StorySection title="With visible label">
        <label className="flex items-center justify-between gap-4 text-sm">
          <span>Push notifications</span>
          <Switch defaultChecked aria-labelledby="notif-label" id="notif-switch" />
        </label>
      </StorySection>
      <StorySection title="Disabled">
        <StoryGrid columnsClassName="grid-cols-2">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">Off</span>
            <Switch disabled aria-label="Disabled off" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">On</span>
            <Switch disabled defaultChecked aria-label="Disabled on" />
          </div>
        </StoryGrid>
      </StorySection>
    </div>
  ),
}
