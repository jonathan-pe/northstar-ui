import type { Preview } from '@storybook/react-vite'
import { createElement } from 'react'
import { themes } from 'storybook/theming'
import '../src/index.css'
import { DirectionProvider } from '../src/components/ui/direction'
import { applyDocumentDirection, normalizeDirection } from '../src/lib/direction'
import { cn } from '../src/lib/utils'

const storybookThemes = {
  light: {
    title: 'Light',
    className: '',
  },
  dark: {
    title: 'Dark',
    className: 'dark',
  },
} as const

function applyDocumentTheme(themeClassName: string) {
  const root = document.documentElement
  root.classList.remove('dark')
  if (themeClassName) {
    root.classList.add(themeClassName)
  }
}

const preview: Preview = {
  initialGlobals: {
    backgrounds: {
      value: 'dark',
    },
  },
  globalTypes: {
    direction: {
      description: 'Layout direction',
      defaultValue: 'ltr',
      toolbar: {
        title: 'Direction',
        icon: 'globe',
        items: [
          { value: 'ltr', title: 'LTR' },
          { value: 'rtl', title: 'RTL' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const direction = normalizeDirection(context.globals.direction)
      applyDocumentDirection(direction)

      // Storybook Backgrounds toolbar: https://storybook.js.org/docs/essentials/backgrounds
      // Sync Tailwind `class="dark"` with the selected preset so `dark:` tokens match the canvas.
      const backgroundKey =
        (context.globals as { backgrounds?: { value?: string } }).backgrounds?.value ?? 'light'
      const selectedTheme =
        storybookThemes[backgroundKey as keyof typeof storybookThemes] ?? storybookThemes.light
      applyDocumentTheme(selectedTheme.className)

      const surfaceClass = cn(
        'min-h-screen w-full bg-background p-6 text-foreground',
        selectedTheme.className,
      )

      return createElement(
        'div',
        { className: surfaceClass },
        createElement(
          DirectionProvider,
          { direction },
          createElement(Story),
        ),
      )
    },
  ],
  parameters: {
    docs: {
      theme: themes.dark,
    },
    backgrounds: {
      options: {
        light: {
          name: storybookThemes.light.title,
          value: 'var(--background)',
        },
        dark: {
          name: storybookThemes.dark.title,
          value: 'var(--background)',
        },
      },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error'
    }
  },
};

export default preview;