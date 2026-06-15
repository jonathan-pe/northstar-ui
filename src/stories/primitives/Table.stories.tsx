import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/primitives'
import { catalogStoryDocs } from '@/stories/catalog'

const meta = {
  title: 'Primitives/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    ...catalogStoryDocs('table'),
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="mx-auto max-w-3xl p-8">
      <Table>
        <TableCaption>Quarterly subscriptions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Plan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Starter</TableCell>
            <TableCell>Active</TableCell>
            <TableCell className="text-right">$19</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Pro</TableCell>
            <TableCell>Past due</TableCell>
            <TableCell className="text-right">$49</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}
