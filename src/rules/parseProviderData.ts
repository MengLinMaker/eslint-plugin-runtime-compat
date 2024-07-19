import bcd from '@mdn/browser-compat-data'
import data from 'runtime-compat-data'
import type { RuntimeName } from 'runtime-compat-data'
import { filterSupportCompatData } from '../utils/filterSupportCompatData'
import { mapCompatData } from '../utils/mapCompatData'

/**
 * Extract only relevant unsupported runtime data from sources.
 * @param filterRuntimes - List of runtimes to check.
 * @returns Complete parsed unsupported runtime data from multiple sources.
 */
export const parseProviderData = (
  filterRuntimes: RuntimeName[],
  noBrowserApi = false,
) => {
  let compatDataMap = mapCompatData({
    ...data.api,
    ...data.javascript,
  })

  if (noBrowserApi === true) {
    compatDataMap = {
      ...mapCompatData(bcd.api),
      // Override browser compat data with runtime.
      ...compatDataMap,
    }
  }

  const parsedData = filterSupportCompatData(compatDataMap, filterRuntimes)
  return parsedData
}
