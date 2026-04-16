import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Checkbox } from '@/primitives'

import { StorySection } from './shared'

const meta = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const States: Story = {
  parameters: { layout: 'fullscreen' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const box = canvas.getByRole('checkbox', { name: 'Notifications off' })
    await expect(box).not.toBeChecked()
    await userEvent.click(box)
    await expect(box).toBeChecked()
  },
  render: () => (
    <div className="mx-auto max-w-md space-y-8 p-8">
      <StorySection title="Unchecked">
        <label className="flex items-center gap-3 text-sm">
          <Checkbox id="cb-off" aria-labelledby="cb-off-label" />
          <span id="cb-off-label">Notifications off</span>
        </label>
      </StorySection>
      <StorySection title="Checked (default)">
        <label className="flex items-center gap-3 text-sm">
          <Checkbox id="cb-on" defaultChecked aria-labelledby="cb-on-label" />
          <span id="cb-on-label">Notifications on</span>
        </label>
      </StorySection>
      <StorySection title="Disabled unchecked">
        <label className="flex cursor-not-allowed items-center gap-3 text-sm opacity-70">
          <Checkbox disabled aria-labelledby="cb-dis-off-label" />
          <span id="cb-dis-off-label">Unavailable</span>
        </label>
      </StorySection>
      <StorySection title="Disabled checked">
        <label className="flex cursor-not-allowed items-center gap-3 text-sm opacity-70">
          <Checkbox disabled defaultChecked aria-labelledby="cb-dis-on-label" />
          <span id="cb-dis-on-label">Locked on</span>
        </label>
      </StorySection>
    </div>
  ),
}

function IndeterminateExample() {
  const [checked, setChecked] = React.useState<boolean | 'indeterminate'>('indeterminate')

  return (
    <label className="flex items-center gap-3 text-sm">
      <Checkbox
        checked={checked}
        onCheckedChange={(v) => setChecked(v)}
        aria-label="Select rows (indeterminate demo)"
      />
      <span>Partial selection — first click resolves from indeterminate to checked or unchecked.</span>
    </label>
  )
}

export const Indeterminate: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="mx-auto max-w-lg p-8">
      <StorySection
        title="Indeterminate"
        description="Controlled tri-state for “select some” patterns (e.g. table header)."
      >
        <IndeterminateExample />
      </StorySection>
    </div>
  ),
}

export const Group: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <fieldset className="mx-auto max-w-md space-y-3 p-8">
      <legend className="text-sm font-medium">Export</legend>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox defaultChecked name="export" value="posts" />
        Posts
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox name="export" value="pages" />
        Pages
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox name="export" value="media" />
        Media
      </label>
    </fieldset>
  ),
}
