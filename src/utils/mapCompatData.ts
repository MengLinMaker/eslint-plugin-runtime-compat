import type { CompatStatement } from 'runtime-compat-data'
import { objectKeys } from './objectKeys'

// Catch compile errors with constant.
const __compat = '__compat' as never

/**
 * DFS map raw compat-data nodes with '__compat' key to a flat object.
 * @param compatData - Raw compat-data object.
 * @returns Flat object containing '__compat' data from raw compat-data.
 */
export const mapCompatData = (compatData: object) => {
  const parsedCompatData: {
    [key: string]: CompatStatement
  } = {}

  const dfsParse = (compatData: object, parentKeys: never[] = []) => {
    const keys = objectKeys(compatData) as never[]
    for (const key of keys) {
      const subData = compatData[key]
      if (key === __compat) {
        // Prefer <Class> <Class> data for constructor compat for accuracy
        if (parentKeys.length > 1 && parentKeys[0] === parentKeys[1]) {
          // Reduce to single <Class> key to override previous compat data
          const shortendedKey = parentKeys.slice(1, parentKeys.length)
          parsedCompatData[JSON.stringify(shortendedKey)] = subData
        } else {
          parsedCompatData[JSON.stringify(parentKeys)] = subData
        }
      } else {
        // Only chain keys if "__compat" exists
        const nodeHasCompatData = !keys.includes(__compat)
        const filteredParentKeys = nodeHasCompatData ? [key] : [...parentKeys, key]
        dfsParse(subData, filteredParentKeys)
      }
    }
  }

  dfsParse(compatData)
  return parsedCompatData
}
