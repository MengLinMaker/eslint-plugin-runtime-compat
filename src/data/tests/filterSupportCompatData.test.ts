import type { RuntimeName } from 'runtime-compat-data'
import { describe, expect, it } from 'vitest'
import { filterSupportCompatData } from '../filterSupportCompatData'
import type { ParsedCompatData, RawCompatDataMap, RuleConfig } from '../types'

describe('filterSupportCompatData', () => {
  const filterRuntimes: RuntimeName[] = ['node']
  const sampleStatus = { deprecated: false, standard_track: false, experimental: true }
  const sampleCompatData: RawCompatDataMap = {
    someApi: { status: sampleStatus, support: {} },
  }
  const expectedParsedData: Record<string, ParsedCompatData> = {
    someApi: { url: undefined, status: sampleStatus, unsupported: filterRuntimes },
  }
  const laxRuleConfig: RuleConfig = {
    deprecated: false,
    experimental: false,
  }

  it('should prefer mdn_url', () => {
    const _sampleCompatData = structuredClone(sampleCompatData)
    const _expectedParsedData = structuredClone(expectedParsedData)
    if (!_sampleCompatData['someApi'] || !_expectedParsedData['someApi']) return
    _sampleCompatData['someApi'].mdn_url = 'mdn_url'
    _sampleCompatData['someApi'].spec_url = 'spec_url'
    _expectedParsedData['someApi'].url = 'mdn_url'

    const unsupportedRuntimes = filterSupportCompatData(
      _sampleCompatData,
      filterRuntimes,
      laxRuleConfig,
    )
    expect(unsupportedRuntimes).toEqual(_expectedParsedData)
  })

  it('should fallback to spec_url when spec_url is undefined', () => {
    const _sampleCompatData = structuredClone(sampleCompatData)
    const _expectedParsedData = structuredClone(expectedParsedData)
    if (!_sampleCompatData['someApi'] || !_expectedParsedData['someApi']) return
    _sampleCompatData['someApi'].spec_url = 'spec_url'
    _expectedParsedData['someApi'].url = 'spec_url'

    const unsupportedRuntimes = filterSupportCompatData(
      _sampleCompatData,
      filterRuntimes,
      laxRuleConfig,
    )
    expect(unsupportedRuntimes).toEqual(_expectedParsedData)
  })

  it('should fallback undefined url when no url is defined', () => {
    const unsupportedRuntimes = filterSupportCompatData(
      sampleCompatData,
      filterRuntimes,
      laxRuleConfig,
    )
    expect(unsupportedRuntimes).toEqual(expectedParsedData)
  })

  it('should not parse supported compat datum', () => {
    const _sampleCompatData = structuredClone(sampleCompatData)
    if (!_sampleCompatData['someApi']) return
    _sampleCompatData['someApi'].support.node = { version_added: true }

    const unsupportedRuntimes = filterSupportCompatData(
      _sampleCompatData,
      filterRuntimes,
      laxRuleConfig,
    )
    expect(unsupportedRuntimes).toEqual({})
  })

  it('should not parse no data', () => {
    const unsupportedRuntimes = filterSupportCompatData({}, filterRuntimes, laxRuleConfig)
    expect(unsupportedRuntimes).toEqual({})
  })

  it('Should include experimental status on strict config', () => {
    const _sampleCompatData = structuredClone(sampleCompatData)
    if (!_sampleCompatData['someApi']) return
    _sampleCompatData['someApi'].support.node = { version_added: true }

    const unsupportedRuntimes = filterSupportCompatData(_sampleCompatData, filterRuntimes, {
      deprecated: false,
      experimental: true,
    })
    expect(unsupportedRuntimes).toEqual(expectedParsedData)
  })
})
