import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, Input } from '@/primitives'

type DemoValues = { email: string }

function DemoForm() {
  const form = useForm<DemoValues>({
    defaultValues: { email: '' },
  })

  return (
    <Form {...form}>
      <form
        className="grid w-[320px] gap-3"
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="user@example.com" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

const meta = {
  title: 'Primitives/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'React Hook Form integration primitives from `@/primitives` for field wiring, labels, and validation messages.',
      },
    },
  },
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const BasicField: Story = {
  render: () => <DemoForm />,
}
