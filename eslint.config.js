// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([globalIgnores(['dist']), {
  files: ['**/*.{ts,tsx}'],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
  ],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
}, {
  files: ['src/components/ui/**/*.tsx', 'src/primitives/wrappers/**/*.tsx'],
  rules: {
    'react-refresh/only-export-components': 'off',
  },
}, {
  files: ['src/stories/**/*.stories.tsx'],
  rules: {
    'no-restricted-imports': ['error', {
      patterns: [{
        group: ['@/components/ui/*'],
        message:
          'Import primitives from "@/primitives" in stories so wrapper-level customizations are always exercised.',
      }],
    }],
  },
}, {
  files: ['tests/primitives/**/*.test.ts?(x)'],
  rules: {
    'no-restricted-imports': ['error', {
      patterns: [{
        group: ['@/components/ui/*'],
        message:
          'Import primitives from "@/primitives" in primitive tests so wrapper-level customizations are always exercised.',
      }],
    }],
  },
}, {
  files: ['scripts/**/*.ts'],
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
}, ...storybook.configs["flat/recommended"]])
