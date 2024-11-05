import type { CompatData } from 'runtime-compat-data'
import { describe, expect, it } from 'vitest'
import { mapCompatData } from '../../src/utils/mapCompatData'
import sampleRuntimeCompatData from '../sample-runtime-compat-data.json'
import parsedRuntimeCompatData from './parsed-runtime-compat-data.json'

describe('mapCompatData', () => {
  it('should parse raw compat-data to "__compat" flat object', () => {
    const parsedCompatData = mapCompatData(sampleRuntimeCompatData as never as CompatData)
    expect(parsedCompatData).toEqual(parsedRuntimeCompatData)
  })
})
