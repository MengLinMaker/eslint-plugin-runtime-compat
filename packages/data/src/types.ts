import type {
  CompatStatement,
  RuntimeName,
  StatusBlock,
  SupportStatement,
} from 'runtime-compat-data'

/**
 * Types for preprocessing
 */
export type PreprocessCompatStatement = {
  url: string
  status: StatusBlock
  support: Partial<Record<RuntimeName, SupportStatement>>
}
type ApiClassification =
  | 'class'
  | 'classProperty'
  | 'eventListener'
  | 'global'
  | 'globalClassProperty'
  | 'misc'
export type PreprocessCompatData = Record<
  ApiClassification,
  Record<string, PreprocessCompatStatement>
>

/**
 * Types for runtime
 */

export type RuntimeCompatStatement = {
  url: string
  status: StatusBlock
  unsupported: RuntimeName[]
}
export type RuntimeCompatData = Record<ApiClassification, Map<string, RuntimeCompatStatement>>

/**
 * Anything below is legacy
 */
export type RuleConfig = {
  deprecated: boolean
  experimental: boolean
}
interface NeoCompatStatement extends CompatStatement {
  url?: string
}

export type RawCompatDataMap = {
  [key: string]: NeoCompatStatement
}

export type ParsedCompatData = {
  url: string | undefined
  status:
    | {
        deprecated: boolean
        experimental: boolean
        standard_track: boolean
      }
    | undefined
  unsupported: RuntimeName[]
}
