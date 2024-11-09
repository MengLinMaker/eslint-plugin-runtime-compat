import type { RuntimeName } from '@eslint-plugin-runtime-compat/data'
import pkg from '../package.json'
import { supportedRuntimes } from './constants'
import { runtimeCompatRule } from './rules'

/**
 * Generate flatconfig for ESLint.
 * @param filterRuntimes
 * @param ruleConfig - List of runtimes to check.
 * @returns Generated flat-config for ESLint.
 */
const runtimeCompatPlugin = (filterRuntimes: RuntimeName[]) => ({
  plugins: {
    'runtime-compat': {
      meta: {
        name: pkg.name,
        version: pkg.version,
      },
      rules: {
        'runtime-compat': runtimeCompatRule(filterRuntimes),
      },
    },
  },
  rules: {
    'runtime-compat/runtime-compat': 'error',
  },
})

export const configs = {
  recommended: runtimeCompatPlugin(supportedRuntimes),
  strict: runtimeCompatPlugin(supportedRuntimes),
  custom: runtimeCompatPlugin,
}
