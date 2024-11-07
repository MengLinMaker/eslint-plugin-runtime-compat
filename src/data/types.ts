import type { CompatStatement, RuntimeName } from 'runtime-compat-data'

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
