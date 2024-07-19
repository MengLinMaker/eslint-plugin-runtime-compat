export type { RuntimeName } from 'runtime-compat-data'
import type { RuntimeName } from 'runtime-compat-data'
import pkg from '../package.json'
import { supportedRuntimes } from './constants'
import { runtimeCompatRule } from './rules/runtime-compat'
import type { RuleConfig } from './types'

const meta = {
  // Metadata for debugging.
  name: pkg.name,
  version: pkg.version,
}

const defaultRuleConfig: RuleConfig = {
  deprecated: true,
  experimental: true,
}

/**
 * Function to initialise plugin.
 * @param filterRuntimes - List of runtimes to check.
 * @returns Plugin.
 */
export const eslintRuntimeCompat = (
  filterRuntimes: RuntimeName[],
  ruleConfig: RuleConfig = defaultRuleConfig,
) => ({
  meta,
  rules: {
    'runtime-compat': runtimeCompatRule(filterRuntimes, ruleConfig),
  },
})

/**
 * Default config checks compatability for all runtimes.
 */
export default {
  meta,
  rules: {
    'runtime-compat': runtimeCompatRule(supportedRuntimes, defaultRuleConfig),
  },
}
