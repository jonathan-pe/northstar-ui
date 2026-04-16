import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import {
  ArrowRightIcon,
  ChevronRightIcon,
  Loader2Icon,
  MailIcon,
  PlusIcon,
  Trash2Icon,
} from 'lucide-react'

import { Button } from '@/primitives'

import { StoryGrid, StorySection } from './shared'

const VARIANTS = [
  'default',
  'outline',
  'secondary',
  'ghost',
  'destructive',
  'link',
] as const

const SIZES = [
  'default',
  'xs',
  'sm',
  'lg',
  'icon',
  'icon-xs',
  'icon-sm',
  'icon-lg',
] as const

const meta = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Wrapper around the shadcn `Button`. Also re-exports `buttonVariants` from `@/primitives` for composing custom elements with the same styles.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    size: {
      control: 'select',
      options: SIZES,
    },
    disabled: { control: 'boolean' },
    asChild: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
    disabled: false,
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
  parameters: { layout: 'fullscreen' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const btn = canvas.getByRole('button', { name: 'default' })
    await userEvent.click(btn)
    await expect(btn).toBeVisible()
  },
  render: () => (
    <div className="mx-auto max-w-5xl space-y-10 p-8">
      <StorySection title="Variants" description="Visual styles for actions and hierarchy.">
        <StoryGrid columnsClassName="grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-col items-start gap-2">
              <span className="text-xs capitalize text-muted-foreground">{variant}</span>
              <Button variant={variant}>{variant}</Button>
            </div>
          ))}
        </StoryGrid>
      </StorySection>
    </div>
  ),
}

export const Sizes: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="mx-auto max-w-5xl space-y-10 p-8">
      <StorySection
        title="Text sizes"
        description="Default through lg use inline label; icon sizes are for square icon buttons."
      >
        <div className="flex flex-wrap items-end gap-4">
          {(['xs', 'sm', 'default', 'lg'] as const).map((size) => (
            <div key={size} className="flex flex-col gap-2">
              <span className="text-xs text-muted-foreground">{size}</span>
              <Button size={size}>Label</Button>
            </div>
          ))}
        </div>
      </StorySection>
      <StorySection title="Icon sizes" description="Square hit targets for toolbar and compact UIs.">
        <div className="flex flex-wrap items-end gap-4">
          {(['icon-xs', 'icon-sm', 'icon', 'icon-lg'] as const).map((size) => (
            <div key={size} className="flex flex-col gap-2">
              <span className="text-xs text-muted-foreground">{size}</span>
              <Button size={size} variant="outline" aria-label={`Delete (${size})`}>
                <Trash2Icon />
              </Button>
            </div>
          ))}
        </div>
      </StorySection>
    </div>
  ),
}

export const WithIcons: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="mx-auto max-w-3xl space-y-10 p-8">
      <StorySection title="Leading icon">
        <div className="flex flex-wrap gap-3">
          <Button>
            <MailIcon data-icon="inline-start" />
            Email
          </Button>
          <Button variant="secondary">
            <PlusIcon data-icon="inline-start" />
            Create
          </Button>
        </div>
      </StorySection>
      <StorySection title="Trailing icon">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            Next
            <ChevronRightIcon data-icon="inline-end" />
          </Button>
          <Button variant="ghost">
            Continue
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </StorySection>
      <StorySection title="Loading state (decorative)">
        <Button disabled aria-busy="true">
          <Loader2Icon className="animate-spin" />
          Saving…
        </Button>
      </StorySection>
    </div>
  ),
}

export const States: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="mx-auto max-w-5xl space-y-10 p-8">
      <StorySection title="Disabled" description="All variants in a disabled state.">
        <StoryGrid>
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              {variant}
            </Button>
          ))}
        </StoryGrid>
      </StorySection>
      <StorySection title="Invalid (aria-invalid)">
        <Button aria-invalid="true" variant="outline">
          Fix errors
        </Button>
      </StorySection>
    </div>
  ),
}

export const AsChild: Story = {
  render: () => (
    <Button variant="link" asChild>
      <a href="https://example.com" target="_blank" rel="noreferrer">
        Link as button styles
      </a>
    </Button>
  ),
}

export const FullMatrix: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="mx-auto max-w-6xl space-y-4 overflow-x-auto p-8">
      <p className="text-sm text-muted-foreground">
        Every variant × default size (exhaustive combination for visual regression).
      </p>
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="p-2 text-start font-medium text-muted-foreground">Variant</th>
            <th className="p-2 text-start font-medium text-muted-foreground">Preview</th>
          </tr>
        </thead>
        <tbody>
          {VARIANTS.map((variant) => (
            <tr key={variant} className="border-b border-border/80">
              <td className="p-3 align-middle capitalize text-muted-foreground">{variant}</td>
              <td className="p-3">
                <Button variant={variant}>{variant}</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
}
