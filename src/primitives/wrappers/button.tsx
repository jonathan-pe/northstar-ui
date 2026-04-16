import * as React from 'react'

import {
  Button as BaseButton,
  buttonVariants,
} from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ButtonProps = React.ComponentProps<typeof BaseButton>

/**
 * WCAG-friendly destructive styling (contrast on neutral surface). Applied here so
 * `components/ui/button` can stay aligned with shadcn updates without losing this tweak.
 */
const primitiveDestructiveButton =
  'border border-destructive/40 bg-background text-destructive shadow-xs hover:bg-destructive/10 focus-visible:border-destructive focus-visible:ring-destructive/20 dark:border-destructive/50 dark:bg-input/30 dark:hover:bg-destructive/20 dark:focus-visible:ring-destructive/40'
const primitiveLinkButtonDark =
  'dark:text-primary-foreground dark:hover:text-primary-foreground/90'

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        variant={variant}
        className={cn(
          variant === 'destructive' && primitiveDestructiveButton,
          variant === 'link' && primitiveLinkButtonDark,
          'cursor-pointer',
          className,
        )}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
