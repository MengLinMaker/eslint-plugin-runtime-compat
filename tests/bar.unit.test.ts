import { describe, expect, it } from 'vitest'
import { bar } from '../src'

describe('bar function', () => {
  it('should return "bar"', () => {
    expect(bar()).toEqual('bar')
  })
})
