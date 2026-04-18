import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/primitives'

const meta = {
  title: 'Primitives/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Sliding panel primitives from `@/primitives` for side drawers and contextual detail panels.',
      },
    },
  },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const RightSide: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)
    await userEvent.click(canvas.getByRole('button', { name: 'Open sheet' }))
    await expect(await body.findByText('Edit account')).toBeInTheDocument()
  },
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit account</SheetTitle>
          <SheetDescription>Make changes to your profile and save.</SheetDescription>
        </SheetHeader>
        <SheetFooter className="mt-4">
          <Button size="sm">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}
