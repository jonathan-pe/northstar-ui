import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/primitives'

import { StorySection } from './shared'

const meta = {
  title: 'Primitives/Tabs',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tab primitives from `@/primitives`, including `tabsListVariants` for custom tab list wrappers that reuse the same CVA styles.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const ListVariants: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="mx-auto max-w-3xl space-y-12 p-8">
      <StorySection title='variant="default" (pills on muted track)'>
        <Tabs defaultValue="a" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="a">Overview</TabsTrigger>
            <TabsTrigger value="b">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Overview body</TabsContent>
          <TabsContent value="b">Details body</TabsContent>
        </Tabs>
      </StorySection>
      <StorySection title='variant="line" (underline active indicator)'>
        <Tabs defaultValue="a" className="w-full max-w-md">
          <TabsList variant="line">
            <TabsTrigger value="a">Overview</TabsTrigger>
            <TabsTrigger value="b">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Overview body</TabsContent>
          <TabsContent value="b">Details body</TabsContent>
        </Tabs>
      </StorySection>
    </div>
  ),
}

export const OrientationVertical: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="mx-auto max-w-3xl p-8">
      <StorySection title='orientation="vertical"' description="Stacks triggers; content sits beside the list.">
        <Tabs defaultValue="general" orientation="vertical" className="flex flex-row gap-6">
          <TabsList className="h-fit flex-col items-stretch">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          <div className="min-h-[120px] flex-1">
            <TabsContent value="general">General panel</TabsContent>
            <TabsContent value="billing">Billing panel</TabsContent>
            <TabsContent value="team">Team panel</TabsContent>
          </div>
        </Tabs>
      </StorySection>
    </div>
  ),
}

export const WithDisabledTrigger: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('tab', { name: 'Three' }))
    await expect(canvas.getByText('Third panel')).toBeVisible()
  },
  render: () => (
    <Tabs defaultValue="one" className="w-[380px]">
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two" disabled>
          Two (disabled)
        </TabsTrigger>
        <TabsTrigger value="three">Three</TabsTrigger>
      </TabsList>
      <TabsContent value="one">First panel</TabsContent>
      <TabsContent value="two">Should not show</TabsContent>
      <TabsContent value="three">Third panel</TabsContent>
    </Tabs>
  ),
}
