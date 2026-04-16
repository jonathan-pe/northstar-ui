import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Input } from '@/primitives'

import { StoryGrid, StorySection } from './shared'

const meta = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'search',
        'email',
        'password',
        'number',
        'tel',
        'url',
        'date',
        'file',
      ],
    },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    placeholder: 'Placeholder',
    type: 'text',
    'aria-label': 'Demo input',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Types: Story = {
  parameters: { layout: 'fullscreen' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText('Text input')
    await userEvent.type(input, 'hello')
    await expect(input).toHaveValue('hello')
  },
  render: () => (
    <div className="mx-auto max-w-xl space-y-8 p-8">
      <StorySection title="Input types" description="Native types map to platform keyboards and validation.">
        <div className="grid gap-4">
          <label className="grid gap-1 text-sm">
            <span className="text-muted-foreground">text</span>
            <Input type="text" placeholder="Plain text" aria-label="Text input" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-muted-foreground">search</span>
            <Input type="search" placeholder="Search…" aria-label="Search input" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-muted-foreground">email</span>
            <Input type="email" placeholder="you@example.com" aria-label="Email input" autoComplete="email" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-muted-foreground">password</span>
            <Input type="password" placeholder="••••••••" aria-label="Password input" autoComplete="current-password" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-muted-foreground">number</span>
            <Input type="number" placeholder="0" aria-label="Number input" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-muted-foreground">tel</span>
            <Input type="tel" placeholder="+1 555 000 0000" aria-label="Phone input" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-muted-foreground">url</span>
            <Input type="url" placeholder="https://" aria-label="URL input" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-muted-foreground">date</span>
            <Input type="date" aria-label="Date input" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-muted-foreground">file</span>
            <Input type="file" aria-label="File input" />
          </label>
        </div>
      </StorySection>
    </div>
  ),
}

export const States: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="mx-auto max-w-xl space-y-8 p-8">
      <StorySection title="Placeholder">
        <Input placeholder="Empty field" aria-label="Placeholder only" />
      </StorySection>
      <StorySection title="Filled value">
        <Input defaultValue="Read-only snapshot" readOnly aria-label="Filled read-only" />
      </StorySection>
      <StorySection title="Disabled">
        <Input disabled placeholder="Cannot edit" aria-label="Disabled input" />
      </StorySection>
      <StorySection title="Invalid" description="Uses aria-invalid for error styling.">
        <Input aria-invalid="true" defaultValue="Bad value" aria-label="Invalid input" />
      </StorySection>
      <StorySection title="With helper / error text" description="Pair with copy outside the input for forms.">
        <div className="grid gap-1">
          <label htmlFor="email-field" className="text-sm font-medium text-foreground">
            Work email
          </label>
          <Input
            id="email-field"
            aria-describedby="email-hint"
            aria-invalid="true"
            defaultValue="not-an-email"
            type="email"
            autoComplete="email"
          />
          <p id="email-hint" className="text-xs text-destructive" role="alert">
            Enter a valid email address.
          </p>
        </div>
      </StorySection>
    </div>
  ),
}

export const WidthAndLayout: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="mx-auto max-w-4xl space-y-6 p-8">
      <StorySection title="Widths">
        <StoryGrid columnsClassName="grid-cols-1 md:grid-cols-2">
          <Input className="max-w-xs" placeholder="max-w-xs" aria-label="Narrow" />
          <Input className="w-full" placeholder="w-full in grid cell" aria-label="Full width" />
        </StoryGrid>
      </StorySection>
    </div>
  ),
}
