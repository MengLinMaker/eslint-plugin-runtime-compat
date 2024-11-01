import type { RuntimeName } from 'runtime-compat-data'
import { runtimeCompatRule } from '../../src/rules/runtime-compat'
import { ruleTester } from './setup'

const filterRuntimes: RuntimeName[] = ['node']
const cacheErrorMsg =
  "'Cache' - Unsupported API in node.\nDocs - https://developer.mozilla.org/docs/Web/API/Cache"

ruleTester.run(
  'runtime-compat',
  runtimeCompatRule(filterRuntimes, {
    deprecated: false,
    experimental: false,
  }),
  {
    valid: [
      {
        code: 'fetch("https://www.google.com")',
      },
    ],
    invalid: [
      {
        // Detect unsupported API constructor call.
        code: /*javascript*/ `
            const a = new Cache()
            let b = new Cache()
            b = new Cache()
          `,
        errors: [
          { message: cacheErrorMsg },
          { message: cacheErrorMsg },
          { message: cacheErrorMsg },
        ],
      },
      {
        // Detect unsupported API variable assignment.
        code: /*javascript*/ `
            const n = Cache
            let b = new Cache
            b = new Cache
          `,
        errors: [
          { message: cacheErrorMsg },
          { message: cacheErrorMsg },
          { message: cacheErrorMsg },
        ],
      },
    ],
  },
)
