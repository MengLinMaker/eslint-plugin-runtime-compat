import { ESLintUtils } from '@typescript-eslint/utils'
import data from 'runtime-compat-data'
import { type RuleConfig, filterSupportCompatData, mapCompatData } from '../data'
import { compatErrorMessage, createRule } from './utils'

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
      const checker = services.program.getTypeChecker()

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
        // Check compat for class instantiations
        NewExpression: (node) => {
          const classType = services.getTypeAtLocation(node)
          const className = checker.typeToString(classType)

          const unsupportesApiId = JSON.stringify([className])
          reportError(node, unsupportesApiId)
        },
        // Check compat for class property access
        MemberExpression: (node) => {
          const classType = services.getTypeAtLocation(node.object)
          const className = checker.typeToString(classType)

          const propertyType = services.getTypeAtLocation(node.property)
          const propertyName = propertyType.getSymbol()?.escapedName

          const unsupportesApiId = JSON.stringify([className, propertyName])
          reportError(node, unsupportesApiId)
        },
      }
    },
  })
