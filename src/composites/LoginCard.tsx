import * as React from 'react'

import { Button, Input } from '@/primitives'
import { cn } from '@/lib/utils'

export interface LoginCardProps {
  title?: string
  subtitle?: string
  emailLabel?: string
  passwordLabel?: string
  submitLabel?: string
  defaultEmail?: string
  defaultPassword?: string
  onSubmit?: (payload: { email: string; password: string }) => void
  className?: string
}

export function LoginCard({
  title = 'Welcome back',
  subtitle = 'Sign in to continue',
  emailLabel = 'Email',
  passwordLabel = 'Password',
  submitLabel = 'Sign in',
  defaultEmail = '',
  defaultPassword = '',
  onSubmit,
  className,
}: LoginCardProps) {
  const [email, setEmail] = React.useState(defaultEmail)
  const [password, setPassword] = React.useState(defaultPassword)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit?.({ email, password })
  }

  return (
    <form
      aria-label="login card"
      onSubmit={handleSubmit}
      className={cn(
        'flex w-full max-w-sm flex-col gap-4 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm',
        className,
      )}
    >
      <header className="space-y-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </header>

      <label className="space-y-2 text-sm">
        <span>{emailLabel}</span>
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
        />
      </label>

      <label className="space-y-2 text-sm">
        <span>{passwordLabel}</span>
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
        />
      </label>

      <Button type="submit">{submitLabel}</Button>
    </form>
  )
}
