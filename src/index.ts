export type { RuntimeName } from 'runtime-compat-data'
import type { RuntimeName } from 'runtime-compat-data'
import pkg from '../package.json'
import { runtimeCompatRule } from './rules/runtime-compat'

/**
 * Function to initialise plugin
 * @param filterRuntimes - List of runtimes to check.
 * @returns Plugin
 */
export const eslintRuntimeCompat = (filterRuntimes: RuntimeName[]) => ({
  meta: {
    // Metadata for debugging.
    name: pkg.name,
    version: pkg.version,
  },
  rules: {
    'runtime-compat': runtimeCompatRule(filterRuntimes),
  },
})
