import type { RuntimeName } from 'runtime-compat-data'
import { describe, expect, it } from 'vitest'
import { getUnsupportedRuntimes } from '../getUnsupportedRuntimes'

describe('getUnsupportedRuntimes', () => {
  const filterRuntimes: RuntimeName[] = ['node']
  const sampleStatus = { deprecated: false, standard_track: true, experimental: false }

  it('should be unsupported if runtime not found in datum', () => {
    const sampleCompatDatum = { status: sampleStatus, support: {} }
    const unsupportedRuntimes = getUnsupportedRuntimes(sampleCompatDatum, filterRuntimes)
    expect(unsupportedRuntimes).toEqual(filterRuntimes)
  })

  it('should be unsupported if runtime support is array', () => {
    const sampleCompatDatum = {
      status: sampleStatus,
      support: { node: [{ version_added: false }] },
    }
    const unsupportedRuntimes = getUnsupportedRuntimes(sampleCompatDatum, filterRuntimes)
    expect(unsupportedRuntimes).toEqual(filterRuntimes)
  })

  it('should be unsupported if version_added is false', () => {
    const sampleCompatDatum = {
      status: sampleStatus,
      support: { node: { version_added: false } },
    }
    const unsupportedRuntimes = getUnsupportedRuntimes(sampleCompatDatum, filterRuntimes)
    expect(unsupportedRuntimes).toEqual(filterRuntimes)
  })

  it('should be supported if version_added is true', () => {
    const sampleCompatDatum = {
      status: sampleStatus,
      support: { node: { version_added: true } },
    }
    const unsupportedRuntimes = getUnsupportedRuntimes(sampleCompatDatum, filterRuntimes)
    expect(unsupportedRuntimes).toEqual([])
  })

  it('should be supported if version_added is true', () => {
    const sampleCompatDatum = {
      status: sampleStatus,
      support: { bun: [{ version_added: true }], deno: { version_added: true } },
    }
    const unsupportedRuntimes = getUnsupportedRuntimes(sampleCompatDatum, filterRuntimes)
    expect(unsupportedRuntimes).toEqual(filterRuntimes)
  })
})
