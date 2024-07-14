import type { FooBar } from '../types'

/**
 * Function to return "bar" string.
 * @returns {FooBar} Return "bar" string.
 */
export const bar = (): FooBar => {
  return 'b' + 'a' + 'r'
}
