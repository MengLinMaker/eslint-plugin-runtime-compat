import type { Identifier } from 'estree'
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
      const unsupportedApis = filterSupportCompatData(
        mapCompatData(data),
        filterRuntimes,
        ruleConfig,
      )

      const reportError = (node: Identifier, unsupportesApiId: string) => {
        const apiInfo = unsupportedApis[unsupportesApiId]
        if (!apiInfo) return
        const message = compatErrorMessage(unsupportesApiId, apiInfo)
        // @ts-expect-error using typescript-eslint
        context.report({ node, message })
      }

      return {
        TSInterfaceDeclaration: (node) => {
          console.log(node)
        },
        Identifier: (identifierNode) => {
          // Detect a class constructor
          if (identifierNode.parent.type === 'NewExpression') {
            const unsupportesApiId = JSON.stringify([identifierNode.name])
            reportError(identifierNode, unsupportesApiId)
          }
          // Detect variable assignment from class
          if (identifierNode.parent.type === 'VariableDeclarator') {
            if (identifierNode.parent.init === identifierNode) {
              const unsupportesApiId = JSON.stringify([identifierNode.name])
              reportError(identifierNode, unsupportesApiId)
            }
          }
        },
      }
    },
  })
