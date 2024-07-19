import type { CompatStatement, RuntimeName } from 'runtime-compat-data'

/**
 * Extract unsupported runtimes based of filter.
 * @param rawCompatDatum - Raw compat datum from '__compat'.
 * @param filterRuntimes - Runtimes to filter for lack of support detection.
 * @returns Array of unsupported runtimes.
 */
export const getUnsupportedRuntimes = (
  rawCompatDatum: CompatStatement,
  filterRuntimes: RuntimeName[],
) => {
  const unsupportedRuntimes: RuntimeName[] = []

  for (const filterRuntime of filterRuntimes) {
    const support = rawCompatDatum.support[filterRuntime]
    if (support === undefined) {
      // Runtime not found, therefore unsupported.
      unsupportedRuntimes.push(filterRuntime)
    } else if (Array.isArray(support)) {
      // Array format not supported by runtime-compat-data, therefore unsupported.
      unsupportedRuntimes.push(filterRuntime)
    } else if (support.version_added === false) {
      // Only boolean is supported in runtime-compat-data.
      unsupportedRuntimes.push(filterRuntime)
    }
  }
  return unsupportedRuntimes
}
