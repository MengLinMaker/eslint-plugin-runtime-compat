import { ESLintUtils } from '@typescript-eslint/utils'
import data from 'runtime-compat-data'
import type { RuleConfig } from '../types'
import { compatErrorMessage } from '../utils/compatErrorMessage'
import { filterSupportCompatData } from '../utils/filterSupportCompatData'
import { mapCompatData } from '../utils/mapCompatData'
import { createRule } from './createRule'

/**
 * Creates a runtime-compat rule.
 * @param filterRuntimes - List of runtimes to check.
 * @returns ESLint rule.
 */
export const runtimeCompatRule = (filterRuntimes: data.RuntimeName[], ruleConfig: RuleConfig) =>
  createRule({
    name: 'runtime-compat',
    meta: {
      docs: {
        description: 'Ensure cross-runtime API compatibility',
      },
      type: 'problem',
      schema: [],
      messages: {},
    },
    defaultOptions: [],
    create: (context) => {
      const services = ESLintUtils.getParserServices(context)

      const unsupportedApis = filterSupportCompatData(
        mapCompatData(data),
        filterRuntimes,
        ruleConfig,
      )

      const reportError = <T>(node: T, unsupportesApiId: string) => {
        const apiInfo = unsupportedApis[unsupportesApiId]
        if (!apiInfo) return
        const message = compatErrorMessage(unsupportesApiId, apiInfo)
        // @ts-expect-error using typescript-eslint
        context.report({ node, message })
      }

      return {
        NewExpression: (node) => {
          const type = services.getTypeAtLocation(node)
          const checker = services.program.getTypeChecker()
          const className = checker.typeToString(type)
          const unsupportesApiId = JSON.stringify([className])
          reportError(node, unsupportesApiId)
        },
      }
    },
  })
