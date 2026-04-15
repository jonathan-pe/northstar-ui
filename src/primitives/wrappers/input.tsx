import * as React from 'react'

import { Input as BaseInput } from '@/components/ui/input'

type InputProps = React.ComponentProps<typeof BaseInput>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return <BaseInput ref={ref} className={className} {...props} />
  },
)

Input.displayName = 'Input'

export { Input }
