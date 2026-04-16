import type { ReactNode } from 'react'

export function StorySection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="space-y-3">
      <header>
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        {description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </header>
      {children}
    </section>
  )
}

export function StoryGrid({
  columnsClassName = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
  children,
}: {
  columnsClassName?: string
  children: ReactNode
}) {
  return (
    <div className={`grid gap-4 ${columnsClassName}`}>{children}</div>
  )
}
