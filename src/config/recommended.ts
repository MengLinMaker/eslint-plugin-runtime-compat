/**
 * @file Recommended configs for this plugin
 */

import type { ESLint, Linter } from 'eslint'
import globals from 'globals'

const flat = {
  languageOptions: {
    globals: {
      ...globals.browser,
    },
  },
  rules: {
    'compat/compat': 'error',
  },
} satisfies Linter.FlatConfig

const legacy = {
  env: {
    browser: true,
  },
  rules: flat.rules,
} satisfies ESLint.ConfigData

const recommended = {
  flat,
  legacy,
}

export default recommended
