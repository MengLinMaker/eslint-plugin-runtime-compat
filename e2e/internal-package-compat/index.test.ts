import { execSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

describe.skip('Package internal compat linting test', () => {
  it('should detect [Cache] incompatability', () => {
    try {
      execSync('pnpm test:lint', {
        cwd: import.meta.dirname,
        encoding: 'utf8',
      })
    } catch (e) {
      // @ts-expect-error error is not well defined
      expect(e.stdout).toMatchSnapshot()
    }
  })
})
