import { describe, expect, it } from 'vitest'
import { mapCompatData } from '../../src/utils/mapCompatData'
import sampleRuntimeCompatData from '../sample-runtime-compat-data.json'
import parsedRuntimeCompatData from './parsed-runtime-compat-data.json'

describe('mapCompatData', () => {
  it('Parse raw compat-data to "__compat" flat object', () => {
    const parsedCompatData = mapCompatData(sampleRuntimeCompatData)
    expect(parsedCompatData).toEqual(parsedRuntimeCompatData)
  })
})
