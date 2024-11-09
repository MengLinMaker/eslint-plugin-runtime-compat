import type { RuntimeName } from 'runtime-compat-data'
import data from 'runtime-compat-data'
import { filterSupportCompatData } from './filterSupportCompatData.js'
import { mapCompatData } from './mapCompatData.js'
import type { ParsedCompatData, RuleConfig } from './types.js'

export type { RuleConfig, ParsedCompatData, RuntimeName }
export { filterSupportCompatData, mapCompatData, data }
