import type { CompatStatement, RuntimeName } from 'runtime-compat-data'
import { getUnsupportedRuntimes } from './getUnsupportedRuntimes.js'
import { objectKeys } from './objectKeys.js'
import type { ParsedCompatData, RawCompatDataMap, RuleConfig } from './types.js'

const extractUrl = (rawCompatDatum: CompatStatement) => {
  let url = rawCompatDatum.mdn_url
  if (url === undefined) {
    if (Array.isArray(rawCompatDatum.spec_url)) url = rawCompatDatum.spec_url[0]
    else url = rawCompatDatum.spec_url
  }
  return url
}

/**
 * Clean flat compat data object, retaining only unsupported runtimes.
 * @param flatCompatData - Flat compat data object.
 * @param filterRuntimes - Runtimes to filter for lack of support detection.
 * @returns Parsed unsupported runtime data.
 */
export const filterSupportCompatData = (
  flatCompatData: RawCompatDataMap,
  filterRuntimes: RuntimeName[],
  ruleConfig: RuleConfig,
) => {
  const parsedCompatData: Record<string, ParsedCompatData> = {}
  for (const apiKeys of objectKeys(flatCompatData)) {
    const rawCompatDatum = flatCompatData[apiKeys]
    if (rawCompatDatum === undefined) continue

    // Specify if deprecated or experimental should be automatically included.
    if (
      (ruleConfig.deprecated && rawCompatDatum.status?.deprecated !== false) ||
      (ruleConfig.experimental && rawCompatDatum.status?.experimental !== false)
    ) {
      parsedCompatData[apiKeys] = {
        url: extractUrl(rawCompatDatum),
        status: rawCompatDatum.status,
        unsupported: filterRuntimes,
      }
      continue
    }

    const unsupportedRuntimes = getUnsupportedRuntimes(rawCompatDatum, filterRuntimes)
    if (unsupportedRuntimes.length > 0) {
      parsedCompatData[apiKeys] = {
        url: extractUrl(rawCompatDatum),
        status: rawCompatDatum.status,
        unsupported: unsupportedRuntimes,
      }
    }
  }

  return parsedCompatData
}
