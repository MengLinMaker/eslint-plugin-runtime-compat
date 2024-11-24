import {
  type RuntimeName,
  filterPreprocessCompatData,
  preprocessCompatData,
} from '@eslint-plugin-runtime-compat/data'
import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils'
import { createRule } from './utils'

/**
 * Creates a runtime-compat rule.
 * @param filterRuntimes - List of runtimes to check.
 * @returns ESLint rule.
 */
export const runtimeCompatRule = (filterRuntimes: RuntimeName[]) =>
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

      const runtimeCompatData = filterPreprocessCompatData(preprocessCompatData, filterRuntimes)

      const reportMatchingError = (
        node: TSESTree.Expression,
        apiContext: keyof typeof runtimeCompatData,
        apiId: string,
      ) => {
        const apiInfo = runtimeCompatData[apiContext].get(apiId)
        if (!apiInfo) return
        // @ts-expect-error
        context.report({ node, message: `${apiContext} - ${apiInfo.error}` })
      }

      return {
        // Check compat for class instantiations
        NewExpression: (node) => {
          const classType = services.getTypeAtLocation(node)
          const className = checker.typeToString(classType)

          const apiId = JSON.stringify([className])
          reportMatchingError(node, 'class', apiId)
        },
        // Check compat for class property access
        MemberExpression: (node) => {
          const classType = services.getTypeAtLocation(node.object)
          const className = checker.typeToString(classType)

          const apiId = JSON.stringify([
            className,
            (node.property as TSESTree.PrivateIdentifier).name,
          ])
          reportMatchingError(node, 'classProperty', apiId)
        },
      }
    },
  })
