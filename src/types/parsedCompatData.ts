import type { supportedRuntimes } from '../constants'

export type Runtime = (typeof supportedRuntimes)[number]

export type ParsedCompatData = {
  url: string | undefined
  status: {
    deprecated: boolean
    experimental: boolean
    standard_track: boolean
  }
  unsupported: Runtime[]
}
