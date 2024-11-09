import type { RuntimeName, StatusBlock, SupportStatement } from 'runtime-compat-data'

type ApiClassification =
  | 'class'
  | 'classProperty'
  | 'eventListener'
  | 'global'
  | 'globalClassProperty'
  | 'misc'

/**
 * Types for preprocessing
 */
export type PreprocessCompatStatement = {
  url: string
  status: StatusBlock
  support: Partial<Record<RuntimeName, SupportStatement>>
}
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
  error: string
}
export type RuntimeCompatData = Record<ApiClassification, Map<string, RuntimeCompatStatement>>
