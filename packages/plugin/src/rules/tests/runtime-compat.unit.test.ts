import {
  type RuntimeName,
  filterPreprocessCompatData,
  objectKeys,
  parseJsonKeys,
  preprocessCompatData,
} from '@eslint-plugin-runtime-compat/data'
import type { InvalidTestCase } from '@typescript-eslint/rule-tester'
import { runtimeCompatRule } from '..'
import { ruleTester } from './setup'
import unsupportedApis from './unsupportedApis.json'

const filterRuntimes: RuntimeName[] = [
  'bun',
  'deno',
  'edge-light',
  'fastly',
  'netlify',
  'node',
  'workerd',
]

const invalidTests: InvalidTestCase<never, []>[] = []
const runtimeCompatData = filterPreprocessCompatData(preprocessCompatData, filterRuntimes)

for (const apiContext of objectKeys(runtimeCompatData)) {
  for (const [jsonKeys, apiInfo] of runtimeCompatData[apiContext].entries()) {
    if (!Object.hasOwn(unsupportedApis, jsonKeys)) {
      const keys = parseJsonKeys(jsonKeys)
      switch (apiContext) {
        case 'class': {
          const testComment = `// Class instantiation: ${keys[0]}`
          const errors = [{ message: `${apiContext} - ${apiInfo.error}` }]
          invalidTests.push({
            code: `
              ${testComment}
              const _ClassName = ${keys[0]}
              const _classInstance = new _ClassName()
            `,
            // @ts-expect-error message is legacy
            errors,
          })
          invalidTests.push({
            code: `
              ${testComment}
              const _classInstance = new ${keys[0]}()
            `,
            // @ts-expect-error message is legacy
            errors,
          })
          break
        }
        case 'classProperty': {
          break
        }
        case 'eventListener':
          break
        case 'global':
          break
        case 'globalClassProperty':
          break
        case 'misc':
          break
      }
    }
  }
}

ruleTester.run('runtime-compat', runtimeCompatRule(filterRuntimes), {
  valid: [],
  invalid: invalidTests,
})
