import type { RuntimeName } from 'runtime-compat-data'
import type { ParsedCompatData, RawCompatDataMap } from '../types'
import { getUnsupportedRuntimes } from './getUnsupportedRuntimes'
import { objectKeys } from './objectKeys'

/**
 * Clean flat compat data object, retaining only unsupported runtimes.
 * @param flatCompatData - Flat compat data object.
 * @param filterRuntimes - Runtimes to filter for lack of support detection.
 * @returns Parsed unsupported runtime data.
 */
export const filterSupportCompatData = (
  flatCompatData: RawCompatDataMap,
  filterRuntimes: RuntimeName[],
) => {
  const parsedCompatData: Record<string, ParsedCompatData> = {}
  for (const apiKeys of objectKeys(flatCompatData)) {
    const rawCompatDatum = flatCompatData[apiKeys]
    if (rawCompatDatum === undefined) continue

    const unsupportedRuntimes = getUnsupportedRuntimes(
      rawCompatDatum,
      filterRuntimes,
    )
    if (unsupportedRuntimes.length > 0) {
      let url = rawCompatDatum.mdn_url
      if (url === undefined) {
        if (Array.isArray(rawCompatDatum.spec_url))
          url = rawCompatDatum.spec_url[0]
        else url = rawCompatDatum.spec_url
      }
      parsedCompatData[apiKeys] = {
        url,
        status: rawCompatDatum.status,
        unsupported: unsupportedRuntimes,
      }
    }
  }

  return parsedCompatData
}
