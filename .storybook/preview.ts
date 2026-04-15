import type { Preview } from '@storybook/react-vite'
import { createElement } from 'react'
import '../src/index.css'
import { DirectionProvider } from '../src/components/ui/direction'
import { applyDocumentDirection, normalizeDirection } from '../src/lib/direction'

const preview: Preview = {
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

      return createElement(
        DirectionProvider,
        { direction },
        createElement(Story),
      )
    },
  ],
  parameters: {
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