import _preprocessCompatData from './preprocessCompatData.json'

import type { RuntimeName } from 'runtime-compat-data'
import { objectKeys } from './objectKeys'
import type {
  PreprocessCompatData,
  PreprocessCompatStatement,
  RuntimeCompatData,
  RuntimeCompatStatement,
} from './types.js'

const preprocessCompatData: PreprocessCompatData = _preprocessCompatData
export { preprocessCompatData }

/**
 * Extract unsupported runtimes based of filter.
 * @param preprocessCompatStatement
 * @param filterRuntimes - Runtimes to filter for lack of support detection.
 * @returns Array of unsupported runtimes.
 */
const getUnsupportedRuntimes = (
  preprocessCompatStatement: PreprocessCompatStatement,
  filterRuntimes: RuntimeName[],
) => {
  const unsupportedRuntimes: RuntimeName[] = []

  for (const filterRuntime of filterRuntimes) {
    const support = preprocessCompatStatement.support[filterRuntime]
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

/**
 * Clean flat compat data object, retaining only unsupported runtimes.
 * @param flatCompatData - Flat compat data object.
 * @param filterRuntimes - Runtimes to filter for lack of support detection.
 * @returns Parsed unsupported runtime data.
 */
export const filterPreprocessCompatData = (
  preprocessCompatData: PreprocessCompatData,
  filterRuntimes: RuntimeName[],
) => {
  const parsedCompatData: RuntimeCompatData = {
    class: new Map<string, RuntimeCompatStatement>(),
    classProperty: new Map<string, RuntimeCompatStatement>(),
    eventListener: new Map<string, RuntimeCompatStatement>(),
    global: new Map<string, RuntimeCompatStatement>(),
    globalClassProperty: new Map<string, RuntimeCompatStatement>(),
    misc: new Map<string, RuntimeCompatStatement>(),
  }
  for (const context of objectKeys(preprocessCompatData)) {
    for (const jsonKeys of objectKeys(preprocessCompatData[context])) {
      const preprocessCompatStatement = preprocessCompatData[context][jsonKeys]
      if (preprocessCompatStatement) {
        const unsupportedRuntimes = getUnsupportedRuntimes(
          preprocessCompatStatement,
          filterRuntimes,
        )
        if (unsupportedRuntimes.length > 0) {
          parsedCompatData[context].set(jsonKeys, {
            url: preprocessCompatStatement.url,
            status: preprocessCompatStatement.status,
            unsupported: unsupportedRuntimes,
          })
        }
      }
    }
  }
  return parsedCompatData
}