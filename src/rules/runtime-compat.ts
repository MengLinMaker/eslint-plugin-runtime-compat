import type { Rule } from 'eslint'
import type { Identifier } from 'estree'
import type { RuntimeName } from 'runtime-compat-data'
import data from 'runtime-compat-data'
import type { RuleConfig } from '../types'
import { filterSupportCompatData } from '../utils/filterSupportCompatData'
import { mapCompatData } from '../utils/mapCompatData'

/**
 * Creates a runtime-compat rule.
 * @param filterRuntimes - List of runtimes to check.
 * @returns ESLint rule.
 */
export const runtimeCompatRule = (
  filterRuntimes: RuntimeName[],
  ruleConfig: RuleConfig,
): Rule.RuleModule => ({
  meta: {
    docs: {
      description: 'Ensure cross-runtime API compatibility',
      category: 'Compatibility',
      recommended: true,
    },
    type: 'problem',
    schema: [{ type: 'string' }],
  },
  create: (context) => {
    const unsupportedApis = filterSupportCompatData(mapCompatData(data), filterRuntimes, ruleConfig)
    const reportError = (node: Identifier, unsupportesApiId: string) => {
      const apiInfo = unsupportedApis[unsupportesApiId]
      if (apiInfo) {
        const unsupportedRuntimeString = apiInfo.unsupported.join(', ')
        const apiName: string[] = JSON.parse(unsupportesApiId)
        context.report({
          node,
          message: `${apiName.join('.')} - Unsupported API in ${unsupportedRuntimeString}. Docs: ${apiInfo.url}`,
        })
      }
    }

    return {
      Identifier: (identifierNode) => {
        // Detect a class constructor
        if (identifierNode.parent.type === 'NewExpression') {
          const unsupportesApiId = JSON.stringify([identifierNode.name])
          reportError(identifierNode, unsupportesApiId)
        }
        // Detect variable assignment from class
        if (identifierNode.parent.type === 'VariableDeclarator') {
          if (identifierNode.parent.init === identifierNode) {
            console.log(identifierNode.name)
            const unsupportesApiId = JSON.stringify([identifierNode.name])
            reportError(identifierNode, unsupportesApiId)
          }
        }
      },
    }
  },
})
