import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Textarea } from '@/primitives'

import { StorySection } from './shared'

const meta = {
  title: 'Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    rows: { control: 'number' },
    placeholder: { control: 'text' },
  },
  args: {
    placeholder: 'Write something…',
    'aria-label': 'Demo textarea',
    rows: 4,
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const SizesAndResize: Story = {
  parameters: { layout: 'fullscreen' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const el = canvas.getByLabelText('Default textarea')
    await userEvent.type(el, 'Notes go here')
    await expect(el).toHaveValue('Notes go here')
  },
  render: () => (
    <div className="mx-auto max-w-3xl space-y-8 p-8">
      <StorySection title="Default height" description="Uses field-sizing and min-height from the primitive.">
        <Textarea placeholder="Short note" aria-label="Default textarea" />
      </StorySection>
      <StorySection title="Taller (rows)">
        <Textarea rows={8} placeholder="Longer content…" aria-label="Tall textarea" />
      </StorySection>
      <StorySection title="Monospace (className)">
        <Textarea
          className="font-mono text-sm"
          placeholder="JSON, logs, code…"
          aria-label="Monospace textarea"
        />
      </StorySection>
    </div>
  ),
}

export const States: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="mx-auto max-w-xl space-y-8 p-8">
      <StorySection title="Empty with placeholder">
        <Textarea placeholder="Nothing entered yet" aria-label="Placeholder only" />
      </StorySection>
      <StorySection title="Filled (read-only)">
        <Textarea readOnly defaultValue="Published copy that should not change in this view." aria-label="Read-only" />
      </StorySection>
      <StorySection title="Disabled">
        <Textarea disabled placeholder="Unavailable" aria-label="Disabled textarea" />
      </StorySection>
      <StorySection title="Invalid">
        <Textarea aria-invalid="true" defaultValue="Fails validation" aria-label="Invalid textarea" />
      </StorySection>
      <StorySection title="With helper text">
        <div className="grid gap-1">
          <Textarea id="bio" aria-describedby="bio-count" aria-label="Bio" maxLength={200} defaultValue="" />
          <p id="bio-count" className="text-xs text-muted-foreground">
            Max 200 characters.
          </p>
        </div>
      </StorySection>
    </div>
  ),
}
