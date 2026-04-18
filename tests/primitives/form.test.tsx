import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, Input } from '@/primitives'

type Values = { email: string }

function DemoForm() {
  const form = useForm<Values>({
    defaultValues: { email: '' },
  })

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </Form>
  )
}

describe('Form primitives', () => {
  it('renders connected field and label', () => {
    render(<DemoForm />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })
})
