import { ESLintUtils } from '@typescript-eslint/utils'
import type { ParsedCompatData } from '../../types'

/**
 * Generates error message from parsed compat data.
 * @param unsupportesApiId - The API variable defined from constructor.
 * @param apiInfo - API parsed compat data.
 * @returns Error message.
 */
export const compatErrorMessage = (unsupportesApiId: string, apiInfo: ParsedCompatData) => {
  const apiName: string[] = JSON.parse(unsupportesApiId)

  // Mention status that is not standard.
  let status = apiInfo.status?.deprecated ? 'deprecated ' : ''
  status = apiInfo.status?.experimental ? 'experimental ' : status

  // Grammatical string array.
  let unsupportedRuntimeString = `${apiInfo.unsupported[0]}`
  if (apiInfo.unsupported.length > 1) {
    const subString = apiInfo.unsupported.slice(0, -1).join(', ')
    unsupportedRuntimeString = `${subString} and ${apiInfo.unsupported.slice(-1)}`
  }

  // Mention docs if exists.
  const docString = apiInfo.url ? `\nDocs - ${apiInfo.url}` : ''

  return `'${apiName.join('.')}' - Unsupported ${status}API in ${unsupportedRuntimeString}.${docString}`
}

export const createRule = ESLintUtils.RuleCreator(() => '')
