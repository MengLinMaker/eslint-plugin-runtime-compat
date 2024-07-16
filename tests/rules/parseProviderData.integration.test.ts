import { describe, expectTypeOf, it } from 'vitest'
import { parseProviderData } from '../../src/rules/parseProviderData'
import type {
  ParsedCompatData,
  Runtime,
} from '../../src/types/parsedCompatData'

describe('parseProviderData', () => {
  const filterRuntimes: Runtime[] = ['node']
  it('should parse unsupported runtime info from sources', () => {
    const parsedUnsupportData = parseProviderData(filterRuntimes)
    expectTypeOf(parsedUnsupportData).toMatchTypeOf<
      Record<string, ParsedCompatData>
    >()
  })
})
