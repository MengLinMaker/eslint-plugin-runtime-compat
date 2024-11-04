import type { RuntimeName } from 'runtime-compat-data'
import { runtimeCompatRule } from '../../src/rules/runtime-compat'
import { ruleTester } from './setup'

const filterRuntimes: RuntimeName[] = ['node']
const cacheInstantiationError =
  "'Cache' - Unsupported API in node.\nDocs - https://developer.mozilla.org/docs/Web/API/Cache"

ruleTester.run(
  'runtime-compat',
  runtimeCompatRule(filterRuntimes, {
    deprecated: false,
    experimental: false,
  }),
  {
    valid: ['fetch("https://www.google.com")'],
    invalid: [
      {
        // Detect unsupported API constructor call.
        code: /*javascript*/ `
            const _Cache = Cache
            let cache = new _Cache()
            cache.add("test.html")
          `,
        errors: [{ message: cacheInstantiationError }],
      },
      {
        // Detect unsupported API variable assignment.
        code: /*javascript*/ `
            const cache = new Cache()
            cache.add("test.html")
          `,
        errors: [{ message: cacheInstantiationError }],
      },
    ],
  },
)
