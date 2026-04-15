import * as React from 'react'

import {
  Button as BaseButton,
  buttonVariants,
} from '@/components/ui/button'

type ButtonProps = React.ComponentProps<typeof BaseButton>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return <BaseButton ref={ref} className={className} {...props} />
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
