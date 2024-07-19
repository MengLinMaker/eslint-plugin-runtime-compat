import type { RuntimeName } from 'runtime-compat-data'
import { describe, expect, it } from 'vitest'
import type { ParsedCompatData } from '../../src/types/parsedCompatData'
import type { RawCompatDataMap } from '../../src/types/rawCompatData'
import { filterSupportCompatData } from '../../src/utils/filterSupportCompatData'

describe('filterSupportCompatData', () => {
  const filterRuntimes: RuntimeName[] = ['node']
  const sampleStatus = {
    deprecated: false,
    standard_track: true,
    experimental: false,
  }
  const sampleCompatData: RawCompatDataMap = {
    someApi: {
      status: sampleStatus,
      support: {},
    },
  }
  const expectedParsedData: Record<string, ParsedCompatData> = {
    someApi: {
      url: undefined,
      status: sampleStatus,
      unsupported: filterRuntimes,
    },
  }

  it('should prefer mdn_url', () => {
    const _sampleCompatData = structuredClone(sampleCompatData)
    const _expectedParsedData = structuredClone(expectedParsedData)
    _sampleCompatData.someApi.mdn_url = 'mdn_url'
    _sampleCompatData.someApi.spec_url = 'spec_url'
    _expectedParsedData.someApi.url = 'mdn_url'

    const unsupportedRuntimes = filterSupportCompatData(
      _sampleCompatData,
      filterRuntimes,
    )
    expect(unsupportedRuntimes).toEqual(_expectedParsedData)
  })

  it('should fallback to spec_url when spec_url is undefined', () => {
    const _sampleCompatData = structuredClone(sampleCompatData)
    const _expectedParsedData = structuredClone(expectedParsedData)
    _sampleCompatData.someApi.spec_url = 'spec_url'
    _expectedParsedData.someApi.url = 'spec_url'

    const unsupportedRuntimes = filterSupportCompatData(
      _sampleCompatData,
      filterRuntimes,
    )
    expect(unsupportedRuntimes).toEqual(_expectedParsedData)
  })

  it('should fallback undefined url when no url is defined', () => {
    const unsupportedRuntimes = filterSupportCompatData(
      sampleCompatData,
      filterRuntimes,
    )
    expect(unsupportedRuntimes).toEqual(expectedParsedData)
  })

  it('should not parse supported compat datum', () => {
    const _sampleCompatData = structuredClone(sampleCompatData)
    _sampleCompatData.someApi.support.node = { version_added: true }

    const unsupportedRuntimes = filterSupportCompatData(
      _sampleCompatData,
      filterRuntimes,
    )
    expect(unsupportedRuntimes).toEqual({})
  })

  it('should not parse no data', () => {
    const unsupportedRuntimes = filterSupportCompatData({}, filterRuntimes)
    expect(unsupportedRuntimes).toEqual({})
  })
})
