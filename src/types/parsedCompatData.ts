import type { RuntimeName } from 'runtime-compat-data'

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
