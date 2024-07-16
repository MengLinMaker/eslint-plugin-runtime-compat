import { objectKeys } from './../../src/utils/objectKeys'

import { describe, expect, expectTypeOf, it } from 'vitest'

describe('objectKey', () => {
  it('Return keys of object with correct types', () => {
    const keys = objectKeys({
      a: null,
      'b ': 'b ',
      c: () => {},
      d: { d: null },
    })
    const expectedKeys = ['a', 'b ', 'c', 'd']
    type expectedKeyType = 'a' | 'b ' | 'c' | 'd'
    expect(keys).toEqual(expectedKeys)
    expectTypeOf(keys).toMatchTypeOf<expectedKeyType[]>()
  })
})
