import type { RuntimeName } from 'runtime-compat-data'
import { runtimeCompatRule } from '../../src/rules/runtime-compat'
import { ruleTester } from './setup'

const filterRuntimes: RuntimeName[] = ['node']
const cacheInstantiationError = `'Cache' - Unsupported API in node.\nDocs - https://developer.mozilla.org/docs/Web/API/Cache`
const cachePropertyAccessError = `'Cache.add' - Unsupported API in node.\nDocs - https://developer.mozilla.org/docs/Web/API/Cache/add`

ruleTester.run(
  'runtime-compat',
  runtimeCompatRule(filterRuntimes, {
    deprecated: false,
    experimental: false,
  }),
  {
    valid: [
      `
        fetch("https://www.google.com")
        new URL("https://www.google.com")
      `,
    ],
    invalid: [
      {
        code: `
            const _Cache = Cache
            let cache = new _Cache()
            cache.add("test.html")
          `,
        errors: [{ message: cacheInstantiationError }, { message: cachePropertyAccessError }],
      },
      {
        code: `
            const cache = new Cache()
            cache.add("test.html")
          `,
        errors: [{ message: cacheInstantiationError }, { message: cachePropertyAccessError }],
      },
      {
        code: `
            new Cache().add("test.html")
          `,
        // Interestingly property access error is thrown before class instantiation error
        errors: [{ message: cachePropertyAccessError }, { message: cacheInstantiationError }],
      },
    ],
  },
)
