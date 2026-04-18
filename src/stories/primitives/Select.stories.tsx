import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/primitives'

import { StorySection } from './shared'

const meta = {
  title: 'Primitives/Select',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Select primitives from `@/primitives`. `SelectContent` is wrapped for translucent panel styling; use `aria-label` on the trigger when there is no visible label.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const TriggerSizes: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 p-8">
      <StorySection title='size="default"'>
        <Select defaultValue="a">
          <SelectTrigger className="w-[240px]" aria-label="Default size">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </Select>
      </StorySection>
      <StorySection title='size="sm"'>
        <Select defaultValue="a">
          <SelectTrigger size="sm" className="w-[240px]" aria-label="Small trigger">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </Select>
      </StorySection>
    </div>
  ),
}

export const Placeholder: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[240px]" aria-label="Choose a team">
        <SelectValue placeholder="Select a team…" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="alpha">Alpha</SelectItem>
        <SelectItem value="beta">Beta</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox', { name: 'Choose a team' })
    await userEvent.click(trigger)
    const body = within(document.body)
    const option = await body.findByRole('option', { name: 'Beta' })
    await userEvent.click(option)
    await expect(trigger).toHaveTextContent('Beta')
  },
}

export const GroupsAndSeparator: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="mx-auto max-w-md p-8">
      <StorySection title="Grouped options with separator" description="Use groups for long lists and sections.">
        <Select defaultValue="usd">
          <SelectTrigger className="w-full" aria-label="Currency">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fiat</SelectLabel>
              <SelectItem value="usd">USD</SelectItem>
              <SelectItem value="eur">EUR</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Crypto</SelectLabel>
              <SelectItem value="btc">BTC</SelectItem>
              <SelectItem value="eth">ETH</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </StorySection>
    </div>
  ),
}

export const ManyItems: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="mx-auto max-w-sm p-8">
      <StorySection title="Scrollable list" description="Scroll buttons appear when content exceeds the viewport.">
        <Select defaultValue="item-01">
          <SelectTrigger className="w-full" aria-label="Pick item">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 24 }, (_, i) => {
              const n = String(i + 1).padStart(2, '0')
              return (
                <SelectItem key={n} value={`item-${n}`}>
                  Item {n}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </StorySection>
    </div>
  ),
}

export const DisabledItem: Story = {
  render: () => (
    <Select defaultValue="a">
      <SelectTrigger className="w-[220px]" aria-label="Has disabled choice">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Available</SelectItem>
        <SelectItem value="b" disabled>
          Coming soon
        </SelectItem>
        <SelectItem value="c">Another</SelectItem>
      </SelectContent>
    </Select>
  ),
}
