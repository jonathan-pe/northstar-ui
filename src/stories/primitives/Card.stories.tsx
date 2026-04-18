import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/primitives'

import { StorySection } from './shared'

const meta = {
  title: 'Primitives/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Composable surface container from `@/primitives` with semantic slots for header/content/footer.',
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Team plan</CardTitle>
        <CardDescription>Manage your seat and billing settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">3 of 10 seats in use.</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button size="sm">Manage</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithActionSlot: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="mx-auto max-w-lg p-8">
      <StorySection title="Header action">
        <Card>
          <CardHeader>
            <CardTitle>Build status</CardTitle>
            <CardDescription>Production deploy checks.</CardDescription>
            <CardAction>
              <Badge variant="secondary">Stable</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">All pipelines passing.</p>
          </CardContent>
        </Card>
      </StorySection>
    </div>
  ),
}
