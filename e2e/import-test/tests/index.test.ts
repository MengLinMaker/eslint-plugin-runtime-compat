import { spawnSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

describe('Multi file import linting test', () => {
  it('should detect [Cache] incompatability', () => {
    const { stdout } = spawnSync('pnpm', ['test:lint'])
    console.debug(stdout.toString())
    expect(stdout.toString()).toContain('class - [Cache] - Unsupported standard API')
  })
})
