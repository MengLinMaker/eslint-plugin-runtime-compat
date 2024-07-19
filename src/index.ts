export type { RuntimeName } from 'runtime-compat-data'
import type { Linter } from 'eslint'
import type { RuntimeName } from 'runtime-compat-data'
import pkg from '../package.json'
import { supportedRuntimes } from './constants'
import { runtimeCompatRule } from './rules/runtime-compat'
import type { RuleConfig } from './types'

const defaultRuleConfig: RuleConfig = {
  deprecated: true,
  experimental: true,
}

/**
 * Generate flatconfig for ESLint.
 * @param filterRuntimes
 * @param ruleConfig - List of runtimes to check.
 * @returns Generated flat-config for ESLint.
 */
const runtimeCompatPlugin = (
  filterRuntimes: RuntimeName[],
  ruleConfig: RuleConfig = defaultRuleConfig,
): Linter.FlatConfig => ({
  plugins: {
    'runtime-compat': {
      meta: {
        name: pkg.name,
        version: pkg.version,
      },
      rules: {
        'runtime-compat': runtimeCompatRule(filterRuntimes, ruleConfig),
      },
    },
  },
  rules: {
    'runtime-compat/runtime-compat': 'error',
  },
})

export const configs = {
  recommended: runtimeCompatPlugin(supportedRuntimes, {
    deprecated: false,
    experimental: false,
  }),
  strict: runtimeCompatPlugin(supportedRuntimes),
  custom: runtimeCompatPlugin,
}
