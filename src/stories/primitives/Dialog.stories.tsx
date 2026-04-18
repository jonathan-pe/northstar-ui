import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/primitives'

import { StorySection } from './shared'

const meta = {
  title: 'Primitives/Dialog',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dialog primitives from `@/primitives`. Provide `DialogTitle`; use `DialogDescription` for helper copy or visually hidden text for screen readers.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const WithoutDescription: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="p-8">
      <StorySection
        title="Visually minimal description"
        description="Keep a DialogDescription for screen readers even when you do not show helper text in the layout."
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Open</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Short title</DialogTitle>
              <DialogDescription className="sr-only">
                Supplementary context for assistive technology only.
              </DialogDescription>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">Body copy can use normal paragraphs instead of DialogDescription.</p>
          </DialogContent>
        </Dialog>
      </StorySection>
    </div>
  ),
}

export const LongContent: Story = {
  parameters: { layout: 'fullscreen' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Terms of service' }))
    const root = within(document.body)
    await expect(root.getByRole('dialog')).toBeInTheDocument()
    await expect(root.getByText('Terms')).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
  },
  render: () => (
    <div className="p-8">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Terms of service</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[min(80vh,560px)] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Terms</DialogTitle>
            <DialogDescription>Scroll the agreement before accepting.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm text-muted-foreground">
            {Array.from({ length: 12 }, (_, i) => (
              <p key={i}>
                Paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Decline</Button>
            </DialogClose>
            <Button>Accept</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
}
