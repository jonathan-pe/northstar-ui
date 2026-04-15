import * as React from 'react'

import { Textarea as BaseTextarea } from '@/components/ui/textarea'

type TextareaProps = React.ComponentProps<typeof BaseTextarea>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return <BaseTextarea ref={ref} className={className} {...props} />
  },
)

Textarea.displayName = 'Textarea'

export { Textarea }
