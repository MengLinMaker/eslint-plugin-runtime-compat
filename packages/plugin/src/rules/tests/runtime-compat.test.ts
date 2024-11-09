import type { RuntimeName } from '@eslint-plugin-runtime-compat/data'
import { runtimeCompatRule } from '..'
import { ruleTester } from './setup'

const filterRuntimes: RuntimeName[] = ['node']
const cacheInstantiationError =
  'class - [Cache] - Unsupported standard API for [node]\nDocs - https://developer.mozilla.org/docs/Web/API/Cache'
const cachePropertyAccessError =
  'classProperty - [Cache,add] - Unsupported standard API for [node]\nDocs - https://developer.mozilla.org/docs/Web/API/Cache/add'

ruleTester.run('runtime-compat', runtimeCompatRule(filterRuntimes), {
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
      // @ts-expect-error message is legacy
      errors: [{ message: cacheInstantiationError }, { message: cachePropertyAccessError }],
    },
    {
      code: `
            const cache = new Cache()
            cache.add("test.html")
          `,
      // @ts-expect-error message is legacy
      errors: [{ message: cacheInstantiationError }, { message: cachePropertyAccessError }],
    },
    {
      code: `
            new Cache().add("test.html")
          `,
      // Interestingly property access error is thrown before class instantiation error
      // @ts-expect-error message is legacy
      errors: [{ message: cachePropertyAccessError }, { message: cacheInstantiationError }],
    },
  ],
})
