import type { Rule } from 'eslint'
import type { Identifier } from 'estree'
import type { RuntimeName } from 'runtime-compat-data'
import data from 'runtime-compat-data'
import { filterSupportCompatData } from '../utils/filterSupportCompatData'
import { mapCompatData } from '../utils/mapCompatData'

/**
 * Creates a runtime-compat rule.
 * @param filterRuntimes - List of runtimes to check.
 * @returns ESLint rule.
 */
export const runtimeCompatRule = (
  filterRuntimes: RuntimeName[],
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
    const compatDataMap = mapCompatData(data)
    const unsupportedApis = filterSupportCompatData(
      compatDataMap,
      filterRuntimes,
    )

    const reportError = (node: Identifier, unsupportesApiId: string) => {
      const apiInfo = unsupportedApis[unsupportesApiId]
      if (apiInfo) {
        const unsupportedRuntimeString = apiInfo.unsupported.join(', ')
        context.report({
          node,
          message: `${node.name} - Unsupported API in ${unsupportedRuntimeString}. Docs: ${apiInfo.url}`,
        })
      }
    }

    return {
      Identifier: (identifierNode) => {
        // Detect a class
        if (identifierNode.parent.type === 'NewExpression') {
          const unsupportesApiId = JSON.stringify([identifierNode.name])
          reportError(identifierNode, unsupportesApiId)
        }
      },
    }
  },
})
