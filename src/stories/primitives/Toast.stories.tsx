import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Button, Toaster, toast } from '@/primitives'

import { StorySection } from './shared'

const meta = {
  title: 'Primitives/Toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <>
        <Toaster />
        <Story />
      </>
    ),
  ],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
  parameters: { layout: 'fullscreen' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'success' }))
    const root = within(document.body)
    await expect(await root.findByText('Saved successfully')).toBeInTheDocument()
  },
  render: () => (
    <div className="mx-auto flex max-w-xl flex-col gap-4 p-8">
      <StorySection title="Sonner variants" description="Maps to toast.success, toast.error, and related helpers.">
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={() => toast.success('Saved successfully')}>
            success
          </Button>
          <Button type="button" variant="outline" onClick={() => toast.error('Could not save')}>
            error
          </Button>
          <Button type="button" variant="outline" onClick={() => toast.warning('Quota almost full')}>
            warning
          </Button>
          <Button type="button" variant="outline" onClick={() => toast.info('Tip: use shortcuts')}>
            info
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => toast.promise(new Promise((r) => setTimeout(r, 1200)), { loading: 'Loading…', success: 'Done', error: 'Failed' })}
          >
            promise
          </Button>
        </div>
      </StorySection>
    </div>
  ),
}
