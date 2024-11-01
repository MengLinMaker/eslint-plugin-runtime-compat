import * as path from 'node:path'
import { RuleTester } from '@typescript-eslint/rule-tester'
import { afterAll, describe, it } from 'vitest'

RuleTester.afterAll = afterAll
RuleTester.it = it
RuleTester.itOnly = it.only
RuleTester.describe = describe

export const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      project: path.resolve(__dirname, 'resources', 'tsconfig.json'),
      tsconfigRootDir: path.resolve(__dirname, 'resources'),
    },
  },
})
