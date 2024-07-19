export type { RuntimeName } from 'runtime-compat-data'
import type { RuntimeName } from 'runtime-compat-data'
import pkg from '../package.json'
import { supportedRuntimes } from './constants'
import { runtimeCompatRule } from './rules/runtime-compat'

const meta = {
  // Metadata for debugging.
  name: pkg.name,
  version: pkg.version,
}

/**
 * Function to initialise plugin.
 * @param filterRuntimes - List of runtimes to check.
 * @returns Plugin.
 */
export const eslintRuntimeCompat = (filterRuntimes: RuntimeName[]) => ({
  meta,
  rules: {
    'runtime-compat': runtimeCompatRule(filterRuntimes),
  },
})

/**
 * Default config checks compatability for all runtimes.
 */
export default {
  meta,
  rules: {
    'runtime-compat': runtimeCompatRule(supportedRuntimes),
  },
}
