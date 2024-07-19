import { RuleTester } from 'eslint'
import type { RuntimeName } from 'runtime-compat-data'
import { it } from 'vitest'
import { runtimeCompatRule } from '../../src/rules/runtime-compat'

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: 2015, sourceType: 'module' },
})
const filterRuntimes: RuntimeName[] = ['node']
const cacheErrorMsg =
  'Cache - Unsupported API in node. Docs: https://developer.mozilla.org/docs/Web/API/Cache'

it('should pass eslint "runtime-compat" test', () => {
  ruleTester.run('runtime-compat', runtimeCompatRule(filterRuntimes), {
    valid: [
      {
        code: 'fetch("https://www.google.com")',
      },
    ],
    invalid: [
      {
        // Detect
        code: 'const a = new Cache(); let b = new Cache(); b = new Cache()',
        errors: [
          {
            message: cacheErrorMsg,
          },
          {
            message: cacheErrorMsg,
          },
          {
            message: cacheErrorMsg,
          },
        ],
      },
      {
        code: 'const n = Cache; let b = new Cache; b = new Cache',
        errors: [
          {
            message: cacheErrorMsg,
          },
          {
            message: cacheErrorMsg,
          },
          {
            message: cacheErrorMsg,
          },
        ],
      },
    ],
  })
})
