import { writeFileSync } from 'node:fs'
import type { CompatStatement, Identifier, StatusBlock } from 'runtime-compat-data'
import rawCompatData from 'runtime-compat-data'
import type { PreprocessCompatData, PreprocessCompatStatement } from './src/types'
import { parseJsonKeys, stringifyJsonKeys } from './src/utils'

/**
 * Compress raw compat data to single level flatmap
 */
const mapCompatData = new Map<string, PreprocessCompatStatement>()
{
  const objectKeys = <T extends object>(object: T) => Object.keys(object) as (keyof T)[]

  /**
   * Simplifies compat data to only relevant info
   * @param compatStatement The raw compat data API compat statement
   * @returns Preprocess compat statement for runtime filtering before linting
   */
  const extractPreprocessCompatStatement = (
    compatStatement: CompatStatement,
  ): PreprocessCompatStatement => {
    // Prefer MDN url
    let url = compatStatement.mdn_url
    if (url === undefined) {
      if (Array.isArray(compatStatement.spec_url)) url = compatStatement.spec_url[0]
      else url = compatStatement.spec_url
    }
    // Assume standard track if there is no API status
    const defaultStatus = {
      deprecated: false,
      experimental: false,
      standard_track: true,
    } satisfies StatusBlock
    return {
      url: url ?? 'No url provided.',
      status: compatStatement.status ?? defaultStatus,
      support: compatStatement.support,
    }
  }

  /**
   * DFS parse raw compat data
   * @param compatData Raw compat data and inner data
   * @param parentKeys Chain of keys with '__compat' as parameter
   */
  const parseRawCompatData = (compatData: Identifier, parentKeys: string[] = []) => {
    const keys = objectKeys(compatData) as string[]
    for (const key of keys) {
      const subData = compatData[key]
      if (key === '__compat') {
        const preprocessCompatStatement = extractPreprocessCompatStatement(subData as never)
        mapCompatData.set(stringifyJsonKeys(parentKeys), preprocessCompatStatement)
      } else {
        // Only chain keys if "__compat" exists
        const nodeHasCompatData = !keys.includes('__compat')
        const filteredParentKeys = nodeHasCompatData ? [key] : [...parentKeys, key]
        if (subData) parseRawCompatData(subData, filteredParentKeys)
      }
    }
  }
  parseRawCompatData(rawCompatData.api as never)
}

/**
 * Sort mapped compat data into different AST detection apiContext
 */
const preprocessCompatData: PreprocessCompatData = {
  class: {},
  classProperty: {},
  eventListener: {},
  global: {},
  globalClassProperty: {},
  misc: {},
}
{
  const isPascalCase = (s: string | undefined) => s?.match(/^[A-Z]+.*/)

  for (const [jsonKeys, preprocessCompatStatement] of mapCompatData.entries()) {
    const keys = parseJsonKeys(jsonKeys)
    if (keys.length === 1) {
      if (isPascalCase(keys[0])) {
        // PascalCase, hence a class
        preprocessCompatData.class[jsonKeys] = preprocessCompatStatement
      } else {
        // camelCase, hence a variable or function
        preprocessCompatData.global[jsonKeys] = preprocessCompatStatement
      }
    } else if (keys.length === 2) {
      if (keys[0] === keys[1])
        // Duplicate keys are class constructors
        preprocessCompatData.class[stringifyJsonKeys([keys[0]!])] = preprocessCompatStatement
      else if (keys[1]?.match('_static')) {
        // Static methods have '_static'
        const newKeys = stringifyJsonKeys([keys[0]!, keys[1]?.replace('_static', '')])
        if (isPascalCase(keys[0]))
          preprocessCompatData.classProperty[newKeys] = preprocessCompatStatement
        else preprocessCompatData.globalClassProperty[newKeys] = preprocessCompatStatement
      } else if (keys[1]?.match('_event')) {
        // Events have '_event'
        const newKeys = stringifyJsonKeys([keys[0]!, keys[1]?.replace('_event', '')])
        preprocessCompatData.eventListener[newKeys] = preprocessCompatStatement
      } else if (!keys[1]?.match('_'))
        // Normal class property
        preprocessCompatData.classProperty[jsonKeys] = preprocessCompatStatement
      else preprocessCompatData.misc[jsonKeys] = preprocessCompatStatement
    } else {
      // Not sure how to analyse
      preprocessCompatData.misc[stringifyJsonKeys([keys[0]!])] = preprocessCompatStatement
    }
  }
}
writeFileSync(
  './src/preprocessCompatData.json',
  `${JSON.stringify(preprocessCompatData, null, 2)}\n`,
)
