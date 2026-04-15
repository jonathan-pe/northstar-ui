import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { InfoIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const meta = {
  title: 'Sanity/RTL Regression',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <TooltipProvider>
      <div className="flex items-center gap-3">
        <Button>Primary Action</Button>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon-sm" aria-label="Show info tooltip">
              <InfoIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Direction-aware tooltip content</TooltipContent>
        </Tooltip>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Action</DialogTitle>
              <DialogDescription>
                This dialog should stay correctly aligned in both LTR and RTL.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  ),
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const LTR: Story = {
  globals: {
    direction: 'ltr',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const root = within(document.body)

    const dialogTrigger = canvas.getByRole('button', { name: 'Open Dialog' })
    await userEvent.click(dialogTrigger)
    await expect(root.getByText('Confirm Action')).toBeInTheDocument()
  },
}

export const RTL: Story = {
  globals: {
    direction: 'rtl',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const root = within(document.body)

    const dialogTrigger = canvas.getByRole('button', { name: 'Open Dialog' })
    await userEvent.click(dialogTrigger)
    await expect(root.getByText('Confirm Action')).toBeInTheDocument()
  },
}
