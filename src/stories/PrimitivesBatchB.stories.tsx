import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toaster,
} from '@/primitives'

const meta = {
  title: 'Primitives/Batch B',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <div className="flex w-[440px] flex-col gap-4 rounded-md border border-border p-4">
      <div className="flex items-center gap-3">
        <Switch defaultChecked aria-label="notifications on" />
        <Switch disabled aria-label="notifications disabled" />
      </div>

      <Select defaultValue="a">
        <SelectTrigger className="w-[220px]" aria-label="Example select">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
          <SelectItem value="b">Option B</SelectItem>
        </SelectContent>
      </Select>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview content</TabsContent>
        <TabsContent value="settings">Settings content</TabsContent>
      </Tabs>

      <Toaster />
      <p className="text-xs text-muted-foreground">
        Toast provider mounted for integration validation.
      </p>
    </div>
  ),
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const LTR: Story = {
  globals: {
    direction: 'ltr',
  },
}

export const RTL: Story = {
  globals: {
    direction: 'rtl',
  },
}

export const Dark: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground p-6">
        <Story />
      </div>
    ),
  ],
}
