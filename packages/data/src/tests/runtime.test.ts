import type { RuntimeName } from 'runtime-compat-data'
import { describe, expect, it } from 'vitest'
import { objectKeys } from '../objectKeys'
import { filterPreprocessCompatData, preprocessCompatData } from '../runtime'

describe('filterPreprocessCompatData', () => {
  const filterRuntimes: RuntimeName[] = ['node']

  it('should successfully filter for ', () => {
    const runtimeCompatData = filterPreprocessCompatData(preprocessCompatData, filterRuntimes)
    for (const context of objectKeys(runtimeCompatData)) {
      for (const [jsonKeys, runtimeCompatStatement] of runtimeCompatData[context].entries()) {
        const keys = JSON.parse(jsonKeys) as string[]
        expect(keys.length).toBeGreaterThan(0)
        expect(runtimeCompatStatement.unsupported).toStrictEqual(filterRuntimes)
      }
    }
  })
})
