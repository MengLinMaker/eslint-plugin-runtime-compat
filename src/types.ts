import type { CompatStatement, RuntimeName } from 'runtime-compat-data'

export type RuleConfig = {
  deprecated: boolean
  experimental: boolean
}

export type RawCompatDataMap = {
  [key: string]: CompatStatement
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
