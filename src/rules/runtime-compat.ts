import type { Rule } from 'eslint'
import type { Identifier } from 'estree'
import type { RuntimeName } from 'runtime-compat-data'
import data from 'runtime-compat-data'
import type { RuleConfig } from '../types'
import { compatErrorMessage } from '../utils/compatErrorMessage'
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
    },
    type: 'problem',
  },
  create: (context) => {
    const unsupportedApis = filterSupportCompatData(mapCompatData(data), filterRuntimes, ruleConfig)

    const reportError = (node: Identifier, unsupportesApiId: string) => {
      const apiInfo = unsupportedApis[unsupportesApiId]
      if (!apiInfo) return
      const message = compatErrorMessage(unsupportesApiId, apiInfo)
      context.report({ node, message })
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
